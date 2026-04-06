import { NextRequest, NextResponse } from 'next/server'

// Static market data — updated April 2026
// Sources: Redfin, Realtor.com, Zillow (cross-referenced Feb–Apr 2026)
// percentAboveList: positive = sold above list (e.g. 0.02 = 2% above)
const MARKET_DATA: Record<string, {
  medianSalePrice: number
  medianDaysOnMarket: number
  activeListings: number
  percentAboveList: number
  updatedAt: string
}> = {
  // Arlington County
  '22201': { medianSalePrice: 799900,  medianDaysOnMarket: 29, activeListings: 104, percentAboveList: 0.02, updatedAt: '2026-04-01' },
  '22202': { medianSalePrice: 620000,  medianDaysOnMarket: 22, activeListings: 68,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22203': { medianSalePrice: 680000,  medianDaysOnMarket: 18, activeListings: 55,  percentAboveList: 0.02, updatedAt: '2026-04-01' },
  '22204': { medianSalePrice: 598000,  medianDaysOnMarket: 24, activeListings: 72,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22205': { medianSalePrice: 790000,  medianDaysOnMarket: 14, activeListings: 48,  percentAboveList: 0.03, updatedAt: '2026-04-01' },
  '22206': { medianSalePrice: 625000,  medianDaysOnMarket: 21, activeListings: 61,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22207': { medianSalePrice: 1100000, medianDaysOnMarket: 19, activeListings: 58,  percentAboveList: 0.02, updatedAt: '2026-04-01' },
  '22209': { medianSalePrice: 750000,  medianDaysOnMarket: 26, activeListings: 44,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22213': { medianSalePrice: 920000,  medianDaysOnMarket: 20, activeListings: 32,  percentAboveList: 0.02, updatedAt: '2026-04-01' },
  // McLean
  '22101': { medianSalePrice: 2101362, medianDaysOnMarket: 34, activeListings: 87,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  '22102': { medianSalePrice: 1450000, medianDaysOnMarket: 38, activeListings: 52,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  // Falls Church
  '22041': { medianSalePrice: 680000,  medianDaysOnMarket: 28, activeListings: 55,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22042': { medianSalePrice: 710000,  medianDaysOnMarket: 25, activeListings: 48,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22043': { medianSalePrice: 760000,  medianDaysOnMarket: 22, activeListings: 42,  percentAboveList: 0.02, updatedAt: '2026-04-01' },
  '22044': { medianSalePrice: 650000,  medianDaysOnMarket: 27, activeListings: 39,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22046': { medianSalePrice: 999000,  medianDaysOnMarket: 20, activeListings: 24,  percentAboveList: 0.03, updatedAt: '2026-04-01' },
  // Alexandria
  '22301': { medianSalePrice: 750000,  medianDaysOnMarket: 22, activeListings: 58,  percentAboveList: 0.02, updatedAt: '2026-04-01' },
  '22302': { medianSalePrice: 720000,  medianDaysOnMarket: 24, activeListings: 51,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22303': { medianSalePrice: 580000,  medianDaysOnMarket: 26, activeListings: 63,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22304': { medianSalePrice: 550000,  medianDaysOnMarket: 28, activeListings: 88,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  '22305': { medianSalePrice: 820000,  medianDaysOnMarket: 18, activeListings: 44,  percentAboveList: 0.03, updatedAt: '2026-04-01' },
  '22306': { medianSalePrice: 650000,  medianDaysOnMarket: 30, activeListings: 72,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  '22307': { medianSalePrice: 680000,  medianDaysOnMarket: 27, activeListings: 49,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22308': { medianSalePrice: 720000,  medianDaysOnMarket: 29, activeListings: 55,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  '22309': { medianSalePrice: 650000,  medianDaysOnMarket: 31, activeListings: 67,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  '22310': { medianSalePrice: 590000,  medianDaysOnMarket: 29, activeListings: 71,  percentAboveList: 0.00, updatedAt: '2026-04-01' },
  '22311': { medianSalePrice: 640000,  medianDaysOnMarket: 25, activeListings: 58,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22312': { medianSalePrice: 610000,  medianDaysOnMarket: 27, activeListings: 62,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
  '22314': { medianSalePrice: 885000,  medianDaysOnMarket: 26, activeListings: 95,  percentAboveList: 0.02, updatedAt: '2026-04-01' },
  '22315': { medianSalePrice: 620000,  medianDaysOnMarket: 23, activeListings: 84,  percentAboveList: 0.01, updatedAt: '2026-04-01' },
}

const CANDEE_ZIPS = Object.keys(MARKET_DATA)

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get('zip')

  if (zip) {
    if (!CANDEE_ZIPS.includes(zip)) {
      return NextResponse.json({ error: 'ZIP not in service area' }, { status: 400 })
    }
    return NextResponse.json({ zip, ...MARKET_DATA[zip] })
  }

  const summary = Object.fromEntries(
    CANDEE_ZIPS.map(z => [z, { zip: z, ...MARKET_DATA[z] }])
  )
  return NextResponse.json({ zips: summary, updatedAt: '2026-04-01' })
}
