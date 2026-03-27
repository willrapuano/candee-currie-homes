/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/value',
        destination: '/home-value',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.brightmls.com',
      },
      {
        protocol: 'https',
        hostname: 'api.repliers.io',
      },
      {
        protocol: 'https',
        hostname: '**.repliers.io',
      },
    ],
  },
}

export default nextConfig
