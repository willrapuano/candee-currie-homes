import { createClient } from '@sanity/client';
import { createReadStream, readFileSync, renameSync } from 'fs';
import { readFile } from 'fs/promises';
import path from 'path';
import { randomBytes } from 'crypto';

const client = createClient({
  projectId: 'ej27mt39',
  dataset: 'production',
  token: 'sktduwqwKdJnL5n5pE2nyPs9DqBocM7DfANFPaymKdyaOFuN1Lo9YGmRKnRJHiz7lZKcSDL2XQcMAs3Wgau8i7fmbOsHlfRGHReSsFnarWk9bV5m7uCMctippLqfjQA2W4WeWw0lar7qA8TWn87Jw6nG3lsYoTeoMVJ6vZedNRXsT0LqfHD2',
  apiVersion: '2024-01-01',
  useCdn: false,
});

const PROCESSED_DIR = '/Users/jarvis/.openclaw/workspace/clients/candee-currie/blog-queue/processed';
const IMAGES_DIR = '/Users/jarvis/.openclaw/workspace/clients/candee-currie/blog-queue/images';

const POSTS = [
  { file: '2026-03-26-closing-costs-selling-home-northern-virginia.md', image: '2026-03-31-best-time-to-sell-home-northern-virginia.jpg' },
  { file: '2026-03-27-ballston-arlington-va-neighborhood-guide.md', image: '2026-04-01-arlington-va-neighborhoods-guide.jpg' },
  { file: '2026-03-27-great-falls-vs-mclean-luxury-neighborhood-guide.md', image: null },
  { file: '2026-03-27-relocating-to-northern-virginia.md', image: '2026-04-01-moving-to-arlington-va.jpg' },
  { file: '2026-03-28-living-in-arlington-va.md', image: '2026-04-01-living-in-rosslyn-va.jpg' },
  { file: '2026-03-28-northern-virginia-real-estate-market-spring-2026.md', image: null },
];

function genKey() {
  return randomBytes(8).toString('hex');
}

// Parse YAML frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };
  const yamlStr = match[1];
  const body = match[2];
  const meta = {};
  // Simple key: value parser (no nested arrays needed beyond what we use)
  const lines = yamlStr.split('\n');
  for (const line of lines) {
    const m = line.match(/^(\w[\w_-]*):\s*(.+)$/);
    if (m) {
      let val = m[2].trim();
      // Strip quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      meta[m[1]] = val;
    }
  }
  return { meta, body };
}

// Strip markdown links from text: [text](url) → text
function stripLinks(text) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

// Strip inline markdown for plain text (used in FAQ answers, table cells)
function stripInlineMarkdown(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

// Convert inline markdown to Portable Text spans
function parseInlineSpans(text) {
  // Handle **bold** and *italic*
  const spans = [];
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|([^*]+))/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      spans.push({ _type: 'span', _key: genKey(), text: match[2], marks: ['strong'] });
    } else if (match[3]) {
      spans.push({ _type: 'span', _key: genKey(), text: match[3], marks: ['em'] });
    } else if (match[4]) {
      if (match[4].length > 0) {
        spans.push({ _type: 'span', _key: genKey(), text: match[4], marks: [] });
      }
    }
  }
  return spans.length > 0 ? spans : [{ _type: 'span', _key: genKey(), text: text, marks: [] }];
}

function makeBlock(style, text) {
  return {
    _type: 'block',
    _key: genKey(),
    style,
    markDefs: [],
    children: parseInlineSpans(text),
  };
}

function makeListBlock(listItem, text) {
  return {
    _type: 'block',
    _key: genKey(),
    style: 'normal',
    listItem,
    level: 1,
    markDefs: [],
    children: parseInlineSpans(text),
  };
}

// Parse a markdown table into Sanity table block
function parseTable(lines) {
  const rows = [];
  let isFirst = true;
  for (const line of lines) {
    if (line.match(/^\|[-: |]+\|$/)) {
      // separator row - marks preceding row as header
      if (rows.length > 0) rows[rows.length - 1].isHeader = true;
      continue;
    }
    const cells = line.split('|').map(c => c.trim()).filter((c, i, arr) => i > 0 && i < arr.length - 1);
    if (cells.length === 0) continue;
    rows.push({
      _key: genKey(),
      _type: 'tableRow',
      isHeader: false,
      cells: cells.map(c => stripInlineMarkdown(c)),
    });
  }
  return { _type: 'table', _key: genKey(), rows };
}

