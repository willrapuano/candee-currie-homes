import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a Home in Falls Church, VA | Candee Currie — Local Market Expert',
  description:
    'Expert guidance on pricing, staging, and marketing your Falls Church, VA home. Get a free, data-driven valuation from an Associate Broker who knows the 22046 market inside and out.',
  keywords: [
    'selling a home in Falls Church VA',
    'Falls Church VA real estate',
    'Falls Church homes for sale',
    'sell my home Falls Church Virginia',
    'Falls Church realtor',
    'home value Falls Church VA',
  ],
  alternates: { canonical: '/sell/falls-church-va' },
  openGraph: {
    title: 'Selling a Home in Falls Church, VA | Candee Currie',
    description:
      'Expert guidance for selling your Falls Church, VA home. Market insights, pricing strategy, and proven results.',
    url: 'https://candeecurriehomes.com/sell/falls-church-va',
    type: 'website',
  },
}

const agentStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a home in Falls Church, VA? Get expert pricing, staging, and marketing guidance.',
  url: 'https://candeecurriehomes.com/sell/falls-church-va',
  areaServed: {
    '@type': 'City',
    name: 'Falls Church',
    state: 'Virginia',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to sell a home in Falls Church, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Well-priced homes in Falls Church typically sell within 12–20 days. Homes that are overpriced or poorly staged can sit 60+ days. Pricing correctly from day one is the single biggest factor in time on market.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is my Falls Church home worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home values in Falls Church vary significantly by neighborhood — 22046, 22043, and 22042 can have very different price points per square foot. Candee provides free, personalized home valuations based on recent comps, current market conditions, and your home\'s specific features. Start with our free home valuation to get a baseline estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to make repairs before selling in Falls Church?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not always — but the right repairs can significantly increase your sale price. Candee recommends a pre-listing inspection to identify any issues. Small investments in paint, lighting, and staging often return 3–5x their cost in the Falls Church market.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best time of year to sell in Falls Church, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring (March–May) is traditionally the strongest season in Northern Virginia real estate, with the highest buyer activity. However, Falls Church\'s proximity to government agencies means year-round demand from relocating professionals. If your timeline is flexible, spring is ideal. If not — every season has motivated buyers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to sell a home in Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical seller costs in Virginia include: real estate commission (typically 5–6% split between buyer and seller agents), transfer tax ($1 per $100 of sale price in Falls Church), title insurance, recording fees, and any prorated property taxes. Candee provides a detailed cost breakdown during your listing consultation.',
      },
    },
  ],
}

