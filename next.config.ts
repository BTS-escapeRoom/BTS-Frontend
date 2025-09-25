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
  images: {
    domains: ['i.postimg.cc', 'losttemple2.co.kr'],
    // formats: ['image/avif','image/webp'], // 선택
  },
}

export default nextConfig
