// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  transpilePackages: ['@radix-ui/react-slot', 'lucide-react'],
  experimental: {
    typedRoutes: true,
  },
}

export default nextConfig;