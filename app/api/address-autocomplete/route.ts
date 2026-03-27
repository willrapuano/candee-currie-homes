import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const q = request.nextUrl.searchParams.get('q')?.trim()
    if (!q || q.length < 3) {
      return NextResponse.json({ results: [] })
    }

    const url = new URL('https://nominatim.openstreetmap.org/search')
    url.searchParams.set('q', q)
    url.searchParams.set('format', 'jsonv2')
    url.searchParams.set('addressdetails', '1')
    url.searchParams.set('countrycodes', 'us')
    url.searchParams.set('limit', '5')

    const res = await fetch(url.toString(), {
      headers: {
        'User-Agent': 'CandeeCurrieHomes/1.0 (home-valuation-autocomplete)',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ results: [] })
    }

    const data = await res.json()
    const results = (Array.isArray(data) ? data : []).map((item: any) => {
      const addr = item.address || {}
      return {
        label: item.display_name,
        street: [addr.house_number, addr.road].filter(Boolean).join(' ') || item.name || '',
        city: addr.city || addr.town || addr.village || addr.hamlet || '',
        zip: addr.postcode || '',
        state: addr.state || '',
      }
    })

    return NextResponse.json({ results })
  } catch (error) {
    console.error('address-autocomplete error', error)
    return NextResponse.json({ results: [] })
  }
}
