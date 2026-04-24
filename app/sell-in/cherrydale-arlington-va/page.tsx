import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a Home in Cherrydale, Arlington VA | Candee Currie — Neighborhood Expert',
  description:
    'Thinking of selling your Cherrydale home? Get neighborhood-specific market data, pricing strategy, and expert guidance from Candee Currie. Cherrydale has 390 monthly searches — let us help you capture buyer interest.',
  keywords: [
    'selling a home in Cherrydale Arlington VA',
    'Cherrydale Arlington VA real estate',
    'Cherrydale neighborhood homes for sale',
    'Cherrydale VA home value',
    'sell my home Cherrydale Arlington',
    'Cherrydale realtor',
  ],
  alternates: { canonical: '/sell-in/cherrydale-arlington-va' },
  openGraph: {
    title: 'Selling a Home in Cherrydale, Arlington VA | Candee Currie',
    description:
      'Expert guidance for selling your Cherrydale, Arlington home. Neighborhood-specific market insights and proven results.',
    url: 'https://candeecurriehomes.com/sell-in/cherrydale-arlington-va',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a home in Cherrydale, Arlington VA? Get expert pricing, staging, and marketing guidance.',
  url: 'https://candeecurriehomes.com/sell-in/cherrydale-arlington-va',
  areaServed: {
    '@type': 'Neighborhood',
    name: 'Cherrydale',
    containedInPlace: {
      '@type': 'City',
      name: 'Arlington',
      state: 'Virginia',
    },
  },
}

