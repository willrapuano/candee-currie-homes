import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle, FaSearch, FaDollarSign, FaFileContract, FaKey, FaHome } from 'react-icons/fa'
import { NeighborhoodsGrid } from '@/components/home/NeighborhoodsGrid'

export const metadata: Metadata = {
  title: 'Buy a Home in Northern Virginia | Buyer\'s Guide | Candee Currie',
  description:
    "Buying a home in Arlington, McLean, Falls Church or Alexandria? Candee Currie guides buyers through the competitive NoVA market with expert advice, access, and results.",
  alternates: { canonical: '/buyers' },
}

const BUYER_STEPS = [
  {
    icon: FaDollarSign,
    step: '01',
    title: 'Get Pre-Approved',
    description: 'Before you fall in love with a home, know what you can buy. Candee connects you with top local lenders who can get you to full approval — not just pre-qual — in 24 hours.',
  },
  {
    icon: FaSearch,
    step: '02',
    title: 'Define Your Search',
    description: 'Priorities: location, schools, commute, style, budget. Candee listens first, then curates — no carpet-bombing tours. You see homes that actually fit.',
  },
  {
    icon: FaHome,
    step: '03',
    title: 'Access & Tour',
    description: 'Get early access to coming-soon listings through Candee\'s agent network. Beat other buyers to the market by days, not hours.',
  },
  {
    icon: FaFileContract,
    step: '04',
    title: 'Offer & Negotiate',
    description: 'In a competitive offer situation, strategy wins. Candee structures offers that protect you on price, terms, and contingencies — and knows when to escalate vs. hold firm.',
  },
  {
    icon: FaKey,
    step: '05',
    title: 'Close & Move In',
    description: 'Inspections, appraisals, title coordination, final walkthrough. Candee manages every moving part from contract to keys.',
  },
]

export default function BuyersPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1600&q=80"
            alt="Buy a home in Northern Virginia"
            fill
            sizes="100vw"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
        <div className="relative container-xl">
          <div className="max-w-2xl">
            <p className="section-label">Your Northern Virginia Buyer&apos;s Guide</p>
            <h1 className="font-serif text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
              Find Your<br />
              <span className="text-gold">Perfect Home.</span>
            </h1>
            <div className="w-16 h-0.5 bg-gold mb-6" />
            <p className="text-white/80 text-xl leading-relaxed mb-8">
              Arlington, McLean, Falls Church, Alexandria — each neighborhood tells a 
              different story. Candee helps you find the one that fits yours.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/homes-for-sale" className="btn-gold">Search Available Homes</Link>
              <Link href="/contact" className="btn-outline-white">Talk to Candee</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer process */}
      <section className="section-padding bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <p className="section-label">Buyer Roadmap</p>
            <h2 className="section-title">From Search to Keys</h2>
            <div className="gold-divider-center" />
            <p className="section-subtitle mx-auto text-center">
              The Northern Virginia market is competitive. Here&apos;s how Candee helps you win.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUYER_STEPS.map((step) => (
              <div key={step.step} className="bg-cream p-6 border-t-2 border-gold">
                <div className="w-12 h-12 bg-navy flex items-center justify-center mb-4">
                  <step.icon className="text-gold" />
                </div>
                <span className="text-gold text-xs font-bold tracking-[0.2em] block mb-2">STEP {step.step}</span>
                <h3 className="font-serif text-xl text-navy font-semibold mb-3">{step.title}</h3>
                <p className="text-charcoal-muted text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
            {/* CTA card */}
            <div className="bg-navy p-6 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl text-white font-bold mb-3">Ready to Start?</h3>
                <p className="text-white/60 text-sm mb-6">
                  Schedule a no-pressure buyer consultation with Candee. 
                  30 minutes, and you&apos;ll have a clear picture of what&apos;s possible.
                </p>
              </div>
              <Link href="/contact" className="btn-gold w-full text-center">
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why NoVA */}
      <section className="section-padding bg-navy">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Why Northern Virginia?</p>
              <h2 className="font-serif text-4xl text-white font-bold mb-4">
                One of the Best Places to Live in America
              </h2>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-white/70 leading-relaxed mb-6">
                Northern Virginia consistently ranks among the top metros for quality of life, 
                schools, economic opportunity, and long-term appreciation. It&apos;s not just 
                a purchase — it&apos;s an investment.
              </p>
              <ul className="space-y-3">
                {[
                  '#1 Virginia location for federal/tech employment',
                  'Top-ranked public schools (Langley, Yorktown, W-L, McLean HS)',
                  'Multiple Metro lines with direct D.C. access',
                  'Amazon HQ2 driving long-term appreciation in National Landing',
                  'Consistent property value appreciation over 15+ years',
                  'World-class dining, culture, and outdoor recreation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <FaCheckCircle className="text-gold text-sm mt-0.5 flex-shrink-0" />
                    <span className="text-white/70 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80"
                alt="Beautiful Northern Virginia home"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <NeighborhoodsGrid />

      {/* CTA */}
      <section className="section-padding-sm bg-navy">
        <div className="container-xl text-center">
          <h2 className="font-serif text-3xl text-white font-bold mb-4">
            Start Your Northern Virginia Home Search
          </h2>
          <p className="text-white/70 mb-8">
            Browse active listings or connect with Candee for personalized guidance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/homes-for-sale" className="btn-gold">Search All Listings</Link>
            <Link href="/contact" className="btn-outline-white">Talk to Candee</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
