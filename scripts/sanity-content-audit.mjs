#!/usr/bin/env node
/**
 * Health check for the Sanity content behind this site.
 *
 * Every check here exists because it caught something real:
 *
 *  1. STAND-IN IMAGES — twelve posts carried a mainImage whose alt text began with
 *     "Representative", which is the word you write when the picture is not of the
 *     place. One (the Shirlington guide) was AI-generated. Something replaced five
 *     more mid-session, so this is a recurring condition, not a one-off cleanup.
 *
 *  2. ORPHANED DOCUMENT TYPES — the site queries _type == "post" only. Eighteen
 *     `blogPost` documents existed that rendered nowhere and were not in the Studio
 *     schema either, so twelve articles (~35 pages of copy) simply 404'd.
 *
 *  3. STRING BODIES — sixteen of those stored `body` as raw markdown rather than
 *     Portable Text, so they would not have rendered even once reachable.
 *
 *  4. IMAGE REUSE — the same photograph on two different places contradicts itself.
 *
 *  5. MISSING IMAGES — next/image throws on an empty src, so these need the
 *     fallback path in app/blog to stay intact.
 *
 *  6. DUPLICATE / COMPETING TITLES — two Old Town Alexandria guides are live with
 *     near-identical titles.
 *
 * Read-only. No token needed for a public dataset; pass SANITY_API_TOKEN to include
 * drafts. Exits non-zero when a blocking condition is found, so CI can gate on it.
 *
 *   node scripts/sanity-content-audit.mjs
 */

const PROJECT = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ej27mt39";
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const API = "2024-01-01";
const TOKEN = process.env.SANITY_API_TOKEN;

/** Document types the site actually renders. Keep in sync with lib/sanity/queries.ts. */
const RENDERED_TYPES = ["post", "neighborhood", "sellerGuide", "marketHub", "neighborhoodSellerPage", "proofPage", "siteSettings", "testimonial"];

/** Alt-text openings that admit the image is not of the place it illustrates. */
const STAND_IN = /^(representative|generic|placeholder|stock|example)\b/i;

async function query(groq) {
  const res = await fetch(
    `https://${PROJECT}.api.sanity.io/v${API}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`,
    TOKEN ? { headers: { Authorization: `Bearer ${TOKEN}` } } : undefined
  );
  if (!res.ok) throw new Error(`query ${res.status}: ${(await res.text()).slice(0, 200)}`);
  return (await res.json()).result;
}

const problems = [];
const note = (label, items, blocking = true) => {
  console.log(`\n${blocking && items.length ? "FAIL" : items.length ? "WARN" : "ok  "}  ${label}: ${items.length}`);
  items.slice(0, 20).forEach((i) => console.log(`        ${i}`));
  if (items.length > 20) console.log(`        … and ${items.length - 20} more`);
  if (blocking && items.length) problems.push(label);
};

const types = await query(`array::unique(*[]._type)`);
const posts = await query(
  `*[_type=="post" && !(_id in path("drafts.**"))]{
     "slug":slug.current, title,
     "alt": mainImage.alt,
     "ref": mainImage.asset._ref,
     "file": mainImage.asset->originalFilename,
     "isString": !defined(body[0]._type),
     "hasBody": defined(body)
   }`
);

console.log(`project ${PROJECT}/${DATASET} — ${posts.length} published posts`);

// 1. stand-in images
note(
  'posts whose alt text admits a stand-in image',
  posts.filter((p) => STAND_IN.test(String(p.alt || ""))).map((p) => `/${p.slug}  — "${String(p.alt).slice(0, 70)}"`)
);

// 2. document types the site never renders
note(
  "document types present in the dataset but never queried by the site",
  types.filter((t) => !RENDERED_TYPES.includes(t) && !t.startsWith("sanity.")).map((t) => {
    return `${t}  — nothing in lib/sanity/queries.ts reads this; its documents are invisible`;
  })
);

// 3. bodies stored as markdown strings
note("posts whose body is a raw string rather than Portable Text", posts.filter((p) => p.hasBody && p.isString).map((p) => `/${p.slug}`));

// 4. one photograph doing duty for two places
const byRef = new Map();
for (const p of posts) if (p.ref) (byRef.get(p.ref) || byRef.set(p.ref, []).get(p.ref)).push(p.slug);
note(
  "the same image asset used by more than one post",
  [...byRef].filter(([, v]) => v.length > 1).map(([ref, v]) => `${posts.find((p) => p.ref === ref)?.file || ref}  → ${v.join(", ")}`),
  false
);

// 5. missing images — needs the app/blog fallback to be in place
note("posts with no main image (the branded fallback must stay wired up)", posts.filter((p) => !p.ref).map((p) => `/${p.slug}`), false);

// 6. titles competing with each other
const norm = (s) => String(s || "").toLowerCase().replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
// Leading articles are dropped before comparing: "The Old Town Alexandria Neighborhood
// Guide" and "Old Town Alexandria Neighborhood Guide" are the same title competing for
// the same query, and an un-stripped six-word comparison scores them as different.
const lead = (s) => norm(s).replace(/^(the|a|an) /, "").split(" ").slice(0, 5).join(" ");
const byLead = new Map();
for (const p of posts) (byLead.get(lead(p.title)) || byLead.set(lead(p.title), []).get(lead(p.title))).push(p.slug);
note(
  "posts whose titles open with the same five words",
  [...byLead].filter(([, v]) => v.length > 1).map(([l, v]) => `"${l}…"  → ${v.join(", ")}`)
);

console.log(
  problems.length
    ? `\n${problems.length} blocking condition(s): ${problems.join("; ")}`
    : "\nNo blocking conditions."
);
process.exit(problems.length ? 1 : 0);
