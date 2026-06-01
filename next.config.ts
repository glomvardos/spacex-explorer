import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images2.imgbox.com',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
