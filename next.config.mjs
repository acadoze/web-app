/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_BASE: process.env.NEXT_PUBLIC_BASE_API
  }
};

export default nextConfig;
