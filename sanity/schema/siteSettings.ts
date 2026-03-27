import { defineType, defineField } from 'sanity'

export const siteSettingsSchema = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'agentName', title: 'Agent Name', type: 'string' }),
    defineField({ name: 'agentTitle', title: 'Agent Title', type: 'string' }),
    defineField({ name: 'brokerage', title: 'Brokerage', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'address', title: 'Office Address', type: 'string' }),
    defineField({ name: 'licenseNumber', title: 'License Number', type: 'string' }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        { name: 'totalTransactions', title: 'Total Transactions', type: 'number' },
        { name: 'totalVolume', title: 'Total Volume ($)', type: 'string' },
        { name: 'avgPrice', title: 'Avg. Sale Price', type: 'string' },
        { name: 'yearsExperience', title: 'Years Experience', type: 'number' },
        { name: 'rating', title: 'Rating', type: 'number' },
        { name: 'reviewCount', title: 'Review Count', type: 'number' },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
      ],
    }),
  ],
})
