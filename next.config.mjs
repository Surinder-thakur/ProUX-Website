/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* DESIGNERS: Add any new image domains here if you host assets elsewhere */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "proux.design",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
