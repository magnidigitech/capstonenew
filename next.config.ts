import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removing 'standalone' to ensure .next/static is served correctly on shared hosting
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "logo.clearbit.com" },
    ],
  },
};

export default nextConfig;
