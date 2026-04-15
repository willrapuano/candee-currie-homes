import { defineType, defineField } from 'sanity'

export const dividerSchema = defineType({
  name: 'divider',
  title: 'Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Line', value: 'line' },
          { title: 'Dashed', value: 'dashed' },
          { title: 'Dots', value: 'dots' },
          { title: 'Space', value: 'space' },
        ],
      },
      initialValue: 'line',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
  ],
  preview: {
    select: { style: 'style' },
    prepare({ style }) {
      return {
        title: 'Divider',
        subtitle: style || 'line',
      }
    },
  },
})
