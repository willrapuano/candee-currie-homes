import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { getBlogPostSchema, getBreadcrumbSchema } from '@/lib/schema-org'

interface Props {
  params: { slug: string }
}

// Placeholder — will be replaced by Sanity fetch
const POSTS: Record<string, {
  title: string
  slug: string
  excerpt: string
  content: string
  mainImage: string
  publishedAt: string
  categories: string[]
  readTime: number
}> = {
  'arlington-market-update-q1-2026': {
    title: 'Arlington Real Estate Market Update: Q1 2026',
    slug: 'arlington-market-update-q1-2026',
    excerpt: 'Inventory remains tight while demand stays strong. Here\'s what buyers and sellers need to know heading into the spring market.',
    content: `
      <p class="lead text-xl text-navy/80 font-medium mb-8">The Arlington real estate market continues to exhibit the hallmarks that have made it one of the most resilient in the country — low inventory, exceptional demand, and property values that refuse to soften meaningfully despite broader macroeconomic pressures and fluctuating interest rates.</p>
      
      <h2>What the Numbers Show</h2>
      <p>Heading into Q1 2026, the median sale price in Arlington sits at approximately <strong>$885,000</strong> — up <strong>4.2% year-over-year</strong>. While national headlines frequently discuss market cooling, Arlington's micro-market tells a distinctly different story. Days on market (DOM) remain at a historically tight 12 days, and the sale-to-list ratio consistently hovers above 101%. This means the average seller is still securing a final price above their original asking figure.</p>
      
      <p>In the luxury tier ($1.5M+), we are seeing sustained activity, particularly for turnkey properties that require zero immediate renovation. Discerning buyers in this segment are highly sensitive to the cost and timeline of construction, heavily preferring move-in ready homes over projects.</p>

      <blockquote>
        <p>"In today's market, well-priced, impeccably presented homes aren't just selling—they're creating competitive bidding environments. If a home sits for more than two weeks, the market is sending a clear message that the pricing strategy needs adjustment."</p>
      </blockquote>

      <h2>What's Driving Sustained Demand</h2>
      <p>Arlington's housing market is insulated by several unique, long-term economic drivers:</p>
      <ul>
        <li><strong>Amazon HQ2 & National Landing:</strong> The continued buildout of Metropolitan Park and The Helix is bringing a steady influx of highly compensated tech professionals into the 22202 and surrounding zip codes.</li>
        <li><strong>Federal & Defense Sector Stability:</strong> Government and defense contracting sectors remain robust, providing job security that translates directly to housing market confidence.</li>
        <li><strong>The "Walkable Urbanism" Premium:</strong> The Metro-accessible corridors (Clarendon, Ballston, Courthouse, Rosslyn) offer a lifestyle that continues to draw buyers transitioning out of Washington D.C. who seek better public schools without sacrificing walkability.</li>
      </ul>

      <hr />

      <h2>Strategic Advice for Buyers</h2>
      <p>Preparation is your greatest asset. Get fully underwritten and pre-approved before you attend your first open house. In the highly competitive $700K–$1.2M range, you should expect to face multiple offers. Your success will heavily depend on working with an agent who has deep relationships with local listing agents, allowing you to access "coming soon" properties and craft offers with terms (like appraisal gap coverage or strategic rent-backs) that appeal to sellers just as much as the headline price.</p>
      
      <h2>Strategic Advice for Sellers</h2>
      <p>If you have been waiting for the "right moment" to list — we have arrived. The early spring market is historically the most advantageous window. However, buyers have become increasingly discerning. To secure premium pricing, your property must be prepared flawlessly. Price correctly from day one, invest in professional staging, and plan to launch your listing on a Thursday to maximize weekend foot traffic. Candee's listings consistently average well above list price because we do not compromise on presentation.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=85',
    publishedAt: '2026-03-01',
    categories: ['market-update'],
    readTime: 6,
  },
  'lyon-village-vs-ashton-heights-arlington': {
    title: 'Lyon Village vs. Ashton Heights: Which Arlington Neighborhood Is Right for You?',
    slug: 'lyon-village-vs-ashton-heights-arlington',
    excerpt: 'Two of Arlington\'s most coveted residential neighborhoods, side by side. Schools, walkability, price points, and vibe — broken down by a local expert.',
    content: `
      <p class="lead text-xl text-navy/80 font-medium mb-8">Lyon Village and Ashton Heights represent two of Arlington's most sought-after, picturesque residential neighborhoods. They sit less than a mile apart, share similar commuting advantages, and yet, they attract distinctly different buyers. Having represented buyers and sellers in both communities for over 14 years, here is a definitive breakdown of what sets them apart.</p>
      
      <h2>Lyon Village: Craftsman Elegance and Unmatched Clarendon Proximity</h2>
      <p>Established in the 1920s, Lyon Village is defined by its striking architectural consistency and prestige. The neighborhood is predominantly comprised of stunning craftsman, colonial, and Tudor-style single-family homes situated on generous, impeccably landscaped lots. Mature tree canopies line the quiet, strollable streets, creating a tranquil suburban oasis just blocks from major commercial corridors.</p>
      <ul>
        <li><strong>The Lifestyle Vibe:</strong> Classic Arlington heritage with immediate, walkable access to urban amenities.</li>
        <li><strong>The Price Point:</strong> Premium. Median prices hover around <strong>$1.1M to $1.3M</strong>, with renovated historic homes and luxury new builds easily surpassing the $2.5M mark. It remains one of Arlington's priciest non-waterfront enclaves.</li>
        <li><strong>The Primary Draw:</strong> The sheer proximity to Clarendon. Residents can enjoy a quiet, large-lot suburban home while being a five-minute walk from Whole Foods, top-tier dining, and the Metro.</li>
      </ul>

      <h2>Ashton Heights: The Historic, Eclectic Hidden Gem</h2>
      <p>Directly adjacent, Ashton Heights offers a slightly more eclectic, bohemian charm. The architectural mix here is broader — featuring classic bungalows, Cape Cods, updated colonials, and thoughtful new construction. It feels slightly more tucked away, boasting an incredibly active civic association that fosters a deep sense of community.</p>
      
      <ul>
        <li><strong>The Lifestyle Vibe:</strong> A deeply connected, front-porch community with a rich history and a slightly more relaxed atmosphere.</li>
        <li><strong>The Price Point:</strong> Approachable luxury. Prices are typically <strong>$100K–$200K below Lyon Village</strong> for comparable square footage.</li>
        <li><strong>The Primary Draw:</strong> Value and community. Ashton Heights attracts buyers who want the highly desirable Arlington lifestyle, historic charm, and walkability (to both Clarendon and Virginia Square), but at a slightly lower entry point than Lyon Village.</li>
      </ul>

      <blockquote>
        <p>"Ashton Heights is for the buyer who values community spirit as much as they value location. It's a tight-knit enclave where the annual neighborhood parades and community garden are central to the lifestyle."</p>
      </blockquote>

      <h2>The Educational Landscape</h2>
      <p>For families, schools are often the deciding factor. Both neighborhoods proudly feed into the highly regarded <strong>Swanson Middle School</strong> and <strong>Yorktown High School</strong> pyramid, which consistently rank among the best in the Commonwealth of Virginia. However, the elementary school boundaries differ:</p>
      <ul>
        <li><strong>Lyon Village:</strong> Feeds primarily to Innovation Elementary (formerly Science Focus).</li>
        <li><strong>Ashton Heights:</strong> Falls within the coveted Ashlawn Elementary school boundary.</li>
      </ul>

      <hr />

      <h2>The Bottom Line</h2>
      <p>Deciding between the two often comes down to budget and architectural preference. If your budget allows and you desire the prestigious "statement" of a grand historic colonial within steps of Clarendon's vibrant core, Lyon Village is unmatched. Conversely, if you prioritize equivalent educational access, authentic community charm, and a slightly better value proposition per square foot, Ashton Heights is arguably the best-kept secret in the county.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85',
    publishedAt: '2026-02-15',
    categories: ['neighborhood-spotlight'],
    readTime: 7,
  },
  'arlington-home-seller-checklist-2026': {
    title: '7 Things Every Arlington Home Seller Should Do Before Listing',
    slug: 'arlington-home-seller-checklist-2026',
    excerpt: 'From strategic pricing to professional staging — the moves that consistently generate multiple offers and premium pricing in today\'s Northern Virginia market.',
    content: `
      <p class="lead text-xl text-navy/80 font-medium mb-8">After facilitating hundreds of successful seller-side transactions in Northern Virginia, I have developed a rigorous pre-listing playbook. In a market where buyers are highly educated and increasingly discerning, you cannot rely on low inventory alone to secure top dollar. The sellers who meticulously follow this framework consistently outperform the market.</p>
      
      <h2>1. Execute a Data-Driven Pricing Strategy</h2>
      <p>Overpricing remains the single most detrimental mistake a seller can make. A home that sits for 30+ days in Arlington loses its competitive edge, leading buyers to inevitably ask, <em>"What is wrong with this house?"</em> The goal is to price competitively against recent comparables, generate immediate urgency, attract multiple offers, and allow the market's momentum to push the final contract price upward.</p>
      
      <h2>2. Conduct a Pre-Listing Inspection</h2>
      <p>Knowledge is power. You must know exactly what you are selling before a buyer's inspector discovers it. A $400-$600 pre-listing inspection eliminates late-stage surprises and gives you the leverage to address minor repairs on your own terms—or proactively disclose them—rather than facing aggressive renegotiations days before closing.</p>
      
      <h2>3. Stage Strategically for the "90-Second Rule"</h2>
      <p>Buyers typically form an emotional attachment (or detachment) within the first 90 seconds of walking through your front door. While you do not need to fully stage every room, the main living areas, the primary suite, and outdoor spaces must be compelling. Professional staging creates a cohesive, aspirational narrative.</p>
      
      <blockquote>
        <p>"Staging isn't about decorating; it's about depersonalizing and neutralizing your home so the next owner can immediately envision themselves living there."</p>
      </blockquote>

      <h2>4. Invest in Premium Digital Media</h2>
      <p>In 2026, over <strong>95% of buyers begin their home search online</strong>. Your digital listing is your first showing. High-definition photography, twilight exterior shots, floor plans, and drone footage are no longer optional—they are absolute table stakes in the luxury market. Do not let an agent list your home with smartphone photos.</p>
      
      <h2>5. Launch on a Thursday</h2>
      <p>Timing your market debut is critical. Listing on a Thursday gives prospective buyers and their agents two full days to review the media, run the comps, and schedule showings right before the weekend—the peak traffic window. Homes listed on a Monday often lose their "just listed" momentum by the time Saturday arrives.</p>
      
      <h2>6. Depersonalize and Declutter Ruthlessly</h2>
      <p>Remove family portraits, highly specific artwork, excess furniture, and daily clutter. Rent a storage unit if necessary. The goal is to make the home feel as expansive, bright, and universally appealing as possible. Buyers need to imagine their own lives unfolding in the space, which is difficult if they feel like they are intruding on yours.</p>
      
      <h2>7. Commit to Ultimate Showing Flexibility</h2>
      <p>In a competitive market, a buyer who cannot quickly secure a showing appointment will simply move on to the next property. Commit to leaving the home in immaculate condition and accommodating all showing requests for the first 7 to 10 days. It is a temporary inconvenience that pays massive dividends at the settlement table.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85',
    publishedAt: '2026-02-05',
    categories: ['sellers-guide'],
    readTime: 8,
  },
  'crystal-city-national-landing-amazon-hq2': {
    title: 'Crystal City & National Landing: The Next Great Northern Virginia Neighborhood',
    slug: 'crystal-city-national-landing-amazon-hq2',
    excerpt: 'Amazon HQ2 is transforming Crystal City into one of the most dynamic, tech-forward neighborhoods in the DMV. Here\'s what\'s happening — and what it means for your equity.',
    content: `
      <p class="lead text-xl text-navy/80 font-medium mb-8">National Landing — the newly branded, interconnected district encompassing Crystal City, Pentagon City, and the northern edge of Alexandria — is undergoing the most significant and well-funded urban transformation in Northern Virginia in a generation. While Amazon's HQ2 campus serves as the anchor, the complete narrative is much broader and more exciting.</p>
      
      <h2>The Development Pipeline: What is Actually Being Built</h2>
      <p>The skyline and streetscape of 22202 are evolving daily. Amazon's Phase 1 campus (Metropolitan Park) is fully operational, bringing thousands of employees, lush public parks, and new retail to the area. Phase 2 (PenPlace, featuring The Helix, a landmark spiral tower) will redefine the local skyline. But the institutional investment extends far beyond Amazon:</p>
      <ul>
        <li><strong>Virginia Tech's Innovation Campus:</strong> Rising just south in Potomac Yard, this $1 billion graduate campus is creating a direct pipeline for top-tier tech talent, cementing the area as the East Coast's premier technology corridor.</li>
        <li><strong>MWAA & JBG SMITH Retail Revitalization:</strong> The outdated underground corridors of Crystal City are being reimagined into vibrant, street-facing retail promenades, bringing upscale dining, boutique fitness studios, and modern grocery options to residents' doorsteps.</li>
        <li><strong>Transit Upgrades:</strong> A new pedestrian bridge connecting directly to Reagan National Airport (DCA) and enhanced Metro facilities are turning the area into a hyper-connected transit hub.</li>
      </ul>

      <h2>The Real Estate Impact: Property Values and Projections</h2>
      <p>The "Amazon Effect" was real, and its secondary waves are still being felt. Residential properties in the National Landing perimeter have appreciated roughly <strong>18–22% since the initial HQ2 announcement</strong>. More importantly, the long-term trajectory looks incredibly robust. The sheer volume of institutional capital, infrastructure investment, and high-paying jobs backing National Landing creates a solid floor for property values.</p>

      <blockquote>
        <p>"We are actively watching a mid-century, 9-to-5 government contractor hub transform into a true 24/7, world-class innovation district. The property values are adjusting to reflect that massive paradigm shift."</p>
      </blockquote>

      <h2>Who is Buying in National Landing?</h2>
      <p>The buyer demographic has shifted significantly. We are seeing a heavy influx of tech professionals, aerospace executives, and savvy investors who recognize the 15–20 year appreciation story. Furthermore, the unmatched Blue and Yellow Line Metro access, combined with a five-minute commute to DCA, makes it highly attractive for consultants and buyers who travel frequently.</p>
      
      <hr />

      <h2>Candee's Expert Take</h2>
      <p>I have advised clients on acquisitions and sales in this specific corridor for years. The economic fundamentals here are as strong as anywhere in the Mid-Atlantic region. If you are an investor looking for reliable rental yields with strong appreciation upside, or a buyer seeking a luxury condo in the $600K–$900K range, National Landing must be on your short list.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85',
    publishedAt: '2026-01-22',
    categories: ['neighborhood-spotlight'],
    readTime: 8,
  },
  'first-time-buyers-guide-northern-virginia': {
    title: 'First-Time Buyer\'s Guide to Northern Virginia: Navigating a Complex Market',
    slug: 'first-time-buyers-guide-northern-virginia',
    excerpt: 'From securing underwriting to closing day — a comprehensive masterclass for first-time buyers aiming to win in the highly competitive NoVA market.',
    content: `
      <p class="lead text-xl text-navy/80 font-medium mb-8">Purchasing your first home in Northern Virginia is both an incredible milestone and a uniquely high-stakes endeavor. This market is notoriously competitive, inventory is perpetually tight, and the contract nuances are complex. Here is the honest, unfiltered framework I provide to every first-time buyer I represent at TTR Sotheby's International Realty.</p>
      
      <h2>Step 1: Secure a Verified Pre-Approval (Not Just Pre-Qualification)</h2>
      <p>Do not attend a single showing without your financing fully in order. In our market, a generic online "pre-qualification" letter holds very little weight. You need a <strong>verified pre-approval</strong> from a reputable, local lender who has fully reviewed your W-2s, tax returns, bank statements, and credit profile.</p>
      <ul>
        <li><strong>Why Local Matters:</strong> Listing agents know which local lenders close on time and which big-box banks miss deadlines. A letter from a trusted local loan officer immediately makes your offer stronger.</li>
      </ul>

      <h2>Step 2: Ruthlessly Define Your Non-Negotiables</h2>
      <p>In a market where the median home price demands significant capital, compromise is inevitable. Before you begin touring, write down your absolute non-negotiables. Is it the school pyramid? Walkability to the Metro? A fenced yard for your dog? Pick three. Everything else—paint colors, dated kitchens, lack of a finished basement—is a preference, not a dealbreaker.</p>

      <h2>Step 3: Master the Competitive Dynamic</h2>
      <p>If you are looking in the $600K–$1.2M range in Arlington, Alexandria, or Fairfax, you will likely face multiple-offer scenarios. Your agent's ability to extract information from the listing agent, structure a clean contract, and advise you on strategic risk is what will win you the house.</p>

      <blockquote>
        <p>"In Northern Virginia, the highest headline price does not always win the house. The cleanest terms, the most reliable financing, and the highest certainty to close often beat a slightly higher, but structurally messy, offer."</p>
      </blockquote>

      <h2>Step 4: Crafting the Winning Offer</h2>
      <p>Price is just one lever in a real estate contract. To win without wildly overpaying, you must understand how to utilize other terms:</p>
      <ul>
        <li><strong>Escalation Clauses:</strong> Automatically outbidding competing offers up to a capped amount.</li>
        <li><strong>Appraisal Gap Coverage:</strong> Guaranteeing you will cover the difference in cash if the home appraises lower than the contract price.</li>
        <li><strong>Information-Only Inspections:</strong> Retaining your right to void the contract if major structural issues are found, but promising not to nickel-and-dime the seller for minor repairs.</li>
        <li><strong>Free Rent-Backs:</strong> Allowing the seller to stay in the home for a few weeks post-closing to facilitate their own move.</li>
      </ul>

      <hr />

      <h2>Step 5: Due Diligence and Closing</h2>
      <p>Winning the bidding war is only the first half of the transaction. You must navigate the home inspection, appraisal, title review, and HOA document review. Each step is a critical contingency that protects your earnest money deposit. A great agent doesn't just help you win the house; they protect your capital all the way to the settlement table.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
    publishedAt: '2026-01-10',
    categories: ['buyers-guide'],
    readTime: 9,
  },
  'mclean-real-estate-luxury-market-2026': {
    title: 'McLean Real Estate: Why Luxury Buyers Keep Coming Back',
    slug: 'mclean-real-estate-luxury-market-2026',
    excerpt: 'McLean continues to command premium prices and robust absorption rates at the very top of the market. Here is a deep dive into what drives the unrelenting demand.',
    content: `
      <p class="lead text-xl text-navy/80 font-medium mb-8">McLean operates in a category of its own within the Northern Virginia real estate landscape. The unique alchemy of Fairfax County's top-ranked public schools, the secluded privacy of multi-acre lots, the prestige of the 22101 zip code, and immediate proximity to both Tysons Corner and Washington D.C. creates a micro-market that consistently holds its value—even when broader regional markets experience softening.</p>
      
      <h2>The Educational Anchor: The Langley Pyramid</h2>
      <p><strong>Langley High School</strong> is the undisputed gravitational force of McLean real estate. Families and executives move to McLean specifically to secure access to the Langley school pyramid. This specific demographic—high-net-worth professionals with school-age children—creates a perpetual floor of demand. As long as the schools maintain their elite rankings, McLean properties will command a premium.</p>

      <h2>What the Modern Luxury Buyer Demands in 2026</h2>
      <p>Based on recent high-end transactions and deep conversations with my luxury buyer pool, expectations have shifted. The modern McLean buyer is looking for highly curated, turnkey estates:</p>
      <ul>
        <li><strong>Invisible Smart Home Tech:</strong> Fully integrated lighting, climate, and security systems that operate flawlessly without visual clutter.</li>
        <li><strong>Sanctuary Primary Suites:</strong> Expansive bedroom suites featuring true spa-quality bathrooms, dual water closets, and bespoke dressing rooms.</li>
        <li><strong>Executive Workspaces:</strong> The post-pandemic shift made the home office a permanent fixture. Buyers expect dedicated, sound-damped, elegant executive studies.</li>
        <li><strong>Resort-Style Outdoor Living:</strong> Heated saltwater pools, custom pergolas, and full outdoor kitchens. McLean's generous lot sizes make extensive outdoor architecture possible in a way that Arlington simply cannot accommodate.</li>
      </ul>

      <blockquote>
        <p>"Buying in McLean isn't just about acquiring a prestigious zip code; it is about securing expansive land and total privacy without sacrificing immediate proximity to the nation's capital."</p>
      </blockquote>

      <h2>Understanding the Price Tiers</h2>
      <p>Entry-level McLean starts around <strong>$1.3M to $1.6M</strong>. In many cases, these properties are viewed by buyers as prime tear-down candidates or major renovation projects on premium lots. The middle luxury tier ($2M–$3.5M) moves surprisingly fast when properties are updated. The ultra-luxury tier (<strong>$4M–$10M+</strong>) remains highly active, supported by Embassy Row-caliber buyers, international relocations, and C-suite executives.</p>
      
      <hr />

      <h2>The Long-Term Investment Perspective</h2>
      <p>Over the last two decades, McLean's appreciation curve has been characterized by steady, insulated growth. It is not a speculative market driven by fleeting trends; it is a profound store of generational wealth. For the luxury buyer looking for stability, prestige, and unparalleled living space, McLean remains the crown jewel of Northern Virginia.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85',
    publishedAt: '2025-12-18',
    categories: ['neighborhood-spotlight'],
    readTime: 7,
  },
}

