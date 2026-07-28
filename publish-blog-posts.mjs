import { createClient } from '@sanity/client';
import { appendFileSync, createReadStream, existsSync, mkdirSync, readFileSync, readdirSync, renameSync } from 'fs';
import path from 'path';
import { randomBytes } from 'crypto';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

for (const envPath of [
  path.join(__dirname, '.env.local'),
  path.join(__dirname, '.env.production.local'),
]) {
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false, quiet: true });
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId) {
  throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is required. Add it to site/.env.local or export it before running this script.');
}

if (!dataset) {
  throw new Error('NEXT_PUBLIC_SANITY_DATASET is required. Add it to site/.env.local or export it before running this script.');
}

if (!token) {
  throw new Error('SANITY_API_TOKEN is required. Add it to site/.env.local or export it before running this script.');
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
});

const CLIENT_ROOT = path.resolve(__dirname, '..');
const QUEUE_DIR = path.join(CLIENT_ROOT, 'blog-queue');
const PUBLISHED_DIR = path.join(QUEUE_DIR, 'published');
const IMAGES_DIR = path.join(QUEUE_DIR, 'images');
const VALIDATOR = path.join(CLIENT_ROOT, 'scripts', 'validate-candee-draft.mjs');
const PUBLISH_LOG = path.join(CLIENT_ROOT, 'logs', 'publish-log.md');
const MIN_BODY_WORDS = 300;

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

// Convert inline markdown to Portable Text spans and link annotations.
function parseInlineContent(text) {
  const children = [];
  const markDefs = [];
  const tokenRe = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match;

  function pushText(value, marks = []) {
    if (!value) return;
    children.push({ _type: 'span', _key: genKey(), text: value, marks });
  }

  while ((match = tokenRe.exec(text)) !== null) {
    pushText(text.slice(lastIndex, match.index));

    if (match[2] && match[3]) {
      const key = genKey();
      markDefs.push({ _key: key, _type: 'link', href: match[3] });
      pushText(match[2], [key]);
    } else if (match[4]) {
      pushText(match[4], ['strong']);
    } else if (match[5]) {
      pushText(match[5], ['em']);
    } else if (match[6]) {
      pushText(match[6], ['code']);
    }

    lastIndex = tokenRe.lastIndex;
  }

  pushText(text.slice(lastIndex));

  return {
    children: children.length > 0 ? children : [{ _type: 'span', _key: genKey(), text, marks: [] }],
    markDefs,
  };
}

function makeBlock(style, text) {
  const inline = parseInlineContent(text);
  return {
    _type: 'block',
    _key: genKey(),
    style,
    markDefs: inline.markDefs,
    children: inline.children,
  };
}

