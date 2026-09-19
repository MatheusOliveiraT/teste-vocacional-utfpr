/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Desativa a verificação estrita do TypeScript ao subir o dev bundler
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;