import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { StatsBar } from '@/components/home/StatsBar'
import { NeighborhoodsGrid } from '@/components/home/NeighborhoodsGrid'
import { AboutSection } from '@/components/home/AboutSection'
import { Testimonials } from '@/components/home/Testimonials'
import { BlogSection } from '@/components/home/BlogSection'
import { ContactSection } from '@/components/home/ContactSection'
import { HomeValueCTA } from '@/components/home/HomeValueCTA'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export const metadata: Metadata = {
  title: 'Arlington & Northern Virginia Real Estate | Candee Currie | TTR Sotheby\'s',
  description:
    "Candee Currie — TTR Sotheby's Associate Broker. 14+ years, 241 transactions, $105M+ volume. Arlington, McLean, Falls Church & Alexandria real estate expert. Free home valuation.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Candee Currie | Arlington & Northern Virginia Real Estate',
    description: 'TTR Sotheby\'s Associate Broker. 241 transactions, $105M+ volume. Your Northern Virginia real estate expert.',
    images: [{ url: `${SITE_URL}/images/og-homepage.jpg`, width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — lead gen CTAs, not search bar */}
      <Hero />

      {/* 2. Stats Bar */}
      <StatsBar />

      {/* 3. Primary lead capture — CMA tool */}
      <HomeValueCTA />

      {/* 4. Market authority strip */}
      <section className="section-padding bg-white">
        <div className="container-lg">
          <div className="text-center mb-12">
            <p className="section-label">Market Intelligence</p>
            <h2 className="section-title">Know Your Market Before You Move</h2>
            <div className="gold-divider-center" />
            <p className="text-charcoal-muted max-w-2xl mx-auto mt-4">
              Candee tracks every ZIP code in her market — weekly. Before you price, before you make an offer, before you decide to wait — you need real numbers, not Zillow estimates.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { area: 'Arlington', stat: '$850K', label: 'Median Sale Price', zip: '22201' },
              { area: 'McLean', stat: '$1.35M', label: 'Median Sale Price', zip: '22101' },
              { area: 'Alexandria', stat: '$720K', label: 'Median Sale Price', zip: '22314' },
            ].map(({ area, stat, label, zip }) => (
              <Link
                key={area}
                href={`/market?zip=${zip}`}
                className="group bg-cream border border-gray-100 p-8 hover:border-gold/40 transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-1.5 w-1.5 rounded-full bg-gold" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-navy/50">{area}</span>
                </div>
                <p className="font-serif text-3xl text-navy font-bold">{stat}</p>
                <p className="text-charcoal-muted text-sm mt-1">{label}</p>
                <p className="text-gold text-xs font-semibold mt-4 group-hover:underline">View full market report →</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/market" className="btn-navy">
              View Full NoVA Market Report →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Neighborhoods */}
      <NeighborhoodsGrid />

      {/* 6. About — Candee's credibility */}
      <AboutSection />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Blog */}
      <BlogSection />

      {/* 9. Contact */}
      <ContactSection />
    </>
  )
}
