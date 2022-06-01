const ContentSecurityPolicy = `
  default-src https://m.media-amazon.com/ 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' 'unsafe-eval';
  img-src https://m.media-amazon.com/ 'self';
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
    domains: ['m.media-amazon.com'],
  }
};
