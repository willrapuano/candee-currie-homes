import Link from 'next/link'
import Image from 'next/image'
import { sanityClientNoCache } from '@/lib/sanity/client'
import { FEATURED_POSTS_QUERY } from '@/lib/sanity/queries'
import { formatPublishedDate } from '@/lib/dates'

interface BlogPostCard {
  _id: string
  title: string
  slug: string
  excerpt?: string
  mainImage?: { asset?: { url?: string } }
  publishedAt?: string
  categories?: string[]
  readTime?: number | string
}

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'neighborhood-spotlight': 'Neighborhood',
  'sellers-guide': 'Seller\'s Guide',
  'buyers-guide': 'Buyer\'s Guide',
  'home-tips': 'Home Tips',
}

function formatReadTime(readTime: BlogPostCard['readTime']) {
  if (typeof readTime === 'number') return `${readTime} min read`
  if (!readTime) return ''

  const value = String(readTime).trim()
  return /^\d+$/.test(value) ? `${value} min read` : value
}

function safeFormatDate(publishedAt?: string) {
  return formatPublishedDate(publishedAt, 'MMM d, yyyy')
}

async function getLatestPosts(): Promise<BlogPostCard[]> {
  try {
    const posts = await sanityClientNoCache.fetch<BlogPostCard[]>(FEATURED_POSTS_QUERY)
    return (posts || []).filter((post) => post.slug && post.title)
  } catch (error) {
    console.error('[home/blog] Failed to fetch published posts from Sanity', error)
    return []
  }
}

function PostImageFallback({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 px-6">
      <span className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gold-300">
        {title.split(':')[0] || 'Candee Currie'}
      </span>
    </div>
  )
}

export async function BlogSection() {
  const posts = await getLatestPosts()

  return (
    <section className="section-padding bg-cream">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label">Insights &amp; Updates</p>
            <h2 className="section-title">Recently from Our Blog</h2>
            <div className="gold-divider" />
            <p className="section-subtitle max-w-lg">
              Market reports, neighborhood guides, and expert advice for Northern Virginia buyers and sellers.
            </p>
          </div>
          <Link href="/blog" className="btn-navy self-start md:self-auto whitespace-nowrap">
            All Articles
          </Link>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => {
              const imageUrl = post.mainImage?.asset?.url
              const formattedDate = safeFormatDate(post.publishedAt)
              const formattedReadTime = formatReadTime(post.readTime)

              return (
                <Link key={post._id} href={`/blog/${post.slug}`} className="card group block overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <PostImageFallback title={post.title} />
                    )}
                    {/* Category badge */}
                    {post.categories?.[0] && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-gold text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
                          {CATEGORY_LABELS[post.categories[0]] || post.categories[0]}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-charcoal-muted text-xs mb-3">
                      {formattedDate && <time dateTime={post.publishedAt}>{formattedDate}</time>}
                      {formattedDate && formattedReadTime && <span aria-hidden="true">·</span>}
                      {formattedReadTime && <span>{formattedReadTime}</span>}
                    </div>
                    <h3 className="font-serif text-navy font-semibold leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-charcoal-muted text-sm leading-relaxed line-clamp-3">
                      {post.excerpt || 'Read Candee Currie’s latest Northern Virginia real estate insight.'}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-gold text-xs font-semibold tracking-wide">
                      Read More
                      <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="border border-gray-200 bg-white p-8 text-center">
            <p className="text-charcoal-muted">
              Candee’s latest articles are temporarily unavailable. Please check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
