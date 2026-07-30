import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          // No trailing slash. "Disallow: /studio/" only covers paths *below*
          // /studio/ — the Studio's own entry point at /studio was left crawlable,
          // and it serves 200 on the public marketing domain. Dropping the slash
          // covers /studio and everything under it.
          '/studio',
          '/_next/',
          '/admin/',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
