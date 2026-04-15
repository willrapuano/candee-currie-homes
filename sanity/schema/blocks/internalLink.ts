import { defineType, defineField } from 'sanity'

export const internalLinkSchema = defineType({
  name: 'internalLink',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Link Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'reference',
      title: 'Link To',
      type: 'reference',
      to: [
        { type: 'post' },
        { type: 'neighborhood' },
        { type: 'sellerGuide' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'anchor',
      title: 'Anchor (optional)',
      type: 'string',
      description: 'Link to a specific section (e.g., "#pricing")',
    }),
  ],
  preview: {
    select: { label: 'label', reference: 'reference.title' },
    prepare({ label, reference }) {
      return {
        title: label,
        subtitle: reference ? `→ ${reference}` : '→ (no reference)',
      }
    },
  },
})
