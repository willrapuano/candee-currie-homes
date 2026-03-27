import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="pt-20 min-h-screen flex items-center justify-center bg-cream">
      <div className="text-center max-w-lg px-6">
        <p className="text-gold text-xs font-semibold tracking-[0.25em] uppercase mb-4">404</p>
        <h1 className="font-serif text-5xl text-navy font-bold mb-4">
          Page Not Found
        </h1>
        <div className="gold-divider-center" />
        <p className="text-charcoal-muted leading-relaxed mb-8">
          This page doesn&apos;t exist — but there are plenty of beautiful homes that do.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-gold">Go Home</Link>
          <Link href="/homes-for-sale" className="btn-navy">Search Homes</Link>
          <Link href="/contact" className="btn-navy">Contact Candee</Link>
        </div>
      </div>
    </div>
  )
}
