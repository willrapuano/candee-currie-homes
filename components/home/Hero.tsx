'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1920&q=85"
          alt="Northern Virginia luxury homes — Arlington, McLean, Falls Church, Alexandria"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy/60 to-transparent" />
      </div>

      <div className="relative container-xl pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center px-4 sm:px-6">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="hidden md:block h-px w-10 bg-gold" />
          <span className="text-gold text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase text-center">
            TTR Sotheby&apos;s International Realty
          </span>
          <div className="hidden md:block h-px w-10 bg-gold" />
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold leading-tight md:leading-tight text-balance mb-4 md:mb-6">
          Your Northern Virginia
          <br className="hidden sm:block" />
          {' '}<span className="text-gold">Real Estate Expert</span>
        </h1>

        {/* Subheadline */}
        <p className="text-white/80 text-sm sm:text-base md:text-xl max-w-2xl leading-relaxed mb-6 md:mb-8 px-2">
          Candee Currie — Associate Broker at TTR Sotheby&apos;s. 14 years. 241 transactions. $105M+ volume.
          <span className="hidden md:inline"> </span>
          <br className="md:hidden" />
          Arlington, McLean, Falls Church, Alexandria.
        </p>

        {/* Social proof micro-line */}
        <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 mb-10 text-white/60 text-[11px] sm:text-sm">
          <span>⭐ 5.0 across 40+ reviews</span>
          <span className="hidden sm:block h-3 w-px bg-white/20" />
          <span>241 closed transactions</span>
          <span className="hidden sm:block h-3 w-px bg-white/20" />
          <span>$105M+ volume</span>
        </div>

        {/* Primary CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto">
          <Link href="/home-value" className="btn-gold text-sm sm:text-base px-8 py-4 w-full sm:w-auto text-center">
            What&apos;s My Home Worth? →
          </Link>
          <Link href="/contact" className="btn-outline-white text-sm sm:text-base px-8 py-4 w-full sm:w-auto text-center">
            Talk to Candee
          </Link>
        </div>

        {/* Secondary nav */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 mt-10 md:mt-12 text-[10px] sm:text-xs text-white/50 tracking-wider uppercase">
          <Link href="/neighborhoods" className="hover:text-gold transition-colors">Browse Neighborhoods</Link>
          <span className="hidden sm:block h-3 w-px bg-white/20 self-center" />
          <Link href="/market" className="hover:text-gold transition-colors">NoVA Market Report</Link>
          <span className="hidden sm:block h-3 w-px bg-white/20 self-center" />
          <Link href="/contact" className="hover:text-gold transition-colors">Work With Candee</Link>
        </div>
      </div>
    </section>
  )
}