function makeListBlock(listItem, text) {
  const inline = parseInlineContent(text);
  return {
    _type: 'block',
    _key: genKey(),
    style: 'normal',
    listItem,
    level: 1,
    markDefs: inline.markDefs,
    children: inline.children,
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
  return result || null;
}

function truncate(text, max) {
  if (!text) return '';
  const clean = text.replace(/\s+/g, ' ').trim();
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trim()}…`;
}

function firstParagraph(body) {
  return body
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .find((part) => part && !part.startsWith('#') && !part.startsWith('---')) || '';
}

function wordCount(body) {
  return body.replace(/^---[\s\S]*?---/, '').trim().split(/\s+/).filter(Boolean).length;
}

function safeStamp(date = new Date()) {
  return date.toISOString().replace(/[:.]/g, '-');
}

function sortableDate(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    const { meta } = parseFrontmatter(content);
    const frontmatterDate = meta.date || meta.publish_date || meta.date_drafted || meta.date_started;
    if (frontmatterDate) return String(frontmatterDate).substring(0, 10);
  } catch {
    // Fall back to filename below.
  }

  const filenameDate = path.basename(filePath).match(/^(\d{4}-\d{2}-\d{2})/);
  return filenameDate?.[1] || '9999-12-31';
}

function validatePostShape(filePath, meta, body) {
  const errors = [];
  if (!meta.title || meta.title.trim().length < 10) errors.push('missing or too-short title');
  if (!meta.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(meta.slug)) errors.push('missing or invalid slug');
  if (wordCount(body) < MIN_BODY_WORDS) errors.push(`body word count must be at least ${MIN_BODY_WORDS}`);
  if (errors.length > 0) {
    throw new Error(`basic validation failed: ${errors.join('; ')}`);
  }
}

function classifyFromText(title = '', slug = '', keyword = '') {
  const t = `${title} ${slug} ${keyword}`.toLowerCase();

  // Seller intent first (pricing/closing/timeline)
  if (/(best time to sell|closing costs|pricing strategy|seller|sell your home|sell a home|cost to sell|net proceeds|listing agreement|staging your home)/.test(t)) {
    return { category: 'sellers-guide', pillar: 'seller-authority' };
  }

  // Explicit market updates
  if (/(market update|real estate market|housing market|inventory crisis|mortgage rates)/.test(t) && !/(neighborhood|living in)/.test(t)) {
    return { category: 'market-update', pillar: 'market-intel' };
  }

  // Neighborhood guides / living-in content
  if (/(neighborhood guide|living in|neighborhood spotlight|local'?s (honest )?guide|which .+ neighborhood|best neighborhoods|vs .+ luxury neighborhood)/.test(t)
    || /(neighborhood-guide|living-in-)/.test(t)) {
    return { category: 'neighborhood-spotlight', pillar: 'neighborhood' };
  }

  // Buyer guides
  if (/(first-time home buyer|buyer guide|buyers guide|homes for sale|buying a|for buyers|what does \$1 million|1 million buy|relocating|moving to)/.test(t)) {
    return { category: 'buyers-guide', pillar: 'market-intel' };
  }

  if (/(lifestyle|commute|parks and trails|dining|arts and culture|farmers markets|seasons)/.test(t)) {
    return { category: 'lifestyle', pillar: 'lifestyle' };
  }

  return { category: 'home-tips', pillar: undefined };
}

function categoryFor(meta) {
  const category = String(meta.category || '').toLowerCase();
  if (category.includes('neighborhood')) return 'neighborhood-spotlight';
  if (category.includes('buy')) return 'buyers-guide';
  if (category.includes('sell')) return 'sellers-guide';
  if (category.includes('lifestyle')) return 'lifestyle';
  if (category.includes('market')) return 'market-update';

  // Many Candee drafts omit category — infer from title/slug/keyword
  return classifyFromText(meta.title || '', meta.slug || '', meta.target_keyword || '').category;
}

function pillarFor(meta) {
  const category = String(meta.category || '').toLowerCase();
  if (category.includes('sell')) return 'seller-authority';
  if (category.includes('neighborhood')) return 'neighborhood';
  if (category.includes('lifestyle')) return 'lifestyle';
  if (category.includes('market')) return 'market-intel';
  if (category.includes('buy')) return 'market-intel';

  return classifyFromText(meta.title || '', meta.slug || '', meta.target_keyword || '').pillar;
}

function validateDraft(filePath) {
  const result = spawnSync(process.execPath, [VALIDATOR, filePath], {
    encoding: 'utf8',
  });

  let parsed = null;
  try {
    parsed = JSON.parse(result.stdout || '{}');
  } catch {
    // Keep parsed as null and fail below with command output.
  }

  if (result.status !== 0 || !parsed?.ok) {
    const details = parsed?.errors?.join('; ') || result.stderr || result.stdout || 'validator failed';
    throw new Error(`validation failed: ${details}`);
  }

  return parsed;
}

function resolveQueueFile(file) {
  if (path.isAbsolute(file)) return file;
  const cwdRelative = path.resolve(process.cwd(), file);
  if (existsSync(cwdRelative)) return cwdRelative;
  return path.join(QUEUE_DIR, file);
}

function parseArgs(argv) {
  const args = {
    all: false,
    dryRun: false,
    archive: true,
    files: [],
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--all') {
      args.all = true;
    } else if (arg === '--dry-run') {
      args.dryRun = true;
    } else if (arg === '--no-archive') {
      args.archive = false;
    } else if (arg === '--file') {
      const next = argv[++i];
      if (!next) throw new Error('--file requires a value');
      args.files.push(next);
    } else if (arg.startsWith('--')) {
      throw new Error(`unknown option: ${arg}`);
    } else {
      args.files.push(arg);
    }
  }

  if (!args.all && args.files.length === 0) {
    throw new Error('pass one or more markdown files, or use --all to publish every validated queue draft');
  }

  return args;
}

function discoverQueueFiles() {
  return readdirSync(QUEUE_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => path.join(QUEUE_DIR, file))
    .filter((filePath) => !filePath.endsWith('.published') && !filePath.includes(`${path.sep}processed${path.sep}`))
    .sort((a, b) => sortableDate(a).localeCompare(sortableDate(b)) || path.basename(a).localeCompare(path.basename(b)));
}

function appendPublishLog(result) {
  mkdirSync(path.dirname(PUBLISH_LOG), { recursive: true });
  const stamp = new Date().toISOString();
  const entry = [
    `## ${stamp}`,
    `**Result:** ${result.status}`,
    `**Title:** "${result.title}"`,
    `**Slug:** ${result.slug}`,
    `**Category:** ${result.category}`,
    `**File:** ${result.filePath}`,
    result.archivedTo ? `**Archived To:** ${result.archivedTo}` : null,
    `**Sanity Project:** ${projectId}`,
    `**Dataset:** ${dataset}`,
    '',
  ].filter(Boolean).join('\n');
  appendFileSync(PUBLISH_LOG, entry);
}

