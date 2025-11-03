/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath:
    process.env.NODE_ENV === 'production' ? '/НАЗВАНИЕ_РЕПОЗИТОРИЯ' : '',
  assetPrefix:
    process.env.NODE_ENV === 'production' ? '/НАЗВАНИЕ_РЕПОЗИТОРИЯ/' : '',
  // Добавляем эту настройку
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

module.exports = nextConfig;