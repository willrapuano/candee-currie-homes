'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_LINKS = [

  { label: 'Neighborhoods', href: '/neighborhoods' },
  { label: 'Sellers', href: '/sellers' },
  { label: 'Buyers', href: '/buyers' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const headerBg = scrolled
    ? 'bg-white/95 shadow-sm backdrop-blur-md'
    : 'bg-white/95 backdrop-blur-md'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-200 ${headerBg}`}
    >
      {/* Top bar */}
      <div className="border-b border-gray-100">
        <div className="container-xl">
          <div className="flex items-center justify-end py-1.5 gap-6">
            <a
              href="tel:+17032036005"
              className="text-xs font-medium text-charcoal-muted transition-colors hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            >
              (703) 203-6005
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-xl">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="group flex flex-col leading-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-4">
            <span className="font-serif text-[1.4rem] font-medium tracking-tight text-navy transition-colors group-hover:text-gold">
              Candee Currie
            </span>
            <span className="mt-1 flex items-center gap-2 text-[9px] font-sans tracking-[0.22em] uppercase text-navy/70">
              <span className="h-px w-6 bg-gold" aria-hidden="true" />
              Corcoran McEnearney
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 hover:text-gold
                  ${pathname.startsWith(link.href) ? 'text-gold' : 'text-navy'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-gold text-[11px] px-5 py-2.5"
            >
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden min-h-11 min-w-11 p-2 text-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-transform duration-200 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-transform duration-200 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      {mobileOpen && <div id="mobile-navigation" className="lg:hidden bg-navy">
        <div className="container-xl py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white font-sans text-sm font-semibold tracking-[0.15em] uppercase py-2 border-b border-white/10 hover:text-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link href="/contact" className="btn-gold w-full text-center">
              Contact Candee
            </Link>
          </div>
        </div>
      </div>}
    </header>
  )
}
