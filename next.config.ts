import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75, 90],
    // Only first-party SVGs ship in /public; sandbox them anyway.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
