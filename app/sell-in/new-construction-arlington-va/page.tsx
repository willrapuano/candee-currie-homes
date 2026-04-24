import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a New Construction Home in Arlington VA | Candee Currie — Build-to-Sell Expert',
  description:
    'Selling a new construction or newly built home in Arlington, VA? Get expert guidance on pricing, staging, and marketing your new build to maximize buyer interest. 210 monthly searches for Arlington VA new construction.',
  keywords: [
    'selling a new construction home Arlington VA',
    'Arlington VA new construction homes for sale',
    'new construction Arlington VA real estate',
    'sell new build Arlington Virginia',
    'Arlington new home resale',
    'Arlington VA new construction market',
  ],
  alternates: { canonical: '/sell-in/new-construction-arlington-va' },
  openGraph: {
    title: 'Selling a New Construction Home in Arlington VA | Candee Currie',
    description:
      'Expert guidance for selling new construction and newly built homes in Arlington, VA. Market insights and proven results for new build sellers.',
    url: 'https://candeecurriehomes.com/sell-in/new-construction-arlington-va',
    type: 'website',
  },
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a new construction home in Arlington VA? Expert pricing and marketing for new build properties.',
  url: 'https://candeecurriehomes.com/sell-in/new-construction-arlington-va',
  areaServed: {
    '@type': 'City',
    name: 'Arlington',
    state: 'Virginia',
  },
}

