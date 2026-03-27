import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, address, city, zip, beds, baths, sqft, condition, timeline } = body

    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    const ghlApiKey = process.env.GHL_API_KEY
    const ghlPipelineId = process.env.GHL_PIPELINE_ID

    if (ghlApiKey && name && email) {
      try {
        // Create contact in GHL (only when contact info is provided)
        const contactRes = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
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
            address1: address,
            city,
            postalCode: zip,
            source: 'candeecurriehomes.com - Home Value CMA',
            tags: ['CMA Request', `Timeline: ${timeline || 'Not specified'}`],
            customField: {
              property_address: `${address}, ${city}, VA ${zip}`,
              bedrooms: beds,
              bathrooms: baths,
              square_footage: sqft,
              property_condition: condition,
              selling_timeline: timeline,
            },
          }),
        })

        const contact = await contactRes.json()

        // Add to pipeline if pipeline ID is configured
        if (ghlPipelineId && contact.contact?.id) {
          await fetch('https://rest.gohighlevel.com/v1/opportunities/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${ghlApiKey}`,
            },
            body: JSON.stringify({
              pipelineId: ghlPipelineId,
              locationId: process.env.GHL_LOCATION_ID,
              name: `CMA Request — ${address}, ${city}`,
              status: 'open',
              contactId: contact.contact.id,
              source: 'candeecurriehomes.com',
            }),
          })
        }
      } catch (ghlError) {
        console.error('GHL error:', ghlError)
      }
    }

    console.log('Home value request:', body)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Home value form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
