import type { NextConfig } from "next";

/** Applied to every response. No inline-script/style CSP here — Next injects
 *  both, and a nonce-based policy needs middleware; revisit if that's added. */
const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  reactCompiler: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Every value any <Image quality> uses must be listed or the optimizer 400s.
    qualities: [50, 65, 75, 80, 90],
    // Only first-party SVGs ship in /public; sandbox them anyway.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
