/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com'
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com'
      }
    ]
  },
  experimental: {
    serverActions: true
  }
};

export default nextConfig;
