import Link from 'next/link'
import Image from 'next/image'
import { NEIGHBORHOODS } from '@/data/neighborhoods'

function formatPrice(price: number) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  if (price >= 1000) return `$${(price / 1000).toFixed(0)}K`
  return `$${price}`
}

export function NeighborhoodsGrid() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="section-label">Where Do You Want to Live?</p>
          <h2 className="section-title">Explore Communities &amp; Neighborhoods</h2>
          <div className="gold-divider-center" />
          <p className="section-subtitle mx-auto text-center">
            From walkable urban villages to wooded estates — Northern Virginia offers something for every lifestyle.
          </p>
        </div>

        {/* Featured row — top 4 larger */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {NEIGHBORHOODS.slice(0, 4).map((n) => (
            <NeighborhoodCard key={n.slug} neighborhood={n} size="large" />
          ))}
        </div>

        {/* Grid — remaining */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {NEIGHBORHOODS.slice(4, 20).map((n) => (
            <NeighborhoodCard key={n.slug} neighborhood={n} size="small" />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-12">
          <Link href="/neighborhoods" className="btn-navy">
            View All Neighborhoods
          </Link>
        </div>
      </div>
    </section>
  )
}

function NeighborhoodCard({
  neighborhood,
  size,
}: {
  neighborhood: (typeof NEIGHBORHOODS)[0]
  size: 'large' | 'small'
}) {
  const aspectClass = size === 'large' ? 'aspect-[3/4]' : 'aspect-[4/3]'

  return (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className="neighborhood-card block group"
    >
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <Image
          src={neighborhood.heroImage}
          alt={`${neighborhood.name} real estate`}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
          <h3 className={`font-serif text-white font-bold leading-tight ${size === 'large' ? 'text-xl' : 'text-base'}`}>
            {neighborhood.name}
          </h3>
          {size === 'large' && (
            <p className="text-white/70 text-xs mt-1 line-clamp-2">
              {neighborhood.tagline}
            </p>
          )}
          {neighborhood.stats?.medianPrice && (
            <div className="flex items-center justify-between mt-2">
              <span className="text-gold text-xs font-semibold">
                From {formatPrice(neighborhood.stats.medianPrice)}
              </span>
              {neighborhood.stats.activeListings && (
                <span className="text-white/50 text-[10px]">
                  {neighborhood.stats.activeListings} active
                </span>
              )}
            </div>
          )}
        </div>

        {/* Hover state */}
        <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/60 transition-all duration-300" />
      </div>
    </Link>
  )
}
