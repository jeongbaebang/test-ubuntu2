import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ['www.chokoppang.com', 'chokoppang.com'],
    },
  },
};

export default nextConfig;
