import Link from 'next/link'
import { FaBed, FaBath, FaRulerCombined, FaExternalLinkAlt, FaHome } from 'react-icons/fa'
import type { Listing } from '@/types'

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price)
}

function formatSqft(sqft: number) {
  return new Intl.NumberFormat('en-US').format(sqft)
}

interface Props {
  listing: Listing
}

export function ListingCard({ listing }: Props) {
  const statusColors = {
    'Active': 'bg-green-500',
    'Under Contract': 'bg-amber-500',
    'Coming Soon': 'bg-blue-500',
    'Sold': 'bg-gray-500',
  }

  const href = listing.sourceUrl || `/homes-for-sale/${listing.id}`
  const isExternal = !!listing.sourceUrl

  const CardWrapper = isExternal ? 'a' : Link
  const linkProps = isExternal
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { href }

  return (
    <CardWrapper {...linkProps} className="listing-card block group">
      {/* No-photo header */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy/5 via-cream to-white border-b border-gray-100 p-5 flex flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <span className={`${statusColors[listing.status]} text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1`}>
            {listing.status}
          </span>
          <span className="bg-white text-navy/80 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 border border-navy/10">
            {listing.propertyType}
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] tracking-[0.15em] uppercase text-charcoal-muted mb-1">Listing Preview</p>
            <span className="font-serif text-2xl font-bold text-navy">
              {formatPrice(listing.price)}
            </span>
          </div>
          <div className="w-11 h-11 rounded-full border border-navy/15 bg-white flex items-center justify-center">
            <FaHome className="text-navy/60 text-base" />
          </div>
        </div>

        {isExternal && (
          <div className="absolute bottom-3 right-3">
            <FaExternalLinkAlt className="text-navy/40 text-xs" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Address */}
        <p className="text-charcoal font-medium text-sm mb-1 truncate">
          {listing.address.street}
        </p>
        <p className="text-charcoal-muted text-sm mb-4">
          {listing.address.city}, {listing.address.state} {listing.address.zip}
        </p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-charcoal-muted text-sm border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1.5">
            <FaBed className="text-gold text-xs" />
            <span>{listing.beds} bd</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <FaBath className="text-gold text-xs" />
            <span>{listing.baths} ba</span>
          </div>
          <div className="w-px h-4 bg-gray-200" />
          <div className="flex items-center gap-1.5">
            <FaRulerCombined className="text-gold text-xs" />
            <span>{formatSqft(listing.sqft)} sqft</span>
          </div>
        </div>

        {/* Source attribution */}
        {listing.source && (
          <p className="text-gray-400 text-[10px] tracking-wide mt-3">
            Source: {listing.source}
          </p>
        )}
      </div>
    </CardWrapper>
  )
}
