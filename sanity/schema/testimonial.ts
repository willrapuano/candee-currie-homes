import { defineType, defineField } from 'sanity'

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Reviewer Name', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', rows: 4, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
    }),
    defineField({
      name: 'transaction',
      title: 'Transaction Type',
      type: 'string',
      options: { list: ['buyer', 'seller', 'both'] },
    }),
    defineField({ name: 'neighborhood', title: 'Neighborhood', type: 'string' }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: { list: ['google', 'zillow', 'realtor', 'direct'] },
    }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'neighborhood' },
  },
})
