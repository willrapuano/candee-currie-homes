'use client'

import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'homepage' }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', phone: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title mb-4">Let&apos;s Talk Real Estate</h2>
            <div className="gold-divider" />
            <p className="text-charcoal-muted leading-relaxed mb-10 max-w-lg">
              Whether you&apos;re ready to buy, thinking about selling, or just curious about 
              the market — Candee&apos;s door is always open. No pressure, just expert advice.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy flex items-center justify-center flex-shrink-0">
                  <FaPhone className="text-gold text-sm" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">Phone</p>
                  <a href="tel:+17032036005" className="text-charcoal-muted hover:text-gold transition-colors">
                    (703) 203-6005
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy flex items-center justify-center flex-shrink-0">
                  <FaEnvelope className="text-gold text-sm" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">Email</p>
                  <a href="mailto:ccurrie@ttrsir.com" className="text-charcoal-muted hover:text-gold transition-colors">
                    ccurrie@ttrsir.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-navy flex items-center justify-center flex-shrink-0">
                  <FaMapMarkerAlt className="text-gold text-sm" />
                </div>
                <div>
                  <p className="text-navy font-semibold text-sm">Office</p>
                  <p className="text-charcoal-muted">
                    TTR Sotheby&apos;s International Realty<br />
                    1206 N Washington St<br />
                    Alexandria, VA 22314
                  </p>
                </div>
              </div>
            </div>

            {/* Google Maps embed */}
            <div className="mt-10 aspect-[4/3] bg-gray-100 overflow-hidden border border-gray-200">
              <iframe
                src="https://maps.google.com/maps?q=1206+N+Washington+St%2C+Alexandria%2C+VA+22314&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TTR Sotheby's International Realty — 1206 N Washington St, Alexandria VA"
              />
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-cream p-8 md:p-10">
            <h3 className="font-serif text-2xl text-navy font-bold mb-2">
              Send Candee a Message
            </h3>
            <p className="text-charcoal-muted text-sm mb-8">
              Typical response time: within a few hours.
            </p>

            {status === 'sent' ? (
              <div className="bg-green-50 border border-green-200 text-green-800 p-6 text-center">
                <p className="font-semibold text-lg mb-1">Message Received! 🎉</p>
                <p className="text-sm">Candee will be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="form-label">Name *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="form-label">Phone</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(703) 555-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-email" className="form-label">Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-interest" className="form-label">How can Candee help?</label>
                  <select id="contact-interest" name="interest" onChange={handleChange} className="form-input">
                    <option value="">Select one...</option>
                    <option value="buy">I want to buy a home</option>
                    <option value="sell">I want to sell my home</option>
                    <option value="value">I want to know my home value</option>
                    <option value="invest">Investment property</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-message" className="form-label">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="form-input min-h-[120px] resize-y"
                    placeholder="Tell Candee about your real estate needs..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-gold w-full disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                {status === 'error' && (
                  <p className="text-red-600 text-sm text-center">
                    Something went wrong. Please try again or call directly.
                  </p>
                )}

                <p className="text-gray-400 text-xs text-center">
                  Your info is never sold. Candee will only use it to contact you.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
