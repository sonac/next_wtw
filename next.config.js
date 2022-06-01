/** @type {import('next').NextConfig} */
module.exports = {
  /*async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://localhost:8080/:path',
      }
    ]
  },*/
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    SERVER: process.env.SERVER,
  },
  images: {
    domains: ['m.media-amazon.com'],
  }
};
