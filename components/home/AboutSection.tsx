import Image from 'next/image'
import Link from 'next/link'
import { FaCheckCircle } from 'react-icons/fa'

const CREDENTIALS = [
  'Associate Broker, TTR Sotheby\'s International Realty',
  '14+ years serving Northern Virginia',
  'Arlington resident for 30+ years',
  '$105M+ in closed volume (5-year period)',
  '241 total transactions — buyers & sellers',
  'Northern Virginia market expertise',
  'Hollins University — B.A.',
]

export function AboutSection() {
  return (
    <section className="section-padding bg-navy overflow-hidden">
      <div className="container-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative gold border offset */}
            <div className="absolute -inset-3 border border-gold/20" />
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:max-w-none overflow-hidden">
              <Image
                src="/images/candee-currie-headshot.png"
                alt="Candee Currie — Associate Broker, TTR Sotheby's"
                fill
                sizes="(max-width: 1024px) 80vw, 45vw"
                className="object-cover object-top"
              />
              {/* Sotheby's badge */}
              <div className="absolute bottom-6 right-6 bg-navy/90 backdrop-blur-sm border border-gold/30 px-4 py-3">
                <p className="text-gold text-[9px] font-bold tracking-[0.2em] uppercase">
                  TTR Sotheby&apos;s
                </p>
                <p className="text-white text-[9px] tracking-[0.15em] uppercase">
                  International Realty
                </p>
              </div>
            </div>
            {/* Gold accent block */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gold/10 hidden lg:block" />
          </div>

          {/* Text side */}
          <div className="order-1 lg:order-2">
            <p className="section-label">Your Northern Virginia Expert</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white font-bold leading-tight mb-2">
              Meet Candee Currie
            </h2>
            <p className="text-gold text-sm font-semibold tracking-widest uppercase mb-6">
              Associate Broker
            </p>
            <div className="w-16 h-0.5 bg-gold mb-8" />

            <div className="space-y-4 text-white/70 leading-relaxed mb-8">
              <p>
                Candee&apos;s home sales extend throughout Northern Virginia from Arlington, 
                McLean, Falls Church, Alexandria and beyond. She is a dynamic real estate expert 
                with a track record of success — not through luck, but through creative 
                problem-solving, effective negotiating, and a genuinely client-focused approach.
              </p>
              <p>
                A resident of Arlington, VA for over 3 decades, her previous career as a 
                fundraiser and sales team leader taught her the importance of hearing-based 
                communication and a hands-on approach. With Candee, clients are informed 
                and confident every step of the way.
              </p>
            </div>

            {/* Credentials */}
            <ul className="space-y-2.5 mb-10">
              {CREDENTIALS.map((cred) => (
                <li key={cred} className="flex items-start gap-3">
                  <FaCheckCircle className="text-gold text-sm mt-0.5 flex-shrink-0" />
                  <span className="text-white/70 text-sm">{cred}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Link href="/about" className="btn-gold">
                Full Bio
              </Link>
              <Link href="/contact" className="btn-outline-white">
                Work With Candee
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
