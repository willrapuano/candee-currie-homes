import type { Metadata } from 'next'
import { ContactSection } from '@/components/home/ContactSection'
import { getBreadcrumbSchema } from '@/lib/schema-org'

export const metadata: Metadata = {
  title: 'Contact Candee Currie | Arlington VA Real Estate',
  description:
    'Reach out to Candee Currie — TTR Sotheby\'s Associate Broker. Serving Arlington, McLean, Falls Church & Alexandria VA. Call, email, or use the contact form.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <div className="pt-20">
        {/* Header */}
        <section className="bg-navy py-20">
          <div className="container-xl">
            <p className="section-label">Get in Touch</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold mb-4">
              Contact <span className="text-gold">Candee</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="text-white/70 text-lg max-w-xl">
              Buying, selling, or just curious about the market? Candee&apos;s door is always open.
              No pressure — just expert advice from someone who knows this market inside and out.
            </p>
          </div>
        </section>

        <ContactSection />
      </div>
    </>
  )
}
