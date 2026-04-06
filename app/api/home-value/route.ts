import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, zip } = body

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim())) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const ghlApiKey = process.env.GHL_API_KEY
    const locationId = process.env.GHL_LOCATION_ID || process.env.NEXT_PUBLIC_GHL_LOCATION_ID

    if (ghlApiKey && name && email) {
      try {
        const nameParts = (name as string).trim().split(/\s+/)
        const firstName = nameParts[0] || ''
        const lastName = nameParts.slice(1).join(' ') || ''
        const fullAddress = [address, city, zip ? `VA ${zip}` : 'VA'].filter(Boolean).join(', ')

        // Create/upsert contact
        const contactPayload: Record<string, unknown> = {
          firstName,
          lastName,
          email,
          phone: phone || '',
          address1: address || '',
          city: city || '',
          postalCode: zip || '',
          source: 'candeecurriehomes.com - Home Valuation Tool',
          tags: ['home valuation report requested'],
        }
        if (locationId) contactPayload.locationId = locationId

        const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ghlApiKey}`,
            Version: '2021-07-28',
          },
          body: JSON.stringify(contactPayload),
        })

        const contactData = await contactRes.json()
        const contactId = contactData?.contact?.id

        // Add note with property details
        if (contactId) {
          const noteBody = [
            `🏠 CMA Request`,
            `Property: ${fullAddress}`,
            `Phone: ${phone || 'not provided'}`,
            `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`,
            `Source: candeecurriehomes.com/home-value`,
          ].join('\n')

          await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ghlApiKey}`,
              Version: '2021-07-28',
            },
            body: JSON.stringify({ body: noteBody }),
          })
        }

        console.log(`[home-value] GHL contact created: ${contactId} | ${fullAddress}`)
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
