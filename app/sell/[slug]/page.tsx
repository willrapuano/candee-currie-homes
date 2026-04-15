import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { sanityClient, urlFor } from '@/lib/sanity/client'
import { SELLER_GUIDE_QUERY, RELATED_SELLER_GUIDES_QUERY } from '@/lib/sanity/queries'
import { ContentBlocks } from '@/components/blocks/ContentBlocks'
import { AccordionBlock } from '@/components/blocks/AccordionBlock'

interface SellerGuidePageProps {
  params: { slug: string }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: SellerGuidePageProps): Promise<Metadata> {
  const guide = await sanityClient.fetch(SELLER_GUIDE_QUERY, { slug: params.slug })
  
  if (!guide) {
    return {
      title: 'Guide Not Found | Candee Currie',
    }
  }

  const title = guide.metaTitle || `${guide.title} | Seller Guide | Candee Currie`
  const description = guide.metaDescription || guide.shortDescription

  return {
    title,
    description,
    keywords: guide.targetKeyword ? [guide.targetKeyword] : undefined,
    alternates: { canonical: `/sell/${params.slug}` },
    openGraph: {
      title,
      description,
      url: `/sell/${params.slug}`,
      type: 'article',
    },
  }
}

// Generate static paths for all seller guides
export async function generateStaticParams() {
  const guides = await sanityClient.fetch(`*[_type == "sellerGuide" && defined(slug.current)] { "slug": slug.current }`)
  return guides.map((guide: { slug: string }) => ({ slug: guide.slug }))
}

// Generate JSON-LD structured data
function generateStructuredData(guide: any) {
  const baseSchema = {
    '@context': 'https://schema.org',
    '@type': guide.schemaType || 'Article',
    headline: guide.title,
    description: guide.shortDescription,
    url: `https://candeecurriehomes.com/sell/${guide.slug.current}`,
    author: {
      '@type': 'Person',
      name: 'Candee Currie',
      jobTitle: 'Associate Broker',
      worksFor: {
        '@type': 'RealEstateAgent',
        name: "TTR Sotheby's International Realty",
      },
    },
    publisher: {
      '@type': 'RealEstateAgent',
      name: "TTR Sotheby's International Realty",
      logo: {
        '@type': 'ImageObject',
        url: 'https://candeecurriehomes.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://candeecurriehomes.com/sell/${guide.slug.current}`,
    },
  }

  // Add FAQPage schema if FAQ section exists
  if (guide.faqSection && guide.faqSection.length > 0 && guide.schemaType === 'FAQPage') {
    return {
      ...baseSchema,
      mainEntity: guide.faqSection.map((faq: any) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer?.map((block: any) => block.children?.map((child: any) => child.text).join('')).join(' ') || '',
        },
      })),
    }
  }

  return baseSchema
}

export default async function SellerGuidePage({ params }: SellerGuidePageProps) {
  const guide = await sanityClient.fetch(SELLER_GUIDE_QUERY, { slug: params.slug })

  if (!guide) {
    notFound()
  }

  // Fetch related guides from same category
  const relatedGuides = await sanityClient.fetch(RELATED_SELLER_GUIDES_QUERY, {
    currentSlug: params.slug,
    category: guide.category,
  })

  const structuredData = generateStructuredData(guide)

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="relative py-20 bg-navy">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto text-center">
              {/* Breadcrumb */}
              <nav className="mb-6">
                <ol className="flex items-center justify-center gap-2 text-sm text-white/60">
                  <li><Link href="/" className="hover:text-gold transition-colors">Home</Link></li>
                  <li>/</li>
                  <li><Link href="/sell" className="hover:text-gold transition-colors">Seller Hub</Link></li>
                  <li>/</li>
                  <li className="text-gold">{guide.title}</li>
                </ol>
              </nav>

              {/* Category Badge */}
              {guide.category && (
                <span className="inline-block px-3 py-1 bg-gold/20 text-gold text-xs font-semibold tracking-wider uppercase rounded mb-4">
                  {guide.category.replace('-', ' ')}
                </span>
              )}

              {/* Title */}
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
                {guide.title}
              </h1>

              {/* Description */}
              {guide.shortDescription && (
                <p className="text-white/80 text-xl leading-relaxed max-w-2xl mx-auto">
                  {guide.shortDescription}
                </p>
              )}

              {/* Target Keyword (visible for SEO, styled subtly) */}
              {guide.targetKeyword && (
                <p className="text-white/40 text-sm mt-4">
                  Optimized for: {guide.targetKeyword}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="section-padding bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content Column */}
              <div className="lg:col-span-2">
                <article className="prose prose-lg max-w-none">
                  {/* Content Blocks */}
                  {guide.content && <ContentBlocks content={guide.content} />}
                </article>

                {/* FAQ Section */}
                {guide.faqSection && guide.faqSection.length > 0 && (
                  <div className="mt-12 pt-12 border-t border-gray-200">
                    <h2 className="font-serif text-3xl text-navy font-bold mb-8">
                      Frequently Asked Questions
                    </h2>
                    <AccordionBlock
                      items={guide.faqSection.map((faq: any) => ({
                        question: faq.question,
                        answer: faq.answer,
                      }))}
                      allowMultiple={true}
                    />
                  </div>
                )}

                {/* CTA Section */}
                {guide.cta && (
                  <div className="mt-12 p-8 bg-cream border-l-4 border-gold">
                    <h3 className="font-serif text-2xl text-navy font-bold mb-4">
                      Ready to Take the Next Step?
                    </h3>
                    <p className="text-charcoal-muted mb-6">
                      {guide.cta.ctaDestination === 'valuation-form' 
                        ? "Get a personalized home valuation from Candee — no obligation, just real data."
                        : guide.cta.ctaDestination === 'calendar-booking'
                        ? "Schedule a consultation to discuss your specific situation."
                        : "Let's talk about your real estate goals."
                      }
                    </p>
                    <Link
                      href={guide.cta.customUrl || '/home-value'}
                      className="btn-gold inline-block"
                    >
                      {guide.cta.text || 'Get Started'}
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
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
                      218 seller-side transactions. Arlington resident 20+ years. 
                      TTR Sotheby&apos;s International Realty.
                    </p>
                    <Link href="/contact" className="btn-outline w-full text-center block">
                      Contact Candee
                    </Link>
                  </div>

                  {/* Related Guides */}
                  {relatedGuides && relatedGuides.length > 0 && (
                    <div className="bg-white border border-gray-200 p-6">
                      <h3 className="font-serif text-lg text-navy font-semibold mb-4">
                        Related Guides
                      </h3>
                      <ul className="space-y-3">
                        {relatedGuides.map((related: any) => (
                          <li key={related._id}>
                            <Link
                              href={`/sell/${related.slug.current}`}
                              className="text-navy hover:text-gold transition-colors text-sm"
                            >
                              {related.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Quick CTA */}
                  <div className="bg-navy p-6 text-center">
                    <p className="text-white/80 text-sm mb-4">
                      Wondering what your home is worth?
                    </p>
                    <Link href="/home-value" className="btn-gold w-full block">
                      Get a Free Valuation
                    </Link>
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
