import Link from 'next/link'

export function SEOContentBlock() {
  return (
    <section className="section-padding bg-cream">
      <div className="container-xl">
        <div className="max-w-4xl mx-auto">
          <p className="section-label text-center">Your Northern Virginia Expert</p>
          <h2 className="section-title text-center mb-2">Arlington VA Real Estate</h2>
          <div className="gold-divider-center mb-8" />

          <div className="prose prose-lg max-w-none text-charcoal-muted leading-relaxed space-y-4">
            <p>
              <strong className="text-navy">Arlington, Virginia</strong> is one of the most sought-after 
              real estate markets in the country — and for good reason. Nestled across the Potomac from 
              Washington, D.C., Arlington combines the energy of an urban center with the livability of 
              a suburban community. Whether you&apos;re drawn to the{' '}
              <Link href="/neighborhoods/clarendon" className="text-gold hover:underline">Clarendon</Link> dining 
              scene, the tree-lined streets of{' '}
              <Link href="/neighborhoods/lyon-village" className="text-gold hover:underline">Lyon Village</Link>, 
              or the stunning waterfront views from{' '}
              <Link href="/neighborhoods/rosslyn" className="text-gold hover:underline">Rosslyn</Link>, 
              Arlington offers a lifestyle that few markets can match.
            </p>

            <p>
              The broader <strong className="text-navy">Northern Virginia</strong> market extends that 
              story in every direction. <Link href="/neighborhoods/mclean" className="text-gold hover:underline">McLean</Link> is 
              home to some of the region&apos;s most prestigious estates and top-ranked schools. 
              <Link href="/neighborhoods/falls-church" className="text-gold hover:underline"> Falls Church</Link> blends 
              small-city charm with exceptional schools and walkable neighborhoods. 
              <Link href="/neighborhoods/old-town-alexandria" className="text-gold hover:underline"> Old Town Alexandria</Link> offers 
              Federal-style architecture, a working waterfront, and boutique retail on King Street. 
              And <Link href="/neighborhoods/great-falls" className="text-gold hover:underline">Great Falls</Link> delivers 
              estate living on multi-acre lots just 20 miles from the Capitol.
            </p>

            <p>
              Candee Currie has been a resident of{' '}
              <strong className="text-navy">Arlington, VA for over 30 years</strong> — long before 
              the real estate career. She has watched neighborhoods transform, Metro lines expand, 
              and Amazon HQ2 reshape the skyline. That institutional knowledge is what separates 
              her guidance from a generic agent who pulls comps off a screen. With 
              <strong className="text-navy"> 241 transactions</strong> and{' '}
              <strong className="text-navy">$105M+ in career volume</strong>, her track record reflects 
              what happens when deep market knowledge meets exceptional client service.
            </p>

            <p>
              Whether you&apos;re a buyer looking to navigate a competitive offer environment or a 
              seller aiming to net the most from your home, Candee brings a creative, strategic 
              approach to every transaction. Her previous career in fundraising and sales leadership 
              taught her the art of listening — and that&apos;s precisely what sets her apart.{' '}
              <Link href="/contact" className="text-gold hover:underline">Contact Candee today</Link> or 
              start with a{' '}
              <Link href="/home-value" className="text-gold hover:underline">free home valuation</Link> to 
              see what your Northern Virginia property is worth in today&apos;s market.
            </p>
          </div>

          {/* Internal links grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Arlington Homes', href: '/neighborhoods/arlington' },
              { label: 'McLean Luxury', href: '/neighborhoods/mclean' },
              { label: 'Falls Church', href: '/neighborhoods/falls-church' },
              { label: 'Alexandria', href: '/neighborhoods/alexandria' },
              { label: 'Buyers Guide', href: '/buyers' },
              { label: 'Sellers Guide', href: '/sellers' },
              { label: 'Free Home Value', href: '/home-value' },
              { label: 'All Neighborhoods', href: '/neighborhoods' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border border-gray-200 hover:border-gold text-charcoal hover:text-gold
                           text-xs font-semibold text-center px-3 py-2.5 transition-all duration-200 bg-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