export async function generateStaticParams() {
  // In production, this fetches from Sanity:
  // const slugs = await sanityClient.fetch(`*[_type == "post"]{ "slug": slug.current }`)
  // return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
  return Object.keys(POSTS).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = POSTS[params.slug]
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      images: [{ url: post.mainImage }],
    },
  }
}

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'neighborhood-spotlight': 'Neighborhood Spotlight',
  'sellers-guide': 'Seller\'s Guide',
  'buyers-guide': 'Buyer\'s Guide',
}

export default function BlogPostPage({ params }: Props) {
  const post = POSTS[params.slug]
  if (!post) notFound()

  const schemaOrg = getBlogPostSchema({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    mainImageUrl: post.mainImage,
  })

  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[360px]">
          <Image
            src={post.mainImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-navy/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-xl pb-12">
              <nav className="flex items-center gap-2 text-white/50 text-xs mb-4">
                <Link href="/" className="hover:text-gold">Home</Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-gold">Blog</Link>
                <span>/</span>
                <span className="text-white">{CATEGORY_LABELS[post.categories[0]]}</span>
              </nav>
              <div className="mb-3">
                <span className="bg-gold text-navy text-[10px] font-bold tracking-wider uppercase px-3 py-1.5">
                  {CATEGORY_LABELS[post.categories[0]]}
                </span>
              </div>
              <h1 className="font-serif text-3xl md:text-5xl text-white font-bold max-w-3xl leading-tight">
                {post.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Article */}
        <section className="section-padding bg-white">
          <div className="container-lg">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Content */}
              <article className="lg:col-span-2">
                {/* Meta */}
                <div className="flex items-center gap-4 text-charcoal-muted text-sm mb-8 pb-8 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-xs font-bold">
                      CC
                    </div>
                    <span className="font-medium text-navy">Candee Currie</span>
                  </div>
                  <span>·</span>
                  <time>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</time>
                  <span>·</span>
                  <span>{post.readTime} min read</span>
                </div>

                {/* Body */}
                <div
                  className="prose prose-lg prose-headings:font-serif prose-headings:text-navy 
                             prose-p:text-charcoal-muted prose-p:leading-relaxed 
                             prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                             max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* CTA */}
                <div className="mt-12 bg-navy p-8">
                  <h3 className="font-serif text-2xl text-white font-bold mb-2">
                    Questions About the Market?
                  </h3>
                  <p className="text-white/70 text-sm mb-5">
                    Candee&apos;s been selling in Northern Virginia for 14+ years. Get personalized advice.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact" className="btn-gold">Contact Candee</Link>
                    <Link href="/home-value" className="btn-outline-white">Free Home Value</Link>
                  </div>
                </div>

                {/* Equal Housing Opportunity — auto-rendered on every blog post */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">🏠</span>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    We are pledged to the letter and spirit of U.S. policy for the achievement of 
                    equal housing opportunity throughout the nation.{' '}
                    <span className="font-semibold">Equal Housing Opportunity.</span>
                  </p>
                </div>
              </article>

              {/* Sidebar */}
              <aside>
                <div className="bg-cream p-6 mb-6">
                  <h3 className="font-serif text-navy text-lg font-bold mb-4">About Candee</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed mb-4">
                    Candee Currie is an Associate Broker at TTR Sotheby&apos;s International Realty 
                    specializing in Arlington and Northern Virginia real estate.
                  </p>
                  <Link href="/about" className="btn-navy w-full text-center block text-sm">
                    Learn More
                  </Link>
                </div>

                <div className="bg-navy p-6">
                  <h3 className="font-serif text-white text-lg font-bold mb-3">
                    What&apos;s Your Home Worth?
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Get a free Comparative Market Analysis from Candee.
                  </p>
                  <Link href="/home-value" className="btn-gold w-full text-center block">
                    Get Free CMA
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
