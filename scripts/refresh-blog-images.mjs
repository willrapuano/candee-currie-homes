import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { createReadStream, existsSync } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const siteRoot = path.resolve(here, '..')

for (const filename of ['.env.local', '.env.production.local']) {
  const envPath = path.join(siteRoot, filename)
  if (existsSync(envPath)) dotenv.config({ path: envPath, override: false, quiet: true })
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  throw new Error('Sanity project, dataset, and write token are required')
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-02-19',
  useCdn: false,
})

const imageRoot = path.join(siteRoot, 'blog-queue', 'images', 'geographic-refresh-20260730')
const receiptRoot = '/Users/jarvis/receipts/candee/blog-image-refresh-20260730'
const apply = process.argv.includes('--apply')

const replacements = {
  'seller-closing-costs-virginia': {
    file: 'seller-closing-costs-virginia.webp',
    alt: 'Virginia home seller closing documents, keys, and calculator with a brick Colonial home beyond',
    provenance: 'OpenAI-generated representative Northern Virginia editorial image',
  },
  'selling-home-bellevue-forest-arlington-va': {
    file: 'selling-home-bellevue-forest-arlington-va.webp',
    alt: 'Representative tree-lined residential street with brick homes in North Arlington',
    provenance: 'OpenAI-generated representative Bellevue Forest editorial image',
  },
  'living-in-east-falls-church-arlington-va': {
    file: 'living-in-east-falls-church-arlington-va.webp',
    alt: 'Representative leafy East Falls Church streetscape with Arlington homes and nearby rail access',
    provenance: 'OpenAI-generated representative East Falls Church editorial image',
  },
  'living-in-lewinsville-mclean-va': {
    file: 'living-in-lewinsville-mclean-va.webp',
    alt: 'Representative wooded residential street with brick Colonial homes in the Lewinsville area of McLean',
    provenance: 'OpenAI-generated representative Lewinsville editorial image',
  },
  'luxury-home-market-mclean-north-arlington-2026': {
    file: 'luxury-home-market-mclean-north-arlington-2026.webp',
    alt: 'Representative luxury stone-and-brick home on a wooded Northern Virginia lot',
    provenance: 'OpenAI-generated representative McLean and North Arlington editorial image',
  },
  'first-time-home-buyer-northern-virginia': {
    file: 'first-time-home-buyer-northern-virginia.webp',
    alt: 'Representative first-time buyers receiving keys at a Northern Virginia townhouse',
    provenance: 'OpenAI-generated representative Northern Virginia first-time buyer image',
  },
  'falls-church-va-homes-for-sale': {
    file: 'falls-church-va-homes-for-sale.webp',
    alt: 'Broad Street residential and mixed-use streetscape in Falls Church, Virginia',
    provenance: 'Wikimedia Commons Falls Church photograph, locally pinned and optimized',
  },
  'best-neighborhoods-arlington-va-families': {
    file: 'best-neighborhoods-arlington-va-families.webp',
    alt: 'Historic bungalow and garden in Cherrydale, one of Arlington’s established neighborhoods',
    provenance: 'Wikimedia Commons Cherrydale photograph, locally pinned and optimized',
  },
  'what-does-1-million-buy-in-northern-virginia-2026': {
    file: 'what-does-1-million-buy-in-northern-virginia-2026.webp',
    alt: 'Representative brick-and-siding single-family home in an established Northern Virginia neighborhood',
    provenance: 'OpenAI-generated representative Northern Virginia editorial image',
  },
  'great-falls-vs-mclean-luxury-neighborhood-guide': {
    file: 'great-falls-vs-mclean-luxury-neighborhood-guide.webp',
    alt: 'Representative wooded luxury homes reflecting Great Falls and McLean residential character',
    provenance: 'OpenAI-generated representative Great Falls and McLean editorial image',
  },
  'shirlington-arlington-va-neighborhood-guide': {
    file: 'shirlington-arlington-va-neighborhood-guide.webp',
    alt: 'Representative pedestrian-friendly brick streetscape with outdoor dining in Shirlington',
    provenance: 'OpenAI-generated representative Shirlington editorial image',
  },
  'arlington-va-neighborhoods-a-local-s-guide-to-every-part-of-the-city': {
    file: 'arlington-va-neighborhoods-a-local-s-guide-to-every-part-of-the-city.webp',
    alt: 'Aerial view of Arlington neighborhoods and the Rosslyn-Ballston corridor',
    provenance: 'Wikimedia Commons Arlington photograph, locally pinned and optimized',
  },
  'living-in-rosslyn-va': {
    file: 'living-in-rosslyn-va.webp',
    alt: 'Rosslyn skyline viewed across the Potomac River in Arlington, Virginia',
    provenance: 'Wikimedia Commons Rosslyn photograph, locally pinned and optimized',
  },
  'when-is-the-best-time-to-sell-a-home-in-northern-virginia-': {
    file: 'when-is-the-best-time-to-sell-a-home-in-northern-virginia-.webp',
    alt: 'Representative Northern Virginia brick home entering the early spring selling season',
    provenance: 'OpenAI-generated representative Northern Virginia seasonal selling image',
  },
  'moving-to-arlington-va': {
    file: 'moving-to-arlington-va.webp',
    alt: 'Representative newcomers moving into an Arlington townhouse near the urban corridor',
    provenance: 'OpenAI-generated representative Arlington relocation image',
  },
  'relocating-to-northern-virginia-guide': {
    file: 'relocating-to-northern-virginia-guide.webp',
    alt: 'Representative move into a brick Northern Virginia home near transit and the Rosslyn skyline',
    provenance: 'OpenAI-generated representative Northern Virginia relocation image',
  },
  'living-in-arlington-va': {
    file: 'living-in-arlington-va.webp',
    alt: 'Established home in Ashton Heights, representing residential life in Arlington, Virginia',
    provenance: 'Locally sourced and optimized Ashton Heights neighborhood photograph',
  },
  'northern-virginia-real-estate-market-spring-2026': {
    file: 'northern-virginia-real-estate-market-spring-2026.webp',
    alt: 'Northern Virginia homes and Arlington skyline with an abstract housing market trend overlay',
    provenance: 'OpenAI-generated representative Northern Virginia market editorial image',
  },
  'ballston-arlington-va-neighborhood-guide': {
    file: 'ballston-arlington-va-neighborhood-guide.webp',
    alt: 'Urban streetscape and mixed-use buildings in Ballston, Arlington, Virginia',
    provenance: 'Wikimedia Commons Ballston photograph, locally pinned and optimized',
  },
  'closing-costs-selling-home-northern-virginia': {
    file: 'closing-costs-selling-home-northern-virginia.webp',
    alt: 'Representative Northern Virginia seller reviewing closing documents, costs, and keys',
    provenance: 'OpenAI-generated representative Northern Virginia seller closing image',
  },
}

