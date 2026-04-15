import { defineType, defineField } from 'sanity'

export const neighborhoodSellerPageSchema = defineType({
  name: 'neighborhoodSellerPage',
  title: 'Neighborhood Seller Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Selling a Home in {Neighborhood}',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'neighborhood',
      title: 'Neighborhood',
      type: 'reference',
      to: [{ type: 'neighborhood' }],
      description: 'Reference to the buyer-facing neighborhood page',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'targetKeyword',
      title: 'Target Keyword',
      type: 'string',
      description: 'Primary keyword for SEO tracking (e.g., "sell home in Bellevue Forest")',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Override from neighborhood if needed',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
      name: 'sellerDescription',
      title: 'Seller-Focused Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Narrative about selling in this neighborhood',
    }),
    defineField({
      name: 'pricingPatterns',
      title: 'Pricing Patterns',
      type: 'text',
      rows: 3,
      description: 'What drives prices in this neighborhood?',
    }),
    defineField({
      name: 'buyerProfile',
      title: 'Typical Buyer Profile',
      type: 'text',
      rows: 3,
      description: 'Who buys in this neighborhood? (for sellers to understand their buyer)',
    }),
    defineField({
      name: 'stagingAdvice',
      title: 'Staging & Prep Advice',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'callout' },
        { type: 'divider' },
      ],
      description: 'Specific staging tips for this neighborhood',
    }),
    defineField({
      name: 'domTrends',
      title: 'Days on Market Trends',
      type: 'text',
      rows: 2,
      description: 'Typical DOM and seasonal patterns',
    }),
    defineField({
      name: 'premiumFeatures',
      title: 'Features That Add Premium Value',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'What features command premiums here?',
    }),
    defineField({
      name: 'commonMistakes',
      title: 'Common Seller Mistakes',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Pricing or prep mistakes to avoid',
    }),
    defineField({
      name: 'recentSales',
      title: 'Recent Sales Examples',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'recentSale',
          fields: [
            defineField({ name: 'address', title: 'Address', type: 'string' }),
            defineField({ name: 'price', title: 'Sale Price', type: 'number' }),
            defineField({ name: 'date', title: 'Sale Date', type: 'date' }),
            defineField({ name: 'beds', title: 'Bedrooms', type: 'number' }),
            defineField({ name: 'baths', title: 'Bathrooms', type: 'number' }),
            defineField({ name: 'sqft', title: 'Square Feet', type: 'number' }),
            defineField({ name: 'dom', title: 'Days on Market', type: 'number' }),
          ],
          preview: {
            select: { address: 'address', price: 'price' },
            prepare({ address, price }) {
              return {
                title: address,
                subtitle: price ? `$${price.toLocaleString()}` : 'No price',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'marketStatsOverride',
      title: 'Market Stats (Neighborhood-Specific)',
      type: 'object',
      description: 'Override or add to area-wide stats',
      fields: [
        defineField({ name: 'medianPrice', title: 'Median Sale Price', type: 'number' }),
        defineField({ name: 'avgDom', title: 'Average DOM', type: 'number' }),
        defineField({ name: 'pricePerSqft', title: 'Price Per Sq Ft', type: 'number' }),
        defineField({ name: 'inventoryLevel', title: 'Inventory Level', type: 'string', options: { list: ['Low', 'Balanced', 'High'] } }),
      ],
    }),
    defineField({
      name: 'adjacentNeighborhoods',
      title: 'Adjacent Neighborhoods',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'neighborhoodSellerPage' }] }],
      description: 'For cross-linking to similar seller pages',
    }),
    defineField({
      name: 'testimonials',
      title: 'Seller Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
      description: 'Relevant seller testimonials for this neighborhood',
    }),
    defineField({
      name: 'ctaPrimary',
      title: 'Primary CTA',
      type: 'ctaObject',
      description: 'e.g., "Get a Bellevue Forest Valuation"',
    }),
    defineField({
      name: 'ctaSecondary',
      title: 'Secondary CTA',
      type: 'ctaObject',
      description: 'e.g., "See Recent Sales Here"',
    }),
    defineField({
      name: 'relatedSellerGuides',
      title: 'Related Seller Guides',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sellerGuide' }] }],
    }),
    defineField({
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'array',
      of: [{ type: 'faqItem' }],
    }),
    defineField({
      name: 'metaTitle',
      title: 'SEO: Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'SEO: Meta Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(160),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      neighborhoodName: 'neighborhood.name',
    },
    prepare({ title, neighborhoodName }) {
      return {
        title: title || 'Untitled',
        subtitle: neighborhoodName ? `Selling in: ${neighborhoodName}` : 'No neighborhood selected',
      }
    },
  },
})
