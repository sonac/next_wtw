const ContentSecurityPolicy = `
  default-src https://m.media-amazon.com/images/M/ 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' 'unsafe-eval';
  img-src https://m.media-amazon.com/images/M/ 'self';
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: `default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;`, 
    //ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

/** @type {import('next').NextConfig} */
module.exports = {
  /*
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://localhost:8080/:path',
      }
    ]
  },*/
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    SERVER: process.env.SERVER,
  },
  images: {
    domains: ['https://m.media-amazon.com/images/M/'],
  }
};
