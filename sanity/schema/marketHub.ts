import { defineType, defineField } from 'sanity'

export const marketHubSchema = defineType({
  name: 'marketHub',
  title: 'Market Hub',
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
      name: 'marketArea',
      title: 'Market Area',
      type: 'string',
      options: {
        list: [
          { title: 'Arlington', value: 'arlington' },
          { title: 'North Arlington', value: 'north-arlington' },
          { title: 'Falls Church', value: 'falls-church' },
          { title: 'McLean', value: 'mclean' },
          { title: 'Alexandria', value: 'alexandria' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: 'Evergreen Hub', value: 'evergreen-hub' },
          { title: 'Monthly Update', value: 'monthly-update' },
        ],
      },
      initialValue: 'evergreen-hub',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reportMonth',
      title: 'Report Month',
      type: 'date',
      description: 'For monthly updates — the month this report covers',
      hidden: ({ document }) => document?.pageType !== 'monthly-update',
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
      name: 'summaryStats',
      title: 'Market Summary Stats',
      type: 'object',
      fields: [
        defineField({ name: 'medianPrice', title: 'Median Price', type: 'number' }),
        defineField({ name: 'avgDom', title: 'Average Days on Market', type: 'number' }),
        defineField({ name: 'activeListings', title: 'Active Listings', type: 'number' }),
        defineField({ name: 'priceChangeYoY', title: 'Price Change YoY (%)', type: 'number' }),
        defineField({ name: 'newListings', title: 'New Listings (30 days)', type: 'number' }),
        defineField({ name: 'pendingSales', title: 'Pending Sales', type: 'number' }),
      ],
    }),
    defineField({
      name: 'marketSummary',
      title: 'Market Summary',
      type: 'text',
      rows: 4,
      description: 'Executive summary of current market conditions',
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
      name: 'dataSource',
      title: 'Data Source',
      type: 'string',
      initialValue: 'BrightMLS / MarketStats',
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'datetime',
    }),
    defineField({
      name: 'archivePages',
      title: 'Archive Pages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'marketHub' }] }],
      description: 'Previous monthly reports for this market area',
      hidden: ({ document }) => document?.pageType !== 'evergreen-hub',
    }),
    defineField({
      name: 'parentHub',
      title: 'Parent Hub',
      type: 'reference',
      to: [{ type: 'marketHub' }],
      description: 'Reference to the evergreen hub page',
      hidden: ({ document }) => document?.pageType !== 'monthly-update',
    }),
    defineField({
      name: 'relatedNeighborhoods',
      title: 'Related Neighborhoods',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'neighborhood' }] }],
      description: 'Neighborhoods in this market area for cross-linking',
    }),
    defineField({
      name: 'relatedSellerGuides',
      title: 'Related Seller Guides',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sellerGuide' }] }],
      description: 'Seller guides to promote in this market context',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'ctaObject',
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
      description: 'Primary keyword for SEO tracking',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'marketArea',
      pageType: 'pageType',
    },
    prepare({ title, subtitle, pageType }) {
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle} — ${pageType === 'monthly-update' ? 'Monthly Report' : 'Evergreen Hub'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Report Month (Newest First)',
      name: 'reportMonthDesc',
      by: [{ field: 'reportMonth', direction: 'desc' }],
    },
    {
      title: 'Market Area',
      name: 'marketArea',
      by: [{ field: 'marketArea', direction: 'asc' }],
    },
  ],
})
