import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: process.env.NODE_ENV === "development",
    qualities: [75, 85],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  async rewrites() {
    const r2Url = process.env.R2_PUBLIC_URL || "https://pub-a7f38d05664e425c94818a8f29c366b9.r2.dev";
    return [
      {
        source: "/media/:path*",
        destination: `${r2Url}/:path*`,
      },
    ];
  },
};

export default nextConfig;
