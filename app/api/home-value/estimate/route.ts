import { NextRequest, NextResponse } from 'next/server'
import { generateEstimate } from '@/lib/home-valuation'

const DISCLAIMER =
  'This is an automated estimate — not an appraisal. Values may vary significantly from actual market value.'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, city, zip } = body || {}

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    // If address already looks like a full address (contains comma + state abbreviation or zip),
    // use it as-is. Otherwise assemble from parts.
    const addressHasState = /,\s*[A-Z]{2}\b/.test(address) || /\d{5}/.test(address)
    const fullAddress = addressHasState
      ? address.trim()
      : [address, city, zip ? `VA ${zip}` : 'VA'].filter(Boolean).join(', ')

    const apiKey = process.env.RENTCAST_API_KEY

    // Try Rentcast AVM first
    if (apiKey) {
      try {
        const url = `https://api.rentcast.io/v1/avm/value?address=${encodeURIComponent(fullAddress)}&propertyType=Single+Family`
        const res = await fetch(url, {
          headers: { 'X-Api-Key': apiKey },
          next: { revalidate: 0 },
        })

        console.log(`[home-value] Rentcast status=${res.status} address="${fullAddress}"`)
        if (res.ok) {
          const data = await res.json()
          console.log(`[home-value] Rentcast price=${data?.price} source=rentcast`)
          if (data?.price && data.price > 0) {
            return NextResponse.json({
              price: data.price,
              priceRangeLow: data.priceRangeLow ?? data.price * 0.9,
              priceRangeHigh: data.priceRangeHigh ?? data.price * 1.1,
              source: 'rentcast',
              disclaimer: DISCLAIMER,
            })
          }
        }
      } catch (err) {
        console.error('Rentcast error:', err)
      }
    }

    // Fallback to local estimate
    const estimate = await generateEstimate({ address, city: city || 'Arlington', zip })
    return NextResponse.json({
      price: estimate.midpoint,
      priceRangeLow: estimate.low,
      priceRangeHigh: estimate.high,
      source: 'estimate',
      disclaimer: DISCLAIMER,
    })
  } catch (error) {
    console.error('Home value estimate error:', error)
    return NextResponse.json({ error: 'Unable to generate estimate right now' }, { status: 500 })
  }
}