export default function CherrydaleSellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pt-20">
        {/* ===== HERO ===== */}
        <section className="relative py-20 bg-navy">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <nav className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
                  <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                  <li>/</li>
                  <li><Link href="/sell" className="hover:text-gold transition-colors">Seller Hub</Link></li>
                  <li>/</li>
                  <li className="text-gold">Cherrydale, Arlington</li>
                </ol>
              </nav>

              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">
                Cherrydale — Arlington, Virginia
              </span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                Selling a Home in Cherrydale, Arlington VA
              </h1>

              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
                Cherrydale is one of North Arlington&apos;s most sought-after neighborhoods — with a strong community feel, 
                tree-lined streets, and proximity to everything. Here&apos;s what you need to know to sell at top dollar.
              </p>
            </div>
          </div>
        </section>

        {/* ===== MARKET CONTEXT ===== */}
        <section className="section-padding bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <h2 className="font-serif text-3xl text-navy font-bold mb-6">
                    Why Cherrydale Homes Sell — And How to Position Yours
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Cherrydale, nestled along Lee Highway between Clarendon and East Falls Church, is one of North Arlington&apos;s most established residential neighborhoods. The area draws buyers with its walkable access to local shops and restaurants along Lee Highway, proximity to the W&OD Trail, top-rated Arlington schools, and the easy commute to Washington, D.C. and the Pentagon.
                  </p>

                  <p className="text-charcoal-muted leading-relaxed">
                    Homes in Cherrydale — primarily detached single-family homes built in the 1940s–1960s, with some newer infill construction — appeal to a wide range of buyers. The neighborhood&apos;s central location means you&apos;re not just selling to Arlington locals; you&apos;re attracting buyers from Alexandria, Fairfax, and D.C. who want the Arlington lifestyle.
                  </p>

                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">
                      Cherrydale Market Snapshot — 2026
                    </h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Typical home type:</strong> Detached single-family (1940s–1960s) + newer infill</li>
                      <li>• <strong>Median sale price:</strong> $750,000–$950,000 (varies by lot size and updates)</li>
                      <li>• <strong>Average days on market:</strong> 10–15 days for well-priced homes</li>
                      <li>• <strong>Buyer demand:</strong> Very high — Cherrydale searches generate 390+ monthly queries</li>
                      <li>• <strong>Appreciation:</strong> Consistent 4–6% annual growth in North Arlington</li>
                    </ul>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    What Cherrydale Buyers Are Looking For
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    The typical Cherrydale buyer is a household earning $150K+, often with children in or approaching school age, or a D.C./Pentagon professional seeking a shorter commute. Here&apos;s what they prioritize:
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Outdoor Space & Lot Size</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Cherrydale is known for larger lots compared to Clarendon or Courthouse. A private, fenced backyard is a major selling point. Buyers here want space for dogs, kids, and entertaining. If your lot is a standout, feature it prominently in photos.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Updated Kitchens & Bathrooms</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Many Cherrydale homes are 60–80 years old. Buyers expect updated kitchens with modern appliances, quartz or granite counters, and renovated bathrooms. Even a cosmetic refresh (new hardware, paint, lighting) pays for itself in this market.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Proximity to Schools & Transit</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Families are drawn to Cherrydale for the proximity to Nottingham Elementary School and Swanson Middle School. Commuters value the quick access to Route 50, Lee Highway, and the East Falls Church Metro. Being within walking distance of these is a significant price driver.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Walkable Lifestyle Amenities</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Cherrydale has an emerging commercial corridor along Lee Highway with restaurants, shops, and the Cherrydale Library. Buyers who want a neighborhood feel without sacrificing walkability are increasingly choosing Cherrydale over pricier Clarendon.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    Common Mistakes Cherrydale Home Sellers Make
                  </h2>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Pricing Based on Zestimate, Not Market Data</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Cherrydale homes vary wildly in condition — a renovated 1950s Cape Cod might sell for $900K while an original-condition home on the same block goes for $650K. Zestimate can&apos;t account for your updates. Candee provides a data-driven comparative market analysis that factors in condition, upgrades, and current demand.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Not Staging the Home</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Cherrydale buyers are comparing your home to new construction and fully renovated properties in nearby neighborhoods. A staged home — whether with your furniture (decluttered and modernized) or professional staging — significantly outperforms empty or cluttered homes.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Ignoring the Backyard</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Your yard is one of Cherrydale&apos;s biggest selling points. Make sure the outdoor space is as presentable as the interior — trimmed lawn, clean hardscaping, outdoor furniture staging for photos. This is where Cherrydale homes differentiate from Courthouse condos.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    The Process — Selling Your Cherrydale Home with Candee
                  </h2>

                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'Free Neighborhood-Specific Valuation', desc: 'Get a valuation based on recent Cherrydale comps — not a ZIP-code average. Know what your specific home is worth.' },
                      { step: 2, title: 'In-Home Consultation', desc: 'Candee walks through your property, identifies pre-listing improvements, staging opportunities, and sets a data-based pricing strategy.' },
                      { step: 3, title: 'Professional Photography & Staging', desc: 'High-quality photos, video, and optional staging. Cherrydale homes with professional media sell 30% faster.' },
                      { step: 4, title: 'Targeted Marketing', desc: 'Beyond MLS — digital campaigns targeting Cherrydale searchers, social media, Sotheby\'s global network, and neighborhood-specific outreach.' },
                      { step: 5, title: 'Showings & Offers', desc: 'Coordinated showings, skilled negotiation, and strategic offer management to maximize your sale price.' },
                      { step: 6, title: 'Closing', desc: 'Full coordination through inspection, appraisal, and settlement. Candee handles the details so you don\'t have to.' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-serif text-lg text-navy font-bold mb-1">{item.title}</h3>
                          <p className="text-charcoal-muted text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* ===== FAQ SECTION ===== */}
                <div className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="font-serif text-3xl text-navy font-bold mb-8">
                    Frequently Asked Questions — Selling in Cherrydale
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How long does it take to sell a home in Cherrydale, Arlington?',
                        a: 'Well-priced Cherrydale homes typically sell within 10–15 days. The neighborhood\'s central location, good school access, and limited inventory create strong buyer demand year-round. Homes that sit longer usually have pricing or condition issues.',
                      },
                      {
                        q: 'What is my Cherrydale home worth?',
                        a: 'Home values in Cherrydale range from $650K–$950K+ depending on lot size, square footage, condition, and updates. A Zestimate won\'t capture the nuances of your specific property. Candee offers free, neighborhood-specific valuations based on recent Cherrydale comps. Start with our free home valuation tool.',
                      },
                      {
                        q: 'Should I renovate before selling my Cherrydale home?',
                        a: 'Not always. If your home has original 1950s–60s features, even a cosmetic kitchen refresh (new counters, hardware, paint) and bathroom updates can add $30K–$50K to the sale price. Candee recommends focusing on kitchens, bathrooms, and paint — these have the highest ROI in Cherrydale.',
                      },
                      {
                        q: 'Is Cherrydale a good neighborhood for first-time sellers?',
                        a: 'Absolutely. Cherrydale\'s strong demand means even first-time sellers are likely to receive multiple offers if priced correctly. Candee specializes in guiding first-time sellers through the entire process — from valuation to closing.',
                      },
                      {
                        q: 'How does selling in Cherrydale compare to nearby neighborhoods like Lyon Village or Westover?',
                        a: 'Cherrydale homes tend to have larger lots than Westover and more affordable prices than Lyon Village, making them attractive to a broader buyer pool. Lyon Village is known for historic charm and commands a premium, while Cherrydale offers more value per square foot. Candee can help you position your home relative to comparable neighborhoods.',
                      },
                    ].map((faq, i) => (
                      <details key={i} className="border border-gray-200 rounded-lg p-6 not-prose">
                        <summary className="font-serif text-lg text-navy font-semibold cursor-pointer">
                          {faq.q}
                        </summary>
                        <p className="text-charcoal-muted mt-3 leading-relaxed">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>

                {/* ===== CTA BOX ===== */}
                <div className="mt-12 p-8 bg-cream border-l-4 border-gold rounded-lg not-prose">
                  <h3 className="font-serif text-2xl text-navy font-bold mb-4">
                    Thinking of Selling in Cherrydale?
                  </h3>
                  <p className="text-charcoal-muted mb-6">
                    Get a free, no-obligation valuation of your Cherrydale home. Candee provides neighborhood-specific 
                    pricing data based on recent Cherrydale comps — not a ZIP-code average.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/home-value" className="btn-gold text-center block">
                      Get My Free Home Valuation
                    </Link>
                    <Link href="/contact" className="btn-outline text-center block">
                      Schedule a Consultation
                    </Link>
                  </div>
                </div>
              </div>

              {/* ===== SIDEBAR ===== */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  {/* Candee Profile Card */}
                  <div className="bg-cream p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center">
                        <span className="text-gold font-serif text-2xl font-bold">CC</span>
                      </div>
                      <div>
                        <p className="font-serif text-lg text-navy font-semibold">Candee Currie</p>
                        <p className="text-sm text-charcoal-muted">Associate Broker</p>
                      </div>
                    </div>
                    <p className="text-sm text-charcoal-muted mb-4">
                      TTR Sotheby&apos;s International Realty. Arlington resident 20+ years. 
                      218 seller-side transactions. Cherrydale area specialist.
                    </p>
                    <Link href="/contact" className="btn-outline w-full text-center block">
                      Contact Candee
                    </Link>
                  </div>

                  {/* Quick CTA */}
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      What is your Cherrydale home worth?
                    </p>
                    <Link href="/home-value" className="btn-gold w-full block">
                      Get a Free Valuation
                    </Link>
                  </div>

                  {/* Related Pages */}
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="font-serif text-lg text-navy font-semibold mb-4">
                      More Cherrydale Selling Resources
                    </h3>
                    <ul className="space-y-3">
                      <li>
                        <Link href="/sell/arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling a Home in Arlington, VA
                        </Link>
                      </li>
                      <li>
                        <Link href="/market/arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Arlington VA Market Report
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/best-neighborhoods-arlington-va-families" className="text-navy hover:text-gold transition-colors text-sm">
                          Best Neighborhoods in Arlington VA
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell-in/lyon-village-arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling in Lyon Village
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell-in/westover-arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling in Westover
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}