import Link from 'next/link'
import { ListingCard } from '@/components/shared/ListingCard'
import { REAL_LISTINGS } from '@/data/real-listings'

export function FeaturedListings() {
  const listings = REAL_LISTINGS.filter(l => l.status === 'Active').slice(0, 6)

  return (
    <section id="featured-listings" className="section-padding bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label">Handpicked Properties</p>
            <h2 className="section-title">Featured Listings</h2>
            <div className="gold-divider" />
            <p className="section-subtitle max-w-lg">
              Exceptional homes in Arlington and Northern Virginia — curated for discerning buyers.
            </p>
          </div>
          <Link
            href="https://www.ttrsir.com/agents/candee-currie" target="_blank" rel="noopener noreferrer"
            className="btn-navy self-start md:self-auto whitespace-nowrap"
          >
            View All Listings
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href="https://www.ttrsir.com/agents/candee-currie" target="_blank" rel="noopener noreferrer" className="btn-gold">
            Explore All Available Homes
          </Link>
        </div>
      </div>
    </section>
  )
}
