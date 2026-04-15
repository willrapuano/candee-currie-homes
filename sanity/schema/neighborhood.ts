import { defineType, defineField } from 'sanity'

export const neighborhoodSchema = defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 99,
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'VA',
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description (Card)',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description (Page)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
        },
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Market Stats',
      type: 'object',
      fields: [
        { name: 'medianPrice', title: 'Median Price', type: 'number' },
        { name: 'avgDom', title: 'Avg. Days on Market', type: 'number' },
        { name: 'activeListings', title: 'Active Listings', type: 'number' },
        { name: 'priceChangeYoY', title: 'Price Change YoY (%)', type: 'number' },
      ],
    }),
    defineField({
      name: 'highlights',
      title: 'Neighborhood Highlights',
      type: 'array',
      of: [{ type: 'string' }],
      description: '4-6 bullet highlights shown on cards and pages',
    }),
    defineField({
      name: 'schools',
      title: 'Schools',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'School Name' },
            {
              name: 'level',
              type: 'string',
              title: 'Level',
              options: {
                list: ['Elementary', 'Middle', 'High', 'Private'],
              },
            },
            { name: 'rating', type: 'number', title: 'GreatSchools Rating' },
            { name: 'distance', type: 'string', title: 'Distance' },
          ],
        },
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
    // Seller-focused cross-linking fields
    defineField({
      name: 'sellerPage',
      title: 'Seller Page',
      type: 'reference',
      to: [{ type: 'neighborhoodSellerPage' }],
      description: 'Link to the seller-focused page for this neighborhood',
    }),
    defineField({
      name: 'hasSellerContent',
      title: 'Has Seller Content',
      type: 'boolean',
      initialValue: false,
      description: 'Flag if seller page has been created',
    }),
    defineField({
      name: 'sellerGuideExcerpt',
      title: 'Seller Guide Excerpt',
      type: 'text',
      rows: 2,
      description: 'Brief text for cross-linking from seller guides',
    }),
  ],
  preview: {
    select: { 
      title: 'name', 
      subtitle: 'city', 
      media: 'heroImage',
      hasSeller: 'hasSellerContent',
    },
    prepare({ title, subtitle, media, hasSeller }) {
      return {
        title: title,
        subtitle: `${subtitle || 'No city'}${hasSeller ? ' • Seller Page ✓' : ''}`,
        media: media,
      }
    },
  },
  orderings: [
    { title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] },
    { title: 'Has Seller Content', name: 'sellerContent', by: [{ field: 'hasSellerContent', direction: 'desc' }] },
  ],
})
