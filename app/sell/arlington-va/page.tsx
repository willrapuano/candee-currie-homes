import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a Home in Arlington, VA | Candee Currie — Local Market Expert',
  description:
    'Expert guidance on pricing, staging, and marketing your Arlington, VA home. Get a free, data-driven valuation from an Associate Broker who knows the Arlington market inside and out.',
  keywords: [
    'selling a home in Arlington VA',
    'Arlington VA real estate',
    'Arlington homes for sale',
    'sell my home Arlington Virginia',
    'Arlington realtor',
    'home value Arlington VA',
  ],
  alternates: { canonical: '/sell/arlington-va' },
  openGraph: {
    title: 'Selling a Home in Arlington, VA | Candee Currie',
    description:
      'Expert guidance for selling your Arlington, VA home. Market insights, pricing strategy, and proven results.',
    url: 'https://candeecurriehomes.com/sell/arlington-va',
    type: 'website',
  },
}

const agentStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a home in Arlington, VA? Get expert pricing, staging, and marketing guidance.',
  url: 'https://candeecurriehomes.com/sell/arlington-va',
  areaServed: {
    '@type': 'City',
    name: 'Arlington',
    state: 'Virginia',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to sell a home in Arlington, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Well-priced homes in Arlington typically sell within 10–18 days. Arlington\'s proximity to D.C., Amazon HQ2, and top-rated schools keeps demand consistently high. Homes that are overpriced or poorly staged can sit 45–90 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is my Arlington home worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home values in Arlington vary widely by neighborhood — Arlington Ridge, Lyon Village, Cherrydale, Clarendon, and Ballston all have significantly different price per square foot metrics. Candee provides free, neighborhood-specific valuations based on recent comps, not ZIP-code averages. Start with our free home valuation for a baseline estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to make repairs before selling in Arlington?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not always — but competitive Arlington neighborhoods like Clarendon and Ballston attract buyers comparing your home to new construction. Even a cosmetic kitchen update or bathroom refresh can add $25K–$50K to your sale price in areas like North Arlington and Cherrydale.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best time of year to sell in Arlington, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring (March–May) generates the highest buyer activity in Arlington, driven by the school-year cycle and Amazon HQ2 relocation schedules. However, Arlington\'s government-adjacent buyer pool creates year-round demand. Winter listings face less competition and can attract serious, motivated buyers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to sell a home in Arlington, Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical seller costs in Arlington include: real estate commission (typically 5–6% split between agents), Arlington County transfer tax ($1 per $100 of sale price), state grantor tax, title insurance, and prorated property taxes. Arlington\'s higher median prices mean commission and transfer costs are proportionally significant — which makes accurate pricing strategy critical. Candee provides a full cost breakdown at your listing consultation.',
      },
    },
  ],
}

