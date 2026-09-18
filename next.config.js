const path = require("path");

const SUPABASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  ""
).replace(/\/$/, "");

const MEDIA_BUCKET =
  process.env.NEXT_PUBLIC_SUPABASE_MEDIA_BUCKET ||
  process.env.SUPABASE_MEDIA_BUCKET ||
  "portfolio";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.5"],
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async rewrites() {
    if (!SUPABASE_URL) return [];
    return [
      {
        source: "/media/:path*",
        destination: `${SUPABASE_URL}/storage/v1/object/public/${MEDIA_BUCKET}/:path*`,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/VIDEO/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/media/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
