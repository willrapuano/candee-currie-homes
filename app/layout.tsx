import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import '../styles/globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { getRealEstateAgentSchema } from '@/lib/schema-org'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Candee Currie | Arlington & Northern Virginia Real Estate | Corcoran McEnearney',
    template: '%s | Candee Currie Homes',
  },
  description:
    'Candee Currie — Associate Broker at Corcoran McEnearney. 14+ years selling Arlington, McLean, Falls Church & Alexandria VA homes. 241 transactions, $105M+ volume. Call today.',
  keywords: [
    'Arlington VA homes for sale',
    'Northern Virginia real estate',
    'McLean VA realtor',
    'Falls Church homes',
    'Alexandria VA real estate',
    'Corcoran McEnearney Arlington',
    'Candee Currie realtor',
    'Arlington associate broker',
  ],
  authors: [{ name: 'Candee Currie', url: SITE_URL }],
  creator: 'Candee Currie',
  publisher: 'Corcoran McEnearney',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Candee Currie Homes',
    title: 'Candee Currie | Arlington & Northern Virginia Real Estate',
    description:
      'Top-producing Associate Broker at Corcoran McEnearney. 14 years, 241 transactions, $105M+ volume in Arlington, McLean, Falls Church & Alexandria.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Candee Currie | Arlington VA Real Estate',
    description: 'Corcoran McEnearney Associate Broker. 241 transactions, $105M+ volume. Serving Arlington, McLean, Falls Church & Alexandria.',
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
  themeColor: '#181716',
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

        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NY02E9TCRF"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-NY02E9TCRF');`}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
