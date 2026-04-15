import { defineType, defineField } from 'sanity'

export const accordionSchema = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Accordion Items',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question / Header',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Answer / Content',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', items: 'items' },
    prepare({ title, items }: { title?: string; items?: unknown[] }) {
      return {
        title: title || 'Accordion',
        subtitle: `${items?.length || 0} items`,
      }
    },
  },
})
