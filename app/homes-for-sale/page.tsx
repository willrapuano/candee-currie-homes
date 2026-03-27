import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ListingSearch } from '@/components/idx/ListingSearch'
import { SavedSearchCTA } from '@/components/idx/SavedSearchCTA'
import { getBreadcrumbSchema } from '@/lib/schema-org'

export const metadata: Metadata = {
  title: 'Homes for Sale in Northern Virginia | Arlington VA Real Estate | Candee Currie',
  description:
    'Search active listings in Arlington, McLean, Falls Church, Alexandria and surrounding Northern Virginia communities. Filter by price, beds, baths, and more. Updated daily from BrightMLS.',
  alternates: { canonical: '/homes-for-sale' },
  openGraph: {
    title: 'Northern Virginia Homes for Sale | Candee Currie',
    description: 'Search all available homes in Arlington, McLean, Falls Church, and Alexandria VA.',
  },
}

interface Props {
  searchParams: { q?: string }
}

export default function HomesForSalePage({ searchParams }: Props) {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Homes for Sale', url: '/homes-for-sale' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-[72px] min-h-screen bg-cream">
        {/* Page header */}
        <section className="bg-navy py-12">
          <div className="container-xl">
            <p className="section-label">BrightMLS · Updated Daily</p>
            <h1 className="font-serif text-4xl md:text-5xl text-white font-bold mb-3">
              Northern Virginia Homes for Sale
            </h1>
            <div className="w-16 h-0.5 bg-gold" />
            <p className="text-white/60 text-sm mt-3">
              Arlington · McLean · Falls Church · Alexandria · Reston · Vienna · Great Falls
            </p>
          </div>
        </section>

        {/* Interactive IDX search */}
        <Suspense fallback={
          <div className="container-xl py-20 text-center text-charcoal-muted">
            Loading listings...
          </div>
        }>
          <ListingSearch initialQuery={searchParams.q || ''} />
        </Suspense>

        {/* Saved search CTA */}
        <SavedSearchCTA />
      </div>
    </>
  )
}
