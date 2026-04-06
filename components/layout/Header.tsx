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
  const isHome = pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const headerBg = isHome && !scrolled
    ? 'bg-transparent'
    : 'bg-white shadow-md'

  const textColor = isHome && !scrolled ? 'text-white' : 'text-navy'
  const logoSubColor = isHome && !scrolled ? 'text-gold' : 'text-gold'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      {/* Top bar */}
      <div className={`border-b transition-colors duration-300 ${isHome && !scrolled ? 'border-white/10' : 'border-gray-100'}`}>
        <div className="container-xl">
          <div className="flex items-center justify-end py-1.5 gap-6">
            <a
              href="tel:+17035550100"
              className={`text-xs font-medium transition-colors hover:text-gold ${isHome && !scrolled ? 'text-white/80' : 'text-charcoal-muted'}`}
            >
              (703) 555-0100
            </a>
            <Link
              href="/home-value"
              className={`text-xs font-semibold tracking-wider uppercase transition-colors hover:text-gold ${isHome && !scrolled ? 'text-gold' : 'text-gold'}`}
            >
              Free Home Value
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-xl">
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className={`font-serif text-xl font-bold tracking-tight transition-colors group-hover:text-gold ${textColor}`}>
              Candee Currie
            </span>
            <span className={`text-[10px] font-sans tracking-[0.25em] uppercase transition-colors ${logoSubColor}`}>
              TTR Sotheby&apos;s International Realty
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors duration-200 hover:text-gold
                  ${pathname.startsWith(link.href) ? 'text-gold' : textColor}`}
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
            className={`lg:hidden p-2 ${textColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-navy transition-all duration-300 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
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
            <Link href="/home-value" className="btn-outline-white w-full text-center">
              Free Home Value
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
