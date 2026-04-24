import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format, isValid } from 'date-fns'

/** Safe date formatter — returns empty string for invalid dates like "TBDT..." */
function safeFormat(dateStr: string | undefined): string {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    if (!isValid(d)) return ''
    return format(d, 'MMMM d, yyyy')
  } catch {
    return ''
  }
}
import { sanityClientNoCache } from '@/lib/sanity/client'
import { POST_QUERY, POST_SLUGS_QUERY, ALL_POSTS_QUERY, FEATURED_POSTS_QUERY } from '@/lib/sanity/queries'
import { getBlogPostSchema, getBreadcrumbSchema } from '@/lib/schema-org'
import { ContentBlocks } from '@/components/blocks/ContentBlocks'

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

interface Props {
  params: { slug: string }
}

// Generate static params from Sanity
export async function generateStaticParams() {
  try {
    const slugs = await sanityClientNoCache.fetch(POST_SLUGS_QUERY)
    return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
  } catch {
    // Fallback to empty array - will 404 for any non-pre-rendered slug
    return []
  }
}

// Generate metadata from Sanity
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = await sanityClientNoCache.fetch(POST_QUERY, { slug: params.slug })
    if (!post) {
      return { title: 'Post Not Found | Candee Currie' }
    }

    const title = post.metaTitle || post.title
    const description = post.metaDescription || post.excerpt

    return {
      title,
      description,
      alternates: { canonical: `/blog/${post.slug.current}` },
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.publishedAt,
        authors: ['Candee Currie'],
        images: post.mainImage ? [{ url: post.mainImage.asset.url }] : [],
      },
    }
  } catch {
    return { title: 'Error | Candee Currie' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  let post
  try {
    post = await sanityClientNoCache.fetch(POST_QUERY, { slug: params.slug })
  } catch {
    console.error('[blog] Failed to fetch post from Sanity')
  }

  if (!post) {
    notFound()
  }

  // Get main image URL
  const mainImageUrl = post.mainImage?.asset?.url || 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=80'
  const category = post.categories?.[0] || 'market-update'

  // Build schema
  const schemaOrg = getBlogPostSchema({
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt || '',
    publishedAt: post.publishedAt,
    mainImageUrl,
  })

  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug.current}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[360px]">
          <Image
            src={mainImageUrl}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-xl pb-12">
              <nav className="flex items-center gap-2 text-white/50 text-xs mb-4">
                <Link href="/" className="hover:text-gold">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-gold">Blog</Link>
                <span>/</span>
                <span className="text-white">{CATEGORY_LABELS[category]}</span>
              </nav>
              <div className="mb-3">
                <span className={`${CATEGORY_COLORS[category] || 'bg-gold'} text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5`}>
                  {CATEGORY_LABELS[category] || category}
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl text-white font-bold max-w-3xl leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article */}
        <section className="section-padding bg-white">
          <div className="container-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content */}
              <article className="lg:col-span-2">
                {/* Meta */}
                <div className="flex items-center gap-4 text-charcoal-muted text-sm mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">
                      CC
                    </div>
                    <span className="font-medium text-navy">Candee Currie</span>
                  </div>
                  <span>·</span>
                  <time>{safeFormat(post.publishedAt) || 'No date set'}</time>
                  {post.readTime && (
                    <>
                      <span>·</span>
                      <span>{post.readTime} min read</span>
                    </>
                  )}
                </div>

                {/* Body - use ContentBlocks for PortableText */}
                {post.body && (
                  <ContentBlocks content={post.body} />
                )}

                {/* Fallback if no body */}
                {!post.body && (
                  <p className="text-charcoal-muted">Content coming soon...</p>
                )}

                {/* CTA */}
                <div className="mt-12 bg-navy p-8">
                  <h3 className="font-serif text-2xl text-white font-bold mb-2">
                    Questions About the Market?
                  </h3>
                  <p className="text-white/70 text-sm mb-5">
                    Candee&apos;s been selling in Northern Virginia for 14+ years. Get personalized advice.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-gold">Contact Candee</Link>
                    <Link href="/home-value" className="btn-outline-white">Free Home Value</Link>
                  </div>
                </div>

                {/* Equal Housing Opportunity */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">🏠</span>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    We are pledged to the letter and spirit of U.S. policy for the achievement of{' '}
                    equal housing opportunity throughout the nation.{' '}
                    <span className="font-semibold">Equal Housing Opportunity.</span>
                  </p>
                </div>
              </article>

              {/* Sidebar */}
              <aside>
                <div className="bg-cream p-6 mb-6">
                  <h3 className="font-serif text-navy text-lg font-bold mb-4">About Candee</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed mb-4">
                    Candee Currie is an Associate Broker at TTR Sotheby&apos;s International Realty{' '}
                    specializing in Arlington and Northern Virginia real estate.
                  </p>
                  <Link href="/about" className="btn-navy w-full text-center block text-sm">
                    Learn More
                  </Link>
                </div>

                <div className="bg-navy p-6">
                  <h3 className="font-serif text-white text-lg font-bold mb-3">
                    What&apos;s Your Home Worth?
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Get a free Comparative Market Analysis from Candee.
                  </p>
                  <Link href="/home-value" className="btn-gold w-full text-center block">
                    Get Free CMA
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}