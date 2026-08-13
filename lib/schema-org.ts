// Schema.org structured data generators

const AGENT_NAME = 'Candee Currie'
const BROKERAGE = 'Corcoran McEnearney'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export function getRealEstateAgentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: AGENT_NAME,
    description:
      'Candee Currie is a top-producing Associate Broker at Corcoran McEnearney specializing in Arlington, McLean, Falls Church, and Alexandria VA real estate.',
    url: SITE_URL,
    logo: `${SITE_URL}/icon.svg`,
    image: `${SITE_URL}/images/candee-currie-headshot.png`,
    telephone: '+17032036005',
    email: 'candee.currie@corcoranmce.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '3135 Langston Blvd',
      addressLocality: 'Arlington',
      addressRegion: 'VA',
      postalCode: '22201',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.8951,
      longitude: -77.0977,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Arlington',
        sameAs: 'https://en.wikipedia.org/wiki/Arlington_County,_Virginia',
      },
      {
        '@type': 'City',
        name: 'McLean',
        sameAs: 'https://en.wikipedia.org/wiki/McLean,_Virginia',
      },
      {
        '@type': 'City',
        name: 'Falls Church',
        sameAs: 'https://en.wikipedia.org/wiki/Falls_Church,_Virginia',
      },
      {
        '@type': 'City',
        name: 'Alexandria',
        sameAs: 'https://en.wikipedia.org/wiki/Alexandria,_Virginia',
      },
    ],
    memberOf: {
      '@type': 'Organization',
      name: BROKERAGE,
      url: 'https://corcoranmce.com',
    },
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Associate Broker',
      credentialCategory: 'Real Estate License',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '4',
      bestRating: '5',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [],
  }
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  }
}

export function getNeighborhoodSchema(neighborhood: {
  name: string
  slug: string
  shortDescription: string
  city: string
  state: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Homes for Sale in ${neighborhood.name}, ${neighborhood.state}`,
    description: neighborhood.shortDescription,
    url: `${SITE_URL}/neighborhoods/${neighborhood.slug}`,
    about: {
      '@type': 'Place',
      name: neighborhood.name,
      address: {
        '@type': 'PostalAddress',
        addressLocality: neighborhood.city,
        addressRegion: neighborhood.state,
        addressCountry: 'US',
      },
    },
  }
}

export function getBlogPostSchema(post: {
  title: string
  slug: string
  excerpt?: string
  publishedAt: string
  mainImageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || '',
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    // The old fallback pointed at /images/og-default.jpg, which does not exist in the
    // repo and returns 404 on the live site — so a post without a main image handed
    // Google a broken image URL. Omitting the property is better than asserting one
    // that 404s; Google drops the article rich result either way, but a missing field
    // is not a fetch error against the domain.
    ...(post.mainImageUrl ? { image: post.mainImageUrl } : {}),
    author: {
      '@type': 'Person',
      name: AGENT_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: `${AGENT_NAME} | ${BROKERAGE}`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.svg`,
      },
    },
  }
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
