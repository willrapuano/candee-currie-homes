import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FaBed, FaBath, FaRulerCombined, FaHome, FaPhone } from 'react-icons/fa'
import { REAL_LISTINGS } from '@/data/real-listings'
import { getBreadcrumbSchema } from '@/lib/schema-org'

interface Props {
  params: { id: string }
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatSqft(n: number) {
  return new Intl.NumberFormat('en-US').format(n)
}

export async function generateStaticParams() {
  return REAL_LISTINGS.map((l) => ({ id: l.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = REAL_LISTINGS.find((l) => l.id === params.id)
  if (!listing) return {}

  const { street, city, state, zip } = listing.address
  return {
    title: `${street}, ${city} ${state} ${zip} | Homes for Sale | Candee Currie`,
    description: `${listing.beds} bed, ${listing.baths} bath ${listing.propertyType.toLowerCase()} in ${listing.address.neighborhood || city}, ${state}. Listed at ${formatPrice(listing.price)}. Contact Candee Currie — TTR Sotheby's — to schedule a private tour.`,
    alternates: { canonical: `/homes-for-sale/${listing.id}` },
  }
}

const STATUS_COLORS: Record<string, string> = {
  'Active': 'bg-green-500',
  'Under Contract': 'bg-amber-500',
  'Coming Soon': 'bg-blue-500',
  'Sold': 'bg-gray-500',
}

export default function ListingDetailPage({ params }: Props) {
  const listing = REAL_LISTINGS.find((l) => l.id === params.id)
  if (!listing) notFound()

  const { street, city, state, zip, neighborhood } = listing.address
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Homes for Sale', url: '/homes-for-sale' },
    { name: street, url: `/homes-for-sale/${listing.id}` },
  ])

  const contactHref = `/contact?property=${encodeURIComponent(street)}&interest=showing`

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-[72px] min-h-screen bg-cream">
        {/* Page header */}
        <section className="bg-navy py-12">
          <div className="container-xl">
            <div className="flex items-center gap-3 mb-4">
              <span className={`${STATUS_COLORS[listing.status] ?? 'bg-gray-500'} text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1`}>
                {listing.status}
              </span>
              <span className="bg-white/10 text-white/80 text-[10px] font-semibold tracking-wider uppercase px-3 py-1">
                {listing.propertyType}
              </span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-2">
              {street}
            </h1>
            <p className="text-white/70 text-lg mb-3">
              {city}, {state} {zip}{neighborhood ? ` · ${neighborhood}` : ''}
            </p>
            <div className="w-16 h-0.5 bg-gold mb-4" />
            <p className="font-serif text-3xl md:text-4xl text-gold font-bold">
              {formatPrice(listing.price)}
            </p>
          </div>
        </section>

        {/* Main content */}
        <section className="container-xl py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* Left: details */}
            <div className="lg:col-span-2 space-y-8">

              {/* Stats */}
              <div className="bg-white p-6 border border-gray-100">
                <h2 className="font-serif text-xl text-navy font-bold mb-5">Property Details</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <FaBed className="text-gold text-lg shrink-0" />
                    <div>
                      <p className="text-xs text-charcoal-muted uppercase tracking-wide">Bedrooms</p>
                      <p className="text-navy font-semibold text-lg">{listing.beds}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBath className="text-gold text-lg shrink-0" />
                    <div>
                      <p className="text-xs text-charcoal-muted uppercase tracking-wide">Bathrooms</p>
                      <p className="text-navy font-semibold text-lg">
                        {listing.baths}{listing.halfBaths ? ` + ${listing.halfBaths} half` : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaRulerCombined className="text-gold text-lg shrink-0" />
                    <div>
                      <p className="text-xs text-charcoal-muted uppercase tracking-wide">Square Feet</p>
                      <p className="text-navy font-semibold text-lg">{formatSqft(listing.sqft)}</p>
                    </div>
                  </div>
                  {listing.yearBuilt && (
                    <div className="flex items-center gap-3">
                      <FaHome className="text-gold text-lg shrink-0" />
                      <div>
                        <p className="text-xs text-charcoal-muted uppercase tracking-wide">Year Built</p>
                        <p className="text-navy font-semibold text-lg">{listing.yearBuilt}</p>
                      </div>
                    </div>
                  )}
                  {listing.lotSize && (
                    <div className="flex items-center gap-3">
                      <FaRulerCombined className="text-gold text-lg shrink-0" />
                      <div>
                        <p className="text-xs text-charcoal-muted uppercase tracking-wide">Lot Size</p>
                        <p className="text-navy font-semibold text-lg">{formatSqft(listing.lotSize)} sqft</p>
                      </div>
                    </div>
                  )}
                  {listing.daysOnMarket !== undefined && (
                    <div className="flex items-center gap-3">
                      <FaHome className="text-gold text-lg shrink-0" />
                      <div>
                        <p className="text-xs text-charcoal-muted uppercase tracking-wide">Days on Market</p>
                        <p className="text-navy font-semibold text-lg">{listing.daysOnMarket}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              {listing.description && (
                <div className="bg-white p-6 border border-gray-100">
                  <h2 className="font-serif text-xl text-navy font-bold mb-4">About This Property</h2>
                  <p className="text-charcoal leading-relaxed">{listing.description}</p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-gray-400 text-xs leading-relaxed">
                Listing information is sourced from public records and may not reflect current availability.
                Contact Candee Currie to confirm status and schedule a private tour.
              </p>

              {/* Back link */}
              <div>
                <Link href="/homes-for-sale" className="text-navy text-sm underline underline-offset-2 hover:text-gold transition-colors">
                  ← Back to All Listings
                </Link>
              </div>
            </div>

            {/* Right: CTA card */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-100 p-6 sticky top-24">
                <p className="section-label mb-2">Interested in this property?</p>
                <h3 className="font-serif text-xl text-navy font-bold mb-1">Talk to Candee</h3>
                <div className="w-10 h-0.5 bg-gold mb-5" />
                <p className="text-charcoal-muted text-sm mb-6 leading-relaxed">
                  TTR Sotheby&apos;s Associate Broker with 14+ years in Northern Virginia.
                  She&apos;ll get you in the door and help you win.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href={contactHref} className="btn-gold text-center">
                    Schedule a Showing
                  </Link>
                  <a href="tel:7032036004" className="btn-navy text-center">
                    <FaPhone className="inline mr-2 text-xs" />
                    703-203-6004
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  )
}
