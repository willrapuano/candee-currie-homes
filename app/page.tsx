import type { Metadata } from 'next'
import { Hero } from '@/components/home/Hero'
import { FeaturedListings } from '@/components/home/FeaturedListings'
import { StatsBar } from '@/components/home/StatsBar'
import { NeighborhoodsGrid } from '@/components/home/NeighborhoodsGrid'
import { AboutSection } from '@/components/home/AboutSection'
import { Testimonials } from '@/components/home/Testimonials'
import { ReviewBadges } from '@/components/home/ReviewBadges'
import { BlogSection } from '@/components/home/BlogSection'
import { HomeValueCTA } from '@/components/home/HomeValueCTA'
import { SEOContentBlock } from '@/components/home/SEOContentBlock'
import { ContactSection } from '@/components/home/ContactSection'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export const metadata: Metadata = {
  title: 'Arlington & Northern Virginia Real Estate | Candee Currie | TTR Sotheby\'s',
  description:
    "Search Arlington, McLean, Falls Church & Alexandria homes for sale. Candee Currie — TTR Sotheby's Associate Broker, 14+ years, 241 transactions, $105M+ volume. Call today.",
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Candee Currie | Arlington & Northern Virginia Real Estate',
    description: 'TTR Sotheby\'s Associate Broker. 241 transactions, $105M+ volume. Your Arlington real estate expert.',
    images: [{ url: `${SITE_URL}/images/og-homepage.jpg`, width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      {/* 1. Hero — full-bleed photo, IDX search bar, CTAs */}
      <Hero />

      {/* 2. Stats Bar — $105M+, 241 homes sold, 5.0★ */}
      <StatsBar />

      {/* 3. Featured Listings — luxury + NoVA listings */}
      <FeaturedListings />

      {/* 4. Neighborhoods Grid — Explore Arlington & NoVA */}
      <NeighborhoodsGrid />

      {/* 5. About Section — Candee's photo, bio, credentials */}
      <AboutSection />

      {/* 6. Testimonials Carousel — The Candee Currie Difference */}
      <Testimonials />

      {/* 7. Review Badges — 241 Families, 5-star across platforms */}
      <ReviewBadges />

      {/* 8. Blog Section — Recently from Our Blog */}
      <BlogSection />

      {/* 9. Home Value CTA — Thinking About Selling? */}
      <HomeValueCTA />

      {/* 10. SEO Content Block — Arlington VA Real Estate */}
      <SEOContentBlock />

      {/* 11. Contact Section */}
      <ContactSection />
    </>
  )
}
