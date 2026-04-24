import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'
import { sanityClientNoCache } from '@/lib/sanity/client'
import { ALL_POSTS_QUERY } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Northern Virginia Real Estate Blog | Market Updates & Neighborhood Guides',
  description:
    'Expert insights on the Arlington VA real estate market, neighborhood spotlights, buyer and seller guides from Candee Currie — TTR Sotheby\'s.',
  alternates: { canonical: '/blog' },
}

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'neighborhood-spotlight': 'Neighborhood Spotlight',
  'sellers-guide': "Seller's Guide",
  'buyers-guide': "Buyer's Guide",
  'home-tips': 'Home Tips',
}

const CATEGORY_COLORS: Record<string, string> = {
  'market-update': 'bg-blue-600',
  'neighborhood-spotlight': 'bg-gold',
  'sellers-guide': 'bg-navy',
  'buyers-guide': 'bg-green-600',
  'home-tips': 'bg-purple-600',
}

function safeFormat(dateStr: string | undefined): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return format(d, 'MMMM d, yyyy')
  } catch {
    return ''
  }
}

function safeFormatShort(dateStr: string | undefined): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (isNaN(d.getTime())) return ''
    return format(d, 'MMM d, yyyy')
  } catch {
    return ''
  }
}

function getImageUrl(post: any): string {
  return post.mainImage?.asset?.url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&q=80'
}

function getCategory(post: any): string {
  return post.categories?.[0] || 'market-update'
}

async function getPosts() {
  try {
    const posts = await sanityClientNoCache.fetch(ALL_POSTS_QUERY)
    return posts || []
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  if (posts.length === 0) {
    return (
      <div className="pt-20">
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
            <p className="text-charcoal-muted">Articles coming soon...</p>
          </div>
        </section>
      </div>
    )
  }

  const featured = posts[0]
  const rest = posts.slice(1)

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
          <Link href={`/blog/${featured.slug.current}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-8 card overflow-hidden mb-16">
            <div className="relative aspect-video lg:aspect-auto lg:min-h-[400px] overflow-hidden">
              <Image
                src={getImageUrl(featured)}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4">
                <span className={`${CATEGORY_COLORS[getCategory(featured)] || 'bg-gold'} text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5`}>
                  {CATEGORY_LABELS[getCategory(featured)]}
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
                <time>{safeFormat(featured.publishedAt)}</time>
                {featured.readTime && (
                  <>
                    <span>·</span>
                    <span>{featured.readTime} min read</span>
                  </>
                )}
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post: any) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group card overflow-hidden block">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={getImageUrl(post)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`${CATEGORY_COLORS[getCategory(post)] || 'bg-gold'} text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1`}>
                      {CATEGORY_LABELS[getCategory(post)]}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-charcoal-muted text-xs mb-3">
                    <time>{safeFormatShort(post.publishedAt)}</time>
                    {post.readTime && (
                      <>
                        <span>·</span>
                        <span>{post.readTime} min read</span>
                      </>
                    )}
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
