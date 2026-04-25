import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Selling a Home in Great Falls, VA | Candee Currie — Luxury Estate Expert',
  description:
    'Expert guidance on pricing and marketing your Great Falls, VA estate home. Get a free valuation from a luxury real estate specialist who knows the 22066 market.',
  keywords: [
    'selling a home in Great Falls VA',
    'Great Falls VA real estate',
    'Great Falls luxury homes',
    'sell my home Great Falls Virginia',
    'Great Falls realtor',
    'home value Great Falls VA',
  ],
  alternates: { canonical: '/sell/great-falls-va' },
  openGraph: {
    title: 'Selling a Home in Great Falls, VA | Candee Currie',
    description:
      'Expert guidance for selling your Great Falls, VA estate. Market insights, pricing strategy, and proven results.',
    url: 'https://candeecurriehomes.com/sell/great-falls-va',
    type: 'website',
  },
}

const agentStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Candee Currie',
  description: 'Selling a home in Great Falls, VA? Get expert pricing, staging, and marketing guidance.',
  url: 'https://candeecurriehomes.com/sell/great-falls-va',
  areaServed: {
    '@type': 'City',
    name: 'Great Falls',
    state: 'Virginia',
  },
}

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to sell a home in Great Falls, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Estate homes in Great Falls typically take 45–90 days to sell due to their luxury price point and smaller buyer pool. Proper staging, aerial photography, and Sotheby\'s global marketing significantly reduce time on market. A well-positioned Great Falls estate can sell in under 60 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is my Great Falls home worth?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Great Falls estate values range from $1.5M for smaller homes on 1–2 acre lots to $5M+ for waterfront properties along the Potomac River. Lot size is the primary value driver. Candee provides free, estate-specific valuations based on comparable luxury sales in the 22066 area. Start with our free home valuation for a baseline estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to stage an estate home in Great Falls before selling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional staging is virtually essential for luxury properties in Great Falls. Homes priced above $2M sell faster when fully staged. For vacant estates, Candee can arrange full-home staging. For occupied homes, a consultation and selective staging of key rooms (great room, kitchen, primary suite) is recommended.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best time of year to sell in Great Falls, VA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Spring (April–June) is peak season for Great Falls estate sales, as luxury buyers want to close before the school year starts and outdoor spaces showcase best. Fall (September–October) is a secondary peak. Winter sales are rare but often involve highly motivated buyers making competitive offers due to limited inventory.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does it cost to sell a luxury home in Great Falls, Virginia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Great Falls estate seller costs include: real estate commission (5–6% typically), Fairfax County transfer tax, state grantor tax, title insurance, and potential staging ($5K–$15K for large homes). Additionally, estate sellers may need specialized inspections (well and septic for properties outside municipal utilities). Candee provides a complete cost breakdown tailored to your property type at your listing consultation.',
      },
    },
  ],
}

