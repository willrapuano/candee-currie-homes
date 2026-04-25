import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a Home in McLean, VA | Candee Currie — Local Market Expert',
  description:
    'Expert guidance on pricing, staging, and marketing your McLean, VA home. Get a free, data-driven valuation from an Associate Broker who knows the 22101–22102 market inside and out.',
  keywords: [
    'selling a home in McLean VA',
    'McLean VA real estate',
    'McLean homes for sale',
    'sell my home McLean Virginia',
    'McLean realtor',
    'home value McLean VA',
  ],
  alternates: { canonical: '/sell/mclean-va' },
  openGraph: {
    title: 'Selling a Home in McLean, VA | Candee Currie',
    description:
      'Expert guidance for selling your McLean, VA home. Market insights, pricing strategy, and proven results.',
    url: 'https://candeecurriehomes.com/sell/mclean-va',
    type: 'website',
  },
}

const agentStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a home in McLean, VA? Get expert pricing, staging, and marketing guidance.',
  url: 'https://candeecurriehomes.com/sell/mclean-va',
  areaServed: {
    '@type': 'City',
    name: 'McLean',
    state: 'Virginia',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to sell a home in McLean, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Well-priced homes in McLean typically sell within 15–30 days. McLean\'s reputation as a top school district (Langley High School consistently ranks among Virginia\'s best) and proximity to Tysons Corner and the CIA headquarters keep demand consistently high. Homes priced above market comps can sit 60–90+ days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is my McLean home worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'McLean home values vary dramatically — from $800K for townhomes and condos near Tysons to $3M+ for estate homes on wooded lots in the 22101 area. Zip codes 22101 and 22102 have different price points. Candee provides free, neighborhood-specific valuations based on recent McLean comps, not Fairfax County averages. Start with our free home valuation for a baseline estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to make repairs before selling in McLean?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'McLean buyers expect premium finishes — the area competes directly with Great Falls, Vienna, and Potomac, MD. Even a cosmetic kitchen and bathroom refresh can add $40K–$80K to your sale price. Homes with updated systems (HVAC, roof, windows) command significantly higher offers, as McLean buyers often want move-in ready luxury.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best time of year to sell in McLean, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring (March–June) is peak McLean selling season, driven by family relocations tied to the school calendar and summer corporate transfers. The McLean Luxury Home Tour in spring brings additional buyer interest. Fall (September–October) is a second peak for buyers relocating before year-end. Summer and winter see less inventory but more serious buyers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to sell a home in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical seller costs in Virginia include: real estate commission (typically 5–6% split between buyer and seller agents), transfer tax ($1 per $100 of sale price), state grantor tax, title insurance, and prorated property taxes. McLean\'s higher median prices mean these costs are proportionally significant — accurate pricing strategy is critical. Candee provides a full cost breakdown at your listing consultation.',
      },
    },
  ],
}

