import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ej27mt39',
  dataset: 'production',
  token: 'sktduwqwKdJnL5n5pE2nyPs9DqBocM7DfANFPaymKdyaOFuN1Lo9YGmRKnRJHiz7lZKcSDL2XQcMAs3Wgau8i7fmbOsHlfRGHReSsFnarWk9bV5m7uCMctippLqfjQA2W4WeWw0lar7qA8TWn87Jw6nG3lsYoTeoMVJ6vZedNRXsT0LqfHD2',
  useCdn: false,
  apiVersion: '2024-01-01',
})

// Fix the ugly "Browse listings → /home-value" back to proper markdown link
const SLUG = 'great-falls-vs-mclean-luxury-neighborhood-guide'
const post = await client.fetch('*[_type == "post" && slug.current == $slug][0]', { slug: SLUG })
const lines = post.body || []
let patched = false

for (const block of lines) {
  const children = block.children
  if (!children || !Array.isArray(children)) continue
  for (const child of children) {
    if (!child || typeof child.text !== 'string') continue
    const orig = child.text
    // Fix ugly text back to proper markdown
    child.text = child.text
      .replace('Browse current Great Falls and McLean listings → /home-value', '[Browse current Great Falls and McLean listings](/home-value)')
      .replace('connect with Candee → /contact', '[connect with Candee](/contact)')
    if (orig !== child.text) {
      console.log(`Fixed: "${orig.slice(0,80)}..."`)
      patched = true
    }
  }
}

if (!patched) {
  console.log('Nothing to fix')
  process.exit(0)
}

await client.patch(post._id).set({ body: lines }).commit()
console.log('✅ Patched')