function archivePublishedFile(filePath) {
  mkdirSync(PUBLISHED_DIR, { recursive: true });
  const target = path.join(PUBLISHED_DIR, `${safeStamp()}--${path.basename(filePath)}`);
  if (existsSync(target)) {
    const uniqueTarget = path.join(PUBLISHED_DIR, `${safeStamp()}-${Date.now()}--${path.basename(filePath)}`);
    renameSync(filePath, uniqueTarget);
    return uniqueTarget;
  }
  renameSync(filePath, target);
  return target;
}

async function publishPost(filePath, options) {
  filePath = resolveQueueFile(filePath);
  if (!existsSync(filePath)) {
    throw new Error(`file not found: ${filePath}`);
  }

  const validation = validateDraft(filePath);
  const content = readFileSync(filePath, 'utf-8');
  const { meta, body } = parseFrontmatter(content);
  validatePostShape(filePath, meta, body);

  const slug = meta.slug || path.basename(filePath).replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
  const title = meta.title || slug;
  const date = meta.date || meta.publish_date || meta.date_drafted || '2026-03-26';
  const excerpt = truncate(meta.meta_description || firstParagraph(body), 190);
  const wc = validation.wordCount || wordCount(body);
  const category = categoryFor(meta);
  const pillar = pillarFor(meta);

  console.log(`\n📄 Processing: ${slug}`);

  // Dedup check
  const exists = await checkExists(slug);
  if (exists) {
    console.log(`  ⏭️  Already exists in Sanity (${exists}) — skipping`);
    let archivedTo = null;
    if (!options.dryRun && options.archive) {
      archivedTo = archivePublishedFile(filePath);
      console.log(`  📁 Archived existing post source: ${archivedTo}`);
    }
    const result = { slug, title, filePath, archivedTo, blocks: 0, status: 'skipped (already exists)', category };
    if (!options.dryRun) appendPublishLog(result);
    return result;
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
    categories: [category],
    readTime: Math.max(1, Math.ceil(wc / 200)),
    metaTitle: truncate(title, 60),
    metaDescription: truncate(excerpt, 160),
    targetKeyword: meta.target_keyword || undefined,
    contentPillar: pillar,
    isCornerstone: category === 'neighborhood-spotlight',
    body: blocks,
  };

  // Upload image if a matching image exists in blog-queue/images.
  const imageCandidates = ['jpg', 'jpeg', 'png', 'webp'].map((ext) => path.join(IMAGES_DIR, `${slug}.${ext}`));
  const imagePath = imageCandidates.find((candidate) => existsSync(candidate));
  if (imagePath) {
    try {
      doc.mainImage = await uploadImage(imagePath, title);
      console.log(`  🖼️  Image uploaded: ${path.basename(imagePath)}`);
    } catch (err) {
      console.log(`  ⚠️  Image upload failed: ${err.message} — proceeding without`);
    }
  } else {
    console.log(`  🚫 No image matched — omitting mainImage`);
    if (process.env.REQUIRE_BLOG_IMAGE === '1') {
      throw new Error('BLOCK_PUBLISH_WITHOUT_IMAGE: ' + (meta.slug || filePath));
    }
    console.warn('  ⚠️ Publish proceeding without mainImage; UI will look generic until backfilled.');
  }

  if (options.dryRun) {
    console.log(`  🧪 Dry run — not publishing`);
    return { slug, title, filePath, blocks: blocks.length, status: 'dry-run', category };
  }

  // Publish to Sanity
  await client.createOrReplace(doc);
  console.log(`  ✅ Published: post-${slug}`);

  let archivedTo = null;
  if (options.archive) {
    try {
      archivedTo = archivePublishedFile(filePath);
      console.log(`  📁 Archived: ${archivedTo}`);
    } catch (err) {
      console.log(`  ⚠️  Could not archive file: ${err.message}`);
    }
  }

  const result = { slug, title, filePath, archivedTo, blocks: blocks.length, status: 'published', category };
  appendPublishLog(result);
  return result;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const files = options.all ? discoverQueueFiles() : options.files.map(resolveQueueFile);

  console.log('🚀 Starting Candee Currie blog publishing pipeline...\n');
  console.log(`Project: ${projectId} · Dataset: ${dataset}`);
  console.log(`Files: ${files.length}`);

  const results = [];

  for (const file of files) {
    try {
      const result = await publishPost(file, options);
      results.push(result);
    } catch (err) {
      console.error(`  ❌ Error publishing ${path.basename(file)}: ${err.message}`);
      results.push({
        slug: path.basename(file),
        title: path.basename(file),
        blocks: 0,
        category: 'unknown',
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

  if (results.some((result) => result.status.startsWith('error:'))) {
    process.exitCode = 1;
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err.message);
    process.exitCode = 1;
  });
}

export {
  QUEUE_DIR,
  appendPublishLog,
  discoverQueueFiles,
  parseFrontmatter,
  publishPost,
  resolveQueueFile,
  sortableDate,
  validateDraft,
  validatePostShape,
};
