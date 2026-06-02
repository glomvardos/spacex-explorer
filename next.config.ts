import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
    },
  },
  images: {
    remotePatterns: [
      {
        hostname: 'images2.imgbox.com',
        protocol: 'https',
      },
      {
        hostname: '*.staticflickr.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
