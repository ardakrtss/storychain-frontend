/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true
  },
  // Netlify için ek ayarlar
  output: 'standalone',
  poweredByHeader: false
}

module.exports = nextConfig
