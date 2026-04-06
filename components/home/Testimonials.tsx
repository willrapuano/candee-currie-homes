'use client'

import { useState } from 'react'
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa'
import { TESTIMONIALS } from '@/data/testimonials'

export function Testimonials() {
  const [active, setActive] = useState(0)
  const current = TESTIMONIALS[active]

  
  if (TESTIMONIALS.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-xl text-center">
          <p className="section-label">What Clients Say</p>
          <h2 className="section-title">5-Star Reviews</h2>
          <div className="gold-divider-center" />
          <p className="text-charcoal-muted mt-8">Client testimonials coming soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label">What Clients Say</p>
          <h2 className="section-title">5-Star Reviews</h2>
          <div className="gold-divider-center" />
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1,2,3,4,5].map((s) => (
              <FaStar key={s} className="text-gold text-xl" />
            ))}
            <span className="ml-2 font-serif text-2xl font-bold text-navy">5.0</span>
            <span className="text-charcoal-muted text-sm ml-1">on Google</span>
          </div>
        </div>

        {/* Featured testimonial */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative bg-cream p-8 md:p-12">
            {/* Quote mark */}
            <FaQuoteLeft className="text-gold/20 text-7xl absolute top-6 left-8" />

            {/* Stars */}
            <div className="flex items-center gap-1 mb-4 relative z-10">
              {Array.from({ length: current.rating }).map((_, i) => (
                <FaStar key={i} className="text-gold text-sm" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-xl md:text-2xl text-navy leading-relaxed mb-8 relative z-10">
              &ldquo;{current.text}&rdquo;
            </blockquote>

            {/* Attribution */}
            <div className="flex items-center justify-between relative z-10">
              <div>
                <p className="font-semibold text-navy">{current.name}</p>
                <p className="text-charcoal-muted text-sm">
                  {current.neighborhood}
                  {current.transaction && (
                    <span className="ml-2 text-gold capitalize">· {current.transaction}</span>
                  )}
                </p>
              </div>
              {current.source === 'google' && (
                <div className="flex items-center gap-1.5 text-charcoal-muted">
                  <FaGoogle className="text-blue-500 text-sm" />
                  <span className="text-xs">Google Review</span>
                </div>
              )}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`carousel-dot transition-all duration-300 ${idx === active ? 'active' : ''}`}
                aria-label={`Review ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mini cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.slice(0, 3).map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setActive(idx)}
              className={`text-left p-5 border-2 transition-all duration-200 
                ${active === idx ? 'border-gold bg-gold/5' : 'border-gray-100 hover:border-gold/30'}`}
            >
              <div className="flex items-center gap-0.5 mb-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} className="text-gold text-xs" />
                ))}
              </div>
              <p className="text-charcoal text-sm line-clamp-2 mb-2">
                &ldquo;{t.text}&rdquo;
              </p>
              <p className="text-navy font-semibold text-xs">{t.name}</p>
              <p className="text-charcoal-muted text-xs">{t.neighborhood}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