export default function GreatFallsSellPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(agentStructuredData) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />

      <div className="pt-20">
        <section className="relative py-20 bg-navy">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              <nav className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
                  <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li><li>/</li>
                  <li><Link href="/sell" className="hover:text-gold transition-colors">Seller Hub</Link></li><li>/</li>
                  <li className="text-gold">Great Falls, VA</li>
                </ol>
              </nav>
              <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">Great Falls, Virginia</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">Selling a Home in Great Falls, VA</h1>
              <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">Great Falls estate properties demand a luxury marketing strategy. From aerial photography to Sotheby&apos;s global network, here&apos;s how to sell your Great Falls property at its true value.</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home-value" className="btn-gold">Get My Free Home Valuation</Link>
                <Link href="/contact" className="text-white/70 hover:text-gold transition-colors text-sm self-center underline underline-offset-4">Or schedule a call →</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  <h2 className="font-serif text-3xl text-navy font-bold mb-6">The Great Falls Estate Market in 2026</h2>
                  <p className="text-charcoal-muted leading-relaxed">Great Falls, VA is Northern Virginia&apos;s premier luxury enclave — home to sprawling estates on multi-acre lots, many with private access to the Potomac River and Great Falls Park. The area&apos; 22066 zip code consistently ranks among the wealthiest in the United States, known for privacy, exclusivity, and some of the most expensive real estate in the Mid-Atlantic.</p>
                  <p className="text-charcoal-muted leading-relaxed">Unlike Arlington or McLean, Great Falls has limited inventory — there are no condo buildings, no townhomes. Every property is a single-family estate. This scarcity creates a unique dynamic: when a Great Falls home lists, it attracts attention from luxury buyers across the D.C. metro, Maryland, and even international markets through Sotheby&apos;s network. But selling at top dollar requires specialized marketing that standard agents cannot provide.</p>
                  <div className="bg-cream p-6 rounded-lg border-l-4 border-gold my-8 not-prose">
                    <h3 className="font-serif text-xl text-navy font-bold mb-2">Key Great Falls Market Stats — 2026</h3>
                    <ul className="space-y-2 text-charcoal-muted">
                      <li>• <strong>Median estate sale price:</strong> $1.5M–$5M+ (varies by lot size, waterfront access)</li>
                      <li>• <strong>Average days on market:</strong> 45–90 days for luxury estates</li>
                      <li>• <strong>Buyer demand:</strong> Specialized — executives, international buyers, and privacy-seekers</li>
                      <li>• <strong>Key value drivers:</strong> Lot size (2–10+ acres), waterfront access, home condition</li>
                      <li>• <strong>Year-over-year appreciation:</strong> 3–5% annually</li>
                    </ul>
                    <p className="text-xs text-charcoal-muted/40 mt-3">Based on Great Falls market data as of April 2026</p>
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">What Great Falls Estate Buyers Are Looking For</h2>
                  <p className="text-charcoal-muted leading-relaxed">Great Falls buyers are a distinct group — they&apos;re not just buying a home, they&apos;re buying privacy, prestige, and a lifestyle. Three profiles dominate:</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. C-Suite Executives & Entrepreneurs</h3>
                  <p className="text-charcoal-muted leading-relaxed">Great Falls attracts business owners, C-suite executives, and senior government contractors who want privacy and space. These buyers seek: 3+ acre lots, homes with luxury amenities (wine cellars, home theaters, pools, guest houses), proximity to Dulles Airport, and top-tier Fairfax County schools (Langley High, Forestville Elementary). Many are relocating from higher-cost markets and see Great Falls as exceptional value for luxury living.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Diplomatic & International Families</h3>
                  <p className="text-charcoal-muted leading-relaxed">Diplomats, ambassadors, and international executives are drawn to Great Falls for its gated communities, riverfront properties, and proximity to Embassy Row. These buyers compare Great Falls to Potomac, MD and seek: security features, guest suites or au pair quarters, and proximity to private international schools. Sotheby&apos;s global marketing is essential to reach this segment.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Privacy-Focused Professionals</h3>
                  <p className="text-charcoal-muted leading-relaxed">Senior intelligence community members, federal judges, and medical professionals choose Great Falls specifically for its tree-lined lots, winding roads, and seclusion. These buyers value: wooded privacy, mature landscaping, well and septic systems (for properties outside municipal services), and proximity to Great Falls Park for outdoor recreation. Many want equestrian facilities or horse properties.</p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">Common Mistakes Great Falls Sellers Make</h2>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">1. Undermarketing the Estate&apos;s Lifestyle</h3>
                  <p className="text-charcoal-muted leading-relaxed">Great Falls is not just a house — it&apos;s a lifestyle. Sellers who list with standard photography and MLS-only marketing miss the emotional appeal that drives luxury purchases. Drone footage of the property&apos;s acreage, twilight photography of the grounds, and video tours of outdoor amenities (pools, stables, river access) are essential. If your marketing looks like a standard McLean listing, Great Falls buyers will scroll past.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">2. Pricing Based on Indoor Square Footage Alone</h3>
                  <p className="text-charcoal-muted leading-relaxed">In Great Falls, the land often drives more value than the house. A 1970s home on 5 acres may sell for more than a renovated home on 1.5 acres. Sellers who don&apos;t emphasize lot size, tree coverage, and development potential leave money on the table or price too high for buyers who evaluate the property holistically.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">3. Not Preparing for Well & Septic Inspections</h3>
                  <p className="text-charcoal-muted leading-relaxed">Many Great Falls properties are on private wells and septic systems — unlike municipal areas with inspections. Buyers will test well quality, septic capacity, and drain field condition. Sellers who don&apos;t proactively address these systems risk deal-killing surprises during inspection. Candee recommends pre-listing well and septic evaluations for all properties outside Fairfax Water and Sewer service.</p>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-3">4. Ignoring International & Diplomatic Buyers</h3>
                  <p className="text-charcoal-muted leading-relaxed">A significant portion of Great Falls&apos; luxury buyer pool is international. If your listing is only on the MLS, you&apos;re invisible to diplomats relocating from abroad, international executives transferring to the D.C. area, and foreign investors seeking Virginia luxury real estate. Sotheby&apos;s International Realty&apos;s network across 70+ countries is essential for reaching these buyers.</p>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-12">The Process — Selling Your Great Falls Estate with Candee</h2>
                  <div className="space-y-6 not-prose">
                    {[
                      { step: 1, title: 'Free Luxury Estate Valuation', desc: 'Get a valuation specific to Great Falls estate market dynamics — lot size, waterfront access, condition, and recent luxury comps in the 22066 zip code.' },
                      { step: 2, title: 'Estate Consultation', desc: 'Candee walks through your property, identifies premium features (pools, guest houses, equestrian facilities), and develops a marketing strategy worthy of a Great Falls estate.' },
                      { step: 3, title: 'Luxury Media Production', desc: 'Drone photography, aerial video, twilight shots, 3D walkthrough tours, and professional staging consultation — because Great Falls marketing must match Great Falls quality.' },
                      { step: 4, title: 'Global Luxury Marketing', desc: 'Sotheby\'s International Realty network reaches 70+ countries. Your listing appears in Sotheby\'s luxury catalogs, international property portals, and targeted campaigns to diplomatic buyers.' },
                      { step: 5, title: 'Showings & Negotiation', desc: 'Private showings for qualified luxury buyers, coordination with diplomatic security protocols, and expert negotiation for complex estate transactions.' },
                      { step: 6, title: 'Closing & Beyond', desc: 'Full coordination through inspection, well/septic evaluation, appraisal, and settlement. Great Falls luxury closings often require specialized title and tax expertise.' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 w-10 h-10 bg-gold text-navy rounded-full flex items-center justify-center font-bold text-sm">{item.step}</div>
                        <div>
                          <h3 className="font-serif text-lg text-navy font-bold mb-1">{item.title}</h3>
                          <p className="text-charcoal-muted text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <h2 className="font-serif text-3xl text-navy font-bold mb-6 mt-16">Why Work With Candee to Sell Your Great Falls Estate</h2>
                  <p className="text-charcoal-muted leading-relaxed">Great Falls requires more than a standard agent — it requires someone who understands luxury estate marketing, who can leverage Sotheby&apos;s global network, and who has the experience to price and position high-value properties. Candee combines Northern Virginia expertise with international luxury marketing reach.</p>
                  <div className="space-y-6 not-prose my-8">
                    {[
                      { icon: '🏠', title: 'Luxury Estate Expertise', desc: 'Candee understands Great Falls uniquely — the well and septic considerations, the importance of acreage, the appeal to diplomatic buyers, and the specific marketing channels that reach luxury buyers.' },
                      { icon: '📊', title: 'Data-Driven Luxury Pricing', desc: 'Great Falls comps require specialized analysis — every property is different, lot sizes vary from 1 to 25+ acres, and waterfront access significantly changes valuation. Candee provides accurate, property-specific CMAs.' },
                      { icon: '🌐', title: 'Sotheby\'s Global Network', desc: 'Your Great Falls listing reaches buyers across 70+ countries through TTR Sotheby\'s International Realty — essential for reaching international executives, diplomats, and investors seeking Virginia luxury real estate.' },
                      { icon: '🤝', title: '218 Seller-Side Transactions', desc: 'Candee has closed 218 deals representing sellers, including luxury estates and high-value transactions. She\'s handled every scenario Great Falls sellers face.' },
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

                <div className="mt-12 pt-12 border-t border-gray-200">
                  <h2 className="font-serif text-3xl text-navy font-bold mb-8">Frequently Asked Questions — Selling in Great Falls</h2>
                  <div className="space-y-4">
                    {[
                      { q: 'How long does it take to sell a home in Great Falls, VA?', a: 'Estate homes in Great Falls typically take 45–90 days to sell due to their luxury price point and smaller buyer pool. Proper staging, aerial photography, and Sotheby\'s global marketing significantly reduce time on market.' },
                      { q: 'What is my Great Falls home worth?', a: 'Great Falls estate values range from $1.5M for smaller homes on 1–2 acre lots to $5M+ for waterfront properties. Lot size is the primary value driver. Candee provides free, estate-specific valuations based on comparable luxury sales. Start with our free home valuation.' },
                      { q: 'Do I need to stage an estate home in Great Falls?', a: 'Professional staging is essentially essential for luxury properties in Great Falls. Homes priced above $2M sell faster when fully staged. For occupied homes, selective staging of key rooms (great room, kitchen, primary suite) is recommended.' },
                      { q: 'What is the best time of year to sell in Great Falls?', a: 'Spring (April–June) is peak season for Great Falls estate sales. Fall (September–October) is secondary. Winter sales are rare but often involve highly motivated buyers making competitive offers due to limited inventory.' },
                      { q: 'How much does it cost to sell a luxury home in Great Falls?', a: 'Seller costs include: real estate commission (5–6%), Fairfax County transfer tax, title insurance, and potential staging ($5K–$15K). Many Great Falls properties also need specialized well and septic inspections. Candee provides a complete cost breakdown tailored to your property.' },
                    ].map((faq, i) => (
                      <details key={i} className="border border-gray-200 rounded-lg p-6 not-prose">
                        <summary className="font-serif text-lg text-navy font-semibold cursor-pointer">{faq.q}</summary>
                        <p className="text-charcoal-muted mt-3 leading-relaxed">{faq.a}</p>
                      </details>
                    ))}
                  </div>
                </div>

                <div className="mt-12 p-8 bg-cream border-l-4 border-gold rounded-lg not-prose">
                  <h3 className="font-serif text-2xl text-navy font-bold mb-4">Ready to Sell Your Great Falls Estate?</h3>
                  <p className="text-charcoal-muted mb-6">Get a free, no-obligation luxury estate valuation from Candee Currie — Associate Broker with Sotheby&apos;s global network and 20+ years of Northern Virginia expertise.</p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/home-value" className="btn-gold text-center block">Get My Free Home Valuation</Link>
                    <Link href="/contact" className="btn-outline text-center block">Schedule a Consultation</Link>
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-8">
                  <div className="bg-cream p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-navy rounded-full flex items-center justify-center"><span className="text-gold font-serif text-2xl font-bold">CC</span></div>
                      <div><p className="font-serif text-lg text-navy font-semibold">Candee Currie</p><p className="text-sm text-charcoal-muted">Associate Broker</p></div>
                    </div>
                    <p className="text-sm text-charcoal-muted mb-4">TTR Sotheby&apos;s International Realty. Luxury estate specialist with global Sotheby&apos;s network access and 218 seller-side transactions.</p>
                    <Link href="/contact" className="btn-outline w-full text-center block">Contact Candee</Link>
                  </div>
                  <div className="bg-navy p-6 text-center"><p className="text-white/80 text-sm mb-4">What is your Great Falls estate worth?</p><Link href="/home-value" className="btn-gold w-full block">Get a Free Valuation</Link></div>
                  <div className="bg-white border border-gray-200 p-6">
                    <h3 className="font-serif text-lg text-navy font-semibold mb-4">More Selling Resources</h3>
                    <ul className="space-y-3">
                      <li><Link href="/market/arlington-va" className="text-navy hover:text-gold transition-colors text-sm">Northern Virginia Market Report</Link></li>
                      <li><Link href="/blog/great-falls-vs-mclean-luxury-neighborhood-guide" className="text-navy hover:text-gold transition-colors text-sm">Great Falls vs McLean Luxury Guide</Link></li>
                      <li><Link href="/blog/what-does-1-million-buy-in-northern-virginia-2026" className="text-navy hover:text-gold transition-colors text-sm">What $1M Buys in Northern Virginia</Link></li>
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