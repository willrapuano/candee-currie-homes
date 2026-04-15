import { defineType, defineField } from 'sanity'

export const proofPageSchema = defineType({
  name: 'proofPage',
  title: 'Proof / Credibility Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Success Stories', value: 'success-stories' },
          { title: 'Why Sotheby\'s', value: 'why-sothebys' },
          { title: 'Experience/Authority', value: 'experience' },
          { title: 'Case Study', value: 'case-study' },
          { title: 'Awards/Recognition', value: 'awards' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { type: 'table' },
        { type: 'accordion' },
        { type: 'callout' },
        { type: 'divider' },
      ],
    }),
    defineField({
      name: 'statsHighlight',
      title: 'Stats Highlight',
      type: 'object',
      description: 'Key stats to display on this page',
      fields: [
        defineField({ name: 'totalTransactions', title: 'Total Transactions', type: 'number' }),
        defineField({ name: 'avgPricePoint', title: 'Average Price Point', type: 'string' }),
        defineField({ name: 'yearsExperience', title: 'Years Experience', type: 'number' }),
        defineField({ name: 'clientRating', title: 'Client Rating', type: 'number' }),
        defineField({ name: 'sellerSideDeals', title: 'Seller-Side Deals', type: 'number' }),
        defineField({ name: 'avgDom', title: 'Average Days on Market', type: 'number' }),
        defineField({ name: 'listToSaleRatio', title: 'List-to-Sale Ratio (%)', type: 'number' }),
      ],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'caseStudy',
          fields: [
            defineField({
              name: 'title',
              title: 'Case Study Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'neighborhood',
              title: 'Neighborhood',
              type: 'reference',
              to: [{ type: 'neighborhood' }],
            }),
            defineField({
              name: 'listPrice',
              title: 'List Price',
              type: 'number',
            }),
            defineField({
              name: 'salePrice',
              title: 'Sale Price',
              type: 'number',
            }),
            defineField({
              name: 'daysOnMarket',
              title: 'Days on Market',
              type: 'number',
            }),
            defineField({
              name: 'challenge',
              title: 'The Challenge',
              type: 'text',
              rows: 3,
              description: 'What made this sale challenging?',
            }),
            defineField({
              name: 'strategy',
              title: 'Our Strategy',
              type: 'text',
              rows: 3,
              description: 'How did we approach it?',
            }),
            defineField({
              name: 'result',
              title: 'The Result',
              type: 'text',
              rows: 3,
              description: 'Outcome and client satisfaction',
            }),
            defineField({
              name: 'testimonial',
              title: 'Client Testimonial',
              type: 'reference',
              to: [{ type: 'testimonial' }],
            }),
            defineField({
              name: 'images',
              title: 'Before/After Images',
              type: 'array',
              of: [{ type: 'image', options: { hotspot: true } }],
            }),
          ],
          preview: {
            select: { title: 'title', neighborhood: 'neighborhood.name', salePrice: 'salePrice' },
            prepare({ title, neighborhood, salePrice }) {
              return {
                title: title,
                subtitle: `${neighborhood || 'No neighborhood'}${salePrice ? ` — $${salePrice.toLocaleString()}` : ''}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'featuredTestimonials',
      title: 'Featured Testimonials',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'ctaObject',
    }),
    defineField({
      name: 'internalLinks',
      title: 'Related Pages',
      type: 'array',
      of: [
        { type: 'reference', to: [{ type: 'sellerGuide' }] },
        { type: 'reference', to: [{ type: 'neighborhoodSellerPage' }] },
      ],
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
    defineField({
      name: 'targetKeyword',
      title: 'Target Keyword',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
    },
    prepare({ title, pageType }) {
      const typeLabels: Record<string, string> = {
        'success-stories': 'Success Stories',
        'why-sothebys': 'Why Sotheby\'s',
        'experience': 'Experience/Authority',
        'case-study': 'Case Study',
        'awards': 'Awards/Recognition',
      }
      return {
        title: title || 'Untitled',
        subtitle: typeLabels[pageType || ''] || pageType,
      }
    },
  },
})