export default function FallsChurchSellPage() {
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
                  <li className="text-gold">Falls Church, VA</li>
                </ol>
              </nav>

              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">
                Falls Church, Virginia
              </span>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                Selling a Home in Falls Church, VA
              </h1>

              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
                Falls Church real estate moves fast — but only homes priced and positioned correctly sell at top dollar. 
                Here&apos;s what you need to know before listing.
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
                    The Falls Church Housing Market in 2026
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Falls Church, VA — despite being the smallest independent city in the United States by area — is one of the most desirable zip codes in Northern Virginia. Homes here command premium prices because of the top-rated public school system (Falls Church City Public Schools consistently ranks among Virginia&apos;s best), walkable downtown Merrifield and W. Broad Street district, and quick Metro access via the East Falls Church and West Falls Church stations.
                  </p>

                  <p className="text-charcoal-muted leading-relaxed">
                    In 2026, the Falls Church real estate market continues to favor sellers who understand their buyer audience. The median home price in 22046 consistently outpaces Fairfax County averages. Buyers are well-informed, competitive, and willing to pay a premium — but only when the home is priced right and presented professionally.
                  </p>

                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">
                      Key Falls Church Market Stats — 2026
                    </h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Median sale price:</strong> $825,000–$1.1M (varies by neighborhood)</li>
                      <li>• <strong>Average days on market:</strong> 12–20 days for well-priced homes</li>
                      <li>• <strong>Buyer demand:</strong> High — limited inventory drives competition</li>
                      <li>• <strong>Year-over-year appreciation:</strong> 3–5% annually</li>
                    </ul>
                    <p className="text-xs text-charcoal-muted/40 mt-3">Based on Falls Church market data as of April 2026</p>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    What Falls Church Buyers Are Looking For
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Understanding your buyer is the first step to selling at top dollar. In Falls Church, buyer profiles fall into three main categories:
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Government & Defense Professionals</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Falls Church&apos;s proximity to the Pentagon, State Department, CIA headquarters, and numerous defense contractors means steady demand from government employees. These buyers value: security, school districts for families, and properties within a short commute to federal employers. Many are relocating on tight timelines — they need homes that are turnkey ready.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Tech & Corporate Professionals</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Tysons Corner — just a short drive away — is one of the largest employment centers in the Mid-Atlantic. Tech workers, consultants, and corporate professionals are drawn to Falls Church for the community feel, walkability, and access to the Silver Line. These buyers often compare Falls Church with Arlington, McLean, and Vienna.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Growing Families</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    The Falls Church City school system is the #1 driver for family buyers. Homes near Mary Ellen Henderson Middle School or George Mason High School command premium prices. Buyers in this segment prioritize: yard space, updated kitchens, proximity to parks (Cherry Hill Park, Great Scott Park), and community amenities.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    Common Mistakes Falls Church Home Sellers Make
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Even in a strong seller&apos;s market, these mistakes cost Falls Church sellers thousands:
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Overpricing the Home</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    This is the #1 mistake. Falls Church homes that are overpriced sit on the market, get labeled &quot;stale,&quot; and eventually sell below market value. Buyers and their agents can see how long a property has been listed. A home priced correctly from day one sparks urgency and multiple offers.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Skipping Pre-Listing Inspection</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Many Falls Church homes are 30–60 years old. Buyers will find issues during inspection. Getting a pre-listing inspection lets you fix problems on your timeline and price, and present the home as &quot;move-in ready.&quot;
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Ignoring Curb Appeal</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    Falls Church neighborhoods are known for their tree-lined streets. A home that looks dated from the curb won&apos;t compete. First impressions matter — landscaping, fresh paint, and updated lighting are low-cost improvements that pay for themselves.
                  </p>

                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Going It Alone (FSBO)</h3>
                  <p className="text-charcoal-muted leading-relaxed">
                    While some sellers try to avoid commission costs, FSBO homes in Falls Church typically sell for 10–15% less than agent-represented listings. In a market where the right pricing strategy can add $50K+, professional guidance pays for itself.
                  </p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">
                    The Process — Selling Your Falls Church Home with Candee
                  </h2>

                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'Free Home Valuation', desc: 'Get a personalized, data-driven valuation of your Falls Church home — no obligation, no pressure.' },
                      { step: 2, title: 'Pre-Listing Consultation', desc: 'Walk through your home together. Identify improvements, staging opportunities, and set a pricing strategy based on recent comps and market conditions.' },
                      { step: 3, title: 'Prep & Staging', desc: 'Professional staging and photography. Every listing features professional-grade media — drone shots, video walkthrough, and twilight photos.' },
                      { step: 4, title: 'Strategic Marketing', desc: 'Beyond MLS — targeted digital campaigns, social media, email to Candee&apos;s network, and Sotheby&apos;s global reach for luxury listings.' },
                      { step: 5, title: 'Showings & Negotiation', desc: 'Coordinated showings, offer management, and skilled negotiation to maximize your sale price and terms.' },
                      { step: 6, title: 'Closing & Beyond', desc: 'Handled inspections, appraisal coordination, closing logistics, and post-sale relocation support if needed.' },
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
                    Why Work With Candee to Sell Your Falls Church Home
                  </h2>

                  <p className="text-charcoal-muted leading-relaxed">
                    Selling a home isn&apos;t just about putting it on the MLS and waiting. 
                    In the Falls Church market, the difference between average and exceptional comes down to 
                    local expertise, strategic pricing, and a network that reaches the right buyers.
                  </p>

                  <div className="space-y-6 not-prose my-8">
                    {[
                      { icon: '🏠', title: '20+ Years in Northern Virginia', desc: 'Candee has lived, worked, and sold across Arlington, Falls Church, McLean, and Great Falls. She knows which neighborhoods are trending, which school districts drive premiums, and what buyers in each area are willing to pay.' },
                      { icon: '📊', title: 'Data-Driven Pricing, Not Guesswork', desc: 'Every listing starts with a comparative market analysis — not a Zestimate. Candee pulls real-time comps, accounts for your specific upgrades, and sets a pricing strategy calibrated to current Falls Church demand.' },
                      { icon: '🌐', title: 'Sotheby\'s Global Reach', desc: 'As a TTR Sotheby\'s International Realty associate broker, your listing gets exposure across 70+ countries. Falls Church luxury buyers don\'t just come from Virginia — they come from New York, California, and overseas.' },
                      { icon: '🤝', title: '218 Seller-Side Transactions', desc: 'Candee has closed 218 deals representing sellers. She\'s negotiated against every type of buyer agent, handled every inspection scenario, and knows how to structure offers that protect your bottom line.' },
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
                    Frequently Asked Questions — Selling in Falls Church
                  </h2>
                  <div className="space-y-4">
                    {[
                      {
                        q: 'How long does it take to sell a home in Falls Church, VA?',
                        a: 'Well-priced homes in Falls Church typically sell within 12–20 days. Homes that are overpriced or poorly staged can sit 60+ days. Pricing correctly from day one is the single biggest factor in time on market.',
                      },
                      {
                        q: 'What is my Falls Church home worth?',
                        a: 'Home values in Falls Church vary significantly by neighborhood — 22046, 22043, and 22042 can have very different price points per square foot. Candee provides free, personalized home valuations based on recent comps, current market conditions, and your home\'s specific features. Start with our free home valuation to get a baseline estimate.',
                      },
                      {
                        q: 'Do I need to make repairs before selling in Falls Church?',
                        a: 'Not always — but the right repairs can significantly increase your sale price. Candee recommends a pre-listing inspection to identify any issues. Small investments in paint, lighting, and staging often return 3–5x their cost in the Falls Church market.',
                      },
                      {
                        q: 'What is the best time of year to sell in Falls Church, VA?',
                        a: 'Spring (March–May) is traditionally the strongest season in Northern Virginia real estate, with the highest buyer activity. However, Falls Church\'s proximity to government agencies means year-round demand from relocating professionals. If your timeline is flexible, spring is ideal. If not — every season has motivated buyers.',
                      },
                      {
                        q: 'How much does it cost to sell a home in Virginia?',
                        a: 'Typical seller costs in Virginia include: real estate commission (typically 5–6% split between buyer and seller agents), transfer tax ($1 per $100 of sale price in Falls Church), title insurance, recording fees, and any prorated property taxes. Candee provides a detailed cost breakdown during your listing consultation.',
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
                    Ready to Sell Your Falls Church Home?
                  </h3>
                  <p className="text-charcoal-muted mb-6">
                    Get a free, no-obligation home valuation from Candee Currie — Associate Broker with 20+ years 
                    of Falls Church market expertise. Know what your home is worth before you list.
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
                      TTR Sotheby&apos;s International Realty. 20+ years in Northern Virginia real estate. 
                      Falls Church market expert.
                    </p>
                    <Link href="/contact" className="btn-outline w-full text-center block">
                      Contact Candee
                    </Link>
                  </div>

                  {/* Quick CTA */}
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      What is your Falls Church home worth?
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
                        <Link href="/market/falls-church-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Falls Church VA Market Report
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/closing-costs-selling-home-northern-virginia" className="text-navy hover:text-gold transition-colors text-sm">
                          Cost of Selling a Home in Northern Virginia
                        </Link>
                      </li>
                      <li>
                        <Link href="/blog/when-is-the-best-time-to-sell-a-home-in-northern-virginia-" className="text-navy hover:text-gold transition-colors text-sm">
                          Best Time to Sell in Northern Virginia
                        </Link>
                      </li>
                      <li>
                        <Link href="/sell/arlington-va" className="text-navy hover:text-gold transition-colors text-sm">
                          Selling a Home in Arlington, VA
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