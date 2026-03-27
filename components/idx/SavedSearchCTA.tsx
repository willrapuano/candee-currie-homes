'use client'

import { useState } from 'react'
import { FaBell, FaEnvelope } from 'react-icons/fa'

interface Props {
  city?: string
  minPrice?: number
  maxPrice?: number
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
    notation: 'compact',
    compactDisplay: 'short',
  }).format(price)
}

export function SavedSearchCTA({ city, minPrice, maxPrice }: Props) {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    // Simulate API call — in production this goes to GHL/Repliers saved search
    await new Promise((r) => setTimeout(r, 900))
    setSubmitted(true)
    setLoading(false)
  }

  return (
    <section className="bg-navy py-16">
      <div className="container-xl">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-14 h-14 bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <FaBell className="text-gold text-2xl" />
          </div>

          <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-3">
            Property Tracker
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-3">
            Never Miss a Listing
          </h2>
          <p className="text-white/70 mb-8">
            {city && minPrice && maxPrice ? (
              <>
                Get instant alerts for homes in <strong className="text-white">{city}</strong> priced 
                between <strong className="text-white">{formatPrice(minPrice)}</strong> and{' '}
                <strong className="text-white">{formatPrice(maxPrice)}</strong> — delivered to your inbox 
                the moment they hit the market.
              </>
            ) : (
              <>
                Get instant email alerts when new homes hit the market in Northern Virginia.
                Be the first to know — before Zillow.
              </>
            )}
          </p>

          {submitted ? (
            <div className="bg-gold/10 border border-gold/30 p-6 text-center">
              <FaEnvelope className="text-gold text-3xl mx-auto mb-3" />
              <h3 className="font-serif text-xl text-white font-bold mb-2">You&apos;re Subscribed!</h3>
              <p className="text-white/70 text-sm">
                Candee will reach out to confirm your search criteria and fine-tune your alerts.
                Check your inbox for a confirmation.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="flex-1 px-5 py-4 text-charcoal placeholder:text-gray-400 bg-white
                           focus:outline-none focus:ring-2 focus:ring-gold text-base"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-gold whitespace-nowrap px-8 py-4 disabled:opacity-60"
              >
                {loading ? 'Setting Up...' : 'Get Alerts'}
              </button>
            </form>
          )}

          <p className="text-white/30 text-xs mt-4">
            No spam. Unsubscribe anytime. Candee may follow up to customize your search.
          </p>
        </div>
      </div>
    </section>
  )
}
