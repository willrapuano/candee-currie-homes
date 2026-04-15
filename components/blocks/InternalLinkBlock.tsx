'use client'

import Link from 'next/link'
import { FaArrowRight, FaMapMarkerAlt, FaFileAlt, FaNewspaper } from 'react-icons/fa'

export type LinkType = 'sellerGuide' | 'post' | 'neighborhood'

interface InternalLinkBlockProps {
  type: LinkType
  slug: string
  title: string
  excerpt?: string
  imageUrl?: string
}

const typeConfig = {
  sellerGuide: {
    icon: FaFileAlt,
    label: 'Seller Guide',
    basePath: '/seller-guides',
  },
  post: {
    icon: FaNewspaper,
    label: 'Article',
    basePath: '/blog',
  },
  neighborhood: {
    icon: FaMapMarkerAlt,
    label: 'Neighborhood',
    basePath: '/neighborhoods',
  },
}

export function InternalLinkBlock({
  type,
  slug,
  title,
  excerpt,
  imageUrl,
}: InternalLinkBlockProps) {
  const config = typeConfig[type]
  const Icon = config.icon
  const href = `${config.basePath}/${slug}`

  return (
    <Link 
      href={href}
      className="group block bg-white shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Image (optional) */}
        {imageUrl && (
          <div className="sm:w-32 md:w-40 h-32 sm:h-auto flex-shrink-0 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="absolute inset-0 bg-navy/20 group-hover:bg-navy/10 transition-colors" />
          </div>
        )}
        
        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex items-center gap-2 mb-2">
            <Icon className="text-gold text-sm" />
            <span className="text-xs tracking-wider uppercase text-gold font-medium">
              {config.label}
            </span>
          </div>
          
          <h4 className="font-serif text-lg text-navy font-semibold mb-2 group-hover:text-gold transition-colors">
            {title}
          </h4>
          
          {excerpt && (
            <p className="text-charcoal-muted text-sm leading-relaxed line-clamp-2 mb-3">
              {excerpt}
            </p>
          )}
          
          <div className="flex items-center gap-2 text-navy text-sm font-medium group-hover:text-gold transition-colors">
            <span>Read more</span>
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  )
}
