const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self';
  child-src example.com;
  style-src 'self' example.com;
  font-src 'self';
  img-src * 'self' data:;
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

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
};
