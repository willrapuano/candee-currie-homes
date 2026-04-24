/**
 * Publish Candee Currie blog posts to Sanity
 * Usage: npx tsx /tmp/candee-publish.mjs
 */
import { createClient } from '@sanity/client';

const SANITY_TOKEN = process.env.SANITY_TOKEN_CANDEE_CURRIE ||
  'sktduwqwKdJnL5n5pE2nyPs9DqBocM7DfANFPaymKdyaOFuN1Lo9YGmRKnRJHiz7lZKcSDL2XQcMAs3Wgau8i7fmbOsHlfRGHReSsFnarWk9bV5m7uCMctippLqfjQA2W4WeWw0lar7qA8TWn87Jw6nG3lsYoTeoMVJ6vZedNRXsT0LqfHD2';

const client = createClient({
  projectId: 'ej27mt39',
  dataset: 'production',
  token: SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2024-01-01',
});

// Parse frontmatter and markdown body into Sanity post document
import fs from 'fs';

function parseFrontmatter(md) {
  const match = md.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { fm: null, body: md };
  const lines = match[1].split('\n');
  const fm = {};
  for (const line of lines) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      fm[key] = val;
    }
  }
  const body = md.slice(match[0].length).trim();
  return { fm, body };
}

// Convert markdown body to Sanity blocks (simplified PT)
function markdownToBlocks(markdown) {
  const lines = markdown.split('\n');
  const blocks = [];
  let currentParagraph = [];

  function flushParagraph() {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        blocks.push({
          _type: 'block',
          _key: `p-${blocks.length}`,
          style: 'normal',
          markDefs: [],
          children: parseInlineMarks(text, `p-${blocks.length}`),
        });
      }
      currentParagraph = [];
    }
  }

  for (const line of lines) {
    // Blank line
    if (line.trim() === '') {
      flushParagraph();
      continue;
    }

    // h1
    if (/^# /.test(line)) {
      flushParagraph();
      const text = line.replace(/^# /, '').trim();
      blocks.push({
        _type: 'block',
        _key: `h1-${blocks.length}`,
        style: 'h1',
        markDefs: [],
        children: [
          { _type: 'span', _key: `s-${blocks.length}-0`, text, marks: [] },
        ],
      });
      continue;
    }

    // h2
    if (/^## /.test(line)) {
      flushParagraph();
      const text = line.replace(/^## /, '').trim();
      blocks.push({
        _type: 'block',
        _key: `h2-${blocks.length}`,
        style: 'h2',
        markDefs: [],
        children: [
          { _type: 'span', _key: `s-${blocks.length}-0`, text, marks: [] },
        ],
      });
      continue;
    }

    // h3
    if (/^### /.test(line)) {
      flushParagraph();
      const text = line.replace(/^### /, '').trim();
      blocks.push({
        _type: 'block',
        _key: `h3-${blocks.length}`,
        style: 'h3',
        markDefs: [],
        children: [
          { _type: 'span', _key: `s-${blocks.length}-0`, text, marks: [] },
        ],
      });
      continue;
    }

    // Bullet list items (- or *)
    if (/^[-*] /.test(line)) {
      flushParagraph();
      const text = line.replace(/^[-*] /, '').trim();
      // Collect consecutive list items
      const listItems = [{ text }];
      // already consumed this line, no need to re-process
      blocks.push({
        _type: 'block',
        _key: `li-${blocks.length}`,
        style: 'normal',
        listItem: 'bullet',
        markDefs: [],
        level: 0,
        children: parseInlineMarks(text, `li-${blocks.length}`),
      });
      continue;
    }

    // Bolded section headers like **Section Name**
    const boldHeader = line.match(/^\*\*(.+?)\*\*\s*[-–—]?\s*$/);
    if (boldHeader) {
      flushParagraph();
      blocks.push({
        _type: 'block',
        _key: `h2b-${blocks.length}`,
        style: 'h2',
        markDefs: [],
        children: [
          { _type: 'span', _key: `s-${blocks.length}-0`, text: boldHeader[1], marks: [] },
        ],
      });
      continue;
    }

    // Regular paragraph line
    currentParagraph.push(line);
  }
  flushParagraph();
  return blocks;
}

function parseInlineMarks(text, blockKey) {
  // Parse **bold** and *italic* inline marks, plus [text](url) links
  const spans = [];
  let remaining = text;
  let offset = 0;

  // Regex for: **bold**, *italic*, [link](url) — process in order
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let m;
  let lastIndex = 0;

  while ((m = regex.exec(remaining)) !== null) {
    if (m.index > lastIndex) {
      spans.push({
        _type: 'span',
        _key: `s-${offset++}`,
        text: remaining.slice(lastIndex, m.index),
        marks: [],
      });
    }
    if (m[1]) {
      // bold
      spans.push({
        _type: 'span',
        _key: `s-${offset++}`,
        text: m[1],
        marks: ['strong'],
      });
    } else if (m[2]) {
      // italic
      spans.push({
        _type: 'span',
        _key: `s-${offset++}`,
        text: m[2],
        marks: ['em'],
      });
    } else if (m[3] && m[4]) {
      // link
      const linkKey = `link-${offset}`;
      spans.push({
        _type: 'span',
        _key: `s-${offset++}`,
        text: m[3],
        marks: [linkKey],
      });
      return { spans, linkDefs: { _key: linkKey, _type: 'link', href: m[4] } };
    }
    lastIndex = m.index + m[0].length;
  }

  if (lastIndex < remaining.length) {
    spans.push({
      _type: 'span',
      _key: `s-${offset++}`,
      text: remaining.slice(lastIndex),
      marks: [],
    });
  }

  return spans;
}

async function publishPost(filePath) {
  const md = fs.readFileSync(filePath, 'utf-8');
  const { fm, body } = parseFrontmatter(md);
  if (!fm || !fm.slug) {
    console.error(`No frontmatter found in ${filePath}`);
    return;
  }

  const blocks = markdownToBlocks(body);

  const doc = {
    _type: 'post',
    title: fm.title,
    slug: { _type: 'slug', current: fm.slug },
    excerpt: fm.meta_description || '',
    publishedAt: fm.date ? `${fm.date}T08:00:00Z` : new Date().toISOString(),
    body: blocks,
    mainImage: fm.featured_image
      ? { _type: 'image', asset: { _type: 'reference', _ref: fm.featured_image } }
      : undefined,
  };

  try {
    const result = await client.create(doc);
    console.log(`✅ Published: ${fm.title} → https://candeecurriehomes.com/blog/${fm.slug}`);
    console.log(`   Sanity ID: ${result._id}`);
    return result;
  } catch (err) {
    console.error(`❌ Failed to publish ${fm.title}:`, err.message);
    if (err.message.includes('already exists') || err.message.includes('duplicate')) {
      console.log(`   → Already exists, skipping`);
    }
    return null;
  }
}

function getCategoryRef(cat) {
  // We'll need existing category refs; for now use the ones from Sanity
  // This is a simplified approach - in production we'd query Sanity for actual refs
  const catMap = {
    'market-update': 'market-update',
    'neighborhood-spotlight': 'neighborhood-spotlight',
    'sellers-guide': 'sellers-guide',
    'buyers-guide': 'buyers-guide',
    'buyer-guide': 'buyers-guide',
    'home-tips': 'home-tips',
  };
  return catMap[cat] || 'buyers-guide';
}

// Main
const files = process.argv.slice(2);
if (files.length === 0) {
  console.log('Usage: npx tsx publish.mjs <file1.md> [file2.md] ...');
  process.exit(1);
}

for (const file of files) {
  console.log(`\n--- Publishing: ${file} ---`);
  await publishPost(file);
}
