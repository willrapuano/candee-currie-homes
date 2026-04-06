'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

interface MarketData {
  zip: string
  medianSalePrice: number | null
  medianDaysOnMarket: number | null
  activeListings: number | null
  percentAboveList: number | null
  error?: string
}

const ZIP_NAMES: Record<string, string> = {
  '22201': 'Arlington (22201)',
  '22202': 'Arlington / Crystal City',
  '22203': 'Ballston / Arlington',
  '22204': 'Arlington (22204)',
  '22205': 'Arlington / Falls Church border',
  '22206': 'Arlington (22206)',
  '22207': 'North Arlington',
  '22209': 'Rosslyn / Arlington',
  '22213': 'Arlington (22213)',
  '22101': 'McLean',
  '22102': 'McLean / Tysons',
  '22041': 'Falls Church / Bailey\'s Crossroads',
  '22042': 'Falls Church',
  '22043': 'Falls Church / West Falls Church',
  '22044': 'Falls Church',
  '22046': 'Falls Church City',
  '22301': 'Alexandria',
  '22302': 'Alexandria',
  '22303': 'Alexandria',
  '22304': 'Alexandria',
  '22305': 'Alexandria / Rosemont',
  '22306': 'Alexandria / Mount Vernon',
  '22307': 'Alexandria / Belle Haven',
  '22308': 'Alexandria / Hollin Hills',
  '22309': 'Alexandria / Mount Vernon',
  '22310': 'Alexandria',
  '22311': 'Alexandria',
  '22312': 'Alexandria',
  '22314': 'Old Town Alexandria',
  '22315': 'Alexandria / Kingstowne',
}

function fmt(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`
  return `$${n.toLocaleString()}`
}

export function PostcardFunnelClient() {
  const params = useSearchParams()
  const zip = params.get('zip') || ''
  const utm_source = params.get('utm_source') || ''
  const areaName = ZIP_NAMES[zip] || (zip ? `ZIP ${zip}` : 'Northern Virginia')

  const [data, setData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [emailError, setEmailError] = useState('')

  useEffect(() => {
    if (!zip) { setLoading(false); return }
    fetch(`/api/market-data?zip=${zip}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [zip])

  const above = data?.percentAboveList != null ? Math.round(data.percentAboveList * 100) : null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')

    await fetch('/api/home-value', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        address: zip ? `ZIP ${zip}` : areaName,
        city: areaName,
        zip,
        source: utm_source ? `postcard-${utm_source}` : 'postcard-funnel',
      }),
    }).catch(() => {})

    setSubmitted(true)
  }

  return (
    <div className="container-lg py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
            {utm_source === 'postcard' ? 'From Your Postcard' : 'Market Report'}
          </span>
          <div className="h-px w-10 bg-gold" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-navy font-bold mb-3">
          {areaName}
        </h1>
        <p className="text-charcoal-muted text-lg">What&apos;s happening in your neighborhood right now</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

        {/* Market data */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="bg-white p-8 shadow-card animate-pulse space-y-4">
              {[1,2,3,4].map(i => <div key={i} className="h-12 bg-gray-100 rounded" />)}
            </div>
          ) : !zip ? (
            <div className="bg-white p-8 shadow-card text-center">
              <p className="text-charcoal-muted">No ZIP code specified. Please scan your postcard again or visit the full market report.</p>
              <Link href="/market" className="btn-gold mt-6 inline-block">View Full Market Report →</Link>
            </div>
          ) : !data || data.error ? (
            <div className="bg-white p-8 shadow-card text-center">
              <p className="text-charcoal-muted">Market data is being pulled. Try again in a moment or contact Candee directly for a full analysis.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white shadow-card p-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="h-2 w-2 rounded-full bg-gold animate-pulse" />
                  <p className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/50">Live Market Data · Last 90 Days</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                  {data.medianSalePrice && (
                    <div>
                      <p className="font-serif text-4xl text-navy font-bold">{fmt(data.medianSalePrice)}</p>
                      <p className="text-charcoal-muted text-sm mt-1">Median Sale Price</p>
                    </div>
                  )}
                  {data.medianDaysOnMarket != null && (
                    <div>
                      <p className="font-serif text-4xl text-navy font-bold">{data.medianDaysOnMarket}</p>
                      <p className="text-charcoal-muted text-sm mt-1">Avg. Days on Market</p>
                    </div>
                  )}
                  {data.activeListings != null && (
                    <div>
                      <p className="font-serif text-4xl text-navy font-bold">{data.activeListings}</p>
                      <p className="text-charcoal-muted text-sm mt-1">Active Listings</p>
                    </div>
                  )}
                  {above != null && (
                    <div>
                      <p className={`font-serif text-4xl font-bold ${above > 0 ? 'text-green-700' : 'text-navy'}`}>
                        {above > 0 ? `+${above}%` : `${above}%`}
                      </p>
                      <p className="text-charcoal-muted text-sm mt-1">vs. List Price</p>
                    </div>
                  )}
                </div>
                <p className="text-gray-400 text-[10px] mt-6">Source: Redfin Data Center · ZIP {zip}</p>
              </div>

              {/* Market interpretation */}
              <div className="bg-cream border-l-4 border-gold p-6">
                <p className="text-navy font-semibold text-sm mb-2">What this means</p>
                <p className="text-charcoal-muted text-sm leading-relaxed">
                  {data.medianDaysOnMarket != null && data.medianDaysOnMarket < 12
                    ? `With homes selling in ${data.medianDaysOnMarket} days on average, ${areaName} is a fast market. Buyers need to be pre-approved and ready to move quickly. Sellers have strong leverage right now.`
                    : data.medianDaysOnMarket != null && data.medianDaysOnMarket < 25
                    ? `${areaName} is a balanced-to-competitive market. Days on market is healthy — there&apos;s some inventory, but well-priced homes still move fast.`
                    : `${areaName} is showing more inventory than average. Buyers have more negotiating room. Sellers need precise pricing to stay competitive.`
                  }
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Lead capture */}
        <div className="lg:col-span-2">
          {submitted ? (
            <div className="bg-white shadow-card p-8">
              <div className="text-center">
                <div className="text-gold text-4xl mb-4">✓</div>
                <h3 className="font-serif text-2xl text-navy font-bold mb-2">You&apos;re all set.</h3>
                <p className="text-charcoal-muted text-sm leading-relaxed">
                  Candee will follow up within 24 hours with a full market analysis tailored to your property — not a Zestimate.
                </p>
                <a href="tel:7032036005" className="btn-navy w-full text-center block mt-6">
                  Call Candee Now →
                </a>
              </div>
            </div>
          ) : (
            <div className="bg-navy p-8">
              <h3 className="font-serif text-xl text-white font-bold mb-2">
                What&apos;s Your Home Worth?
              </h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Get a free CMA from Candee — not an algorithm. Real comps, real local knowledge, a real number.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-1">Full Name *</label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                    placeholder="Jane Smith"
                    required
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-1">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => { setEmail(e.target.value); if (emailError) setEmailError('') }}
                    onBlur={() => {
                      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
                        setEmailError('Please enter a valid email address.')
                      }
                    }}
                    className={`w-full bg-white/10 border text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold ${emailError ? 'border-red-400' : 'border-white/20'}`}
                    placeholder="jane@example.com"
                    required
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                </div>
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wider block mb-1">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 text-white placeholder-white/30 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                    placeholder="(703) 203-6005"
                    required
                  />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Get My Free CMA →
                </button>
                <p className="text-white/30 text-xs text-center">No spam. No obligation. Candee follows up within 24 hours.</p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
