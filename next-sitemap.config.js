/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com',
  generateRobotsTxt: false, // We use app/robots.ts
  generateIndexSitemap: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  exclude: [
    '/studio',
    '/studio/*',
    '/api/*',
    '/admin/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/', '/_next/', '/admin/'],
      },
    ],
  },
  transform: async (config, path) => {
    // Custom priorities
    const priorities = {
      '/': 1.0,
      '/homes-for-sale': 0.9,
      '/neighborhoods': 0.9,
      '/about': 0.8,
      '/sellers': 0.8,
      '/buyers': 0.8,
      '/home-value': 0.8,
      '/blog': 0.8,
      '/contact': 0.7,
    }

    const changefreqs = {
      '/': 'daily',
      '/homes-for-sale': 'hourly',
      '/neighborhoods': 'weekly',
    }

    return {
      loc: path,
      changefreq: changefreqs[path] || config.changefreq,
      priority: priorities[path] || (path.startsWith('/neighborhoods/') ? 0.85 : config.priority),
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
