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
  experimental: {
    typedRoutes: false
  },
  // TypeScript'i tamamen devre dışı bırak
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Netlify için ek ayarlar
  output: 'standalone',
  poweredByHeader: false
}

module.exports = nextConfig
