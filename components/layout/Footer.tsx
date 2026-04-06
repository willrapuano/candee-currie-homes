import Link from 'next/link'
import { NEIGHBORHOODS } from '@/data/neighborhoods'

const FOOTER_NAV = {
  'Quick Links': [

    { label: 'Featured Listings', href: '/#featured-listings' },
    { label: 'Sell Your Home', href: '/sellers' },
    { label: 'Buy a Home', href: '/buyers' },
    { label: 'Home Valuation', href: '/home-value' },
    { label: 'Market Reports', href: '/blog?cat=market-update' },
    { label: 'About Candee', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  'Neighborhoods': NEIGHBORHOODS.slice(0, 10).map((n) => ({
    label: n.name,
    href: `/neighborhoods/${n.slug}`,
  })),
  'More Areas': NEIGHBORHOODS.slice(10, 20).map((n) => ({
    label: n.name,
    href: `/neighborhoods/${n.slug}`,
  })),
}

const POPULAR_SEARCHES = [
  { label: 'Arlington Homes for Sale', href: '/neighborhoods/arlington' },
  { label: 'McLean Luxury Homes', href: '/neighborhoods/mclean' },
  { label: 'Falls Church Real Estate', href: '/neighborhoods/falls-church' },
  { label: 'Old Town Alexandria', href: '/neighborhoods/old-town-alexandria' },
  { label: 'Clarendon Condos', href: '/neighborhoods/clarendon' },
  { label: 'Homes Near Ballston Metro', href: '/neighborhoods/ballston' },
  { label: 'Great Falls Estates', href: '/neighborhoods/great-falls' },
  { label: 'Vienna VA Homes', href: '/neighborhoods/vienna' },
]

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div>
            <Link href="/" className="flex flex-col leading-none mb-6">
              <span className="font-serif text-2xl font-bold text-white">Candee Currie</span>
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-gold mt-0.5">
                TTR Sotheby&apos;s International Realty
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Associate Broker specializing in Arlington, McLean, Falls Church,
              and Alexandria VA real estate. 14+ years. 241 transactions. $105M+ volume.
            </p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a href="tel:+17035550100" className="hover:text-gold transition-colors">
                (703) 555-0100
              </a>
              <a href="mailto:candee@candeecurriehomes.com" className="hover:text-gold transition-colors">
                candee@candeecurriehomes.com
              </a>
              <span>Arlington, VA 22207</span>
            </div>
            {/* Social links — update hrefs with real profile URLs before launch */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { id: 'instagram', href: 'https://www.instagram.com/candeecurriehomes' },
                { id: 'facebook', href: 'https://www.facebook.com/candeecurriehomes' },
                { id: 'linkedin', href: 'https://www.linkedin.com/in/candeecurrie' },
              ].map(({ id, href }) => (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 hover:border-gold hover:text-gold transition-all duration-200 capitalize text-[10px] font-bold"
                  aria-label={`Candee Currie on ${id}`}
                >
                  {id[0].toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(FOOTER_NAV).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-5">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Popular searches */}
        <div className="mt-12 pt-10 border-t border-white/10">
          <h4 className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-4">
            Popular Searches
          </h4>
          <div className="flex flex-wrap gap-2">
            {POPULAR_SEARCHES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-xs text-white/50 hover:text-gold border border-white/10 hover:border-gold/30 px-3 py-1.5 transition-all duration-200"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-white/40 text-xs">
              © {new Date().getFullYear()} Candee Currie. All rights reserved.
              Licensed in VA. TTR Sotheby&apos;s International Realty.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy-policy" className="text-white/40 text-xs hover:text-gold transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-white/40 text-xs hover:text-gold transition-colors">Terms</Link>
              <Link href="/sitemap.xml" className="text-white/40 text-xs hover:text-gold transition-colors">Sitemap</Link>
            </div>
          </div>
          {/* MLS Disclaimer */}
          <p className="text-white/25 text-[10px] mt-4 leading-relaxed max-w-4xl">
            All listing data is derived from BrightMLS and is deemed reliable but not guaranteed. 
            IDX information is provided exclusively for consumers&apos; personal, non-commercial use 
            and may not be used for any purpose other than to identify prospective properties consumers 
            may be interested in purchasing. © {new Date().getFullYear()} BrightMLS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
