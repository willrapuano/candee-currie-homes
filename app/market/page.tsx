import type { Metadata } from 'next'
import Link from 'next/link'
import { getBreadcrumbSchema } from '@/lib/schema-org'
import { MarketHubClient } from '@/components/market/MarketHubClient'

export const metadata: Metadata = {
  title: 'Northern Virginia Real Estate Market Report | Arlington, McLean, Falls Church, Alexandria',
  description:
    'Live market data for Northern Virginia ZIP codes. Median sale prices, days on market, active listings, and % sold above list — updated weekly. Powered by Redfin Data Center.',
  alternates: { canonical: '/market' },
  openGraph: {
    title: 'NoVA Market Report | Candee Currie',
    description: 'What\'s happening in Arlington, McLean, Falls Church, and Alexandria real estate right now.',
  },
}

const MARKET_AREAS = [
  { name: 'Arlington', slug: 'arlington', zip: '22201', description: 'Arlington County — inside the Beltway, Metro access, competitive market' },
  { name: 'McLean', slug: 'mclean', zip: '22101', description: 'Fairfax County luxury — Langley HS, great estates, high price points' },
  { name: 'Falls Church', slug: 'falls-church', zip: '22042', description: 'Falls Church City — top-rated schools, walkable downtown, family market' },
  { name: 'Alexandria', slug: 'alexandria', zip: '22314', description: 'Old Town and Del Ray — historic charm, walkable, Metro Yellow/Blue' },
  { name: 'North Arlington', slug: 'arlington', zip: '22207', description: 'North Arlington — quiet streets, top schools, larger lots' },
  { name: 'Ballston / Clarendon', slug: 'clarendon', zip: '22201', description: 'Urban Arlington core — condos, walkability, Orange/Silver Line' },
]

export default function MarketPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'NoVA Market Report', url: '/market' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-20">
          <div className="container-xl text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Live Data · Updated Weekly</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4">
              Northern Virginia<br /><span className="text-gold">Market Report</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-white/70 text-xl max-w-2xl mx-auto">
              What&apos;s happening in Arlington, McLean, Falls Church, and Alexandria right now — not last quarter.
            </p>
          </div>
        </section>

        {/* Live market widgets */}
        <section className="section-padding bg-cream">
          <div className="container-xl">
            <MarketHubClient areas={MARKET_AREAS} />
          </div>
        </section>

        {/* What the numbers mean — Candee's interpretation */}
        <section className="section-padding bg-white">
          <div className="container-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="section-label">Candee&apos;s Read</p>
                <h2 className="font-serif text-3xl text-navy font-bold mb-4">
                  What This Data Means for You
                </h2>
                <div className="gold-divider" />
                <div className="space-y-4 text-charcoal-muted leading-relaxed mt-6">
                  <p>
                    Numbers tell you what happened. Candee tells you what it means for your specific situation — your ZIP code, your price point, your timeline.
                  </p>
                  <p>
                    When days on market drops below 10, you need to be pre-approved and ready to move in 48 hours. When it climbs above 20, you have negotiating room you didn&apos;t have six months ago.
                  </p>
                  <p>
                    The percent sold above list price is the single most useful number in this market. If it&apos;s above 100%, you&apos;re competing. If it&apos;s below, you&apos;re not — and most buyers don&apos;t know which market they&apos;re in until it&apos;s too late.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-cream border-l-4 border-gold p-6">
                  <h3 className="font-serif text-navy font-bold mb-2">Sellers</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">
                    Pricing 3% too high in a 12-day-DOM market means sitting 45+ days. Candee&apos;s CMA uses this data — and 14 years of neighborhood-level pattern recognition — to price correctly from day one.
                  </p>
                  <Link href="/home-value" className="text-gold text-sm font-semibold mt-3 inline-block hover:underline">
                    Get Your Free CMA →
                  </Link>
                </div>
                <div className="bg-cream border-l-4 border-gold p-6">
                  <h3 className="font-serif text-navy font-bold mb-2">Buyers</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">
                    Knowing the market before your first offer changes everything. Candee will walk you through current conditions for your target neighborhoods before you write a single dollar on a contract.
                  </p>
                  <Link href="/contact" className="text-gold text-sm font-semibold mt-3 inline-block hover:underline">
                    Schedule a Buyer Consultation →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-navy">
          <div className="container-lg text-center">
            <h2 className="font-serif text-3xl text-white font-bold mb-4">
              Want the Full Picture?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Candee sends a monthly market update to everyone in her network — hyperlocal data for your specific neighborhoods. No spam. Just numbers.
            </p>
            <Link href="/contact" className="btn-gold">
              Get Monthly Market Updates →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
