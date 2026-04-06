import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, zip, rentcastPrice, rentcastLow, rentcastHigh } = body

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    const ghlApiKey = process.env.GHL_API_KEY

    if (ghlApiKey && name && email) {
      try {
        const nameParts = (name as string).trim().split(/\s+/)
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        const fullAddress = [address, city, zip ? `VA ${zip}` : 'VA'].filter(Boolean).join(', ')

        await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ghlApiKey}`,
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phone: phone || '',
            address1: address || '',
            city: city || '',
            postalCode: zip || '',
            source: 'candeecurriehomes.com - Home Valuation Tool',
            tags: ['home-valuation-tool'],
            customField: {
              property_address: fullAddress,
              rentcast_estimate: rentcastPrice ? `$${Math.round(rentcastPrice).toLocaleString()}` : '',
              rentcast_range:
                rentcastLow && rentcastHigh
                  ? `$${Math.round(rentcastLow).toLocaleString()} – $${Math.round(rentcastHigh).toLocaleString()}`
                  : '',
            },
          }),
        })
      } catch (ghlError) {
        console.error('GHL error:', ghlError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Home value route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
