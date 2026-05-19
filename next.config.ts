import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    /* Desktop: 1920, 2560, 3840 | Tablet: 1080, 1200 | Mobile: 640, 750, 828 */
    deviceSizes: [640, 750, 828, 1080, 1200, 1344, 1920, 2560, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [80, 90, 95],
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;
