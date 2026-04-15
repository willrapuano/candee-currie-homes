import { NextRequest, NextResponse } from 'next/server'

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim())
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, zip } = body

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    if (!name || !String(name).trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    }

    const ghlApiKey = process.env.GHL_API_KEY
    const ghlWebhookUrl = process.env.GHL_HOME_VALUE_WEBHOOK_URL || process.env.GHL_WEBHOOK_URL
    const locationId =
      process.env.GHL_LOCATION_ID ||
      process.env.NEXT_PUBLIC_GHL_LOCATION_ID ||
      'N2t4FzVeZVhK36srDMZC'

    const fullAddress = [address, city, zip ? `VA ${zip}` : 'VA'].filter(Boolean).join(', ')

    // Preferred path: send to an inbound GHL webhook so workflow ownership stays inside GHL.
    if (ghlWebhookUrl) {
      const webhookRes = await fetch(ghlWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone: phone || '',
          address: address || '',
          city: city || '',
          zip: zip || '',
          fullAddress,
          source: 'candeecurriehomes.com - Home Valuation Tool',
          tag: 'home valuation report requested',
        }),
      })

      if (!webhookRes.ok) {
        const text = await webhookRes.text()
        console.error('[home-value] GHL webhook failed:', webhookRes.status, text)
        return NextResponse.json(
          { error: 'Home valuation request could not be delivered to CRM webhook.' },
          { status: 502 },
        )
      }

      console.log(`[home-value] GHL webhook delivered | ${fullAddress}`)
      return NextResponse.json({ success: true, delivery: 'ghl-webhook' })
    }

    // Fallback path: direct API call, but fail loudly if the token is invalid or underscoped.
    if (!ghlApiKey || !locationId) {
      console.error('[home-value] Missing GHL configuration')
      return NextResponse.json(
        { error: 'CRM integration is not configured.' },
        { status: 500 },
      )
    }

    const nameParts = String(name).trim().split(/\s+/)
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    const contactPayload: Record<string, unknown> = {
      locationId,
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

    const contactRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ghlApiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify(contactPayload),
    })

    const raw = await contactRes.text()
    let contactData: any = null
    try {
      contactData = raw ? JSON.parse(raw) : null
    } catch {
      contactData = { raw }
    }

    if (!contactRes.ok) {
      console.error('[home-value] GHL contact create failed:', contactRes.status, raw)
      return NextResponse.json(
        { error: 'CRM rejected the home valuation request.', details: contactData?.message || raw || 'unknown error' },
        { status: 502 },
      )
    }

    const contactId = contactData?.contact?.id

    if (!contactId) {
      console.error('[home-value] GHL contact create returned no contact id:', raw)
      return NextResponse.json(
        { error: 'CRM did not return a contact id.' },
        { status: 502 },
      )
    }

    const noteBody = [
      `🏠 CMA Request`,
      `Property: ${fullAddress}`,
      `Phone: ${phone || 'not provided'}`,
      `Submitted: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} ET`,
      `Source: candeecurriehomes.com/home-value`,
    ].join('\n')

    const noteRes = await fetch(`https://services.leadconnectorhq.com/contacts/${contactId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ghlApiKey}`,
        Version: '2021-07-28',
      },
      body: JSON.stringify({ body: noteBody }),
    })

    if (!noteRes.ok) {
      const noteText = await noteRes.text()
      console.error('[home-value] GHL note create failed:', noteRes.status, noteText)
    }

    console.log(`[home-value] GHL contact created: ${contactId} | ${fullAddress}`)
    return NextResponse.json({ success: true, delivery: 'ghl-api', contactId })
  } catch (error) {
    console.error('Home value route error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
