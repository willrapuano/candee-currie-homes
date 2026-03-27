'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { FaCheckCircle, FaChartLine, FaHome, FaClock } from 'react-icons/fa'

export function HomeValueForm({ initialAddress = '' }: { initialAddress?: string }) {
  const [form, setForm] = useState({
    address: initialAddress,
    city: '',
    zip: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [estimating, setEstimating] = useState(false)
  const [suggestions, setSuggestions] = useState<Array<{ label: string; street: string; city: string; zip: string }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestRef = useRef<HTMLDivElement>(null)
  const [estimate, setEstimate] = useState<null | {
    low: number
    high: number
    midpoint: number
    confidence: 'low' | 'medium'
    narrative: string
    assumptions: string[]
    dataPoints: string[]
  }>(null)

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!suggestRef.current) return
      if (!suggestRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    const query = form.address?.trim()
    if (!query || query.length < 4) {
      setSuggestions([])
      return
    }

    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/address-autocomplete?q=${encodeURIComponent(query)}`)
        const json = await res.json()
        setSuggestions(json.results || [])
        setShowSuggestions(true)
      } catch {
        setSuggestions([])
      }
    }, 300)

    return () => clearTimeout(t)
  }, [form.address])

  const getInstantEstimate = async (payload?: typeof form) => {
    const source = payload || form
    if (!source.address || !source.city) return
    setEstimating(true)
    try {
      const res = await fetch('/api/home-value/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(source),
      })
      if (!res.ok) throw new Error('Estimate request failed')
      const json = await res.json()
      setEstimate(json.estimate)
    } catch {
      setEstimate(null)
    } finally {
      setEstimating(false)
    }
  }

  const selectSuggestion = async (s: { label: string; street: string; city: string; zip: string }) => {
    const next = {
      address: s.street || s.label,
      city: s.city || '',
      zip: s.zip || '',
    }
    setForm(next)
    setShowSuggestions(false)
    setSuggestions([])
    await getInstantEstimate(next)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.address.trim()) return

    try {
      await fetch('/api/home-value', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
    } catch {
      // Best-effort; show success regardless
    }

    setSubmitted(true)
  }

  const toMoney = (n: number) => `$${Math.round(n).toLocaleString()}`

  return (
    <section className="section-padding bg-cream">
      <div className="container-lg">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            <div className="bg-white p-8 shadow-card">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <FaCheckCircle className="text-gold text-3xl" />
                  </div>
                  <h2 className="font-serif text-3xl text-navy font-bold mb-3">Request Received</h2>
                  <p className="text-charcoal-muted mb-6">
                    Thanks — Candee will review your address and follow up with a personalized home valuation.
                  </p>
                  <Link href="/" className="btn-navy">
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-serif text-2xl text-navy font-bold mb-1">Get Your Home Value</h2>
                  <p className="text-charcoal-muted text-sm mb-6">
                    Enter your street address below. That&apos;s all we need.
                  </p>

                  <div className="relative" ref={suggestRef}>
                    <label htmlFor="hv-address" className="form-label">Street Address *</label>
                    <input
                      id="hv-address"
                      name="address"
                      value={form.address}
                      onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                      className="form-input"
                      placeholder="123 Main St"
                      autoComplete="street-address"
                      required
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 shadow-lg max-h-56 overflow-auto">
                        {suggestions.map((s) => (
                          <button
                            key={s.label}
                            type="button"
                            onClick={() => selectSuggestion(s)}
                            className="w-full text-left px-3 py-2 text-sm hover:bg-cream"
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {estimate && (
                    <div className="bg-cream border border-gold/40 p-4 rounded-sm">
                      <p className="text-xs uppercase tracking-wider text-navy/70 mb-1">Preliminary Value Range</p>
                      <p className="font-serif text-2xl text-navy font-bold">
                        {toMoney(estimate.low)} - {toMoney(estimate.high)}
                      </p>
                      <p className="text-xs text-charcoal-muted mt-2">{estimate.narrative}</p>
                    </div>
                  )}

                  <button type="submit" className="btn-gold w-full" disabled={!form.address.trim() || estimating}>
                    {estimating ? 'Generating Estimate…' : 'Get My Home Value'}
                  </button>

                  <p className="text-gray-400 text-xs text-center">No spam. No obligation.</p>
                </form>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-navy p-6">
              <h3 className="font-serif text-xl text-white font-bold mb-4">What You&apos;ll Receive</h3>
              <ul className="space-y-3">
                {[
                  'Comparable sales in your specific neighborhood',
                  'Active competition — what buyers are weighing',
                  'Price range and optimal list price recommendation',
                  'Suggested improvements that boost value vs. ROI',
                  'Timing strategy for your market conditions',
                  "Candee's personal guidance — not a robot",
                ].map((item) => (
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
                  { icon: FaClock, number: '12d', label: 'Avg. DOM' },
                  { icon: FaChartLine, number: '101%', label: 'Sale/List' },
                ].map((s) => (
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
