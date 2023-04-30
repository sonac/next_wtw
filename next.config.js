const ContentSecurityPolicy = `
  default-src https://m.media-amazon.com/images/M/ http://assets.fanart.tv/ https://images.igdb.com/ https://api-cdn.myanimelist.net/ 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' 'unsafe-eval';
  img-src 'self' blob: data: https://m.media-amazon.com http://assets.fanart.tv/ https://images.igdb.com/ https://global-uploads.webflow.com/ http://books.google.com/ https://api-cdn.myanimelist.net/;
`; 

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

/** @type {import('next').NextConfig} */
module.exports = {
   
  async rewrites() {
    return [
      {
        source: '/api/:path',
        destination: 'http://localhost:8080/:path',
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)",
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
    domains: ['m.media-amazon.com', 'assets.fanart.tv'],
  }
};
