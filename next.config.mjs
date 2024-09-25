/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
