'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import Link from 'next/link'
import { AccordionBlock } from './AccordionBlock'
import { CalloutBlock, CalloutVariant } from './CalloutBlock'
import { DividerBlock, DividerStyle, DividerColor } from './DividerBlock'
import { InternalLinkBlock, LinkType } from './InternalLinkBlock'
import { TableBlock } from './TableBlock'

// Types for Sanity block content
interface TableCell {
  _key?: string
  text: string
}

interface TableRow {
  _key?: string
  cells: TableCell[]
}

interface AccordionItem {
  _key?: string
  question: string
  answer: string
}

interface SanityBlock {
  _type: string
  _key?: string
  [key: string]: unknown
}

interface ContentBlocksProps {
  content: SanityBlock[]
}

// Portable Text components for standard blocks
const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-charcoal-muted leading-relaxed mb-4">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="font-serif text-4xl md:text-5xl text-navy font-bold mb-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-serif text-3xl md:text-4xl text-navy font-bold mb-4 mt-10">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-serif text-2xl md:text-3xl text-navy font-bold mb-3 mt-8">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-serif text-xl md:text-2xl text-navy font-semibold mb-3 mt-6">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gold bg-cream p-6 my-6 italic text-navy">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-4 text-charcoal-muted ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-4 text-charcoal-muted ml-4">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <Link 
        href={value?.href || '#'} 
        className="text-gold hover:text-navy underline transition-colors"
      >
        {children}
      </Link>
    ),
    strong: ({ children }) => <strong className="font-semibold text-navy">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset?.url) return null
      return (
        <figure className="my-8">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={value.asset.url}
              alt={value.alt || ''}
              fill
              className="object-cover"
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-charcoal-muted mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
}

// Custom block renderers
function renderCustomBlock(block: SanityBlock): React.ReactNode {
  switch (block._type) {
    case 'table': {
      const headers = (block.headers as TableCell[] | undefined) || []
      const rows = (block.rows as TableRow[] | undefined) || []
      const caption = block.caption as string | undefined
      return (
        <TableBlock
          headers={headers}
          rows={rows}
          caption={caption}
        />
      )
    }

    case 'accordion': {
      const items = (block.items as AccordionItem[] | undefined) || []
      const allowMultiple = block.allowMultiple as boolean | undefined
      return (
        <AccordionBlock
          items={items}
          allowMultiple={allowMultiple}
        />
      )
    }

    case 'callout': {
      const variant = (block.variant as CalloutVariant | undefined) || 'info'
      const title = block.title as string | undefined
      const content = block.content as { _type: string; [key: string]: unknown }[] | undefined
      return (
        <CalloutBlock variant={variant} title={title}>
          {content && content.length > 0 && (
            <PortableText value={content} components={portableTextComponents} />
          )}
        </CalloutBlock>
      )
    }

    case 'divider': {
      const style = (block.style as DividerStyle | undefined) || 'line'
      const color = (block.color as DividerColor | undefined) || 'gold'
      return (
        <DividerBlock
          style={style}
          color={color}
        />
      )
    }

    case 'internalLink': {
      const linkType = (block.linkType as LinkType | undefined) || 'post'
      const slug = (block.slug as string | undefined) || ''
      const title = (block.title as string | undefined) || ''
      const excerpt = block.excerpt as string | undefined
      const imageUrl = block.imageUrl as string | undefined
      return (
        <div className="my-6">
          <InternalLinkBlock
            type={linkType}
            slug={slug}
            title={title}
            excerpt={excerpt}
            imageUrl={imageUrl}
          />
        </div>
      )
    }

    default:
      return null
  }
}

export function ContentBlocks({ content }: ContentBlocksProps) {
  if (!content || content.length === 0) return null

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((block, index) => {
        const key = block._key || `block-${index}`
        
        // Check if it's a custom block type
        if (
          block._type === 'table' ||
          block._type === 'accordion' ||
          block._type === 'callout' ||
          block._type === 'divider' ||
          block._type === 'internalLink'
        ) {
          return (
            <div key={key}>
              {renderCustomBlock(block)}
            </div>
          )
        }

        // Standard portable text block
        return (
          <PortableText
            key={key}
            value={[block]}
            components={portableTextComponents}
          />
        )
      })}
    </div>
  )
}
