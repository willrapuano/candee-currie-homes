import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Candee Currie Homes',
    short_name: 'Candee Currie',
    description: 'Northern Virginia real estate guidance from Candee Currie, Associate Broker at Corcoran McEnearney.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#181716',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  }
}