export default function ArlingtonSellPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agentStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
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
                  <li className="text-gold">Arlington, VA</li>
                </ol>
              </nav>

              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">
                Arlington, Virginia
              </span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                Selling a Home in Arlington, VA
              </h1>

              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
                Arlington home values are rising — but only sellers who price and market strategically 
                capture the full premium of this market. Here&apos;s what you need to know before listing your Arlington property.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home-value" className="btn-gold">
                  Get My Free Home Valuation
                </Link>
                <Link href="/contact" className="text-white/70 hover:text-gold transition-colors text-sm self-center underline underline-offset-4">
                  Or schedule a call →
                </Link>
              </div>
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
                    The Arlington Housing Market in 2026
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington, VA is one of the most competitive real estate markets in the Mid-Atlantic. 
                    With Amazon HQ2 transforming the Crystal City-Pentagon City corridor, the continued expansion 
                    of the defense contractor ecosystem along the I-395 corridor, and the county&apos;s position 
                    as the most walkable suburb in Northern Virginia, demand for Arlington housing remains at 
                    historically elevated levels.
                  </p>

                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington&apos;s real estate market is uniquely bifurcated: North Arlington neighborhoods 
                    (Clarendon, Ballston, Lyon Village, Cherrydale) command premium prices and attract 
                    families with top-rated schools and walkable urban amenities. South Arlington 
                    (Columbia Pike, Arlington Ridge, Shirlington) offers more accessible entry points 
                    while still benefiting from the county&apos;s overall appreciation trajectory. 
                    Sellers who understand their specific sub-market position price correctly from day one.
                  </p>

                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">
                      Key Arlington Market Stats — 2026
                    </h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Median sale price (North Arlington):</strong> $800,000–$1.3M</li>
                      <li>• <strong>Median sale price (South Arlington):</strong> $550,000–$850,000</li>
                      <li>• <strong>Average days on market:</strong> 10–18 days for well-priced homes</li>
                      <li>• <strong>Buyer demand:</strong> Very high — Amazon HQ2, government, and relocating professionals</li>
                      <li>• <strong>Year-over-year appreciation:</strong> 4–6% annually</li>
                    </ul>
                    <p className="text-xs text-charcoal-muted/40 mt-3">Based on Arlington market data as of April 2026</p>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    What Arlington Buyers Are Looking For
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington&apos;s diverse buyer pool means understanding your target audience is critical. 
                    Three profiles dominate the market:
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Amazon & Tech Professionals</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Crystal City, Pentagon City, and the National Landing area have created a new demand center 
                    for Arlington real estate. These buyers (earning $150K–$400K+) seek: walkability to transit 
                    (Silver Line, Blue/Yellow Lines), proximity to their office (Amazon HQ2, defense contractors), 
                    and modern finishes in condos, townhomes, or infill homes. Many are relocating from California, 
                    New York, or Seattle and need guidance navigating Arlington&apos;s neighborhood dynamics.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Government & Military Families</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington&apos;s proximity to the Pentagon, CIA, and State Department generates a steady pipeline 
                    of relocating government employees and military families. These buyers prioritize: school district 
                    quality (Arlington County Public Schools rank #1 in Virginia), proximity to bases, 
                    and homes with outdoor space. Many are purchasing on accelerated timelines due to assignment rotations.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. D.C. Commuters Seeking Value</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Many buyers priced out of D.C. neighborhoods like Capitol Hill or Georgetown turn to Arlington 
                    as their next-best urban option. These buyers value: Metro access (Orange/Silver lines), 
                    walkable corridors (Clarendon, Ballston, Columbia Pike), and a sense of community that D.C. 
                    neighborhoods sometimes lack. They compare Arlington favorably to Alexandria&apos;s Old Town 
                    and Bethesda&apos;s downtown — positioning matters.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    Common Mistakes Arlington Home Sellers Make
                  </h2>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Assuming All of Arlington Priced Equally</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington buyers are sophisticated — they know Clarendon command $700+/sq ft while 
                    Columbia Pike trades at $350–$450/sq ft. Overpricing your Arlington home by comparing it 
                    to a premium neighborhood is the fastest way to sit stale. Candee analyzes your exact 
                    micro-market, not just the ZIP code.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Not Upgrading for the Arlington Standard</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington has seen massive new construction over the past decade — the new homes and 
                    renovated condos set expectations for all listings. If your home has original 1980s 
                    finishes, it will lose to a renovated comp. Even $15K–$25K in strategic updates 
                    (kitchen counters, bathroom vanities, fresh paint) can return $50K+ in an Arlington sale.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Ignoring Parking & Transit Access in Marketing</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington buyers care deeply about commute logistics. Whether it&apos;s proximity to a Metro station, 
                    a garage space, or easy access to I-66/395 — these features must be highlighted prominently. 
                    A home 5 minutes further from a Metro stop can lose $30K–$50K in perceived value.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Listing Without Understanding the Competition</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Arlington has high inventory turnover. When you list, you&apos;re competing not only with other 
                    sellers but also with new construction condos at National Landing and new townhomes in 
                    Ballston Quarter. A competitive market analysis that includes both existing homes AND 
                    new construction is essential for pricing accuracy.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    The Process — Selling Your Arlington Home with Candee
                  </h2>

                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'Free Neighborhood-Specific Home Valuation', desc: 'Get a valuation calibrated to your Arlington sub-market — not a county average. North Arlington and South Arlington require different analysis.' },
                      { step: 2, title: 'Pre-Listing Consultation', desc: 'Walk through your Arlington property. Identify improvements, staging opportunities, and set a pricing strategy based on neighborhood comps, not ZIP-code generalizations.' },
                      { step: 3, title: 'Prep & Staging', desc: 'Professional staging and photography tailored to your target buyer — tech professionals want modern, government families want school-adjacent positioning.' },
                      { step: 4, title: 'Strategic Marketing', desc: 'Beyond MLS — targeted campaigns to Amazon HQ2 relocators, government transfer professionals, Sotheby\'s global luxury network, and Arlington-specific digital outreach.' },
                      { step: 5, title: 'Showings & Negotiation', desc: 'Coordinated showings, skilled offer management, and negotiation expertise for Arlington&apos;s competitive market dynamics.' },
                      { step: 6, title: 'Closing & Beyond', desc: 'Full coordination through inspection, appraisal, and settlement. Arlington&apos;s fast-moving closings require an agent who anticipates every step.' },
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

                  {/* ===== WHY WORK WITH CANDEE ===== */}
                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-16">
                    Why Work With Candee to Sell Your Arlington Home
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Selling in Arlington requires more than a license — it requires deep neighborhood 
                    expertise. Arlington County contains 50+ distinct neighborhoods, each with different 
                    buyer demographics, price points, and marketing strategies. You need someone who 
                    knows the difference between Lyon Village and Lyon Park pricing.
                  </p>

                  <div className="space-y-6 not-prose my-8">
                    {[
                      { icon: '🏠', title: 'Arlington Resident for 20+ Years', desc: 'Candee doesn\'t just sell Arlington — she lives here. She knows which neighborhoods are seeing new construction, which are appreciating fastest, and what specific buyers in each area are willing to pay.' },
                      { icon: '📊', title: 'Micro-Market Pricing Expertise', desc: 'Arlington\'s North/South divide means county-level data is misleading. Candee provides valuations at the neighborhood level — Cherrydale, Clarendon, Arlington Ridge — with real-time comps.' },
                      { icon: '🌐', title: 'Sotheby\'s Global Reach', desc: 'For Arlington luxury homes, your listing gets exposure across 70+ countries through TTR Sotheby\'s International Realty — reaching international buyers for premium North Arlington properties.' },
                      { icon: '🤝', title: '218 Seller-Side Transactions', desc: 'Candee has closed 218 deals representing sellers. She\'s negotiated against every buyer type in Arlington: cash offers, FHA loans, VA buyers, investors, and new construction reps.' },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-4 items-start bg-cream/50 p-4 rounded-lg">
                        <div className="flex-shrink-0 text-2xl">{item.icon}</div>
                        <div>
                          <h3 className="font-serif text-lg text-navy font-bold mb-1">{item.title}</h3>
                          <p className="text-charcoal-muted text-sm leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* ===== FAQ SECTION ===== */}
                <div className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="font-serif text-3xl text-navy font-bold mb-8">
                    Frequently Asked Questions — Selling in Arlington
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How long does it take to sell a home in Arlington, VA?',
                        a: 'Well-priced homes in Arlington typically sell within 10–18 days. Arlington\'s proximity to D.C., Amazon HQ2, and top-rated schools keeps demand consistently high. Homes that are overpriced or poorly staged can sit 45–90 days.',
                      },
                      {
                        q: 'What is my Arlington home worth?',
                        a: 'Home values in Arlington vary widely by neighborhood — Arlington Ridge, Lyon Village, Cherrydale, Clarendon, and Ballston all have significantly different price per square foot metrics. Candee provides free, neighborhood-specific valuations based on recent comps, not ZIP-code averages. Start with our free home valuation for a baseline estimate.',
                      },
                      {
                        q: 'Do I need to make repairs before selling in Arlington?',
                        a: 'Not always — but competitive Arlington neighborhoods like Clarendon and Ballston attract buyers comparing your home to new construction. Even a cosmetic kitchen update or bathroom refresh can add $25K–$50K to your sale price in areas like North Arlington and Cherrydale.',
                      },
                      {
                        q: 'What is the best time of year to sell in Arlington, VA?',
                        a: 'Spring (March–May) generates the highest buyer activity in Arlington, driven by the school-year cycle and Amazon HQ2 relocation schedules. However, Arlington\'s government-adjacent buyer pool creates year-round demand. Winter listings face less competition and can attract serious, motivated buyers.',
                      },
                      {
                        q: 'How much does it cost to sell a home in Arlington, Virginia?',
                        a: 'Typical seller costs in Arlington include: real estate commission (typically 5–6% split between agents), Arlington County transfer tax ($1 per $100 of sale price), state grantor tax, title insurance, and prorated property taxes. Arlington\'s higher median prices mean commission and transfer costs are proportionally significant — which makes accurate pricing strategy critical. Candee provides a full cost breakdown at your listing consultation.',
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
                    Ready to Sell Your Arlington Home?
                  </h3>
                  <p className="text-charcoal-muted mb-6">
                    Get a free, no-obligation home valuation from Candee Currie — Associate Broker with 20+ years 
                    of Arlington market expertise. Know what your home is worth before you list.
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
                      218 seller-side transactions across Arlington&apos;s 50+ neighborhoods.
                    </p>
                    <Link href="/contact" className="btn-outline w-full text-center block">
                      Contact Candee
                    </Link>
                  </div>

                  {/* Quick CTA */}
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      What is your Arlington home worth?
                    </p>
                    <Link href="/home-value" className="btn-gold w-full block">
                      Get a Free Valuation
                    </Link>
                  </div>

                  {/* Related Pages */}
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="font-serif text-lg text-navy font-semibold mb-4">
                      More Selling Resources
                    </h3>
                    <ul className="space-y-3">
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
                        <Link href="/blog/when-is-the-best-time-to-sell-a-home-in-northern-virginia-" className="text-navy hover:text-gold transition-colors text-sm">
                          Best Time to Sell in Northern Virginia
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell/falls-church-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling a Home in Falls Church, VA
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