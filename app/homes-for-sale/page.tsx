import type { Metadata } from 'next'
import Link from 'next/link'
import { getBreadcrumbSchema } from '@/lib/schema-org'

export const metadata: Metadata = {
  title: 'Homes for Sale in Northern Virginia | Candee Currie | TTR Sotheby\'s',
  description:
    'Search homes for sale in Arlington, McLean, Falls Church, Alexandria and surrounding Northern Virginia communities with Candee Currie — TTR Sotheby\'s Associate Broker.',
  alternates: { canonical: '/homes-for-sale' },
}

export default function HomesForSalePage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Homes for Sale', url: '/homes-for-sale' },
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
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">Northern Virginia Real Estate</span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4">
              Find Your Home in NoVA
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-white/70 text-xl max-w-2xl mx-auto leading-relaxed mb-10">
              Browse homes in Arlington, McLean, Falls Church, Alexandria, and surrounding communities,
              then connect with Candee for tailored guidance and private showing strategy.
            </p>
            <a
              href="https://www.ttrsir.com/agents/candee-currie"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base px-10 py-4 inline-block"
            >
              Search All Listings →
            </a>
            <p className="text-white/40 text-xs mt-4">
              Opens on TTR Sotheby&apos;s — full MLS access, Candee&apos;s listings first.
            </p>
          </div>
        </section>

        {/* Why search with Candee */}
        <section className="section-padding bg-cream">
          <div className="container-lg">
            <div className="text-center mb-12">
              <p className="section-label">The Candee Advantage</p>
              <h2 className="section-title">Why Search With a Sotheby&apos;s Agent?</h2>
              <div className="gold-divider-center" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Off-Market Access',
                  body: "Candee's network surfaces listings before they hit Zillow. In competitive markets, that timing is everything.",
                },
                {
                  title: 'No Algorithm. Real Expertise.',
                  body: 'Automated search filters miss what matters — lot orientation, noise exposure, HOA politics. Candee knows.',
                },
                {
                  title: "Sotheby's Global Network",
                  body: "Preferred access to luxury inventory and relocation buyers, locally and internationally.",
                },
              ].map(({ title, body }) => (
                <div key={title} className="bg-white p-8 shadow-card">
                  <div className="w-8 h-0.5 bg-gold mb-5" />
                  <h3 className="font-serif text-xl text-navy font-bold mb-3">{title}</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Search by neighborhood */}
        <section className="section-padding bg-white">
          <div className="container-lg">
            <div className="text-center mb-10">
              <p className="section-label">Browse by Area</p>
              <h2 className="section-title">Explore Northern Virginia Neighborhoods</h2>
              <div className="gold-divider-center" />
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: 'Arlington', slug: 'arlington' },
                { name: 'McLean', slug: 'mclean' },
                { name: 'Falls Church', slug: 'falls-church' },
                { name: 'Alexandria', slug: 'alexandria' },
                { name: 'Clarendon', slug: 'clarendon' },
                { name: 'Ballston', slug: 'ballston' },
                { name: 'Rosslyn', slug: 'rosslyn' },
                { name: 'Old Town Alexandria', slug: 'old-town-alexandria' },
                { name: 'Lyon Village', slug: 'lyon-village' },
                { name: 'Great Falls', slug: 'great-falls' },
              ].map(({ name, slug }) => (
                <Link
                  key={slug}
                  href={`/neighborhoods/${slug}`}
                  className="px-5 py-2.5 border border-navy/20 text-navy text-sm font-medium hover:border-gold hover:text-gold transition-all duration-200"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding bg-navy">
          <div className="container-lg text-center">
            <h2 className="font-serif text-3xl text-white font-bold mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Tell Candee what you&apos;re looking for — price range, must-haves, timeline. She&apos;ll send you a curated list before you waste time on Zillow.
            </p>
            <Link href="/contact" className="btn-gold">
              Talk to Candee →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
