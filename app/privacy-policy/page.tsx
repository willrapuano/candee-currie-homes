import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Candee Currie Homes',
  description: 'Privacy policy for candeecurriehomes.com — how we collect, use, and protect your personal information.',
  alternates: { canonical: '/privacy-policy' },
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-20">
      <section className="bg-navy py-16">
        <div className="container-xl">
          <h1 className="font-serif text-4xl text-white font-bold">Privacy Policy</h1>
          <div className="w-16 h-0.5 bg-gold mt-4" />
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container-lg prose prose-navy max-w-none">
          <p className="text-charcoal-muted text-sm mb-6">
            <em>Last updated: {new Date().getFullYear()}</em>
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Information We Collect</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            When you submit a contact form, home valuation request, or saved search on this site, we collect 
            your name, email address, phone number, and any property information you provide. We use this 
            information solely to respond to your inquiry and to deliver the real estate services you request.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">How We Use Your Information</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            Your information is used to: (1) respond to your real estate inquiries, (2) deliver property 
            alerts and market updates you have requested, and (3) comply with legal obligations. We do not 
            sell, rent, or share your personal information with third parties for marketing purposes.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">IDX / MLS Data</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            Listing data displayed on this site is sourced from BrightMLS via the Repliers IDX platform. 
            This data is deemed reliable but not guaranteed. Property information is provided for 
            consumers&apos; personal, non-commercial use only.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Cookies & Analytics</h2>
          <p className="text-charcoal-muted leading-relaxed mb-4">
            This site may use Google Analytics to understand aggregate traffic patterns. No personally 
            identifiable information is collected through analytics cookies.
          </p>
          <h2 className="font-serif text-2xl text-navy font-bold mt-8 mb-3">Contact</h2>
          <p className="text-charcoal-muted leading-relaxed">
            For privacy-related questions, contact Candee Currie at{' '}
            <a href="mailto:candee@candeecurriehomes.com" className="text-gold hover:underline">
              candee@candeecurriehomes.com
            </a>.
          </p>
        </div>
      </section>
    </div>
  )
}
