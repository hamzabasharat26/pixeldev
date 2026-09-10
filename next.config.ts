import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Every value any <Image quality> uses must be listed or the optimizer 400s.
    qualities: [50, 65, 75, 80, 90],
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
