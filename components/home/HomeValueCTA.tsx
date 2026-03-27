'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export function HomeValueCTA() {
  const router = useRouter()
  const [address, setAddress] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/home-value?address=${encodeURIComponent(address)}`)
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
          alt="Northern Virginia luxury home"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy/85" />
      </div>

      <div className="relative container-xl">
        <div className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10 bg-gold" />
            <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
              Free Analysis
            </span>
            <div className="h-px w-10 bg-gold" />
          </div>

          <h2 className="font-serif text-4xl md:text-5xl text-white font-bold mb-4">
            What&apos;s Your Home Worth?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            Get a comprehensive Comparative Market Analysis from Candee — 
            personalized to your home, your neighborhood, and today&apos;s market. 
            No obligation. Just expert insight.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-0 shadow-gold">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your property address"
              className="flex-1 px-6 py-4 text-charcoal placeholder:text-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-gold text-base bg-white"
              required
            />
            <button
              type="submit"
              className="bg-gold hover:bg-gold/90 text-navy font-bold px-8 py-4
                         transition-colors duration-200 whitespace-nowrap tracking-wider uppercase text-sm"
            >
              Get My Value
            </button>
          </form>

          <p className="text-white/40 text-xs mt-4">
            By submitting, you agree to be contacted by Candee Currie. 
            Your information is never shared or sold.
          </p>

          {/* Trust signals */}
          <div className="flex justify-center gap-8 mt-10 pt-10 border-t border-white/10">
            {[
              { label: '241', sub: 'Homes Sold' },
              { label: '$105M+', sub: 'Volume' },
              { label: '14 yrs', sub: 'Experience' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-serif text-2xl font-bold text-gold">{item.label}</p>
                <p className="text-white/50 text-xs tracking-wider uppercase mt-0.5">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
