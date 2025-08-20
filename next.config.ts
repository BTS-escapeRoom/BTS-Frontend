import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/theme',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
