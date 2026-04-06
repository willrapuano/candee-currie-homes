import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PostcardFunnelClient } from '@/components/market/PostcardFunnelClient'

export const metadata: Metadata = {
  title: 'Your Neighborhood Market Report | Candee Currie',
  description:
    'See what\'s happening in your Northern Virginia neighborhood right now — median prices, days on market, and what your home could be worth today.',
  robots: { index: false }, // postcard funnel pages don't need to rank
}

export default function MarketReportPage() {
  return (
    <div className="pt-20 min-h-screen bg-cream">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <PostcardFunnelClient />
      </Suspense>
    </div>
  )
}
