import type { Metadata, Viewport } from 'next'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getRealEstateAgentSchema } from '@/lib/schema-org'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Candee Currie | Arlington & Northern Virginia Real Estate | TTR Sotheby\'s',
    template: '%s | Candee Currie Homes',
  },
  description:
    "Candee Currie — Associate Broker at TTR Sotheby's International Realty. 14+ years selling Arlington, McLean, Falls Church & Alexandria VA homes. 241 transactions, $105M+ volume. Call today.",
  keywords: [
    'Arlington VA homes for sale',
    'Northern Virginia real estate',
    'McLean VA realtor',
    'Falls Church homes',
    'Alexandria VA real estate',
    'Sotheby\'s real estate Arlington',
    'Candee Currie realtor',
    'Arlington associate broker',
  ],
  authors: [{ name: 'Candee Currie', url: SITE_URL }],
  creator: 'Candee Currie',
  publisher: "TTR Sotheby's International Realty",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Candee Currie Homes',
    title: 'Candee Currie | Arlington & Northern Virginia Real Estate',
    description:
      "Top-producing Associate Broker at TTR Sotheby's. 14 years, 241 transactions, $105M+ volume in Arlington, McLean, Falls Church & Alexandria.",
    images: [
      {
        url: `${SITE_URL}/images/og-homepage.jpg`,
        width: 1200,
        height: 630,
        alt: 'Candee Currie — Arlington VA Real Estate',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Candee Currie | Arlington VA Real Estate',
    description: 'TTR Sotheby\'s Associate Broker. 241 transactions, $105M+ volume. Serving Arlington, McLean, Falls Church & Alexandria.',
    images: [`${SITE_URL}/images/og-homepage.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1a2744',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const schemaOrg = getRealEstateAgentSchema()

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for perf */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
