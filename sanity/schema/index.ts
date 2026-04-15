import { postSchema } from './post'
import { neighborhoodSchema } from './neighborhood'
import { testimonialSchema } from './testimonial'
import { siteSettingsSchema } from './siteSettings'
import { sellerGuideSchema } from './sellerGuide'
import { marketHubSchema } from './marketHub'
import { neighborhoodSellerPageSchema } from './neighborhoodSellerPage'
import { proofPageSchema } from './proofPage'
import { faqItemSchema } from './objects/faqItem'
import { ctaObjectSchema } from './objects/ctaObject'
import { tableSchema } from './blocks/table'
import { accordionSchema } from './blocks/accordion'
import { calloutSchema } from './blocks/callout'
import { dividerSchema } from './blocks/divider'
import { internalLinkSchema } from './blocks/internalLink'

export const schemaTypes = [
  // Documents
  postSchema,
  neighborhoodSchema,
  testimonialSchema,
  siteSettingsSchema,
  sellerGuideSchema,
  marketHubSchema,
  neighborhoodSellerPageSchema,
  proofPageSchema,
  // Objects
  faqItemSchema,
  ctaObjectSchema,
  // Blocks
  tableSchema,
  accordionSchema,
  calloutSchema,
  dividerSchema,
  internalLinkSchema,
]
