import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a Home in Alexandria, VA | Candee Currie — Local Market Expert',
  description:
    'Expert guidance on pricing, staging, and marketing your Alexandria, VA home. Get a free, data-driven valuation from an Associate Broker who knows the 22301–22315 market inside and out.',
  keywords: [
    'selling a home in Alexandria VA',
    'Alexandria VA real estate',
    'Old Town Alexandria homes',
    'sell my home Alexandria Virginia',
    'Alexandria realtor',
    'home value Alexandria VA',
  ],
  alternates: { canonical: '/sell/alexandria-va' },
  openGraph: {
    title: 'Selling a Home in Alexandria, VA | Candee Currie',
    description:
      'Expert guidance for selling your Alexandria, VA home. Market insights, pricing strategy, and proven results.',
    url: 'https://candeecurriehomes.com/sell/alexandria-va',
    type: 'website',
  },
}

const agentStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a home in Alexandria, VA? Get expert pricing, staging, and marketing guidance.',
  url: 'https://candeecurriehomes.com/sell/alexandria-va',
  areaServed: {
    '@type': 'City',
    name: 'Alexandria',
    state: 'Virginia',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to sell a home in Alexandria, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Well-priced homes in Alexandria typically sell within 10–18 days. Old Town Alexandria historic homes and Del Ray walkable neighborhoods are among the fastest-selling properties in Northern Virginia due to proximity to D.C., Reagan National Airport, and the King Street Metro. Overpriced homes can sit 45–90 days regardless of neighborhood charm.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is my Alexandria home worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Alexandria home values vary dramatically by neighborhood. Old Town townhouses and brick homes ($600K–$1.2M+) and Del Ray bungalows ($700K–$1M+) command premiums for walkability and historic character. West End, Landmark, and Parkfairfax areas offer more accessible entry points ($400K–$700K). Candee provides free, neighborhood-specific valuations based on recent comps — not citywide averages. Start with our free home valuation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do historic homes in Alexandria need special inspections before selling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Historic homes in Old Town Alexandria may require preservation board approval for exterior changes, but this doesn\'t typically affect the sale. Buyers expect original charm paired with updated systems — HVAC, plumbing, and electrical that meet modern standards. Candee recommends highlighting original architectural features (exposed brick, hardwood floors, original moldings) in marketing while being transparent with buyers about system ages.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best time of year to sell in Alexandria, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring (March–May) is peak Alexandria selling season, driven by D.C. commuter relocations and Alexandria\'s appeal as a walkable alternative to city living. However, Alexandria\'s proximity to Reagan National Airport, the Pentagon, and federal agencies creates year-round demand from relocating professionals. Fall (September–November) is a secondary peak.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to sell a home in Alexandria, Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical seller costs in Alexandria include: real estate commission (typically 5–6% split between buyer and seller agents), transfer tax ($1 per $100 of sale price in Virginia), state grantor tax, title insurance, and prorated property taxes. Alexandria\'s higher prices in Old Town and Del Ray mean these costs are proportionally significant — making accurate pricing strategy essential. Candee provides a full cost breakdown at your listing consultation.',
      },
    },
  ],
}

