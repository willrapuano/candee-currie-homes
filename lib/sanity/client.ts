import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ej27mt39',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true, // CDN for public reads
  token: process.env.SANITY_API_TOKEN, // only needed for mutations
})

// For server-side fetches (ISR, SSR) — bypass CDN for fresh data
export const sanityClientNoCache = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ej27mt39',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper for responsive image URLs
export function urlForWithSize(source: SanityImageSource, width: number, height?: number) {
  let b = builder.image(source).width(width).auto('format').quality(85)
  if (height) b = b.height(height)
  return b.url()
}
