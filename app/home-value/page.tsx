import type { Metadata } from 'next'
import Image from 'next/image'
import { HomeValueForm } from '@/components/home-value/HomeValueForm'
import { getBreadcrumbSchema, getFAQSchema } from '@/lib/schema-org'

export const metadata: Metadata = {
  title: 'What\'s My Home Worth? | Free CMA | Candee Currie Arlington VA',
  description:
    'Get a free Comparative Market Analysis from Candee Currie — TTR Sotheby\'s Associate Broker in Arlington, VA. Real comps, real local expertise. No obligation.',
  alternates: { canonical: '/home-value' },
  openGraph: {
    title: 'Free Home Valuation | Arlington VA CMA | Candee Currie',
    description: 'Find out what your Northern Virginia home is worth in today\'s market. Personalized CMA from Candee Currie.',
  },
}

interface Props {
  searchParams: { address?: string }
}

const FAQS = [
  {
    question: 'How long does it take to receive my CMA?',
    answer: 'Candee typically delivers a Comparative Market Analysis within 24 hours of receiving your request. She reviews actual comparable sales in your specific neighborhood, not just automated estimates.',
  },
  {
    question: 'Is a CMA the same as a Zestimate?',
    answer: 'No. A CMA is a professional analysis performed by an experienced agent who has actually toured comparable homes. Zestimates and online estimates can be off by 10-20% or more. Candee\'s CMAs are based on local market knowledge and real recent sales data.',
  },
  {
    question: 'Does getting a CMA mean I have to sell?',
    answer: 'Absolutely not. A CMA is simply information — it gives you a clear picture of your home\'s value in today\'s market. There is no obligation to list, and no pressure from Candee.',
  },
  {
    question: 'What information does Candee need to complete the CMA?',
    answer: 'The more information you provide — bedrooms, bathrooms, square footage, updates, and condition — the more accurate the analysis. Candee may follow up with a brief call or property visit to finalize the valuation.',
  },
]

export default function HomeValuePage({ searchParams }: Props) {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Free Home Value', url: '/home-value' },
  ])
  const faqSchema = getFAQSchema(FAQS)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=80"
              alt="What is my home worth in Northern Virginia?"
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy/80" />
          </div>
          <div className="relative container-xl text-center">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-10 bg-gold" />
              <span className="text-gold text-xs font-semibold tracking-[0.25em] uppercase">
                Free Analysis · No Obligation
              </span>
              <div className="h-px w-10 bg-gold" />
            </div>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4">
              What&apos;s Your Home Worth?
            </h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mb-6" />
            <p className="text-white/80 text-xl max-w-2xl mx-auto leading-relaxed">
              Get a personalized Comparative Market Analysis from Candee —
              not an algorithm. Real comps, real local knowledge, real value.
            </p>
          </div>
        </section>

        {/* Form */}
        <HomeValueForm initialAddress={searchParams.address || ''} />

        {/* FAQ */}
        <section className="section-padding bg-white">
          <div className="container-lg">
            <div className="text-center mb-12">
              <p className="section-label">Common Questions</p>
              <h2 className="section-title">About Your Free CMA</h2>
              <div className="gold-divider-center" />
            </div>
            <div className="max-w-3xl mx-auto space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.question} className="bg-cream p-6 border-l-4 border-gold">
                  <h3 className="font-serif text-navy text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
