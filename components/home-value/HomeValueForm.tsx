'use client'

import { useEffect, useRef, useState } from 'react'
import { FaCheckCircle, FaHome, FaChartLine, FaClock, FaLock } from 'react-icons/fa'

type Step = 'address' | 'estimating' | 'gate' | 'submitting' | 'done'

interface Estimate {
  price: number
  priceRangeLow: number
  priceRangeHigh: number
  source: 'rentcast' | 'estimate'
  disclaimer: string
}

function formatMoney(n: number): string {
  return '$' + (Math.round(n / 1000) * 1000).toLocaleString()
}

export function HomeValueForm({ initialAddress = '' }: { initialAddress?: string }) {
  const [step, setStep] = useState<Step>('address')
  const [address, setAddress] = useState(initialAddress)
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [suggestions, setSuggestions] = useState<Array<{ label: string; street: string; city: string; zip: string }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (suggestRef.current && !suggestRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const q = address.trim()
    if (!q || q.length < 4) { setSuggestions([]); return }
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/address-autocomplete?q=${encodeURIComponent(q)}`)
        const json = await res.json()
        setSuggestions(json.results || [])
        setShowSuggestions(true)
      } catch { setSuggestions([]) }
    }, 300)
    return () => clearTimeout(t)
  }, [address])

  const fetchEstimate = async (addr: string, cty: string, zp: string) => {
    setStep('estimating')
    try {
      const res = await fetch('/api/home-value/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: addr, city: cty, zip: zp }),
      })
      if (!res.ok) throw new Error('estimate failed')
      const data: Estimate = await res.json()
      setEstimate(data)
      setStep('gate')
    } catch {
      setEstimate(null)
      setStep('gate')
    }
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.trim()) return
    fetchEstimate(address, city, zip)
  }

  const selectSuggestion = (s: { label: string; street: string; city: string; zip: string }) => {
    const addr = s.street || s.label
    const cty = s.city || ''
    const zp = s.zip || ''
    setAddress(addr)
    setCity(cty)
    setZip(zp)
    setShowSuggestions(false)
    setSuggestions([])
    fetchEstimate(addr, cty, zp)
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStep('submitting')
    try {
      await fetch('/api/home-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName,
          email: leadEmail,
          phone: leadPhone,
          address,
          city,
          zip,
          rentcastPrice: estimate?.price,
          rentcastLow: estimate?.priceRangeLow,
          rentcastHigh: estimate?.priceRangeHigh,
        }),
      })
    } catch {
      // best-effort
    }
    setStep('done')
  }

  return (
    <section className="section-padding bg-cream">
      <div className="container-lg">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Main card */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 shadow-card">

              {/* Step: Address */}
              {step === 'address' && (
                <form onSubmit={handleAddressSubmit} className="space-y-5">
                  <h2 className="font-serif text-2xl text-navy font-bold mb-1">Get Your Home Value</h2>
                  <p className="text-charcoal-muted text-sm mb-4">
                    Enter your address below to see a real-time market estimate.
                  </p>

                  <div className="relative" ref={suggestRef}>
                    <label htmlFor="hv-address" className="form-label">Street Address *</label>
                    <input
                      id="hv-address"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="form-input"
                      placeholder="123 Main St"
                      autoComplete="street-address"
                      required
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 shadow-lg max-h-56 overflow-auto">
                        {suggestions.map(s => (
                          <button key={s.label} type="button" onClick={() => selectSuggestion(s)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-cream">
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="hv-city" className="form-label">City</label>
                      <input id="hv-city" value={city} onChange={e => setCity(e.target.value)}
                        className="form-input" placeholder="Arlington" />
                    </div>
                    <div>
                      <label htmlFor="hv-zip" className="form-label">ZIP Code</label>
                      <input id="hv-zip" value={zip} onChange={e => setZip(e.target.value)}
                        className="form-input" placeholder="22201" maxLength={5} />
                    </div>
                  </div>

                  <button type="submit" className="btn-gold w-full" disabled={!address.trim()}>
                    Check My Home Value →
                  </button>
                  <p className="text-gray-400 text-xs text-center">No spam. No obligation. Free.</p>
                </form>
              )}

              {/* Step: Estimating */}
              {step === 'estimating' && (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-5" />
                  <p className="text-navy font-serif text-lg font-semibold">Pulling current market data…</p>
                  <p className="text-charcoal-muted text-sm mt-2">Checking live comparable sales in your area</p>
                </div>
              )}

              {/* Step: Gate (blurred estimate + lead form) */}
              {(step === 'gate' || step === 'submitting') && (
                <div className="space-y-6">
                  {/* Blurred estimate preview */}
                  <div className="relative">
                    <div className="blur-sm opacity-60 pointer-events-none bg-cream border border-gold/40 p-5 rounded-sm">
                      <p className="text-xs uppercase tracking-wider text-navy/60 mb-1">Estimated Value Range</p>
                      <p className="font-serif text-3xl text-navy font-bold">
                        {estimate ? `${formatMoney(estimate.priceRangeLow)} – ${formatMoney(estimate.priceRangeHigh)}` : '$XXX,XXX – $XXX,XXX'}
                      </p>
                      <p className="font-serif text-xl text-navy/70 mt-1">
                        {estimate ? `Est. ${formatMoney(estimate.price)}` : 'Est. $XXX,XXX'}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full px-4 py-2 flex items-center gap-2 shadow-md">
                        <FaLock className="text-gold text-xs" />
                        <span className="text-navy text-xs font-semibold">Enter your info to unlock</span>
                      </div>
                    </div>
                  </div>

                  {/* Lead form */}
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <h2 className="font-serif text-xl text-navy font-bold">Unlock Your Estimate</h2>
                    <p className="text-charcoal-muted text-sm">
                      Enter your contact info and Candee will follow up with a full market analysis.
                    </p>

                    <div>
                      <label htmlFor="hv-name" className="form-label">Full Name *</label>
                      <input id="hv-name" value={leadName} onChange={e => setLeadName(e.target.value)}
                        className="form-input" placeholder="Jane Smith" required />
                    </div>
                    <div>
                      <label htmlFor="hv-email" className="form-label">Email *</label>
                      <input id="hv-email" type="email" value={leadEmail} onChange={e => setLeadEmail(e.target.value)}
                        className="form-input" placeholder="jane@example.com" required />
                    </div>
                    <div>
                      <label htmlFor="hv-phone" className="form-label">Phone *</label>
                      <input id="hv-phone" type="tel" value={leadPhone} onChange={e => setLeadPhone(e.target.value)}
                        className="form-input" placeholder="(703) 555-0100" required />
                    </div>

                    <button type="submit" className="btn-gold w-full" disabled={step === 'submitting'}>
                      {step === 'submitting' ? 'Loading…' : 'See My Home Value →'}
                    </button>
                    <p className="text-gray-400 text-xs text-center">No spam. No obligation.</p>
                  </form>
                </div>
              )}

              {/* Step: Done */}
              {step === 'done' && estimate && (
                <div className="space-y-6">
                  {/* Full estimate */}
                  <div className="bg-cream border border-gold/40 p-6 rounded-sm">
                    <p className="text-xs uppercase tracking-wider text-navy/60 mb-2">Estimated Value Range</p>
                    <p className="font-serif text-3xl text-navy font-bold">
                      {formatMoney(estimate.priceRangeLow)} – {formatMoney(estimate.priceRangeHigh)}
                    </p>
                    <p className="font-serif text-xl text-navy/80 mt-1">
                      Estimated Value: <span className="font-bold text-navy">{formatMoney(estimate.price)}</span>
                    </p>
                    <p className="text-xs text-charcoal-muted mt-3 leading-relaxed">{estimate.disclaimer}</p>
                  </div>

                  {/* Success message */}
                  <div className="flex items-start gap-3 bg-white border border-gold/30 p-4 rounded-sm">
                    <FaCheckCircle className="text-gold text-lg flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-navy font-semibold text-sm">You&apos;re on Candee&apos;s list</p>
                      <p className="text-charcoal-muted text-sm mt-0.5">
                        Candee will follow up within 24 hours with a custom home valuation report tailored to your property.
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <a href="tel:7032036004" className="btn-navy w-full text-center block">
                    Schedule a Call with Candee →
                  </a>

                  <p className="text-charcoal-muted text-xs text-center">
                    {estimate.source === 'rentcast'
                      ? 'Estimate powered by Rentcast AVM — live market data'
                      : 'Preliminary estimate based on local market data'}
                  </p>
                </div>
              )}

              {/* Edge: done but no estimate */}
              {step === 'done' && !estimate && (
                <div className="text-center py-12">
                  <FaCheckCircle className="text-gold text-4xl mx-auto mb-4" />
                  <h2 className="font-serif text-2xl text-navy font-bold mb-2">Request Received</h2>
                  <p className="text-charcoal-muted mb-6">
                    Candee will follow up within 24 hours with a personalized home valuation.
                  </p>
                  <a href="tel:7032036004" className="btn-navy inline-block">
                    Call Candee Now →
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-navy p-6">
              <h3 className="font-serif text-xl text-white font-bold mb-4">What You&apos;ll Receive</h3>
              <ul className="space-y-3">
                {[
                  'Live market estimate powered by real transaction data',
                  'Comparable sales in your specific neighborhood',
                  'Price range and optimal list price recommendation',
                  'Timing strategy for current market conditions',
                  'Candee\'s personal follow-up — not a robot',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <FaCheckCircle className="text-gold text-sm mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 shadow-card">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: FaHome, number: '218', label: 'Homes Sold' },
                  { icon: FaClock, number: '14 yrs', label: 'Experience' },
                  { icon: FaChartLine, number: '$1.1M', label: 'Avg. Sale' },
                ].map(s => (
                  <div key={s.label}>
                    <s.icon className="text-gold text-xl mx-auto mb-1" />
                    <p className="font-serif text-xl text-navy font-bold">{s.number}</p>
                    <p className="text-charcoal-muted text-xs">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
