import { defineType, defineField } from 'sanity'

export const postSchema = defineType({
  name: 'post',
  title: 'Blog Post',
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
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Market Update', value: 'market-update' },
          { title: 'Neighborhood Spotlight', value: 'neighborhood-spotlight' },
          { title: 'Buyer\'s Guide', value: 'buyers-guide' },
          { title: 'Seller\'s Guide', value: 'sellers-guide' },
          { title: 'Home Tips', value: 'home-tips' },
          { title: 'Sotheby\'s News', value: 'sothebys-news' },
        ],
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt Text' }],
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
    // Seller-focused content tracking fields
    defineField({
      name: 'targetKeyword',
      title: 'Target Keyword',
      type: 'string',
      description: 'Primary keyword for SEO tracking',
    }),
    defineField({
      name: 'contentPillar',
      title: 'Content Pillar',
      type: 'string',
      options: {
        list: [
          { title: 'Seller Authority', value: 'seller-authority' },
          { title: 'Market Intel', value: 'market-intel' },
          { title: 'Neighborhood', value: 'neighborhood' },
          { title: 'Proof/Credibility', value: 'proof' },
          { title: 'Lifestyle', value: 'lifestyle' },
        ],
      },
      description: 'Which pillar this post supports',
    }),
    defineField({
      name: 'isCornerstone',
      title: 'Cornerstone Content',
      type: 'boolean',
      initialValue: false,
      description: 'Flag for pillar content that drives internal linking',
    }),
    defineField({
      name: 'relatedSellerGuides',
      title: 'Related Seller Guides',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sellerGuide' }] }],
      description: 'Link to relevant seller guides from this post',
    }),
    defineField({
      name: 'relatedNeighborhoods',
      title: 'Related Neighborhoods',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'neighborhood' }] }],
    }),
  ],
  preview: {
    select: { 
      title: 'title', 
      media: 'mainImage', 
      subtitle: 'publishedAt',
      pillar: 'contentPillar',
      cornerstone: 'isCornerstone',
    },
    prepare({ title, media, subtitle, pillar, cornerstone }) {
      const pillarLabels: Record<string, string> = {
        'seller-authority': '🏠 Seller',
        'market-intel': '📊 Market',
        'neighborhood': '📍 Neighborhood',
        'proof': '⭐ Proof',
        'lifestyle': '✨ Lifestyle',
      }
      return {
        title: title,
        subtitle: `${pillarLabels[pillar || ''] || pillar}${cornerstone ? ' • CORNERSTONE' : ''}`,
        media: media,
      }
    },
  },
})
