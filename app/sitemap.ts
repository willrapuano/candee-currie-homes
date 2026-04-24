import type { MetadataRoute } from 'next'
import { sanityClientNoCache } from '@/lib/sanity/client'
import { POST_SLUGS_QUERY, SELLER_GUIDE_SLUGS_QUERY, NEIGHBORHOOD_SLUGS_QUERY } from '@/lib/sanity/queries'
import { NEIGHBORHOODS } from '@/data/neighborhoods'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  // Fetch dynamic content from Sanity
  let blogSlugs: { slug: string }[] = []
  let guideSlugs: { slug: string }[] = []
  let sanityNeighborhoods: { slug: string }[] = []

  try {
    blogSlugs = await sanityClientNoCache.fetch(POST_SLUGS_QUERY)
  } catch {
    // Fallback: empty if Sanity is unavailable
    console.error('[sitemap] Failed to fetch blog slugs from Sanity')
  }

  try {
    guideSlugs = await sanityClientNoCache.fetch(SELLER_GUIDE_SLUGS_QUERY)
  } catch {
    console.error('[sitemap] Failed to fetch seller guide slugs from Sanity')
  }

  try {
    sanityNeighborhoods = await sanityClientNoCache.fetch(NEIGHBORHOOD_SLUGS_QUERY)
  } catch {
    console.error('[sitemap] Failed to fetch neighborhood slugs from Sanity')
  }

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/neighborhoods`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/sell`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/sellers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/buyers`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/home-value`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/market`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/homes-for-sale`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/privacy-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Neighborhood pages — prefer Sanity data, fallback to static NEIGHBORHOODS
  const neighborhoodSources = sanityNeighborhoods.length > 0
    ? sanityNeighborhoods.map((n) => n.slug)
    : NEIGHBORHOODS.map((n) => n.slug)

  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoodSources.map((slug) => ({
    url: `${SITE_URL}/neighborhoods/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Blog pages from Sanity
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Seller guide pages from Sanity
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((guide) => ({
    url: `${SITE_URL}/sell/${guide.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))

  return [...staticPages, ...neighborhoodPages, ...blogPages, ...guidePages]
}
