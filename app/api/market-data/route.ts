import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

// Candee's primary ZIP codes across Arlington, McLean, Falls Church, Alexandria
const CANDEE_ZIPS = [
  '22201', '22202', '22203', '22204', '22205', '22206', '22207', '22209', '22213', // Arlington
  '22101', '22102',                                                                   // McLean
  '22041', '22042', '22043', '22044', '22046',                                       // Falls Church
  '22301', '22302', '22303', '22304', '22305', '22306', '22307', '22308', '22309',   // Alexandria
  '22310', '22311', '22312', '22314', '22315',                                        // Alexandria
]

// Redfin Data Center CSV endpoint for a given ZIP
function redfinUrl(zip: string) {
  return `https://www.redfin.com/zipcode/${zip}/filter/include=sold-3mo`
}

// We use Redfin's public market data API (no auth required for aggregate stats)
// Endpoint: https://www.redfin.com/stingray/api/gis/csv?region_type=7&region_id=<id>&al=1&market=<market>&nh=1&v=8
// Simpler: use the Redfin Data Center download which returns median price, inventory, DOM

async function fetchRedfinZip(zip: string): Promise<Record<string, string | number> | null> {
  try {
    // Redfin region search to get region_id
    const searchUrl = `https://www.redfin.com/stingray/do/location-autocomplete?location=${zip}&count=1&v=2`
    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; market-data-bot/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!searchRes.ok) return null
    const raw = await searchRes.text()
    // Redfin wraps JSON in {}&&{...}
    const json = JSON.parse(raw.replace(/^[^{]*/, ''))
    const payload = json?.payload?.sections?.[0]?.rows?.[0]
    if (!payload) return null

    const regionId = payload.id?.tableRow?.id
    const type = payload.type // 2 = city, 7 = zip
    if (!regionId) return null

    // Fetch aggregate market stats
    const statsUrl = `https://www.redfin.com/stingray/api/v1/market-overview/aggregate?region_type=7&region_id=${regionId}&num_months=3`
    const statsRes = await fetch(statsUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; market-data-bot/1.0)' },
      signal: AbortSignal.timeout(8000),
    })
    if (!statsRes.ok) return null
    const statsRaw = await statsRes.text()
    const statsJson = JSON.parse(statsRaw.replace(/^[^{]*/, ''))
    const stats = statsJson?.payload

    return {
      zip,
      medianSalePrice: stats?.median_sale_price ?? null,
      medianDaysOnMarket: stats?.median_days_on_market ?? null,
      activeListings: stats?.active_listings ?? null,
      percentAboveList: stats?.percent_sold_above_list ?? null,
      updatedAt: new Date().toISOString(),
    }
  } catch {
    return null
  }
}

// Cache in memory for 6 hours — avoids hammering Redfin
const CACHE: Record<string, { data: unknown; ts: number }> = {}
const CACHE_TTL = 6 * 60 * 60 * 1000

export async function GET(request: NextRequest) {
  const zip = request.nextUrl.searchParams.get('zip')

  // Single ZIP lookup
  if (zip) {
    if (!CANDEE_ZIPS.includes(zip)) {
      return NextResponse.json({ error: 'ZIP not in service area' }, { status: 400 })
    }
    const cached = CACHE[zip]
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
      return NextResponse.json(cached.data)
    }
    const data = await fetchRedfinZip(zip)
    if (data) CACHE[zip] = { data, ts: Date.now() }
    return NextResponse.json(data ?? { zip, error: 'No data available' })
  }

  // Summary: return cached data for all ZIPs (don't fetch all on demand — too slow)
  const summary = Object.fromEntries(
    CANDEE_ZIPS.map(z => [z, CACHE[z]?.data ?? null])
  )
  return NextResponse.json({ zips: summary, updatedAt: new Date().toISOString() })
}
