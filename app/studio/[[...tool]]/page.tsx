'use client'
/**
 * Sanity Studio embedded route
 * Access at: /studio (dev only — disable in production or add auth)
 */

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
