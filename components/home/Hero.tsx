'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=85"
          alt="Northern Virginia skyline and luxury homes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-hero-overlay" />
        {/* Bottom gradient for text legibility */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container-xl pt-32 pb-24 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6 animate-fade-in">
          <div className="h-px w-10 bg-gold" />
          <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
            TTR Sotheby&apos;s International Realty
          </span>
          <div className="h-px w-10 bg-gold" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight text-balance mb-4 animate-slide-up"
          style={{ animationDelay: '0.1s' }}>
          Arlington &amp; Northern Virginia
          <br />
          <span className="text-gold">Real Estate</span>
        </h1>

        {/* Subheadline */}
        <p className="text-white/80 text-lg md:text-xl max-w-2xl leading-relaxed mb-10 animate-slide-up"
          style={{ animationDelay: '0.2s' }}>
          Candee Currie — Associate Broker, 14+ years of expertise, 241 transactions.
          <br className="hidden md:block" />
          Let&apos;s find your next home.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/homes-for-sale" className="btn-gold">View Available Homes</Link>
          <Link href="/home-value" className="btn-navy-outline">What&apos;s My Home Worth?</Link>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            { label: 'Arlington', href: '/neighborhoods/arlington' },
            { label: 'McLean', href: '/neighborhoods/mclean' },
            { label: 'Falls Church', href: '/neighborhoods/falls-church' },
            { label: 'Alexandria', href: '/neighborhoods/alexandria' },
            { label: 'All Areas', href: '/neighborhoods' },
          ].map((area) => (
            <Link
              key={area.href}
              href={area.href}
              className="text-white/70 hover:text-gold text-xs font-medium border border-white/20 hover:border-gold/40
                         px-4 py-2 transition-all duration-200 backdrop-blur-sm"
            >
              {area.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  )
}
