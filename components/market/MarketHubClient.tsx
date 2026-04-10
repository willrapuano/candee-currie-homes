'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface AreaConfig {
  name: string
  slug: string
  zip: string
  description: string
}

interface MarketData {
  zip: string
  medianSalePrice: number | null
  medianDaysOnMarket: number | null
  activeListings: number | null
  percentAboveList: number | null
  updatedAt: string
  error?: string
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${n.toLocaleString()}`
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div>
      <p className={`font-serif text-2xl font-bold ${highlight ? 'text-green-700' : 'text-navy'}`}>{value}</p>
      <p className="text-charcoal-muted text-xs mt-0.5">{label}</p>
    </div>
  )
}

function AreaCard({ area }: { area: AreaConfig }) {
  const [data, setData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/market-data?zip=${area.zip}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [area.zip])

  const above = (data?.percentAboveList != null && data.percentAboveList !== 0)
    ? Math.round(data.percentAboveList * 100)
    : null

  return (
    <div className="bg-white shadow-card p-6 flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="h-1.5 w-1.5 rounded-full bg-gold" />
          <h3 className="font-serif text-xl text-navy font-bold">{area.name}</h3>
        </div>
        <p className="text-charcoal-muted text-xs">{area.description}</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 animate-pulse">
          {[1,2,3,4].map(i => <div key={i} className="h-10 bg-gray-100 rounded" />)}
        </div>
      ) : !data || data.error ? (
        <p className="text-charcoal-muted text-sm italic">Market data loading…</p>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {data.medianSalePrice && <Stat label="Median Sale Price" value={fmt(data.medianSalePrice)} />}
          {data.medianDaysOnMarket != null && <Stat label="Days on Market" value={`${data.medianDaysOnMarket} days`} />}
          {data.activeListings != null && <Stat label="Active Listings" value={String(data.activeListings)} />}
          {above != null && (
            <Stat
              label="vs. List Price"
              value={above > 0 ? `+${above}%` : `${above}%`}
              highlight={above > 0}
            />
          )}
        </div>
      )}

      <div className="flex gap-3 pt-2 border-t border-gray-100">
        <Link href={`/neighborhoods/${area.slug}`} className="text-gold text-xs font-semibold hover:underline">
          Neighborhood guide →
        </Link>
        <span className="text-gray-200">|</span>
        <Link href="/home-value" className="text-navy text-xs font-semibold hover:underline">
          Free CMA →
        </Link>
      </div>
    </div>
  )
}

export function MarketHubClient({ areas }: { areas: AreaConfig[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/50 mb-1">
            Live · Source: Redfin Data Center · Last 90 days
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold">Current Conditions by Area</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {areas.map(area => <AreaCard key={area.zip + area.name} area={area} />)}
      </div>
    </div>
  )
}
