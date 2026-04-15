import type { Metadata } from 'next'
import Link from 'next/link'
import { sanityClient } from '@/lib/sanity/client'
import { ALL_SELLER_GUIDES_QUERY } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Seller Hub | How to Sell Your Home in Northern Virginia | Candee Currie',
  description:
    "Expert seller guides for Arlington, McLean, Falls Church & Alexandria. 218 seller-side transactions. Learn how to price, prep, and sell your home for maximum value.",
  alternates: { canonical: '/sell' },
}

// Icon mapping for seller guides
const iconMap: Record<string, string> = {
  'life-stage': '🏠',
  'process': '📋',
  'financial': '💰',
  'luxury': '✨',
  'estate': '📜',
}

// Priority badge colors
const priorityStyles: Record<string, string> = {
  'P0': 'bg-gold text-navy',
  'P1': 'bg-navy text-white',
  'P2': 'bg-gray-200 text-charcoal',
}

export default async function SellerHubPage() {
  const guides = await sanityClient.fetch(ALL_SELLER_GUIDES_QUERY)

  // Group guides by category
  const guidesByCategory = guides.reduce((acc: any, guide: any) => {
    const category = guide.category || 'other'
    if (!acc[category]) acc[category] = []
    acc[category].push(guide)
    return acc
  }, {})

  const categoryOrder = ['life-stage', 'process', 'financial', 'luxury', 'estate', 'other']
  const categoryLabels: Record<string, string> = {
    'life-stage': 'Life Stage Moves',
    'process': 'Selling Process',
    'financial': 'Financial Guide',
    'luxury': 'Luxury & Premium',
    'estate': 'Estate & Probate',
    'other': 'Other Resources',
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-navy">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <nav className="mb-6">
              <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
                <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                <li>/</li>
                <li className="text-gold">Seller Hub</li>
              </ol>
            </nav>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
              Seller Hub
            </h1>
            <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto mb-8">
              Everything you need to sell your home in Northern Virginia. 
              Expert guidance from a listing specialist with 218 seller-side transactions.
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 text-center">
              <div>
                <p className="font-serif text-3xl text-gold font-bold">218</p>
                <p className="text-white/60 text-sm">Seller Transactions</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="font-serif text-3xl text-gold font-bold">101%+</p>
                <p className="text-white/60 text-sm">Avg. Sale-to-List</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="font-serif text-3xl text-gold font-bold">12</p>
                <p className="text-white/60 text-sm">Avg. Days on Market</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          {guides.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-charcoal-muted text-lg">
                Seller guides coming soon. Check back for expert selling advice.
              </p>
            </div>
          ) : (
            <div className="space-y-16">
              {categoryOrder.map((category) => {
                const categoryGuides = guidesByCategory[category]
                if (!categoryGuides || categoryGuides.length === 0) return null

                return (
                  <div key={category}>
                    <h2 className="font-serif text-2xl md:text-3xl text-navy font-bold mb-2">
                      {iconMap[category] || '📚'} {categoryLabels[category]}
                    </h2>
                    <div className="w-16 h-0.5 bg-gold mb-8" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryGuides.map((guide: any) => (
                        <Link
                          key={guide._id}
                          href={`/sell/${guide.slug.current}`}
                          className="group block bg-cream p-6 hover:shadow-card-hover transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <span className="text-3xl">{iconMap[category] || '📖'}</span>
                            {guide.priority && (
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${priorityStyles[guide.priority]}`}>
                                {guide.priority}
                              </span>
                            )}
                          </div>

                          <h3 className="font-serif text-xl text-navy font-semibold mb-3 group-hover:text-gold transition-colors">
                            {guide.title}
                          </h3>

                          {guide.shortDescription && (
                            <p className="text-charcoal-muted text-sm leading-relaxed mb-4 line-clamp-3">
                              {guide.shortDescription}
                            </p>
                          )}

                          <div className="flex items-center text-gold text-sm font-medium">
                            Read Guide
                            <svg
                              className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                              />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-navy">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
              Ready to Sell Your Home?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Get a personalized home valuation and selling strategy from Candee. 
              No obligation — just real data and honest advice.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/home-value" className="btn-gold">
                Get Your Free Valuation
              </Link>
              <Link href="/contact" className="btn-outline-white">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