export default function AlexandriaSellPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agentStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="pt-20">
        {/* ===== HERO ===== */}
        <section className="relative py-20 bg-navy">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <nav className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
                  <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li><li>/</li>
                  <li><Link href="/sell" className="hover:text-gold transition-colors">Seller Hub</Link></li><li>/</li>
                  <li className="text-gold">Alexandria, VA</li>
                </ol>
              </nav>
              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">Alexandria, Virginia</span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">Selling a Home in Alexandria, VA</h1>
              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">Alexandria&apos;s charm is its biggest selling point — but pricing your home correctly in this diverse market requires neighborhood-level expertise. Here&apos;s what you need to know before listing.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home-value" className="btn-gold">Get My Free Home Valuation</Link>
                <Link href="/contact" className="text-white/70 hover:text-gold transition-colors text-sm self-center underline underline-offset-4">Or schedule a call →</Link>
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
                  <h2 className="font-serif text-3xl text-navy font-bold mb-6">The Alexandria Housing Market in 2026</h2>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria, VA is one of the most character-rich communities in Northern Virginia — and its real estate market reflects that diversity. From the cobblestone streets and 18th-century rowhouses of Old Town Alexandria, to the charming bungalows and tree-lined streets of Del Ray, to the affordable townhomes and condos in Landmark and West End — Alexandria offers something for nearly every buyer type, and that breadth creates steady demand year-round.</p>
                  <p className="text-charcoal-muted leading-relaxed">In 2026, the Alexandria market benefits from three major demand drivers: proximity to Reagan National Airport (a 5-minute drive from Old Town), the Pentagon and federal agencies across the Potomac, and the Blue/Yellow Metro lines providing direct access to D.C. and Tysons. Sellers who understand which buyer segment their neighborhood appeals to can price more strategically and market more effectively.</p>
                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">Key Alexandria Market Stats — 2026</h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Median sale price (Old Town):</strong> $700,000–$1.5M+</li>
                      <li>• <strong>Median sale price (Del Ray/Rosemont):</strong> $600,000–$1M</li>
                      <li>• <strong>Median sale price (Landmark/West End):</strong> $350,000–$550,000</li>
                      <li>• <strong>Average days on market:</strong> 10–18 days for well-priced homes</li>
                      <li>• <strong>Buyer demand:</strong> High — D.C. commuters, airport proximity, Pentagon relocations</li>
                      <li>• <strong>Year-over-year appreciation:</strong> 4–6% annually</li>
                    </ul>
                    <p className="text-xs text-charcoal-muted/40 mt-3">Based on Alexandria market data as of April 2026</p>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">What Alexandria Buyers Are Looking For</h2>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria&apos;s unique mix of historic charm and modern convenience creates three distinct buyer profiles:</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. D.C. Commuters & Young Professionals</h3>
                  <p className="text-charcoal-muted leading-relaxed">Del Ray, Old Town North, and the King Street corridor attract buyers priced out of D.C. neighborhoods but seeking similar walkability. These buyers prioritize: proximity to Metro stations (King Street, Braddock Road), walkable restaurant and shopping corridors (King Street, Commonwealth Avenue), and properties with outdoor space (parking, patios, or small yards) — something rare in D.C.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Government & Military Relocators</h3>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria is a top choice for buyers relocating to the Pentagon, Department of Defense, and federal agencies. Many are on tight timelines (60–90 days to settle) and seek: easy highway access (I-395, GW Parkway), proximity to bases (Fort Belvoir, Joint Base Anacostia-Bolling), and move-in ready homes that don&apos;t require renovation during a transfer. These buyers value efficiency and trust an agent who understands government relocation protocols.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Families Seeking Historic Community</h3>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria&apos;s historic neighborhoods — Old Town, Del Ray, Rosemont, Parker-Gray — offer a community feel that newer suburbs can&apos;t match. These buyers seek: sidewalk-lined streets, proximity to top-rated schools (George Washington Middle School, T.C. Williams), parks and recreational trails (Mount Vernon Trail, Four Mile Run), and the sense of being part of a community with festivals, farmers markets, and local events.</p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">Common Mistakes Alexandria Home Sellers Make</h2>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Pricing Old Town Against New Construction</h3>
                  <p className="text-charcoal-muted leading-relaxed">Old Town Alexandria homes command a premium for historic charm and location — but they&apos;re often older structures that don&apos;t compare directly to new construction townhomes in newer parts of Alexandria or Arlington. Buyers understand the trade-off, and pricing an 18th-century rowhouse at a 2020s townhome price is the fastest way to create a stale listing. Price Old Town for what it is: historic, charming, and irreplaceable — not brand new.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Ignoring the Neighborhood&apos;s Walk Score</h3>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria&apos;s walkability is its superpower. But many listing descriptions omit the most important details for buyers: which restaurants, shops, parks, and Metro stations are within walking distance. A listing that says &quot;steps from King Street Metro&quot; or &quot;walkable to Del Ray&apos;s restaurant scene&quot; outperforms one that doesn&apos;t mention location advantages at all.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Not Understanding Historic District Rules</h3>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria has a vibrant real estate community and a strong local culture, but historic district properties may have restrictions on exterior changes. While this doesn&apos;t typically affect a sale, informed sellers who understand the Board of Architectural Review process can address buyer questions confidently and market the historic designation as a value, not a limitation.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Competing on Condition Instead of Character</h3>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria&apos; charm is its historic character — original hardwood floors, brick facades, exposed beams, and period details. Sellers who try to modernize everything lose what makes their Alexandria home unique. Invest in systems updates (HVAC, electrical, plumbing) but preserve the character that buyers travel from D.C. to find.</p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">The Process — Selling Your Alexandria Home with Candee</h2>
                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'Free Neighborhood-Specific Valuation', desc: 'Get a valuation specific to your Alexandria neighborhood — Old Town, Del Ray, Rosemont, Landmark, or wherever your home is. Alexandria pricing requires micro-market analysis, not citywide averages.' },
                      { step: 2, title: 'Pre-Listing Consultation', desc: 'Candee walks through your property, identifies the unique character features that make your Alexandria home special, and sets a pricing strategy based on neighborhood comps.' },
                      { step: 3, title: 'Character-Forward Staging & Photography', desc: 'Alexandria homes sell on charm. Professional photography that captures original architectural details, cozy nooks, and neighborhood context is essential — not generic listing photos.' },
                      { step: 4, title: 'Targeted Marketing', desc: 'Reach D.C. commuters, government relocations, and families seeking community. Sotheby\'s network brings additional buyers from beyond Northern Virginia. Digital campaigns highlight walkability, transit access, and neighborhood character.' },
                      { step: 5, title: 'Showings & Negotiation', desc: 'Coordinated showings for a diverse buyer pool — from first-time buyers to luxury purchasers. Expert negotiation to navigate Alexandria\'s competitive market dynamics.' },
                      { step: 6, title: 'Closing & Beyond', desc: 'Full coordination through inspection, appraisal, and settlement. Alexandria closings range from 30–45 days depending on loan type and property complexity.' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">{item.step}</div>
                        <div><h3 className="font-serif text-lg text-navy font-bold mb-1">{item.title}</h3><p className="text-charcoal-muted text-sm">{item.desc}</p></div>
                      </div>
                    ))}
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-16">Why Work With Candee to Sell Your Alexandria Home</h2>
                  <p className="text-charcoal-muted leading-relaxed">Alexandria&apos;s diversity means you need an agent who understands every neighborhood — from Old Town brick rowhouses to Del Ray bungalows to Landmark townhomes. You need someone who knows the difference between pricing a 1790s Old Town home and a 2000s condo near the waterfront.</p>
                  <div className="space-y-6 not-prose my-8">
                    {[
                      { icon: '🏠', title: 'Northern Virginia & Alexandria Expertise', desc: 'Candee covers all of Northern Virginia — she knows how Alexandria compares to Arlington, McLean, and Falls Church in a buyer&apos;s eyes, and how to position your home to win in a competitive market.' },
                      { icon: '📊', title: 'Neighborhood-Level Pricing', desc: 'Every Alexandria neighborhood has its own pricing dynamics. Candee provides valuations based on your specific block, not the city average. Old Town, Del Ray, and Landmark don&apos;t price the same way.' },
                      { icon: '🌐', title: 'Sotheby\'s Global Reach', desc: 'Old Town Alexandria luxury buyers come from around the world. Sotheby\'s International Realty network puts your listing in front of international buyers, diplomats, and corporate relocations.' },
                      { icon: '🤝', title: '218 Seller-Side Transactions', desc: 'Candee has closed 218 deals representing sellers. She\'s handled every Alexandria scenario: historic home sales, condo closings, and luxury transactions across Northern Virginia.' },
                    ].map((item) => (
                      <div key={item.title} className="flex gap-4 items-start bg-cream/50 p-4 rounded-lg">
                        <div className="flex-shrink-0 text-2xl">{item.icon}</div>
                        <div><h3 className="font-serif text-lg text-navy font-bold mb-1">{item.title}</h3><p className="text-charcoal-muted text-sm leading-relaxed">{item.desc}</p></div>
                      </div>
                    ))}
                  </div>
                </article>

                {/* ===== FAQ ===== */}
                <div className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="font-serif text-3xl text-navy font-bold mb-8">Frequently Asked Questions — Selling in Alexandria</h2>
                  <div className="space-y-4">
                    {[
                      { q: 'How long does it take to sell a home in Alexandria, VA?', a: 'Well-priced homes in Alexandria typically sell within 10–18 days. Old Town Alexandria and Del Ray are among the fastest-selling neighborhoods due to walkability and proximity to D.C. Overpriced homes can sit 45–90 days regardless of charm.' },
                      { q: 'What is my Alexandria home worth?', a: 'Alexandria home values vary dramatically by neighborhood. Old Town ($700K–$1.5M+), Del Ray ($600K–$1M+), Landmark/West End ($350K–$550K). Candee provides free, neighborhood-specific valuations based on recent comps. Start with our free home valuation for a baseline estimate.' },
                      { q: 'Do historic homes in Old Town Alexandria need special inspections?', a: 'Historic homes may require preservation board awareness, but this rarely affects the sale. Buyers expect original charm with updated systems — HVAC, plumbing, and electrical. Candee recommends highlighting architectural features in marketing while being transparent with system ages.' },
                      { q: 'What is the best time of year to sell in Alexandria, VA?', a: 'Spring (March–May) is peak season, driven by D.C. commuter relocations. However, Alexandria proximity to Reagan National Airport, the Pentagon, and federal agencies creates year-round demand. Fall (September–November) is a secondary peak for government relocations.' },
                      { q: 'How much does it cost to sell a home in Alexandria, Virginia?', a: 'Typical seller costs include: real estate commission (5–6%), Virginia transfer tax ($1 per $100), state grantor tax, title insurance, and prorated property taxes. Old Town premiums mean these costs are proportionally significant. Candee provides a full cost breakdown at your listing consultation.' },
                    ].map((faq, i) => (
                      <details key={i} className="border border-gray-200 rounded-lg p-6 not-prose">
                        <summary className="font-serif text-lg text-navy font-semibold cursor-pointer">{faq.q}</summary>
                        <p className="text-charcoal-muted mt-3 leading-relaxed">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>

                {/* ===== CTA ===== */}
                <div className="mt-12 p-8 bg-cream border-l-4 border-gold rounded-lg not-prose">
                  <h3 className="font-serif text-2xl text-navy font-bold mb-4">Ready to Sell Your Alexandria Home?</h3>
                  <p className="text-charcoal-muted mb-6">Get a free, no-obligation home valuation from Candee Currie — Associate Broker with 20+ years of Northern Virginia expertise and Sotheby&apos;s global network. Know what your home is worth before you list.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/home-value" className="btn-gold text-center block">Get My Free Home Valuation</Link>
                    <Link href="/contact" className="btn-outline text-center block">Schedule a Consultation</Link>
                  </div>
                </div>
              </div>

              {/* ===== SIDEBAR ===== */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-cream p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center"><span className="text-gold font-serif text-2xl font-bold">CC</span></div>
                      <div><p className="font-serif text-lg text-navy font-semibold">Candee Currie</p><p className="text-sm text-charcoal-muted">Associate Broker</p></div>
                    </div>
                    <p className="text-sm text-charcoal-muted mb-4">TTR Sotheby&apos;s International Realty. 20+ years in Northern Virginia. Alexandria market expert with Sotheby&apos;s global network.</p>
                    <Link href="/contact" className="btn-outline w-full text-center block">Contact Candee</Link>
                  </div>
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">What is your Alexandria home worth?</p>
                    <Link href="/home-value" className="btn-gold w-full block">Get a Free Valuation</Link>
                  </div>
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="font-serif text-lg text-navy font-semibold mb-4">More Selling Resources</h3>
                    <ul className="space-y-3">
                      <li><Link href="/market/arlington-va" className="text-navy hover:text-gold transition-colors text-sm">Northern Virginia Market Report</Link></li>
                      <li><Link href="/blog/when-is-the-best-time-to-sell-a-home-in-northern-virginia-" className="text-navy hover:text-gold transition-colors text-sm">Best Time to Sell in Northern Virginia</Link></li>
                      <li><Link href="/blog/closing-costs-selling-home-northern-virginia" className="text-navy hover:text-gold transition-colors text-sm">Cost of Selling a Home in Northern Virginia</Link></li>
                      <li><Link href="/sell/falls-church-va" className="text-navy hover:text-gold transition-colors text-sm">Selling a Home in Falls Church, VA</Link></li>
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
