import { groq } from 'next-sanity'

// ─── Blog Posts ────────────────────────────────────────────────────────────
export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage {
      asset-> { url }
    },
    publishedAt,
    categories,
    readTime,
    featured,
    metaTitle,
    metaDescription
  }
`

export const FEATURED_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage {
      asset-> { url }
    },
    publishedAt,
    categories,
    readTime
  }
`

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    body,
    mainImage {
      asset-> { url }
    },
    publishedAt,
    categories,
    readTime,
    metaTitle,
    metaDescription
  }
`

export const POST_SLUGS_QUERY = groq`
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`

// ─── Neighborhoods ─────────────────────────────────────────────────────────
export const ALL_NEIGHBORHOODS_QUERY = groq`
  *[_type == "neighborhood"] | order(order asc) {
    _id,
    name,
    slug,
    city,
    county,
    shortDescription,
    heroImage,
    stats,
    highlights,
    order
  }
`

export const NEIGHBORHOOD_QUERY = groq`
  *[_type == "neighborhood" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    city,
    state,
    county,
    shortDescription,
    longDescription,
    heroImage,
    galleryImages,
    stats,
    schools,
    highlights,
    metaTitle,
    metaDescription
  }
`

export const NEIGHBORHOOD_SLUGS_QUERY = groq`
  *[_type == "neighborhood" && defined(slug.current)] { "slug": slug.current }
`

// ─── Site Settings ─────────────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    _id,
    agentName,
    agentTitle,
    brokerage,
    phone,
    email,
    address,
    licenseNumber,
    headshotUrl,
    bio,
    stats,
    socialLinks
  }
`

// ─── Testimonials ──────────────────────────────────────────────────────────
export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    name,
    text,
    rating,
    date,
    source,
    transaction,
    neighborhood
  }
`

// ─── Seller Guides ─────────────────────────────────────────────────────────
export const ALL_SELLER_GUIDES_QUERY = groq`
  *[_type == "sellerGuide"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    priority,
    category,
    cta,
    targetKeyword,
    metaTitle,
    metaDescription
  }
`

export const SELLER_GUIDE_QUERY = groq`
  *[_type == "sellerGuide" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    content,
    faqSection,
    cta,
    icon,
    priority,
    category,
    targetKeyword,
    metaTitle,
    metaDescription,
    schemaType,
    internalLinks[]-> {
      _id,
      title,
      slug
    }
  }
`

export const SELLER_GUIDE_SLUGS_QUERY = groq`
  *[_type == "sellerGuide" && defined(slug.current)] { "slug": slug.current }
`

export const RELATED_SELLER_GUIDES_QUERY = groq`
  *[_type == "sellerGuide" && slug.current != $currentSlug && category == $category] | order(order asc) [0...3] {
    _id,
    title,
    slug,
    shortDescription,
    icon
  }
`
