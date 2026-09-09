import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/content/site";
import {
  METADATA_BASE,
  SITE_ORIGIN,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SkipLink } from "@/components/layout/SkipLink";
import { SmoothScroll } from "@/components/layout/SmoothScroll";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  preload: true,
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: "Pixel Dev Solutions — Web, Mobile & AI Software Development",
    template: "%s | Pixel Dev Solutions",
  },
  description:
    "Pixel Dev Solutions is a software studio building fast web platforms, mobile apps, and AI systems that deliver measurable results. Start your project today.",
  applicationName: site.name,
  keywords: [
    "software development company",
    "Next.js development agency",
    "mobile app development",
    "AI automation",
    "computer vision development",
    "custom software Pakistan",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    url: SITE_ORIGIN,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  // Per-page canonicals are set by each page's own metadata (lib/seo.pageMetadata).
};

export const viewport: Viewport = {
  themeColor: "#12294b",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(display.variable, sans.variable, mono.variable)}
    >
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SkipLink />
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
