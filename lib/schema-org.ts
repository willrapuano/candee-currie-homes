// Schema.org structured data generators

const AGENT_NAME = 'Candee Currie'
const BROKERAGE = "TTR Sotheby's International Realty"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://candeecurriehomes.com'

export function getRealEstateAgentSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    name: AGENT_NAME,
    description:
      "Candee Currie is a top-producing Associate Broker at TTR Sotheby's International Realty specializing in Arlington, McLean, Falls Church, and Alexandria VA real estate.",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/candee-currie-headshot.png`,
    telephone: '+17035550100',
    email: 'candee@candeecurriehomes.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1206 N Washington St',
      addressLocality: 'Alexandria',
      addressRegion: 'VA',
      postalCode: '22314',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 38.8816,
      longitude: -77.0910,
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
      url: 'https://www.ttrsir.com',
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
    image: post.mainImageUrl || `${SITE_URL}/images/og-default.jpg`,
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
        url: `${SITE_URL}/images/logo.png`,
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
