import type { MetadataRoute } from 'next'
import { NEIGHBORHOODS } from '@/data/neighborhoods'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

// Placeholder blog slugs — will be driven by Sanity in production
const BLOG_SLUGS = [
  'arlington-market-update-q1-2026',
  'lyon-village-vs-ashton-heights-arlington',
  'arlington-home-seller-checklist-2026',
  'crystal-city-national-landing-amazon-hq2',
  'first-time-buyers-guide-northern-virginia',
  'mclean-real-estate-luxury-market-2026',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/neighborhoods`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sellers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/buyers`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/home-value`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Neighborhood pages — high SEO priority
  const neighborhoodPages: MetadataRoute.Sitemap = NEIGHBORHOODS.map((n) => ({
    url: `${SITE_URL}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // Blog pages
  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: `${SITE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...neighborhoodPages, ...blogPages]
}
