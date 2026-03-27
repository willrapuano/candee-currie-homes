import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { REAL_LISTINGS } from '@/data/real-listings'

interface Props {
  params: { id: string }
}

export async function generateStaticParams() {
  return REAL_LISTINGS.map((l) => ({ id: l.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = REAL_LISTINGS.find((l) => l.id === params.id)
  if (!listing) return {}

  return {
    title: `${listing.address.street}, ${listing.address.city} VA ${listing.address.zip}`,
    description: `${listing.beds} bed, ${listing.baths} bath ${listing.propertyType.toLowerCase()} in ${listing.address.neighborhood || listing.address.city}. Listed at $${listing.price.toLocaleString()}.`,
  }
}

export default function ListingDetailPage({ params }: Props) {
  const listing = REAL_LISTINGS.find((l) => l.id === params.id)
  if (!listing) notFound()

  // If we have a source URL (Zillow), redirect there
  if (listing.sourceUrl) {
    redirect(listing.sourceUrl)
  }

  // Fallback: simple detail card for future MLS listings
  return (
    <div className="pt-20">
      <div className="container-xl py-16 text-center">
        <h1 className="font-serif text-3xl text-navy font-bold mb-4">
          {listing.address.street}
        </h1>
        <p className="text-charcoal-muted mb-8">
          {listing.address.city}, {listing.address.state} {listing.address.zip}
        </p>
        <p className="font-serif text-4xl text-navy font-bold mb-8">
          ${listing.price.toLocaleString()}
        </p>
        <div className="flex justify-center gap-6 text-charcoal-muted mb-12">
          <span>{listing.beds} beds</span>
          <span>{listing.baths} baths</span>
          <span>{listing.sqft.toLocaleString()} sqft</span>
        </div>
        <Link href="/homes-for-sale" className="btn-navy">
          ← Back to All Listings
        </Link>
      </div>
    </div>
  )
}
