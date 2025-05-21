/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/logs',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;