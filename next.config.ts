/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/my-product-app' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/my-product-app/' : '',
};

module.exports = nextConfig;