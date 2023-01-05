const isProd = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self' https://maps.googleapis.com/ vitals.vercel-insights.com; script-src 'self' https://maps.googleapis.com/; style-src 'self' 'unsafe-inline' fonts.googleapis.com; media-src 'self' https://res.cloudinary.com *.cdninstagram.com; font-src 'self' fonts.gstatic.com; img-src data: 'self' *.cdninstagram.com https://res.cloudinary.com  maps.gstatic.com *.googleapis.com *.ggpht.com",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Permissions-Policy',
    value: "camera=(), geolocation=*, microphone=()",
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return isProd ? [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ] : [];
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'cloudinary',
    path: 'https://res.cloudinary.com/dx2vbnmiz/image/upload',
    domains: ['res.cloudinary.com']
  },
  i18n: {
    locales: ['en', 'ru', 'ka'],
    defaultLocale: 'en',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig);
