'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}

// 9. next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
}
