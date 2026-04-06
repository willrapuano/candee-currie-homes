import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaCheckCircle, FaHome, FaClock, FaChartLine } from 'react-icons/fa'
import { NEIGHBORHOODS } from '@/data/neighborhoods'
import { HomeValueCTA } from '@/components/home/HomeValueCTA'
import { MarketSnapshot } from '@/components/market/MarketSnapshot'
import { getNeighborhoodSchema, getBreadcrumbSchema } from '@/lib/schema-org'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return NEIGHBORHOODS.map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = NEIGHBORHOODS.find((n) => n.slug === params.slug)
  if (!n) return {}

  return {
    title: `${n.name} Homes for Sale | ${n.name} VA Real Estate`,
    description: `Browse ${n.name} homes for sale in ${n.city}, VA. ${n.shortDescription} Work with Candee Currie — TTR Sotheby's Associate Broker.`,
    alternates: { canonical: `/neighborhoods/${n.slug}` },
    openGraph: {
      title: `${n.name} Real Estate | Homes for Sale`,
      description: n.shortDescription,
      images: [{ url: n.heroImage, alt: `${n.name} homes` }],
    },
  }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price)
}

export default function NeighborhoodPage({ params }: Props) {
  const neighborhood = NEIGHBORHOODS.find((n) => n.slug === params.slug)
  if (!neighborhood) notFound()

  const schemaOrg = getNeighborhoodSchema({
    name: neighborhood.name,
    slug: neighborhood.slug,
    shortDescription: neighborhood.shortDescription,
    city: neighborhood.city,
    state: 'VA',
  })

  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Neighborhoods', url: '/neighborhoods' },
    { name: neighborhood.name, url: `/neighborhoods/${neighborhood.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[55vh] min-h-[400px] flex items-end">
          <div className="absolute inset-0">
            <Image
              src={neighborhood.heroImage}
              alt={`${neighborhood.name} neighborhood in ${neighborhood.city}, VA`}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
          </div>

          <div className="relative container-xl pb-12">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-white/50 text-xs mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              <span>/</span>
              <Link href="/neighborhoods" className="hover:text-gold transition-colors">Neighborhoods</Link>
              <span>/</span>
              <span className="text-white">{neighborhood.name}</span>
            </nav>

            <h1 className="font-serif text-4xl md:text-6xl text-white font-bold mb-3">
              {neighborhood.name}
            </h1>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-4">
              {neighborhood.county}, VA
            </p>
            <p className="text-white/80 text-lg max-w-xl">{neighborhood.tagline}</p>
          </div>
        </section>

        {/* Stats bar */}
        {neighborhood.stats && (
          <section className="bg-navy py-8">
            <div className="container-xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {neighborhood.stats.medianPrice && (
                  <div className="text-center">
                    <FaHome className="text-gold mx-auto mb-1" />
                    <p className="font-serif text-2xl text-white font-bold">
                      {formatPrice(neighborhood.stats.medianPrice)}
                    </p>
                    <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">Median Price</p>
                  </div>
                )}
                {neighborhood.stats.avgDom && (
                  <div className="text-center">
                    <FaClock className="text-gold mx-auto mb-1" />
                    <p className="font-serif text-2xl text-white font-bold">
                      {neighborhood.stats.avgDom} days
                    </p>
                    <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">Avg. Days on Market</p>
                  </div>
                )}
                {neighborhood.stats.activeListings && (
                  <div className="text-center">
                    <FaChartLine className="text-gold mx-auto mb-1" />
                    <p className="font-serif text-2xl text-white font-bold">
                      {neighborhood.stats.activeListings}
                    </p>
                    <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">Active Listings</p>
                  </div>
                )}
                <div className="text-center">
                  <FaChartLine className="text-gold mx-auto mb-1" />
                  <p className="font-serif text-2xl text-white font-bold">NoVA</p>
                  <p className="text-white/50 text-xs uppercase tracking-wider mt-0.5">Market Area</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="section-padding bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main content */}
              <div className="lg:col-span-2">
                <h2 className="font-serif text-3xl text-navy font-bold mb-4">
                  Living in {neighborhood.name}
                </h2>
                <div className="gold-divider" />
                <div className="prose prose-lg max-w-none text-charcoal-muted leading-relaxed">
                  <p>{neighborhood.shortDescription}</p>
                  <p className="text-charcoal-muted mt-4">
                    {neighborhood.name} offers some of the best quality of life in Northern Virginia.
                    Whether you&apos;re drawn by the schools, the commute options, the dining scene, 
                    or the community character — this neighborhood consistently ranks among the most 
                    sought-after in the region.
                  </p>
                  <p className="text-sm text-charcoal-muted mt-4">
                    Contact Candee for personalized insights on{' '}
                    {neighborhood.name} — she knows this market inside and out.
                  </p>
                </div>

                {/* Highlights */}
                {neighborhood.highlights.length > 0 && (
                  <div className="mt-10">
                    <h3 className="font-serif text-xl text-navy font-semibold mb-5">
                      Why {neighborhood.name}?
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {neighborhood.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-3 bg-cream p-3">
                          <FaCheckCircle className="text-gold mt-0.5 flex-shrink-0" />
                          <span className="text-charcoal text-sm">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div>
                {/* CTA card */}
                <div className="bg-navy p-6 mb-6">
                  <h3 className="font-serif text-xl text-white font-bold mb-2">
                    Thinking About {neighborhood.name}?
                  </h3>
                  <p className="text-white/60 text-sm mb-5">
                    Candee knows this neighborhood inside and out. Let&apos;s find your perfect home.
                  </p>
                  <Link href="/contact" className="btn-gold w-full text-center block mb-3">
                    Schedule a Consultation
                  </Link>
                  <Link href="/home-value" className="btn-outline-white w-full text-center block text-sm">
                    Get a Home Valuation
                  </Link>
                </div>

                {/* Quick stats */}
                {neighborhood.stats && (
                  <div className="bg-cream p-6 border border-gray-100">
                    <h4 className="font-serif text-navy text-lg font-semibold mb-4">Market Snapshot</h4>
                    <div className="space-y-3">
                      {neighborhood.stats.medianPrice && (
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal-muted">Median Price</span>
                          <span className="font-semibold text-navy">{formatPrice(neighborhood.stats.medianPrice)}</span>
                        </div>
                      )}
                      {neighborhood.stats.avgDom && (
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal-muted">Avg. Days on Market</span>
                          <span className="font-semibold text-navy">{neighborhood.stats.avgDom}</span>
                        </div>
                      )}
                      {neighborhood.stats.activeListings && (
                        <div className="flex justify-between text-sm">
                          <span className="text-charcoal-muted">Active Listings</span>
                          <span className="font-semibold text-navy">{neighborhood.stats.activeListings}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Live Market Data */}
        <section className="section-padding bg-cream">
          <div className="container-xl">
            <div className="mb-8">
              <p className="section-label">Market Intelligence</p>
              <h2 className="font-serif text-3xl text-navy font-bold">
                What&apos;s Happening in {neighborhood.name} Right Now
              </h2>
              <div className="gold-divider mt-3" />
            </div>
            {neighborhood.zip ? (
              <MarketSnapshot zip={neighborhood.zip} neighborhood={neighborhood.name} />
            ) : null}
            <div className="mt-8">
              <Link href="/home-value" className="btn-gold text-center inline-block">
                What&apos;s My Home Worth? →
              </Link>
            </div>
          </div>
        </section>

        {/* Nearby neighborhoods */}
        <section className="section-padding-sm bg-white">
          <div className="container-xl">
            <h2 className="font-serif text-2xl text-navy font-bold mb-6">
              Explore Nearby Neighborhoods
            </h2>
            <div className="flex flex-wrap gap-3">
              {NEIGHBORHOODS
                .filter((n) => n.slug !== neighborhood.slug)
                .slice(0, 8)
                .map((n) => (
                  <Link
                    key={n.slug}
                    href={`/neighborhoods/${n.slug}`}
                    className="border border-gray-200 hover:border-gold text-charcoal hover:text-gold 
                               text-sm px-4 py-2 transition-all duration-200"
                  >
                    {n.name}
                  </Link>
                ))}
            </div>
          </div>
        </section>

        <HomeValueCTA />
      </div>
    </>
  )
}
