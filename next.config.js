/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  experimental: {
    typedRoutes: false
  },
  // Netlify için gerekli ayarlar
  async redirects() {
    return [];
  },
  async rewrites() {
    return [];
  }
}

module.exports = nextConfig
