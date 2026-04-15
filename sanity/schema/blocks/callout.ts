import { defineType, defineField } from 'sanity'

export const calloutSchema = defineType({
  name: 'callout',
  title: 'Callout',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Tip', value: 'tip' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
        ],
      },
      initialValue: 'info',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Optional Lucide icon name (e.g., "Lightbulb", "AlertTriangle")',
    }),
  ],
  preview: {
    select: { title: 'title', tone: 'tone' },
    prepare({ title, tone }) {
      return {
        title: title || 'Callout',
        subtitle: tone ? `Tone: ${tone}` : '',
      }
    },
  },
})
