import { redirect } from 'next/navigation'

// Listings search has been replaced with a direct link to Candee's TTR Sotheby's search page.
// Visitors who want to browse all MLS listings are sent to her brokerage profile search —
// they land on a Sotheby's page with her face on it, not Zillow with competing agent ads.
export default function HomesForSalePage() {
  redirect('https://www.ttrsir.com/agents/candee-currie')
}
