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
    excerpt: 'Inventory remains tight while demand stays strong. Here\'s what buyers and sellers need to know heading into spring.',
    content: `
      <p>The Arlington real estate market continues to exhibit the hallmarks that have made it one of the most resilient in the country — low inventory, strong demand, and prices that refuse to soften meaningfully despite broader economic pressures.</p>
      <h2>What the Numbers Show</h2>
      <p>Heading into Q1 2026, the median sale price in Arlington sits at approximately $885,000 — up 4.2% year-over-year. Days on market remain at a historically tight 12 days, and the sale-to-list ratio hovers above 101%, meaning most sellers are still getting above asking.</p>
      <h2>What's Driving Demand</h2>
      <p>Amazon HQ2's continued buildout in National Landing, federal hiring activity, and the general desirability of Arlington's walkable neighborhoods continue to absorb any inventory that comes to market. The Metro-accessible corridors — Clarendon, Ballston, Courthouse, Rosslyn — are particularly competitive.</p>
      <h2>For Buyers</h2>
      <p>Get pre-approved before you start seriously looking. In the $700K–$1.2M range, you should expect to compete. Work with an agent who has strong relationships with listing agents and can get you early access to coming-soon properties.</p>
      <h2>For Sellers</h2>
      <p>If you've been waiting for the "right moment" — this is close to it. Spring inventory will increase, which means more competition for your listing. Price correctly, stage well, and go live on a Thursday. Candee's listings average well above list price.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&q=85',
    publishedAt: '2026-03-01',
    categories: ['market-update'],
    readTime: 5,
  },
  'lyon-village-vs-ashton-heights-arlington': {
    title: 'Lyon Village vs. Ashton Heights: Which Arlington Neighborhood Is Right for You?',
    slug: 'lyon-village-vs-ashton-heights-arlington',
    excerpt: 'Two of Arlington\'s most coveted neighborhoods, side by side. Schools, walkability, price points, and vibe — broken down by someone who knows both intimately.',
    content: `
      <p>Lyon Village and Ashton Heights are two of Arlington's most sought-after residential neighborhoods — and they sit less than a mile apart. Yet they attract different buyers for different reasons. Having sold homes in both neighborhoods for 14+ years, I can break this down clearly.</p>
      <h2>Lyon Village: Craftsman Elegance, Steps from Clarendon</h2>
      <p>Lyon Village is defined by its architectural consistency — predominantly craftsman and colonial-style single-family homes on generous lots, with mature tree canopy and quiet, strollable streets. The proximity to Clarendon (walkable for most residents) gives it urban accessibility without the density. Median prices hover around $1.1M, making it one of Arlington's priciest non-waterfront neighborhoods.</p>
      <h2>Ashton Heights: The Hidden Gem</h2>
      <p>Ashton Heights has a more eclectic mix — bungalows, capes, colonials, and the occasional new build. Prices are typically $100–200K below Lyon Village for comparable square footage, which is why it attracts buyers who want the Arlington lifestyle without the premium. It's also a tight-knit community with an active civic association and community garden.</p>
      <h2>Schools</h2>
      <p>Both neighborhoods feed into the Swanson Middle and Yorktown High pyramid, which is consistently ranked among Arlington's best. Elementary schools differ — Lyon Village feeds to Science Focus, while Ashton Heights is in the Ashlawn Elementary zone.</p>
      <h2>The Bottom Line</h2>
      <p>If budget allows and you want the full Lyon Village statement — go for it. If you want equivalent schools, walkability, and Arlington authenticity at a lower entry point, Ashton Heights is one of the best values left in the county.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&q=85',
    publishedAt: '2026-02-15',
    categories: ['neighborhood-spotlight'],
    readTime: 7,
  },
  'arlington-home-seller-checklist-2026': {
    title: '7 Things Every Arlington Home Seller Should Do Before Listing',
    slug: 'arlington-home-seller-checklist-2026',
    excerpt: 'From strategic pricing to professional staging — the moves that consistently get multiple offers in today\'s Northern Virginia market.',
    content: `
      <p>After 218 seller-side transactions in Northern Virginia, I've developed a pre-listing playbook that works. Not every step is required for every home, but the sellers who follow this framework consistently outperform the market.</p>
      <h2>1. Price It Right the First Time</h2>
      <p>Overpricing is the single most common seller mistake. A home that sits for 30+ days in Arlington loses its competitive edge — buyers assume something is wrong. Price competitively, generate multiple offers, and let the market push the price up.</p>
      <h2>2. Pre-Listing Inspection</h2>
      <p>Know what you're selling before buyers discover it. A $400 inspection eliminates surprises and gives you leverage to address issues on your terms, not the buyer's.</p>
      <h2>3. Strategic Staging</h2>
      <p>You don't need to fully stage every room, but the main level, primary suite, and outdoor spaces must be compelling. Buyers make decisions in the first 90 seconds.</p>
      <h2>4. Professional Photography and Video</h2>
      <p>In 2026, over 95% of buyers start their search online. Your listing photos are your first showing. Don't cut corners here.</p>
      <h2>5. Thursday Goes Live</h2>
      <p>Listing on Thursday gives buyers two full days to schedule showings before the weekend — the peak traffic window. Monday listings lose momentum.</p>
      <h2>6. Lock Up Valuables and Personal Photos</h2>
      <p>Depersonalize. Buyers need to imagine themselves in the space, not you.</p>
      <h2>7. Be Flexible on Showings</h2>
      <p>In a competitive market, the buyer who can't get a showing will move on. 7 days of maximum access is worth it.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=85',
    publishedAt: '2026-02-05',
    categories: ['sellers-guide'],
    readTime: 6,
  },
  'crystal-city-national-landing-amazon-hq2': {
    title: 'Crystal City & National Landing: The Next Great Northern Virginia Neighborhood',
    slug: 'crystal-city-national-landing-amazon-hq2',
    excerpt: 'Amazon HQ2 is transforming Crystal City into one of the most dynamic neighborhoods in the DMV. Here\'s what\'s happening — and what it means for your home value.',
    content: `
      <p>National Landing — the rebranded area encompassing Crystal City, Pentagon City, and part of Alexandria — is undergoing the most significant urban transformation in Northern Virginia in a generation. Amazon's HQ2 campus is the anchor, but the story is much bigger.</p>
      <h2>What's Being Built</h2>
      <p>Amazon's Phase 1 campus (Metropolitan Park) is operational, with Phase 2 (The Helix, the landmark spiral tower) under construction. Virginia Tech's Innovation Campus is rising next door. The Metropolitan Washington Airports Authority is redeveloping Crystal City's retail infrastructure. The neighborhood will look dramatically different by 2028.</p>
      <h2>What This Means for Real Estate</h2>
      <p>Condo prices in National Landing have appreciated roughly 18–22% since Amazon's announcement. More importantly, the long-term trajectory looks strong — the kind of institutional investment backing National Landing doesn't happen twice in a generation.</p>
      <h2>Who's Buying Here</h2>
      <p>Primarily tech professionals, government contractors, and investors who see the 15–20 year appreciation story. The Blue/Yellow Line access to DCA airport is also a major draw for buyers who travel frequently.</p>
      <h2>Candee's Take</h2>
      <p>I've been buying and selling in this corridor for years. The fundamentals are as strong as anywhere in the region. If you're considering a condo in the $500–700K range with strong appreciation potential, National Landing deserves serious consideration.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85',
    publishedAt: '2026-01-22',
    categories: ['neighborhood-spotlight'],
    readTime: 8,
  },
  'first-time-buyers-guide-northern-virginia': {
    title: 'First-Time Buyer\'s Guide to Northern Virginia: Everything You Need to Know',
    slug: 'first-time-buyers-guide-northern-virginia',
    excerpt: 'From pre-approval to closing day — a complete guide for first-time buyers navigating the competitive NoVA market.',
    content: `
      <p>Buying your first home in Northern Virginia is exciting — and nerve-wracking. This market is competitive, prices are high, and the process is complex. Here's the honest guide I give every first-time buyer who works with me.</p>
      <h2>Step 1: Understand What You Can Actually Afford</h2>
      <p>Get fully pre-approved — not pre-qualified. There's a difference. A full pre-approval means a lender has verified your income, assets, and credit. Sellers in NoVA expect it, and it puts you in a position to act fast.</p>
      <h2>Step 2: Define Your Non-Negotiables</h2>
      <p>Before you start touring, write down the 3–4 things that are genuinely non-negotiable (school zone, commute time, parking, sqft). Everything else is a preference, not a requirement.</p>
      <h2>Step 3: Understand the NoVA Competitive Dynamic</h2>
      <p>In the $600K–$1.2M range, you should expect competition. Multiple offers are common on well-priced, well-presented homes. Your agent's ability to write a strong offer and negotiate intelligently matters enormously.</p>
      <h2>Step 4: The Offer</h2>
      <p>Price matters, but so do terms. Escalation clauses, appraisal gap coverage, quick settlement dates, and strong earnest money all signal a serious buyer. I'll guide you through what makes sense for each specific situation.</p>
      <h2>Step 5: Due Diligence Doesn't End at Ratification</h2>
      <p>Inspection, appraisal, title review, HOA documents (if applicable), final walkthrough. Each step matters. Don't skip the inspection to win a bidding war — understand what you're waiving and why.</p>
      <h2>First-Time Buyer Programs in Virginia</h2>
      <p>Virginia Housing offers competitive mortgage rates and down payment assistance for first-time buyers. Arlington and Alexandria also have local programs. Ask me for current details.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=85',
    publishedAt: '2026-01-10',
    categories: ['buyers-guide'],
    readTime: 10,
  },
  'mclean-real-estate-luxury-market-2026': {
    title: 'McLean Real Estate: Why Luxury Buyers Keep Coming Back',
    slug: 'mclean-real-estate-luxury-market-2026',
    excerpt: 'McLean continues to command premium prices and strong absorption rates at the top of the market. Here\'s what drives the demand.',
    content: `
      <p>McLean is in a category of its own in Northern Virginia real estate. The combination of Fairfax County's top-ranked schools, the privacy of large lots, the prestige of the address, and the proximity to Tysons and D.C. creates a market that consistently holds its value — even when the broader market softens.</p>
      <h2>The School Factor</h2>
      <p>Langley High School is the primary anchor. Parents move to McLean specifically for the Langley pyramid, and that demographic — upper-income professionals with school-age children — never goes away. As long as Langley maintains its ranking, McLean holds its floor.</p>
      <h2>What Luxury Buyers Are Looking For in 2026</h2>
      <p>Based on recent transactions and conversations with my buyer pool: smart home integration, primary suites with hotel-quality finishes, dedicated home office space (still a post-pandemic fixture), three-car garages, and outdoor living — pools, pergolas, outdoor kitchens. McLean's lot sizes make all of this possible.</p>
      <h2>Price Points</h2>
      <p>Entry-level McLean starts around $1.2–1.4M for a solid single-family home. The upper tier ($3M–$6M+) is active, with Embassy Row-caliber buyers and international relocation adding depth to the buyer pool.</p>
      <h2>Investment Perspective</h2>
      <p>McLean's 15-year appreciation has been consistent and strong. It's not a speculative market — it's a store of value that also happens to be a great place to live.</p>
    `,
    mainImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85',
    publishedAt: '2025-12-18',
    categories: ['neighborhood-spotlight'],
    readTime: 6,
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
