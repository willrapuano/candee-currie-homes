'use client'

import { useEffect, useState } from 'react'

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

export function MarketSnapshot({ zip, neighborhood }: { zip: string; neighborhood: string }) {
  const [data, setData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/market-data?zip=${zip}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [zip])

  if (loading) {
    return (
      <div className="bg-navy/5 border border-navy/10 p-6 animate-pulse">
        <div className="h-4 bg-navy/10 rounded w-48 mb-4" />
        <div className="grid grid-cols-2 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="h-12 bg-navy/10 rounded" />)}
        </div>
      </div>
    )
  }

  if (!data || data.error || !data.medianSalePrice) {
    return null // don't show if no data — avoids empty widgets
  }

  // Only show if non-zero and plausible (Redfin returns 0 for low-volume ZIPs)
  const above = (data.percentAboveList != null && data.percentAboveList !== 0)
    ? Math.round(data.percentAboveList * 100)
    : null

  return (
    <div className="bg-cream border-l-4 border-gold p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/60">
          {neighborhood} Market — Live Data
        </p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.medianSalePrice && (
          <div>
            <p className="font-serif text-xl text-navy font-bold">{fmt(data.medianSalePrice)}</p>
            <p className="text-charcoal-muted text-xs mt-0.5">Median Sale Price</p>
          </div>
        )}
        {data.medianDaysOnMarket != null && (
          <div>
            <p className="font-serif text-xl text-navy font-bold">{data.medianDaysOnMarket}</p>
            <p className="text-charcoal-muted text-xs mt-0.5">Days on Market</p>
          </div>
        )}
        {data.activeListings != null && (
          <div>
            <p className="font-serif text-xl text-navy font-bold">{data.activeListings}</p>
            <p className="text-charcoal-muted text-xs mt-0.5">Active Listings</p>
          </div>
        )}
        {above != null && (
          <div>
            <p className={`font-serif text-xl font-bold ${above > 0 ? 'text-green-700' : 'text-navy'}`}>
              {above > 0 ? `+${above}%` : `${above}%`}
            </p>
            <p className="text-charcoal-muted text-xs mt-0.5">vs. List Price</p>
          </div>
        )}
      </div>
      <p className="text-gray-400 text-[10px] mt-4">
        Source: Redfin Data Center · ZIP {zip} · Last 90 days
      </p>
    </div>
  )
}
