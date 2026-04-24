import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ej27mt39',
  dataset: 'production',
  token: 'sktduwqwKdJnL5n5pE2nyPs9DqBocM7DfANFPaymKdyaOFuN1Lo9YGmRKnRJHiz7lZKcSDL2XQcMAs3Wgau8i7fmbOsHlfRGHReSsFnarWk9bV5m7uCMctippLqfjQA2W4WeWw0lar7qA8TWn87Jw6nG3lsYoTeoMVJ6vZedNRXsT0LqfHD2',
  useCdn: false,
  apiVersion: '2024-01-01',
})

const SLUG = 'great-falls-vs-mclean-luxury-neighborhood-guide'

// Fetch the post
const post = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug: SLUG })
console.log('Found:', post._id, post.title)

// Deep clone body to mutate
const body = JSON.parse(JSON.stringify(post.body || []))
let patched = false

for (const block of body) {
  if (!block.children || !Array.isArray(block.children)) continue
  for (const child of block.children) {
    if (!child || typeof child.text !== 'string' || !child.text.includes('(link)')) continue
    
    // Replace dead (link) with real internal links
    child.text = child.text
      .replace('[Browse current Great Falls and McLean listings](link)', 'Browse current Great Falls and McLean listings → /home-value')
      .replace('[connect with Candee](link)', 'connect with Candee → /contact')
    
    console.log('Fixed:', child.text)
    patched = true
  }
}

if (!patched) {
  console.log('No (link) placeholders found — skipping')
  process.exit(0)
}

await client.patch(post._id).set({ body }).commit()
console.log('✅ Patched great-falls post')
