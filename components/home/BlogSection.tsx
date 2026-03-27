import Link from 'next/link'
import Image from 'next/image'
import { format } from 'date-fns'

// Placeholder blog posts — will be replaced by Sanity data
const PLACEHOLDER_POSTS = [
  {
    id: 'p1',
    title: 'Arlington Real Estate Market Update: Q1 2026',
    slug: 'arlington-market-update-q1-2026',
    excerpt: 'Inventory remains tight while demand stays strong. Here\'s what buyers and sellers need to know heading into spring.',
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
    excerpt: 'Amazon HQ2 is transforming Crystal City into one of the most dynamic neighborhoods in the DMV. Here\'s what\'s happening.',
    mainImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    publishedAt: '2026-01-22',
    categories: ['neighborhood-spotlight'],
    readTime: 8,
  },
]

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'neighborhood-spotlight': 'Neighborhood',
  'sellers-guide': 'Seller\'s Guide',
  'buyers-guide': 'Buyer\'s Guide',
  'home-tips': 'Home Tips',
}

export function BlogSection() {
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLACEHOLDER_POSTS.map((post, idx) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="card group block overflow-hidden">
              {/* Image */}
              <div className={`relative overflow-hidden ${idx === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`}>
                <Image
                  src={post.mainImage}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Category badge */}
                {post.categories[0] && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-gold text-navy text-[10px] font-bold tracking-wider uppercase px-2.5 py-1">
                      {CATEGORY_LABELS[post.categories[0]] || post.categories[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 text-charcoal-muted text-xs mb-3">
                  <time>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</time>
                  {post.readTime && (
                    <>
                      <span>·</span>
                      <span>{post.readTime} min read</span>
                    </>
                  )}
                </div>
                <h3 className="font-serif text-navy font-semibold leading-snug mb-2 group-hover:text-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-charcoal-muted text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-1 text-gold text-xs font-semibold tracking-wide">
                  Read More
                  <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
