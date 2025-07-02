/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'png.pngtree.com',
      },
      {
        protocol:"https",
        hostname:'fakestoreapi.com'
      },
      {
        protocol:"https",
        hostname:'cdn.dummyjson.com'
      }
    ],
  },
};

module.exports = nextConfig;
