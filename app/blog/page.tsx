import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export const metadata: Metadata = {
  title: 'Northern Virginia Real Estate Blog | Market Updates & Neighborhood Guides',
  description:
    'Expert insights on the Arlington VA real estate market, neighborhood spotlights, buyer and seller guides from Candee Currie — TTR Sotheby\'s.',
  alternates: { canonical: '/blog' },
}

// Placeholder posts — will be replaced by Sanity data
const POSTS = [
  {
    id: 'p1',
    title: 'Arlington Real Estate Market Update: Q1 2026',
    slug: 'arlington-market-update-q1-2026',
    excerpt: 'Inventory remains tight while demand stays strong. Here\'s what buyers and sellers need to know heading into spring in Arlington and Northern Virginia.',
    mainImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80',
    publishedAt: '2026-03-01',
    categories: ['market-update'],
    readTime: 5,
  },
  {
    id: 'p2',
    title: 'Lyon Village vs. Ashton Heights: Which Arlington Neighborhood Is Right for You?',
    slug: 'lyon-village-vs-ashton-heights-arlington',
    excerpt: 'Two of Arlington\'s most coveted neighborhoods, side by side. We break down schools, walkability, price points, and vibe.',
    mainImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
    publishedAt: '2026-02-15',
    categories: ['neighborhood-spotlight'],
    readTime: 7,
  },
  {
    id: 'p3',
    title: '7 Things Every Arlington Home Seller Should Do Before Listing',
    slug: 'arlington-home-seller-checklist-2026',
    excerpt: 'From strategic pricing to professional staging — the moves that get you multiple offers in today\'s market.',
    mainImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    publishedAt: '2026-02-05',
    categories: ['sellers-guide'],
    readTime: 6,
  },
  {
    id: 'p4',
    title: 'Crystal City & National Landing: The Next Great Northern Virginia Neighborhood',
    slug: 'crystal-city-national-landing-amazon-hq2',
    excerpt: 'Amazon HQ2 is transforming Crystal City into one of the most dynamic neighborhoods in the DMV. Here\'s what\'s happening — and what it means for your home value.',
    mainImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    publishedAt: '2026-01-22',
    categories: ['neighborhood-spotlight'],
    readTime: 8,
  },
  {
    id: 'p5',
    title: 'First-Time Buyer\'s Guide to Northern Virginia: Everything You Need to Know',
    slug: 'first-time-buyers-guide-northern-virginia',
    excerpt: 'From pre-approval to closing day — a complete guide for first-time buyers navigating the competitive NoVA market.',
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    publishedAt: '2026-01-10',
    categories: ['buyers-guide'],
    readTime: 10,
  },
  {
    id: 'p6',
    title: 'McLean Real Estate: Why Luxury Buyers Keep Coming Back',
    slug: 'mclean-real-estate-luxury-market-2026',
    excerpt: 'McLean continues to command premium prices. Here\'s what drives the market and what luxury buyers are looking for in 2026.',
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    publishedAt: '2025-12-18',
    categories: ['neighborhood-spotlight'],
    readTime: 6,
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'neighborhood-spotlight': 'Neighborhood',
  'sellers-guide': 'Seller\'s Guide',
  'buyers-guide': 'Buyer\'s Guide',
  'home-tips': 'Home Tips',
}

const CATEGORY_COLORS: Record<string, string> = {
  'market-update': 'bg-blue-600',
  'neighborhood-spotlight': 'bg-gold',
  'sellers-guide': 'bg-navy',
  'buyers-guide': 'bg-green-600',
  'home-tips': 'bg-purple-600',
}

export default function BlogPage() {
  const featured = POSTS[0]
  const rest = POSTS.slice(1)

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-navy py-20">
        <div className="container-xl">
          <p className="section-label">Insights & Updates</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4">
            Real Estate <span className="text-gold">Blog</span>
          </h1>
          <div className="w-16 h-0.5 bg-gold mb-6" />
          <p className="text-white/70 text-lg max-w-xl">
            Market reports, neighborhood spotlights, and expert advice for buyers and sellers 
            throughout Northern Virginia.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-xl">
          {/* Featured post */}
          <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 card overflow-hidden mb-16">
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              <Image
                src={featured.mainImage}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className={`${CATEGORY_COLORS[featured.categories[0]] || 'bg-gold'} text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5`}>
                  {CATEGORY_LABELS[featured.categories[0]]}
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <span className="text-gold text-xs font-semibold tracking-wider uppercase mb-3">Featured</span>
              <h2 className="font-serif text-3xl text-navy font-bold leading-tight mb-4 group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-charcoal-muted leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-charcoal-muted text-sm">
                <time>{format(new Date(featured.publishedAt), 'MMMM d, yyyy')}</time>
                <span>·</span>
                <span>{featured.readTime} min read</span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group card overflow-hidden block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={post.mainImage}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`${CATEGORY_COLORS[post.categories[0]] || 'bg-gold'} text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1`}>
                      {CATEGORY_LABELS[post.categories[0]]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-charcoal-muted text-xs mb-3">
                    <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h3 className="font-serif text-navy text-xl font-semibold leading-snug mb-3 group-hover:text-gold transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-4 text-gold text-xs font-semibold flex items-center gap-1">
                    Read Article
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
