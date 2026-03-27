import { NextRequest, NextResponse } from 'next/server'
import { generateEstimate } from '@/lib/home-valuation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, city } = body || {}

    if (!address || !city) {
      return NextResponse.json({ error: 'Address and city are required' }, { status: 400 })
    }

    const estimate = await generateEstimate(body)

    return NextResponse.json({
      success: true,
      estimate,
      disclaimer:
        'Automated preliminary estimate based on user input + public data. Not an appraisal or a substitute for an agent CMA.',
    })
  } catch (error) {
    console.error('Home value estimate error:', error)
    return NextResponse.json({ error: 'Unable to generate estimate right now' }, { status: 500 })
  }
}
