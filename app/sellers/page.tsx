import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle, FaChartLine, FaCameraRetro, FaBullhorn, FaHandshake, FaKey } from 'react-icons/fa'
import { HomeValueCTA } from '@/components/home/HomeValueCTA'
import { Testimonials } from '@/components/home/Testimonials'

export const metadata: Metadata = {
  title: 'Sell Your Northern Virginia Home | Listing Specialist | Candee Currie',
  description:
    "Ready to sell? Candee Currie — TTR Sotheby's Associate Broker — gets homes sold fast and for top dollar in Arlington, McLean, Falls Church & Alexandria. 218 seller-side transactions.",
  alternates: { canonical: '/sellers' },
}

const PROCESS_STEPS = [
  {
    icon: FaChartLine,
    step: '01',
    title: 'Pricing Strategy',
    description: 'Candee performs a comprehensive Comparative Market Analysis — not a Zestimate. Real comparables, real data, a price that maximizes your net.',
  },
  {
    icon: FaCameraRetro,
    step: '02',
    title: 'Staging & Photography',
    description: 'Professional staging consultation and high-end photography (including video and drone) from Sotheby\'s preferred vendors. First impressions win.',
  },
  {
    icon: FaBullhorn,
    step: '03',
    title: 'Maximum Exposure',
    description: 'MLS, Zillow, Realtor.com, Sotheby\'s global network, targeted social campaigns, and Candee\'s personal buyer network. Your listing reaches everyone.',
  },
  {
    icon: FaHandshake,
    step: '04',
    title: 'Expert Negotiation',
    description: 'Candee\'s background in sales leadership means she negotiates from a position of strength — protecting your price, your timeline, and your contingencies.',
  },
  {
    icon: FaKey,
    step: '05',
    title: 'Smooth to Close',
    description: 'From accepted offer to settlement day, Candee manages every detail — inspections, appraisals, title, and final walkthrough. You just show up to sign.',
  },
]

const SELLER_STATS = [
  { number: '218', label: 'Seller Transactions' },
  { number: '101%+', label: 'Avg. Sale-to-List' },
  { number: '12 days', label: 'Avg. Days on Market' },
  { number: '$105M+', label: '5-Year Volume' },
]

export default function SellersPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80"
            alt="Sell your Northern Virginia home"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
        </div>
        <div className="relative container-xl">
          <div className="max-w-2xl">
            <p className="section-label">Selling in Northern Virginia?</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
              Sell Smarter.<br />
              <span className="text-gold">Net More.</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              218 seller-side transactions. Consistent above-list results. 
              Candee doesn&apos;t just list your home — she engineers its sale.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/home-value" className="btn-gold">Get Your Free CMA</Link>
              <Link href="/contact" className="btn-outline-white">Schedule a Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-navy py-10">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {SELLER_STATS.map((s) => (
              <div key={s.label}>
                <p className="font-serif text-3xl md:text-4xl text-white font-bold">{s.number}</p>
                <p className="text-white/50 text-xs tracking-wider uppercase mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">The Candee Currie Selling Process</h2>
            <div className="gold-divider-center" />
            <p className="section-subtitle mx-auto text-center">
              A proven playbook refined over 14 years and 218 seller transactions in Northern Virginia.
            </p>
          </div>

          <div className="space-y-8">
            {PROCESS_STEPS.map((step) => (
              <div key={step.step} className="flex gap-6 items-start p-6 bg-cream hover:shadow-card-hover transition-shadow duration-300">
                <div className="w-14 h-14 bg-navy flex items-center justify-center flex-shrink-0">
                  <step.icon className="text-gold text-xl" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-gold text-xs font-bold tracking-[0.2em]">STEP {step.step}</span>
                  </div>
                  <h3 className="font-serif text-xl text-navy font-semibold mb-2">{step.title}</h3>
                  <p className="text-charcoal-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sotheby's matters */}
      <section className="section-padding bg-navy">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">The Sotheby&apos;s Advantage</p>
              <h2 className="font-serif text-4xl text-white font-bold mb-4">
                Global Reach. Local Expertise.
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-white/70 leading-relaxed mb-6">
                When you list with Candee, your home is marketed through the Sotheby&apos;s 
                International Realty network — one of the most powerful luxury real estate 
                brands in the world, with 25,000+ agents in 80+ countries.
              </p>
              <ul className="space-y-3">
                {[
                  'Exclusive marketing on SothebysRealty.com and global partner sites',
                  'Print advertising in The Wall Street Journal, Financial Times, and luxury publications',
                  'White-glove photography, videography, and 3D tours',
                  'Access to international buyer networks for luxury properties',
                  'Unmatched brand credibility in the $1M+ market',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="text-gold text-sm mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80"
                alt="Luxury Northern Virginia home listing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <HomeValueCTA />
    </div>
  )
}
