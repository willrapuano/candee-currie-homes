import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | Candee Currie Homes',
  description: 'Terms of use for candeecurriehomes.com.',
  alternates: { canonical: '/terms' },
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-16">
        <div className="container-xl">
          <h1 className="font-serif text-4xl text-white font-bold">Terms of Use</h1>
          <div className="w-16 h-0.5 bg-gold mt-4" />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-lg prose prose-navy max-w-none">
          <p className="text-charcoal-muted text-sm mb-6">
            <em>Last updated: {new Date().getFullYear()}</em>
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Acceptance of Terms</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            By using candeecurriehomes.com, you agree to these terms of use. This site is operated by 
            Candee Currie, Associate Broker at TTR Sotheby&apos;s International Realty.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Listing Information Disclaimer</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            All listing data is derived from BrightMLS and is deemed reliable but not guaranteed. 
            IDX information is provided exclusively for consumers&apos; personal, non-commercial use 
            and may not be used for any purpose other than to identify prospective properties consumers 
            may be interested in purchasing. © {new Date().getFullYear()} BrightMLS. All rights reserved.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">No Legal or Financial Advice</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            Content on this site is informational only and does not constitute legal, financial, or 
            professional real estate advice. Consult qualified professionals before making any real 
            estate decisions.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Intellectual Property</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            All content, logos, and design elements on this site are the property of Candee Currie 
            or their respective owners. Reproduction without written permission is prohibited.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Contact</h2>
          <p className="text-charcoal-muted leading-relaxed">
            Questions? Contact{' '}
            <a href="mailto:candee@candeecurriehomes.com" className="text-gold hover:underline">
              candee@candeecurriehomes.com
            </a>.
          </p>
        </div>
      </section>
    </div>
  )
}
