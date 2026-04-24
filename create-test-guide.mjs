import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'ej27mt39',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: 'sktduwqwKdJnL5n5pE2nyPs9DqBocM7DfANFPaymKdyaOFuN1Lo9YGmRKnRJHiz7lZKcSDL2XQcMAs3Wgau8i7fmbOsHlfRGHReSsFnarWk9bV5m7uCMctippLqfjQA2W4WeWw0lar7qA8TWn87Jw6nG3lsYoTeoMVJ6vZedNRXsT0LqfHD2'
})

const testGuide = {
  _type: 'sellerGuide',
  title: 'How to Sell a Home in Arlington, VA',
  slug: { current: 'how-to-sell-home-arlington-va' },
  shortDescription: 'A comprehensive guide to selling your home in Arlington, from pricing strategy to closing day. Based on 218+ seller transactions.',
  priority: 'P0',
  category: 'process',
  targetKeyword: 'how to sell a home in arlington va',
  metaTitle: 'How to Sell a Home in Arlington, VA | Candee Currie',
  metaDescription: 'Expert guide to selling your Arlington home. Learn pricing strategy, staging tips, and negotiation tactics from a listing specialist with 218+ sales.',
  schemaType: 'Article',
  icon: 'Home',
  order: 1,
  content: [
    {
      _type: 'block',
      _key: 'intro',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Selling a home in Arlington requires local expertise. With 218 seller-side transactions and deep knowledge of the Arlington market, I have helped homeowners net above-list prices consistently.' }
      ]
    },
    {
      _type: 'block',
      _key: 'h2-pricing',
      style: 'h2',
      children: [
        { _type: 'span', text: '1. Pricing Strategy: The Foundation of a Successful Sale' }
      ]
    },
    {
      _type: 'block',
      _key: 'pricing-content',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Pricing your Arlington home correctly is the single most important decision you will make. Price too high, and your home sits. Price too low, and you leave money on the table. The sweet spot requires analyzing recent sales of comparable properties, understanding current market velocity, and factoring in your home\'s unique features.' }
      ]
    },
    {
      _type: 'callout',
      _key: 'pricing-tip',
      variant: 'tip',
      title: 'Pro Tip: The 10-Day Rule',
      content: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            { _type: 'span', text: 'If your Arlington home does not have strong showing activity within 10 days on market, your price is likely too high. Be prepared to adjust quickly.' }
          ]
        }
      ]
    },
    {
      _type: 'block',
      _key: 'h2-staging',
      style: 'h2',
      children: [
        { _type: 'span', text: '2. Staging and Preparation' }
      ]
    },
    {
      _type: 'block',
      _key: 'staging-content',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Arlington buyers expect move-in ready homes. Professional staging can increase your sale price by 5-10%. Focus on decluttering, neutral paint colors, and highlighting the features Arlington buyers want most: outdoor space, home offices, and updated kitchens.' }
      ]
    },
    {
      _type: 'table',
      _key: 'staging-checklist',
      headers: [
        { text: 'Task' },
        { text: 'Priority' },
        { text: 'Estimated Cost' }
      ],
      rows: [
        { cells: [{ text: 'Deep cleaning' }, { text: 'Must do' }, { text: '$300-500' }] },
        { cells: [{ text: 'Decluttering' }, { text: 'Must do' }, { text: 'DIY' }] },
        { cells: [{ text: 'Professional staging' }, { text: 'High ROI' }, { text: '$2,000-5,000' }] },
        { cells: [{ text: 'Minor repairs' }, { text: 'Must do' }, { text: '$500-2,000' }] },
        { cells: [{ text: 'Paint touch-ups' }, { text: 'Recommended' }, { text: '$1,000-3,000' }] }
      ],
      caption: 'Arlington Home Prep Checklist'
    },
    {
      _type: 'divider',
      _key: 'divider-1',
      style: 'line',
      color: 'gold'
    },
    {
      _type: 'block',
      _key: 'conclusion',
      style: 'normal',
      children: [
        { _type: 'span', text: 'Ready to sell your Arlington home? The right strategy makes all the difference. Contact me for a personalized consultation.' }
      ]
    }
  ],
  faqSection: [
    {
      _key: 'faq-1',
      question: 'How long does it take to sell a home in Arlington?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            { _type: 'span', text: 'Average days on market in Arlington is 12-15 days for properly priced homes. Luxury properties may take 30-45 days. Market conditions, pricing strategy, and property condition all impact timing.' }
          ]
        }
      ]
    },
    {
      _key: 'faq-2',
      question: 'What are the closing costs for sellers in Virginia?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            { _type: 'span', text: 'Seller closing costs in Virginia typically range from 6-8% of the sale price, including agent commission, transfer taxes, and settlement fees. On a $1M home, budget $60,000-80,000.' }
          ]
        }
      ]
    },
    {
      _key: 'faq-3',
      question: 'Should I make repairs before listing?',
      answer: [
        {
          _type: 'block',
          style: 'normal',
          children: [
            { _type: 'span', text: 'Yes, for items that will show up on a buyer\'s inspection. Fix leaky faucets, patch drywall, and address any safety issues. Major renovations rarely pay for themselves—focus on presentation, not perfection.' }
          ]
        }
      ]
    }
  ],
  cta: {
    text: 'Get Your Free Arlington Valuation',
    ctaDestination: 'valuation-form',
    variant: 'primary'
  }
}

try {
  const result = await client.create(testGuide)
  console.log('✅ Test seller guide created:', result._id)
  console.log('URL: /sell/how-to-sell-home-arlington-va')
} catch (error) {
  console.error('❌ Error:', error.message)
}
