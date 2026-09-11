import type { NextConfig } from "next";

/**
 * Content-Security-Policy: the static, no-nonce policy from the Next.js CSP
 * guide (node_modules/next/dist/docs/01-app/02-guides/content-security-policy.md).
 *
 * A nonce policy would force every page to render per request, giving up
 * static generation and CDN caching, for a marketing site with no accounts and
 * no user-generated content. What this policy still enforces: no plugins, no
 * <base> hijack, forms can only post to this origin, nothing can frame the
 * site, and every script, style, image, font and fetch comes from our own
 * origin. 'unsafe-inline' is needed for Next's inline bootstrap scripts when
 * there is no nonce.
 *
 * Production only: `next dev` needs eval and a websocket for fast refresh.
 * Heads-up: this also blocks the Vercel Toolbar on preview deployments.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // Only on Vercel. Over plain http://localhost (`next start`) this would try
  // to upgrade every asset to https and break local testing.
  ...(process.env.VERCEL ? ["upgrade-insecure-requests"] : []),
].join("; ");

const securityHeaders = [
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Content-Security-Policy", value: csp }]
    : []),
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Isolates the browsing context: a page we link to can't reach back into
  // ours through window.opener.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
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
      // "Work" was renamed "Portfolio". Keep every old link alive.
      { source: "/work", destination: "/portfolio", permanent: true },
      // One segment only, so /work/<slug>/<asset> in public/ is never caught.
      { source: "/work/:slug", destination: "/portfolio/:slug", permanent: true },
      { source: "/projects", destination: "/portfolio", permanent: true },
    ];
  },
};

export default nextConfig;