const existingAlts = {
  'arlington-home-pricing-strategy': 'House keys and a sold sign representing an Arlington home pricing strategy',
  'lyon-village-arlington-va-neighborhood-guide': 'Historic Colonial Revival home in Lyon Village, Arlington, Virginia',
  'old-town-alexandria-va-neighborhood-guide': 'Waterfront and historic district in Old Town Alexandria, Virginia',
}

const query = `*[_type=="post"]|order(publishedAt desc){
  _id,_rev,title,"slug":slug.current,publishedAt,
  mainImage{
    alt,
    "assetRef":asset._ref,
    "assetUrl":asset->url,
    "assetOriginalFilename":asset->originalFilename
  }
}`

await mkdir(receiptRoot, { recursive: true })
const before = await client.fetch(query)
await writeFile(path.join(receiptRoot, 'before-documents.json'), JSON.stringify(before, null, 2))

for (const [slug, item] of Object.entries(replacements)) {
  const imagePath = path.join(imageRoot, item.file)
  if (!existsSync(imagePath)) throw new Error(`Missing replacement asset: ${imagePath}`)
  if (!before.some((post) => post.slug === slug)) throw new Error(`No Sanity post found for ${slug}`)
}

if (!apply) {
  console.log(`Dry run passed: ${before.length} posts, ${Object.keys(replacements).length} replacements ready`)
  console.log('Run with --apply to upload and patch production.')
  process.exit(0)
}

for (const [slug, item] of Object.entries(replacements)) {
  const imagePath = path.join(imageRoot, item.file)
  const post = before.find((candidate) => candidate.slug === slug)

  if (post.mainImage?.assetOriginalFilename === item.file) {
    await client.patch(post._id).set({ 'mainImage.alt': item.alt }).commit()
    console.log(`Already current: ${slug}`)
  } else {
    const asset = await client.assets.upload('image', createReadStream(imagePath), {
      filename: item.file,
      title: item.alt,
    })

    await client
      .patch(post._id)
      .set({
        mainImage: {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
          alt: item.alt,
        },
      })
      .commit()

    console.log(`Patched image: ${slug}`)
  }
}

for (const [slug, alt] of Object.entries(existingAlts)) {
  const post = before.find((candidate) => candidate.slug === slug)
  if (!post?.mainImage?.assetRef) throw new Error(`Cannot set alt without an existing image: ${slug}`)
  await client.patch(post._id).set({ 'mainImage.alt': alt }).commit()
}

const after = await client.fetch(query)
const missingImage = after.filter((post) => !post.mainImage?.assetRef)
const missingAlt = after.filter((post) => !post.mainImage?.alt?.trim())
const refs = after.map((post) => post.mainImage?.assetRef).filter(Boolean)
const duplicateRefs = refs.filter((ref, index) => refs.indexOf(ref) !== index)

const report = {
  completedAt: new Date().toISOString(),
  projectId,
  dataset,
  totalPosts: after.length,
  replacementCount: Object.keys(replacements).length,
  missingImageSlugs: missingImage.map((post) => post.slug),
  missingAltSlugs: missingAlt.map((post) => post.slug),
  duplicateAssetRefs: [...new Set(duplicateRefs)],
  replacements,
  posts: after,
}

await writeFile(path.join(receiptRoot, 'after-audit.json'), JSON.stringify(report, null, 2))

if (missingImage.length || missingAlt.length || duplicateRefs.length) {
  throw new Error(
    `Audit failed: ${missingImage.length} missing images, ${missingAlt.length} missing alts, ${duplicateRefs.length} duplicate refs`,
  )
}

console.log(`Audit passed: ${after.length}/${after.length} posts have unique images and alt text`)
