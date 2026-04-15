// ─── Listing ───────────────────────────────────────────────────────────────
export interface Listing {
  id: string
  mlsNumber?: string
  status: 'Active' | 'Under Contract' | 'Sold' | 'Coming Soon'
  price: number
  address: {
    street: string
    city: string
    state: string
    zip: string
    neighborhood?: string
  }
  beds: number
  baths: number
  halfBaths?: number
  sqft: number
  lotSize?: number
  yearBuilt?: number
  propertyType: 'Single Family' | 'Condo' | 'Townhouse' | 'Multi-Family'
  photos?: string[]
  description?: string
  daysOnMarket?: number
  pricePerSqft?: number
  openHouse?: {
    date: string
    startTime: string
    endTime: string
  }
  sourceUrl?: string
  source?: 'Zillow' | 'Homes.com' | 'Website'
  scrapedDate?: string
}

// ─── Neighborhood ──────────────────────────────────────────────────────────
export interface Neighborhood {
  _id: string
  name: string
  slug: { current: string }
  city: string
  state: string
  county: string
  shortDescription: string
  longDescription?: any[] // Portable text
  heroImage?: SanityImage
  galleryImages?: SanityImage[]
  stats?: {
    medianPrice?: number
    avgDom?: number
    activeListings?: number
    priceChangeYoY?: number
  }
  schools?: School[]
  highlights?: string[]
  metaTitle?: string
  metaDescription?: string
  order?: number
}

// ─── Blog Post ─────────────────────────────────────────────────────────────
export interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  body?: any[] // Portable text
  mainImage?: SanityImage
  author?: string
  publishedAt: string
  categories?: string[]
  readTime?: number
  metaTitle?: string
  metaDescription?: string
  featured?: boolean
}

// ─── Sanity ────────────────────────────────────────────────────────────────
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

// ─── Testimonial ───────────────────────────────────────────────────────────
export interface Testimonial {
  _id: string
  name: string
  text: string
  rating: number
  date?: string
  source?: 'google' | 'zillow' | 'realtor' | 'direct'
  transaction?: 'buyer' | 'seller' | 'both'
  neighborhood?: string
}

// ─── Site Settings ─────────────────────────────────────────────────────────
export interface SiteSettings {
  _id: string
  agentName: string
  agentTitle: string
  brokerage: string
  phone?: string
  email?: string
  address?: string
  licenseNumber?: string
  headshotUrl?: string
  bio?: any[]
  stats?: {
    totalTransactions: number
    totalVolume: string
    avgPrice: string
    yearsExperience: number
    rating: number
    reviewCount: number
  }
  socialLinks?: {
    instagram?: string
    facebook?: string
    linkedin?: string
    youtube?: string
  }
}

// ─── School ────────────────────────────────────────────────────────────────
export interface School {
  name: string
  level: 'Elementary' | 'Middle' | 'High' | 'Private'
  rating?: number
  distance?: string
}

// ─── Form ──────────────────────────────────────────────────────────────────
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
  source?: string
  neighborhood?: string
}

export interface HomeValueFormData {
  address: string
  city: string
  email: string
  phone?: string
  name: string
  timeline?: string
}
