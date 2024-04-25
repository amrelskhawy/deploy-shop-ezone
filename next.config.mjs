/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "ik.imagekit.io",
        port: '',
        pathname: '/a01bjbmceb/**'
      }
    ]
  }
};

export default nextConfig;
