import { groq } from 'next-sanity'

// ─── Blog Posts ────────────────────────────────────────────────────────────
export const ALL_POSTS_QUERY = groq`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
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
    slug,
    excerpt,
    mainImage,
    publishedAt,
    categories,
    readTime
  }
`

export const POST_QUERY = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    body,
    mainImage,
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
