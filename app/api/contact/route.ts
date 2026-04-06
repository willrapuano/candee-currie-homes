import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, message, source, interest } = body

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 })
    }

    // ─── GHL Pipeline Integration ──────────────────────────────────────────
    const ghlApiKey = process.env.GHL_API_KEY
    const ghlLocationId = process.env.GHL_LOCATION_ID

    if (ghlApiKey && ghlLocationId) {
      try {
        const ghlContact = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ghlApiKey}`,
          },
          body: JSON.stringify({
            firstName: name.split(' ')[0],
            lastName: name.split(' ').slice(1).join(' ') || '',
            email,
            phone,
            source: `candeecurriehomes.com - ${source || 'Contact Form'}`,
            tags: ['Website Lead', interest || 'General Inquiry'],
            customField: {
              message,
              interest,
            },
          }),
        })

        if (!ghlContact.ok) {
          console.error('GHL contact creation failed:', await ghlContact.text())
        }
      } catch (ghlError) {
        console.error('GHL error (non-fatal):', ghlError)
      }
    }

    // ─── Email notification (placeholder — wire up SMTP or Resend) ─────────
    // TODO: Send email notification to ccurrie@ttrsir.com
    // Using: nodemailer, Resend, or SendGrid
    console.log('Contact form submission:', { name, email, phone, message, source, interest })

    return NextResponse.json({ success: true, message: 'Message received' })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
