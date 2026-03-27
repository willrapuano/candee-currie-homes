type EstimateInput = {
  address: string
  city: string
  zip?: string
  beds?: string
  baths?: string
  sqft?: string
  condition?: string
}

export type EstimateResult = {
  low: number
  high: number
  midpoint: number
  confidence: 'low' | 'medium'
  dataPoints: string[]
  narrative: string
  assumptions: string[]
}

const CITY_BASE_PPSF: Record<string, number> = {
  arlington: 520,
  'falls church': 500,
  alexandria: 430,
  mclean: 560,
  vienna: 470,
  'great falls': 450,
}

function toNum(value?: string) {
  if (!value) return undefined
  const n = Number(String(value).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : undefined
}

function money(v: number) {
  return `$${Math.round(v).toLocaleString()}`
}

async function fetchCensusMedianByZip(zip?: string): Promise<number | null> {
  if (!zip || zip.length < 5) return null
  try {
    // ACS owner-occupied median home value (B25077_001E) by ZCTA
    const url = `https://api.census.gov/data/2022/acs/acs5?get=B25077_001E&for=zip%20code%20tabulation%20area:${zip.slice(0, 5)}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as string[][]
    const value = Number(data?.[1]?.[0])
    return Number.isFinite(value) && value > 0 ? value : null
  } catch {
    return null
  }
}

async function llmNarrative(input: EstimateInput, low: number, high: number, comps: string[]): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY
  if (!key) return null

  try {
    const prompt = `You are assisting a real estate team. Create a short, careful valuation summary (max 110 words) for a homeowner.

Property input:
- Address: ${input.address}, ${input.city}${input.zip ? ` ${input.zip}` : ''}
- Beds/Baths: ${input.beds || 'n/a'}/${input.baths || 'n/a'}
- Sqft: ${input.sqft || 'n/a'}
- Condition: ${input.condition || 'n/a'}

Estimated range: ${money(low)} to ${money(high)}.
Data points used: ${comps.join('; ')}.

Rules:
- Do not present as appraisal.
- Mention this is an automated preliminary estimate.
- Encourage booking a full CMA with Candee.
- No markdown.`

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.HOME_VALUE_LLM_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        messages: [{ role: 'user', content: prompt }],
      }),
    })

    if (!res.ok) return null
    const json = await res.json()
    return json?.choices?.[0]?.message?.content?.trim() || null
  } catch {
    return null
  }
}

export async function generateEstimate(input: EstimateInput): Promise<EstimateResult> {
  const sqftProvided = toNum(input.sqft)
  const bedsProvided = toNum(input.beds)
  const bathsProvided = toNum(input.baths)

  const sqft = sqftProvided || 1800
  const beds = bedsProvided || 3
  const baths = bathsProvided || 2

  const cityKey = input.city?.trim().toLowerCase() || 'arlington'
  const cityPpsf = CITY_BASE_PPSF[cityKey] || 460

  const conditionAdj =
    input.condition === 'excellent' ? 1.08 :
    input.condition === 'good' ? 1.02 :
    input.condition === 'fair' ? 0.95 :
    input.condition === 'needs-work' ? 0.88 : 1.0

  const bedBathAdj = 1 + Math.max(-0.05, Math.min(0.08, (beds - 3) * 0.015 + (baths - 2) * 0.02))

  const modelMid = sqft * cityPpsf * conditionAdj * bedBathAdj
  const censusMedian = await fetchCensusMedianByZip(input.zip)

  // Guardrail:
  // - If sqft is missing, avoid false precision by leaning on broad area median and a wider range.
  // - If sqft is present, keep sqft model primary and use census only as a light stabilizer.
  const midpoint = sqftProvided
    ? (censusMedian ? modelMid * 0.9 + censusMedian * 0.1 : modelMid)
    : (censusMedian || modelMid)

  const spread = sqftProvided ? 0.10 : 0.22
  const low = midpoint * (1 - spread)
  const high = midpoint * (1 + spread)

  const dataPoints = [
    `City baseline $/sqft for ${input.city || 'Northern Virginia'}: ${money(cityPpsf)}`,
    sqftProvided
      ? `Property size used: ${Math.round(sqft).toLocaleString()} sqft`
      : 'Square footage not provided — using a broader area-based estimate',
    censusMedian
      ? `Public ACS median owner-occupied home value for ZIP ${input.zip?.slice(0, 5)}: ${money(censusMedian)}`
      : 'No ZIP-level ACS data used (missing ZIP)',
  ]

  const assumptions = [
    'Automated estimate; not a formal appraisal',
    sqftProvided
      ? 'Estimate used provided property facts (sqft/beds/baths) plus public market data'
      : 'Estimate did not include sqft, so range is intentionally wider and lower-confidence',
    'Final value can change based on lot, upgrades, layout, and micro-location',
    'Candee should run a full CMA with recent sold comps before listing decisions',
  ]

  const narrative =
    (await llmNarrative(input, low, high, dataPoints)) ||
    `Based on your inputs and local public data, your preliminary automated value range is ${money(low)} to ${money(high)}. This is not an appraisal. For pricing decisions, Candee should complete a full Comparative Market Analysis using current sold comps and property-specific adjustments.`

  return {
    low,
    high,
    midpoint,
    confidence: sqftProvided && censusMedian ? 'medium' : 'low',
    dataPoints,
    assumptions,
    narrative,
  }
}
