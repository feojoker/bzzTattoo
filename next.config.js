const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: "default",
    domains: ["localhost", 'res.cloudinary.com'],
  },
  i18n: {
    locales: ['en', 'ru', 'ka'],
    defaultLocale: 'en',
  },
}

module.exports = withBundleAnalyzer(nextConfig);
