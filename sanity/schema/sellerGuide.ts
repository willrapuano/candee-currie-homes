import { defineType, defineField } from 'sanity'

export const sellerGuideSchema = defineType({
  name: 'sellerGuide',
  title: 'Seller Guide',
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
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name (e.g., "Home", "TrendingUp", "DollarSign")',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'Content',
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
      name: 'faqSection',
      title: 'FAQ Section',
      type: 'array',
      of: [{ type: 'faqItem' }],
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
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'string',
      options: {
        list: [
          { title: 'P0 - Critical', value: 'P0' },
          { title: 'P1 - High', value: 'P1' },
          { title: 'P2 - Normal', value: 'P2' },
        ],
      },
      initialValue: 'P2',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Life Stage', value: 'life-stage' },
          { title: 'Process', value: 'process' },
          { title: 'Financial', value: 'financial' },
          { title: 'Luxury', value: 'luxury' },
          { title: 'Estate', value: 'estate' },
        ],
      },
    }),
    defineField({
      name: 'schemaType',
      title: 'Schema Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'Article' },
          { title: 'FAQPage', value: 'FAQPage' },
          { title: 'HowTo', value: 'HowTo' },
        ],
      },
      initialValue: 'Article',
    }),
    defineField({
      name: 'internalLinks',
      title: 'Internal Links',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sellerGuide' }],
        },
      ],
      description: 'Related seller guide pages for internal linking',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription' },
  },
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
  ],
})