export default function NewConstructionSellPage() {
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
                  <li className="text-gold">New Construction, Arlington</li>
                </ol>
              </nav>

              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">
                New Construction — Arlington, Virginia
              </span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                Selling a New Construction Home in Arlington VA
              </h1>

              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
                New construction homes in Arlington are in high demand — but pricing and marketing a new build 
                requires a different strategy than selling a resale. Here&apos;s how to position your new home for maximum return.
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
                    The Arlington New Construction Market in 2026
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington, VA is experiencing a new construction boom unlike any other in Northern Virginia. 
                    Driven by Amazon HQ2 in Crystal City, the continued expansion of the Pentagon and defense contractor ecosystem, 
                    and the transformation of the Rosslyn-Ballston corridor, new development is reshaping the Arlington housing market.
                  </p>

                  <p className="text-charcoal-muted leading-relaxed">
                    New construction in Arlington falls into three categories: luxury high-rise condos (Pentagon City, Crystal City, Rosslyn), 
                    modern townhomes (Courthouse, Clarendon, Ballston), and infill single-family homes (Cherrydale, Lyon Village, Westover). 
                    Each category attracts a different buyer profile, and each requires a tailored selling strategy.
                  </p>

                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">
                      Arlington New Construction Market Snapshot — 2026
                    </h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Median price (new construction):</strong> $850,000–$1.5M (townhomes) / $700K–$1.2M (condos)</li>
                      <li>• <strong>Average days on market:</strong> 15–25 days for new builds (slower than resales)</li>
                      <li>• <strong>Buyer demand drivers:</strong> Amazon HQ2 employees, defense contractors, tech workers, D.C. commuters</li>
                      <li>• <strong>Search volume:</strong> 210+ monthly searches for Arlington VA new construction</li>
                      <li>• <strong>Key areas:</strong> Crystal City/Pentagon City, Rosslyn, Ballston, Courthouse, Clarendon</li>
                    </ul>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    What Arlington New Construction Buyers Are Looking For
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Buyers of new construction in Arlington are distinct from resale buyers. They&apos;re willing to pay a premium 
                    for modern amenities, energy efficiency, and low maintenance — but they have high expectations. Here&apos;s what they prioritize:
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Modern Finishes & Smart Home Tech</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    New construction buyers expect: open floor plans, quartz or marble counters, stainless steel appliances, 
                    hardwood flooring, smart thermostats, USB outlets, and high-efficiency HVAC. If your home has premium upgrades 
                    (Miele appliances, custom cabinetry, wine fridge), these must be highlighted prominently in marketing.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Energy Efficiency & Low Maintenance</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    New construction buyers are often relocating from older homes and want to avoid the deferred maintenance issues 
                    of a 50-year-old property. Features that matter: tankless water heaters, energy-efficient windows, 
                    spray foam insulation, new HVAC with smart zoning, and low-maintenance exteriors.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Location & Transit Access</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Amazon HQ2&apos;s presence has created massive demand near Crystal City and Pentagon City. 
                    New construction buyers want: walkability to Metro (Yellow/Blue/Silver lines), proximity to Whole Foods, 
                    Target, and dining, and access to bike trails (W&OD Trail, Four Mile Run Trail).
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Parking & Storage</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    In Arlington&apos;s dense urban environment, parking is at a premium. Two-car garages (or even tandem parking) 
                    add significant value. Storage space — basement, attic, or dedicated storage rooms — is also a major selling point.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    Common Mistakes Arlington New Construction Sellers Make
                  </h2>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Pricing at Builder List Price Without Adjustment</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Many sellers bought their new construction at builder list price and expect to sell at or above that price. 
                    However, builder pricing includes a significant premium. By the time you sell, the builder may have reduced prices 
                    on remaining units or offered incentives. Your resale price must be competitive with both the builder and other resales.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Assuming New = No Staging Needed</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Even brand-new homes benefit from staging. Empty rooms feel smaller and buyers struggle to visualize scale. 
                    Virtual staging ($200–$500) or professional staging ($2,000–$5,000) pays for itself by helping buyers envision living in the space.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Not Highlighting Premium Upgrades</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    If you paid $30K for upgraded cabinets, $15K for hardwood, or $10K for smart home integration, 
                    these must be documented and marketed. Buyers won&apos;t know about upgrades unless they&apos;re clearly listed. 
                    Create a detailed upgrade sheet and feature it in the listing description and marketing materials.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Competing With the Builder Directly</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Builders offer incentives: closing cost credits, rate buydowns, free upgrades. As a resale seller, 
                    you can&apos;t match these dollar-for-dollar — but you can offer something builders can&apos;t: immediate availability, 
                    no construction delays, and a lived-in home with established community. Price competitively and position 
                    your home as &quot;move-in ready today.&quot;
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    The Process — Selling Your New Arlington Home with Candee
                  </h2>

                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'New Construction Valuation', desc: 'Get a valuation that accounts for builder incentives, current market pricing, and your specific upgrades. Not all appraisers understand new construction — Candee works with specialists.' },
                      { step: 2, title: 'Upgrade Documentation & Staging', desc: 'Create a detailed list of all upgrades (with receipts). Stage the home to show its full potential — empty rooms underperform by 10–15%.' },
                      { step: 3, title: 'Professional Media', desc: 'New construction deserves professional photography, video, and drone footage. Showcase the modern architecture, outdoor space, and neighborhood amenities.' },
                      { step: 4, title: 'Buyer-Targeted Marketing', desc: 'Reach Amazon employees, defense contractors, and D.C. professionals through targeted digital campaigns, LinkedIn outreach, and Sotheby\'s luxury network.' },
                      { step: 5, title: 'Strategic Pricing & Showings', desc: 'Price to compete with the builder AND other resales. Coordinate showings to highlight the home\'s best features and manage offer timelines.' },
                      { step: 6, title: 'Negotiation & Closing', desc: 'Navigate inspections (minimal for new construction), appraisal coordination, and closing logistics. New construction sales often close faster.' },
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
                    Frequently Asked Questions — Selling New Construction in Arlington
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How long does it take to sell a new construction home in Arlington?',
                        a: 'New construction homes in Arlington typically sell within 15–25 days — slightly slower than resales because the buyer pool is more selective. However, properly priced and staged new builds often receive offers faster than older homes because they appeal to buyers seeking move-in-ready properties.',
                      },
                      {
                        q: 'What is my new construction home worth in Arlington?',
                        a: 'New construction valuation requires comparing against: (1) builder pricing for similar units, (2) recent resale comps in the same development, and (3) market-wide new construction trends. Your upgrades add value, but builder incentives and remaining inventory can cap your price. Candee provides specialized new construction valuations based on all three factors.',
                      },
                      {
                        q: 'Should I wait for the builder to sell out before listing?',
                        a: 'Not necessarily. Builders often reduce prices on final units, which hurts your resale value. Listing while the builder still has inventory means competing directly, but you can position your home as "move-in ready today" versus "construction timeline TBD." Candee analyzes the builder\'s remaining inventory and sales velocity to recommend optimal timing.',
                      },
                      {
                        q: 'How do I compete with builder incentives (closing costs, rate buydowns)?',
                        a: 'You can\'t match builder incentives dollar-for-dollar, but you can offer immediate availability, established community, and a home that\'s already lived-in (no construction surprises). Some sellers offer their own incentives — seller-paid closing costs or a home warranty — which can offset the builder\'s advantage.',
                      },
                      {
                        q: 'Do I need a home inspection for a new construction sale?',
                        a: 'While buyers may waive inspection on new construction, it\'s still wise to have one. New builds can have defects: HVAC issues, plumbing problems, window leaks, or cosmetic issues. A pre-listing inspection lets you address problems proactively and present the home as fully vetted.',
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
                    Ready to Sell Your New Arlington Home?
                  </h3>
                  <p className="text-charcoal-muted mb-6">
                    Get a free, new-construction-specific home valuation from Candee Currie. 
                    Know exactly what your new build is worth in today&apos;s Arlington market.
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
                      TTR Sotheby&apos;s International Realty. 20+ years in Northern Virginia. 
                      New construction and luxury home specialist.
                    </p>
                    <Link href="/contact" className="btn-outline w-full text-center block">
                      Contact Candee
                    </Link>
                  </div>

                  {/* Quick CTA */}
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      What is your new Arlington home worth?
                    </p>
                    <Link href="/home-value" className="btn-gold w-full block">
                      Get a Free Valuation
                    </Link>
                  </div>

                  {/* Related Pages */}
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="font-serif text-lg text-navy font-semibold mb-4">
                      More New Construction Resources
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
                        <Link href="/sell-in/cherrydale-arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling in Cherrydale
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell-in/lyon-village-arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling in Lyon Village
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/what-does-1-million-buy-in-northern-virginia-2026" className="text-navy hover:text-gold transition-colors text-sm">
                          What $1M Buys in NoVa (2026)
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