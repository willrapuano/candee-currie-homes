'use client'

import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Link from 'next/link'

// Portable Text components for accordion answers
const answerComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-charcoal-muted leading-relaxed mb-3 last:mb-0">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-3 text-charcoal-muted ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-1 mb-3 text-charcoal-muted ml-4">
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
}

interface PortableTextBlock {
  _type: string
  _key?: string
  [key: string]: unknown
}

interface AccordionItem {
  _key?: string
  question: string
  answer: string | PortableTextBlock[]
}

interface AccordionBlockProps {
  items: AccordionItem[]
  allowMultiple?: boolean
}

export function AccordionBlock({ items, allowMultiple = false }: AccordionBlockProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())

  const toggleItem = (key: string) => {
    const newOpenItems = new Set(openItems)
    
    if (allowMultiple) {
      if (newOpenItems.has(key)) {
        newOpenItems.delete(key)
      } else {
        newOpenItems.add(key)
      }
    } else {
      if (newOpenItems.has(key)) {
        newOpenItems.clear()
      } else {
        newOpenItems.clear()
        newOpenItems.add(key)
      }
    }
    
    setOpenItems(newOpenItems)
  }

  if (!items || items.length === 0) return null

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const key = item._key || `accordion-${index}`
        const isOpen = openItems.has(key)
        
        return (
          <div 
            key={key}
            className="bg-white shadow-card overflow-hidden"
          >
            {/* Header */}
            <button
              onClick={() => toggleItem(key)}
              className="w-full flex items-center justify-between p-5 bg-navy text-left group hover:bg-navy-700 transition-colors"
            >
              <span className="font-serif text-lg text-white font-medium pr-4">
                {item.question}
              </span>
              <div className="flex-shrink-0 w-8 h-8 bg-gold/20 flex items-center justify-center group-hover:bg-gold/30 transition-colors">
                <FaChevronDown 
                  className={`text-gold text-sm transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </div>
            </button>
            
            {/* Content */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-out ${
                isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 bg-white border-l-4 border-gold">
                {typeof item.answer === 'string' ? (
                  <p className="text-charcoal-muted leading-relaxed">
                    {item.answer}
                  </p>
                ) : (
                  <PortableText value={item.answer} components={answerComponents} />
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
