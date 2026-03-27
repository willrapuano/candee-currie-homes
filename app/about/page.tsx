import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle, FaStar, FaAward, FaHome } from 'react-icons/fa'
import { Testimonials } from '@/components/home/Testimonials'
import { getBreadcrumbSchema } from '@/lib/schema-org'

export const metadata: Metadata = {
  title: 'About Candee Currie | Arlington VA Realtor | TTR Sotheby\'s',
  description:
    "Meet Candee Currie — Associate Broker at TTR Sotheby's International Realty. 14+ years serving Arlington, McLean, Falls Church & Alexandria VA. 241 transactions, $105M+ volume.",
  alternates: { canonical: '/about' },
}

const CREDENTIALS = [
  { icon: FaAward, label: 'Associate Broker', sub: 'Virginia Real Estate' },
  { icon: FaHome, label: '241 Transactions', sub: '14-Year Career' },
  { icon: FaStar, label: '5.0 Google Rating', sub: '100% Recommend' },
  { icon: FaAward, label: 'TTR Sotheby\'s', sub: 'International Realty' },
]

const TIMELINE = [
  { year: '2011', event: 'Licensed as a Virginia REALTOR® — immediately focused on Arlington and Northern Virginia' },
  { year: '2014', event: 'Earned Associate Broker designation after consistent top-producer performance' },
  { year: '2017', event: 'Joined TTR Sotheby\'s International Realty — aligning with the premier luxury brand in NoVA' },
  { year: '2020', event: 'Navigated clients through the unprecedented pandemic market — 100% success rate on listings' },
  { year: '2023', event: 'Crossed $100M in career closed volume — reflecting consistency over 12+ years' },
  { year: '2026', event: 'Continuing to serve buyers and sellers throughout Arlington, McLean, Falls Church & Alexandria' },
]

export default function AboutPage() {
  const breadcrumb = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'About', url: '/about' },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <div className="pt-20">
        {/* Hero */}
        <section className="bg-navy py-24">
          <div className="container-xl">
            <div className="max-w-2xl">
              <p className="section-label">Associate Broker · TTR Sotheby&apos;s</p>
              <h1 className="font-serif text-5xl md:text-6xl text-white font-bold leading-tight mb-4">
                About <span className="text-gold">Candee Currie</span>
              </h1>
              <div className="w-16 h-0.5 bg-gold mb-6" />
              <p className="text-white/70 text-lg leading-relaxed">
                30+ years as an Arlington resident. 14+ years helping buyers and sellers 
                throughout Northern Virginia. No gimmicks — just expertise, relationships, and results.
              </p>
            </div>
          </div>
        </section>

        {/* Bio section */}
        <section className="section-padding bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative">
                <div className="absolute -inset-4 border border-gold/15" />
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src="/images/candee-currie-headshot.png"
                    alt="Candee Currie — Arlington VA Real Estate Broker"
                    fill
                    sizes="(max-width: 1024px) 80vw, 45vw"
                    className="object-cover object-top"
                  />
                </div>
                {/* Sotheby's badge */}
                <div className="absolute bottom-4 right-4 bg-navy border border-gold/30 px-4 py-3">
                  <p className="text-gold text-[9px] font-bold tracking-[0.2em] uppercase">TTR Sotheby&apos;s</p>
                  <p className="text-white text-[9px] tracking-[0.15em] uppercase">International Realty</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-4xl text-navy font-bold mb-2">
                  A Different Kind of Agent
                </h2>
                <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-6">
                  Creative Problem-Solver. Skilled Negotiator. Arlington Native.
                </p>
                <div className="gold-divider" />

                <div className="space-y-4 text-charcoal-muted leading-relaxed">
                  <p>
                    Candee&apos;s home sales extend throughout Northern Virginia from Arlington, McLean, 
                    Falls Church, Alexandria and beyond. She is a dynamic real estate expert with a 
                    track record of success. The secret? No secret — just creative problem-solving, 
                    effective negotiating, high executive function, extensive networking, and a 
                    client-focused approach.
                  </p>
                  <p>
                    A resident of Arlington, VA for over 3 decades, her previous career as a fundraiser 
                    and sales team leader taught her the importance of hearing-based communication and a 
                    hands-on approach. With Candee, clients are informed and confident every step of the 
                    way — her combined experience and business acumen gives customers a competitive 
                    advantage in the market and provides them with exceptional personal care.
                  </p>
                  <p>
                    She earned her degree from Hollins University and speaks English and French. 
                    Whether you&apos;re a first-time buyer, a luxury seller, or an investor — 
                    Candee brings the same level of commitment to every transaction.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {CREDENTIALS.map((c) => (
                    <div key={c.label} className="bg-cream p-4 flex items-start gap-3">
                      <c.icon className="text-gold text-xl mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-navy text-sm">{c.label}</p>
                        <p className="text-charcoal-muted text-xs">{c.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Link href="/contact" className="btn-gold">Work With Candee</Link>
                  <Link href="/home-value" className="btn-navy">Free Home Value</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-navy section-padding-sm">
          <div className="container-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '241', label: 'Total Transactions' },
                { number: '$105M+', label: '5-Year Volume' },
                { number: '$1.1M', label: 'Avg. Sale Price' },
                { number: '14+', label: 'Years Experience' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-serif text-4xl text-white font-bold">{s.number}</p>
                  <p className="text-white/50 text-xs tracking-wider uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career timeline */}
        <section className="section-padding bg-cream">
          <div className="container-lg">
            <div className="text-center mb-14">
              <p className="section-label">Career Journey</p>
              <h2 className="section-title">14 Years in Northern Virginia</h2>
              <div className="gold-divider-center" />
            </div>
            <div className="relative">
              <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 -translate-x-1/2 hidden md:block" />
              <div className="space-y-8">
                {TIMELINE.map((item, idx) => (
                  <div key={item.year} className={`flex gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'} hidden md:block`}>
                      {idx % 2 !== 0 && (
                        <div className="bg-white p-5 shadow-card border-l-2 border-gold">
                          <p className="text-charcoal-muted text-sm leading-relaxed">{item.event}</p>
                        </div>
                      )}
                    </div>
                    <div className="relative flex items-center justify-center flex-shrink-0">
                      <div className="w-14 h-14 bg-navy flex items-center justify-center z-10">
                        <span className="font-serif text-gold font-bold text-sm">{item.year}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      {idx % 2 === 0 ? (
                        <div className="bg-white p-5 shadow-card border-l-2 border-gold md:border-l-0 md:border-r-2">
                          <p className="text-charcoal-muted text-sm leading-relaxed">{item.event}</p>
                        </div>
                      ) : (
                        <div className="md:hidden bg-white p-5 shadow-card border-l-2 border-gold">
                          <p className="text-charcoal-muted text-sm leading-relaxed">{item.event}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />

        {/* CTA */}
        <section className="section-padding-sm bg-navy">
          <div className="container-xl text-center">
            <h2 className="font-serif text-3xl text-white font-bold mb-4">
              Ready to Work with Candee?
            </h2>
            <p className="text-white/70 mb-8">
              14 years. 241 transactions. One focus: your best outcome.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-gold">Get in Touch</Link>
              <Link href="/home-value" className="btn-outline-white">Free Home Valuation</Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
