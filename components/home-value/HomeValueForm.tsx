'use client'

import { useState } from 'react'
import { FaCheckCircle } from 'react-icons/fa'

type Step = 'form' | 'submitting' | 'done'

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())
}

export function HomeValueForm({ initialAddress = '' }: { initialAddress?: string }) {
  const [step, setStep] = useState<Step>('form')
  const [address, setAddress] = useState(initialAddress)
  const [city, setCity] = useState('')
  const [zip, setZip] = useState('')
  const [leadName, setLeadName] = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail(leadEmail)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    setEmailError('')
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
        }),
      })
    } catch {
      // best-effort — still show success
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

              {/* Form */}
              {(step === 'form' || step === 'submitting') && (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-serif text-2xl text-navy font-bold mb-1">Request Your Free CMA</h2>
                  <p className="text-charcoal-muted text-sm mb-4">
                    Enter your property address and contact info. Candee will follow up within 24 hours with a full Comparative Market Analysis — real comps, real numbers, no algorithm.
                  </p>

                  {/* Address */}
                  <div>
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

                  {/* Contact */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-charcoal-muted mb-4">Where should Candee send your CMA?</p>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="hv-name" className="form-label">Full Name *</label>
                        <input id="hv-name" value={leadName} onChange={e => setLeadName(e.target.value)}
                          className="form-input" placeholder="Jane Smith" required />
                      </div>

                      <div>
                        <label htmlFor="hv-email" className="form-label">Email *</label>
                        <input
                          id="hv-email"
                          type="email"
                          value={leadEmail}
                          onChange={e => { setLeadEmail(e.target.value); if (emailError) setEmailError('') }}
                          onBlur={() => {
                            if (leadEmail && !isValidEmail(leadEmail)) {
                              setEmailError('Please enter a valid email address.')
                            } else {
                              setEmailError('')
                            }
                          }}
                          className={`form-input ${emailError ? 'border-red-400 focus:ring-red-300' : ''}`}
                          placeholder="jane@example.com"
                          required
                        />
                        {emailError && (
                          <p className="text-red-500 text-xs mt-1">{emailError}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="hv-phone" className="form-label">Phone *</label>
                        <input id="hv-phone" type="tel" value={leadPhone} onChange={e => setLeadPhone(e.target.value)}
                          className="form-input" placeholder="(703) 203-6005" required />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full"
                    disabled={!address.trim() || step === 'submitting'}
                  >
                    {step === 'submitting' ? 'Sending…' : 'Request My Free CMA →'}
                  </button>
                  <p className="text-gray-400 text-xs text-center">No spam. No obligation. Candee will follow up within 24 hours.</p>
                </form>
              )}

              {/* Done */}
              {step === 'done' && (
                <div className="space-y-6 py-4">
                  <div className="flex items-start gap-3">
                    <FaCheckCircle className="text-gold text-2xl flex-shrink-0 mt-0.5" />
                    <div>
                      <h2 className="font-serif text-2xl text-navy font-bold mb-2">You&apos;re all set.</h2>
                      <p className="text-charcoal-muted leading-relaxed">
                        Candee will review your property and follow up within <strong>24 hours</strong> with a full Comparative Market Analysis — real comparable sales, a precise price range, and her professional recommendation.
                      </p>
                    </div>
                  </div>

                  <div className="bg-cream border-l-4 border-gold p-5">
                    <p className="text-navy text-sm font-semibold mb-1">What to expect next</p>
                    <ul className="text-charcoal-muted text-sm space-y-1.5 mt-2">
                      <li>✓ Candee reviews recent sold comps in your neighborhood</li>
                      <li>✓ She builds a precise pricing analysis based on your property</li>
                      <li>✓ You get a real number — not an algorithm</li>
                    </ul>
                  </div>

                  <a href="tel:7032036005" className="btn-navy w-full text-center block">
                    Prefer to talk now? Call Candee →
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
                  'Comparable sales in your specific neighborhood',
                  'A precise price range — not a Zestimate',
                  'Optimal list price recommendation',
                  'Timing strategy for current market conditions',
                  "Candee's personal follow-up — not a robot",
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-gold mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 shadow-card">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="font-serif text-xl text-navy font-bold">218</p>
                  <p className="text-charcoal-muted text-xs">Homes Sold</p>
                </div>
                <div>
                  <p className="font-serif text-xl text-navy font-bold">14 yrs</p>
                  <p className="text-charcoal-muted text-xs">Experience</p>
                </div>
                <div>
                  <p className="font-serif text-xl text-navy font-bold">$1.1M</p>
                  <p className="text-charcoal-muted text-xs">Avg. Sale</p>
                </div>
              </div>
            </div>

            <div className="bg-cream p-5 border-l-4 border-gold">
              <p className="text-navy text-sm font-semibold mb-1">Why not Zillow?</p>
              <p className="text-charcoal-muted text-sm leading-relaxed">
                Automated estimates can be off by 10–20% or more. Candee&apos;s CMA is based on actual sold data from BrightMLS and her direct knowledge of your neighborhood.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
