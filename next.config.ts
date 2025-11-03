/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/productApp' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/productApp/' : '',
  // Добавляем эту настройку
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;