import { defineType, defineField } from 'sanity'

export const ctaObjectSchema = defineType({
  name: 'ctaObject',
  title: 'Call to Action',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaDestination',
      title: 'CTA Destination',
      type: 'string',
      options: {
        list: [
          { title: 'Valuation Form', value: 'valuation-form' },
          { title: 'Calendar Booking', value: 'calendar-booking' },
          { title: 'Contact Form', value: 'contact-form' },
          { title: 'PDF Download', value: 'pdf-download' },
          { title: 'Phone', value: 'phone' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customUrl',
      title: 'Custom URL',
      type: 'url',
      description: 'Optional override URL for edge cases',
    }),
    defineField({
      name: 'variant',
      title: 'Button Style',
      type: 'string',
      options: {
        list: [
          { title: 'Primary', value: 'primary' },
          { title: 'Secondary', value: 'secondary' },
          { title: 'Outline', value: 'outline' },
        ],
      },
      initialValue: 'primary',
    }),
    defineField({
      name: 'isExternal',
      title: 'External Link',
      type: 'boolean',
      initialValue: false,
      description: 'Opens in new tab if true',
    }),
  ],
  preview: {
    select: { title: 'text', subtitle: 'ctaDestination' },
  },
})
