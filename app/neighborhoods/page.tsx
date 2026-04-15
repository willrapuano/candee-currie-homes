import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { NEIGHBORHOODS } from '@/data/neighborhoods'

export const metadata: Metadata = {
  title: 'Northern Virginia Neighborhoods | Homes for Sale',
  description:
    'Explore 20+ neighborhoods in Arlington, McLean, Falls Church, Alexandria and beyond. Find your perfect Northern Virginia community with Candee Currie.',
  alternates: { canonical: '/neighborhoods' },
}

function formatPrice(price: number) {
  if (price >= 1000000) return `$${(price / 1000000).toFixed(1)}M`
  return `$${(price / 1000).toFixed(0)}K`
}

function formatJurisdictionHeading(county: string) {
  if (county === 'Alexandria') return 'City of Alexandria'
  if (county === 'Falls Church City') return 'Falls Church City'
  return `${county} County`
}

export default function NeighborhoodsPage() {
  const byCity = NEIGHBORHOODS.reduce((acc, n) => {
    const key = n.county
    if (!acc[key]) acc[key] = []
    acc[key].push(n)
    return acc
  }, {} as Record<string, typeof NEIGHBORHOODS>)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-navy py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent" />
        </div>
        <div className="container-xl relative">
          <div className="max-w-2xl">
            <p className="section-label">Where to Live</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
              Northern Virginia<br />
              <span className="text-gold">Neighborhoods</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold my-6" />
            <p className="text-white/70 text-lg leading-relaxed max-w-xl">
              From tree-lined streets in Lyon Village to waterfront Old Town Alexandria — 
              20+ communities, each with its own character. Candee knows them all.
            </p>
          </div>
        </div>
      </section>

      {/* All neighborhoods grid */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          {Object.entries(byCity).map(([county, neighborhoods]) => (
            <div key={county} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl text-navy font-bold">{formatJurisdictionHeading(county)}</h2>
                <div className="flex-1 h-px bg-gray-100" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {neighborhoods.map((n) => (
                  <Link key={n.slug} href={`/neighborhoods/${n.slug}`} className="group card block overflow-hidden">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={n.heroImage}
                        alt={`${n.name} homes for sale`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/10 transition-colors duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-serif text-navy text-lg font-semibold mb-1 group-hover:text-gold transition-colors">
                        {n.name}
                      </h3>
                      <p className="text-charcoal-muted text-sm line-clamp-2 mb-3">
                        {n.shortDescription}
                      </p>
                      {n.stats?.medianPrice && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gold font-semibold">
                            Median {formatPrice(n.stats.medianPrice)}
                          </span>
                          {n.stats.avgDom && (
                            <span className="text-charcoal-muted">{n.stats.avgDom} avg DOM</span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