// Detect FAQ section
function isFaqHeading(text) {
  return /frequently asked questions|faq|common questions/i.test(text);
}

// Convert markdown body to Portable Text blocks
function markdownToPortableText(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let i = 0;

  // Collect FAQ items when we're in FAQ mode
  let inFaqSection = false;
  let faqItems = [];
  let currentFaqQuestion = null;
  let currentFaqAnswerLines = [];

  function flushFaqItem() {
    if (currentFaqQuestion && currentFaqAnswerLines.length > 0) {
      const answer = currentFaqAnswerLines.join(' ').trim();
      faqItems.push({
        _key: genKey(),
        question: currentFaqQuestion,
        answer: stripLinks(stripInlineMarkdown(answer)),
      });
    }
    currentFaqQuestion = null;
    currentFaqAnswerLines = [];
  }

  function flushFaq() {
    flushFaqItem();
    if (faqItems.length > 0) {
      blocks.push({ _type: 'accordion', _key: genKey(), items: faqItems });
      faqItems = [];
    }
    inFaqSection = false;
  }

  // Collect table lines
  function isTableLine(line) {
    return line.startsWith('|') && line.endsWith('|');
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip blank lines and HR
    if (trimmed === '' || trimmed === '---') {
      // If in FAQ and we hit blank line, just advance
      i++;
      continue;
    }

    // Table: collect all consecutive table lines
    if (isTableLine(trimmed)) {
      if (inFaqSection) { flushFaq(); }
      const tableLines = [];
      while (i < lines.length && isTableLine(lines[i].trim())) {
        tableLines.push(lines[i].trim());
        i++;
      }
      blocks.push(parseTable(tableLines));
      continue;
    }

    // Headings
    const h1Match = trimmed.match(/^# (.+)$/);
    const h2Match = trimmed.match(/^## (.+)$/);
    const h3Match = trimmed.match(/^### (.+)$/);

    if (h1Match || h2Match) {
      const headingText = (h1Match || h2Match)[1];
      
      if (inFaqSection) {
        // A new h2 after FAQ section ends it (unless it's a FAQ question)
        if (isFaqHeading(headingText)) {
          // another FAQ heading - ignore it
          i++;
          continue;
        }
        flushFaq();
      }

      if (isFaqHeading(headingText)) {
        inFaqSection = true;
        i++;
        continue;
      }

      blocks.push(makeBlock('h2', headingText));
      i++;
      continue;
    }

    if (h3Match) {
      const headingText = h3Match[1];
      
      if (inFaqSection) {
        // h3 in FAQ section = question
        flushFaqItem();
        currentFaqQuestion = stripLinks(stripInlineMarkdown(headingText));
        i++;
        continue;
      }

      // Check if it looks like a FAQ question (ends with ?)
      // Only if we're tracking FAQ
      blocks.push(makeBlock('h3', headingText));
      i++;
      continue;
    }

    // In FAQ section - h2 questions (## Question?)
    if (inFaqSection && trimmed.match(/^## /)) {
      const qText = trimmed.replace(/^## /, '');
      flushFaqItem();
      currentFaqQuestion = stripLinks(stripInlineMarkdown(qText));
      i++;
      continue;
    }

    // Bullet list
    const bulletMatch = trimmed.match(/^[-*] (.+)$/);
    if (bulletMatch) {
      if (inFaqSection && currentFaqQuestion) {
        currentFaqAnswerLines.push(bulletMatch[1]);
      } else {
        blocks.push(makeListBlock('bullet', bulletMatch[1]));
      }
      i++;
      continue;
    }

    // Numbered list
    const numMatch = trimmed.match(/^\d+\. (.+)$/);
    if (numMatch) {
      if (inFaqSection && currentFaqQuestion) {
        currentFaqAnswerLines.push(numMatch[1]);
      } else {
        blocks.push(makeListBlock('number', numMatch[1]));
      }
      i++;
      continue;
    }

    // Blockquote
    const bqMatch = trimmed.match(/^> (.+)$/);
    if (bqMatch) {
      if (inFaqSection && currentFaqQuestion) {
        currentFaqAnswerLines.push(bqMatch[1]);
      } else {
        blocks.push(makeBlock('blockquote', bqMatch[1]));
      }
      i++;
      continue;
    }

    // Regular paragraph
    if (trimmed.length > 0) {
      if (inFaqSection && currentFaqQuestion) {
        currentFaqAnswerLines.push(trimmed);
      } else if (inFaqSection) {
        // Paragraph before any question in FAQ section - treat as intro, skip or add as block
        // (Usually shouldn't happen, but handle gracefully)
        i++;
        continue;
      } else {
        blocks.push(makeBlock('normal', trimmed));
      }
    }

    i++;
  }

  // Flush any remaining FAQ
  if (inFaqSection) {
    flushFaq();
  }

  return blocks;
}

async function uploadImage(imagePath, title) {
  console.log(`  Uploading image: ${path.basename(imagePath)}`);
  const stream = createReadStream(imagePath);
  const asset = await client.assets.upload('image', stream, {
    filename: path.basename(imagePath),
  });
  return {
    _type: 'image',
    asset: { _type: 'reference', _ref: asset._id },
    alt: title,
  };
}

async function checkExists(slug) {
  const result = await client.fetch(
    `*[_type=="post" && slug.current == $slug][0]._id`,
    { slug }
  );
  return !!result;
}

async function publishPost({ file, image }) {
  const filePath = path.join(PROCESSED_DIR, file);
  const content = readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(content);

  const slug = meta.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const title = meta.title || slug;
  const date = meta.date || meta.publish_date || meta.date_drafted || '2026-03-26';
  const excerpt = meta.meta_description || '';

  console.log(`\n📄 Processing: ${slug}`);

  // Dedup check
  const exists = await checkExists(slug);
  if (exists) {
    console.log(`  ⏭️  Already exists in Sanity — skipping`);
    return { slug, blocks: 0, status: 'skipped (already exists)' };
  }

  // Convert body to Portable Text
  const blocks = markdownToPortableText(body);
  console.log(`  📝 Converted to ${blocks.length} Portable Text blocks`);

  // Build document
  const doc = {
    _id: `post-${slug}`,
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    publishedAt: `${date.substring(0, 10)}T00:00:00.000Z`,
    excerpt,
    body: blocks,
  };

  // Upload image if matched
  if (image) {
    const imagePath = path.join(IMAGES_DIR, image);
    try {
      doc.mainImage = await uploadImage(imagePath, title);
      console.log(`  🖼️  Image uploaded: ${image}`);
    } catch (err) {
      console.log(`  ⚠️  Image upload failed: ${err.message} — proceeding without`);
    }
  } else {
    console.log(`  🚫 No image matched — omitting mainImage`);
  }

  // Publish to Sanity
  await client.createOrReplace(doc);
  console.log(`  ✅ Published: post-${slug}`);

  // Mark file as done
  try {
    renameSync(filePath, filePath + '.done');
    console.log(`  📁 Marked as done`);
  } catch (err) {
    console.log(`  ⚠️  Could not rename file: ${err.message}`);
  }

  return { slug, blocks: blocks.length, status: 'published' };
}

async function main() {
  console.log('🚀 Starting Candee Currie blog publishing pipeline...\n');
  const results = [];

  for (const post of POSTS) {
    try {
      const result = await publishPost(post);
      results.push(result);
    } catch (err) {
      console.error(`  ❌ Error publishing ${post.file}: ${err.message}`);
      results.push({
        slug: post.file,
        blocks: 0,
        status: `error: ${err.message}`,
      });
    }
  }

  console.log('\n\n📊 FINAL SUMMARY');
  console.log('='.repeat(80));
  console.log('slug | blocks | status');
  console.log('-'.repeat(80));
  for (const r of results) {
    console.log(`${r.slug} | ${r.blocks} | ${r.status}`);
  }
  console.log('='.repeat(80));
}

main().catch(console.error);