export default function McLeanSellPage() {
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
                  <li className="text-gold">McLean, VA</li>
                </ol>
              </nav>

              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">
                McLean, Virginia
              </span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                Selling a Home in McLean, VA
              </h1>

              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
                McLean home values are among the highest in Northern Virginia — but luxury pricing requires 
                luxury strategy. Here&apos;s what you need to know before listing your McLean property.
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
                    The McLean Housing Market in 2026
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    McLean, VA is one of the most affluent communities in Northern Virginia — and for good reason. 
                    Home to Langley High School (consistently a top-ranked school in Virginia), the CIA headquarters, 
                    Tysons Corner (the largest edge city in the U.S.), and sprawling wooded lots, McLean attracts buyers 
                    who want prestige, proximity to D.C., and a quality lifestyle.
                  </p>

                  <p className="text-charcoal-muted leading-relaxed">
                    In 2026, the McLean real estate market is shaped by two forces: corporate relocations to Tysons 
                    and Northern Virginia&apos;s continued growth as a tech and defense hub. Demand for McLean homes 
                    from executives, government contractors, and international buyers keeps prices elevated, 
                    but only homes that compete on condition and presentation achieve premium prices.
                  </p>

                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">
                      Key McLean Market Stats — 2026
                    </h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Median sale price:</strong> $1.1M–$2M+ (varies by lot size and condition)</li>
                      <li>• <strong>Average days on market:</strong> 18–35 days for well-priced homes</li>
                      <li>• <strong>Buyer demand:</strong> High — driven by Tysons corporate relocations, CIA proximity</li>
                      <li>• <strong>Year-over-year appreciation:</strong> 4–6% annually</li>
                    </ul>
                    <p className="text-xs text-charcoal-muted/40 mt-3">Based on McLean market data as of April 2026</p>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    What McLean Buyers Are Looking For
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    The McLean buyer profile is distinct from other Northern Virginia communities. 
                    Three main categories drive demand:
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. C-Suite Executives & Corporate Relocators</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Tysons Corner is home to over 40,000 businesses and 120,000 jobs. Executives relocating to the 
                    area choose McLean for its name recognition, proximity to Tysons, and top-tier school district. 
                    These buyers seek: large lots (1+ acre), executive home features (home offices, gourmet kitchens, 
                    wine cellars), and properties that signal status. Many are relocating from higher-cost markets 
                    like New York or California and have strong purchasing power.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Intelligence Community & Defense Professionals</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    McLean&apos;s proximity to the CIA (Langley) and the Pentagon creates a unique buyer segment: 
                    senior intelligence officers, defense analysts, and government contractors with security clearances. 
                    These buyers value: privacy, lot size for security, proximity to McLean for a quick commute, 
                    and homes that can accommodate home offices for remote classified work.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. International Buyers & Diplomats</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    McLean is a favored destination for Embassy Row diplomats and international executives. 
                    These buyers compare McLean to Georgetown and Bethesda and are drawn to the area&apos;s 
                    established reputation, international schools nearby (International School of Washington), 
                    and easy access to Dulles International Airport. Properties near the Potomac River and Country Club 
                    Hills are particularly attractive to this segment.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    Common Mistakes McLean Home Sellers Make
                  </h2>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Pricing Against Great Falls Instead of McLean Comps</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Some sellers mistakenly price their McLean home against Great Falls properties (which are on 
                    even larger lots and command a premium). McLean buyers compare to McLean comps — pricing 
                    above the McLane market based on Great Falls sales leads to extended DOM and eventual price cuts.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Not Staging for the Luxury Expectation</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    McLean buyers expect luxury finishes and presentation. A home with outdated kitchens, worn 
                    carpet, or empty rooms will underperform compared to staged, updated competitors. Professional 
                    staging in McLean is not optional — it&apos;s expected. Invest in staging, especially for homes 
                    priced above $1.5M.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Ignoring International & Diplomatic Marketing</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    McLean attracts international buyers. Marketing only on the MLS misses this segment. 
                    Sotheby&apos;s International Realty network reaches 70+ countries — if your agent isn&apos;t 
                    leveraging global marketing channels, your McLean home is invisible to a significant buyer pool.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Underestimating Lot Value</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    In McLean, the land can be worth more than the structure. A 1+ acre lot in a desirable 
                    McLane neighborhood (Chevy Chase, Chesterbrook, Langley Woods) commands a premium regardless 
                    of home condition. Sellers who market the lot — its size, tree coverage, and development 
                    potential — attract both renovation buyers and teardown investors.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    The Process — Selling Your McLean Home with Candee
                  </h2>

                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'Free Luxury Home Valuation', desc: 'Get a valuation specific to your McLean neighborhood — not a Fairfax County average. McLean pricing requires understanding luxury comps, lot values, and school district premiums.' },
                      { step: 2, title: 'Pre-Listing Consultation', desc: 'Walk through your McLean property. Identify premium features, staging opportunities, and set a pricing strategy that competes with both resales and new luxury construction.' },
                      { step: 3, title: 'Luxury Staging & Photography', desc: 'Professional staging is standard in McLean. Drone footage, twilight photography, and video walkthroughs are essential for marketing luxury properties to remote and international buyers.' },
                      { step: 4, title: 'Global Marketing Reach', desc: 'Sotheby\'s International Realty network extends to 70+ countries. Your McLean listing reaches buyers from Beijing, London, Dubai, and São Paulo — not just D.C. locals.' },
                      { step: 5, title: 'Showings & Negotiation', desc: 'Coordinated showings for a diverse buyer pool — corporate relocators, diplomats, and local upgraders. Expert negotiation to navigate multiple offers and unique buyer circumstances.' },
                      { step: 6, title: 'Closing & Beyond', desc: 'Full coordination through inspection, appraisal, and settlement. Luxury transactions in McLean often require specialized title work and tax considerations.' },
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
                    Why Work With Candee to Sell Your McLean Home
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Selling a McLean home — especially a luxury property — requires more than a standard 
                    listing strategy. You need an agent who understands the nuances of the 22101 and 22102 
                    markets, who has access to Sotheby&apos;s global buyer network, and who has a track record 
                    of closing high-value transactions.
                  </p>

                  <div className="space-y-6 not-prose my-8">
                    {[
                      { icon: '🏠', title: 'McLean & Sotheby\'s Expertise', desc: 'Candee combines local Northern Virginia knowledge with Sotheby\'s International Realty\'s global luxury network. Your McLean listing reaches the world — not just the MLS.' },
                      { icon: '📊', title: 'Luxury Pricing Precision', desc: 'McLean requires understanding lot value, school premiums, and luxury comps. Candee provides valuations that account for all three — not a generic county average.' },
                      { icon: '🌐', title: 'Sotheby\'s Global Reach', desc: 'As a TTR Sotheby\'s International Realty associate broker, your listing gets exposure across 70+ countries — reaching international buyers and diplomats who pay premium for McLean properties.' },
                      { icon: '🤝', title: '218 Seller-Side Transactions', desc: 'Candee has closed 218 deals representing sellers. She\'s handled luxury transactions, corporate relocations, and diplomatic sales — every scenario a McLean seller may face.' },
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
                    Frequently Asked Questions — Selling in McLean
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How long does it take to sell a home in McLean, VA?',
                        a: 'Well-priced homes in McLean typically sell within 15–30 days. McLean\'s reputation as a top school district (Langley High School) and proximity to Tysons Corner and the CIA headquarters keep demand high. Overpriced homes can sit 60–90+ days.',
                      },
                      {
                        q: 'What is my McLean home worth?',
                        a: 'McLean home values range from $800K for townhomes to $3M+ for estate homes on large lots. ZIP codes 22101 and 22102 have significantly different price points. Candee provides free, neighborhood-specific valuations based on recent McLean comps. Start with our free home valuation for a baseline estimate.',
                      },
                      {
                        q: 'Do I need to make repairs before selling in McLean?',
                        a: 'McLean buyers expect premium finishes — this is a luxury market. Even a cosmetic kitchen and bathroom refresh can add $40K–$80K to your sale price. Homes with updated systems (HVAC, roof, windows) command significantly higher offers, as McLean buyers want move-in ready.',
                      },
                      {
                        q: 'What is the best time of year to sell in McLean, VA?',
                        a: 'Spring (March–June) is peak McLean selling season, driven by family relocations tied to the school calendar and summer corporate transfers. Fall (September–October) sees a second wave from buyers relocating before year-end. Summer and winter have less inventory but more serious buyers.',
                      },
                      {
                        q: 'How much does it cost to sell a home in Virginia?',
                        a: 'Typical seller costs in Virginia include: real estate commission (typically 5–6% split between agents), transfer tax ($1 per $100 of sale price), state grantor tax, title insurance, and prorated property taxes. McLean\'s higher median prices mean these costs are proportionally significant. Candee provides a full cost breakdown at your listing consultation.',
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
                    Ready to Sell Your McLean Home?
                  </h3>
                  <p className="text-charcoal-muted mb-6">
                    Get a free, no-obligation home valuation from Candee Currie — Associate Broker with 20+ years 
                    of Northern Virginia market expertise and Sotheby&apos;s global reach. Know what your home is worth before you list.
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
                      Luxury and estate specialist with global Sotheby&apos;s network access.
                    </p>
                    <Link href="/contact" className="btn-outline w-full text-center block">
                      Contact Candee
                    </Link>
                  </div>

                  {/* Quick CTA */}
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      What is your McLean home worth?
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
                        <Link href="/market/mclean-va" className="text-navy hover:text-gold transition-colors text-sm">
                          McLean VA Market Report
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/great-falls-vs-mclean-luxury-neighborhood-guide" className="text-navy hover:text-gold transition-colors text-sm">
                          Great Falls vs McLean Luxury Guide
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/what-does-1-million-buy-in-northern-virginia-2026" className="text-navy hover:text-gold transition-colors text-sm">
                          What $1M Buys in Northern Virginia
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
