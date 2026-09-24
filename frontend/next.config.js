/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
      },
      {
        protocol: 'https',
        hostname: 'www.utfpr.edu.br',
      },
    ],
  },
  allowedDevOrigins: ["192.168.19.15:3000", "localhost:3000"],
};

module.exports = nextConfig;
