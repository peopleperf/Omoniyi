import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Reduce memory usage during build
    workerThreads: false,
    cpus: 1,
  },
  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
  // Skip static optimization for problematic pages
  output: 'standalone',
};

export default nextConfig;
