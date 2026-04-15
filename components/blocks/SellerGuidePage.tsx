import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { ContentBlocks } from './ContentBlocks'
import { AccordionBlock } from './AccordionBlock'
import { FaArrowRight, FaHome, FaPhone } from 'react-icons/fa'

// Types for sellerGuide document
interface SanityBlock {
  _type: string
  _key?: string
  [key: string]: unknown
}

interface SellerGuideDocument {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  metaTitle?: string
  metaDescription?: string
  ogImage?: { asset: { url: string } }
  content: SanityBlock[]
  faq?: Array<{
    _key?: string
    question: string
    answer: string
  }>
  showCta?: boolean
}

interface SellerGuidePageProps {
  guide: SellerGuideDocument
}

export function generateSellerGuideMetadata(guide: SellerGuideDocument): Metadata {
  const title = guide.metaTitle || guide.title
  const description = guide.metaDescription || guide.shortDescription || ''
  const url = `https://candeecurrie.com/seller-guides/${guide.slug.current}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      images: guide.ogImage?.asset?.url
        ? [{ url: guide.ogImage.asset.url }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: guide.ogImage?.asset?.url
        ? [guide.ogImage.asset.url]
        : undefined,
    },
  }
}

export function SellerGuidePage({ guide }: SellerGuidePageProps) {
  if (!guide) return null

  const hasFaq = guide.faq && guide.faq.length > 0
  const showCta = guide.showCta !== false // default to true

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-navy">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c5a47e' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative container-xl">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-gold transition-colors">Home</Link>
              </li>
              <li className="text-white/30">/</li>
              <li>
                <Link href="/sellers" className="hover:text-gold transition-colors">Sellers</Link>
              </li>
              <li className="text-white/30">/</li>
              <li className="text-gold">{guide.title}</li>
            </ol>
          </nav>

          {/* Title */}
          <div className="max-w-3xl">
            <p className="section-label mb-4">Seller Guide</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6">
              {guide.title}
            </h1>
            
            {guide.shortDescription && (
              <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl">
                {guide.shortDescription}
              </p>
            )}
            
            <div className="w-16 h-0.5 bg-gold mt-8" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto">
            <ContentBlocks content={guide.content} />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      {hasFaq && (
        <section className="section-padding bg-cream">
          <div className="container-xl">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <p className="section-label">Common Questions</p>
                <h2 className="section-title">Frequently Asked Questions</h2>
                <div className="gold-divider-center" />
              </div>
              
              <AccordionBlock items={guide.faq!} />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      {showCta && (
        <section className="section-padding bg-navy">
          <div className="container-xl">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">
                Ready to Sell Your Home?
              </h2>
              <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
                Get a complimentary Comparative Market Analysis and personalized selling strategy from Candee Currie.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/home-value" 
                  className="btn-gold inline-flex items-center justify-center gap-2"
                >
                  <FaHome />
                  Get Your Free CMA
                  <FaArrowRight className="text-sm" />
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-outline-white inline-flex items-center justify-center gap-2"
                >
                  <FaPhone />
                  Schedule a Consultation
                </Link>
              </div>
              
              <div className="mt-10 pt-8 border-t border-white/10">
                <div className="flex flex-wrap justify-center gap-8 text-white/50 text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full" />
                    218 Seller Transactions
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full" />
                    101%+ Avg. Sale-to-List
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gold rounded-full" />
                    12 Days Avg. on Market
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
