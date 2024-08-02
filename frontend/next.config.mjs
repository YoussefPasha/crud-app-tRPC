/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.2",
        port: "9444",
      },
    ],
  },
};

export default nextConfig;
