import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ej27mt39',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN
})

const guides = await client.fetch(`*[_type == "sellerGuide"] { title, slug, priority, category }`)
console.log('Seller Guides:', JSON.stringify(guides, null, 2))
