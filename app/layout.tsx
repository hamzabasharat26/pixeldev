import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Inter,
  JetBrains_Mono,
  Fraunces,
} from "next/font/google";
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

/** One accent word per headline, italic. Not preloaded. */
const serif = Fraunces({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["400"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: METADATA_BASE,
  title: {
    default: site.metaTitle,
    template: site.metaTitleTemplate,
  },
  description: site.metaDescription,
  applicationName: site.name,
  keywords: [...site.keywords],
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
      // Native smooth scroll (Lenis removed). Next 16 reads this flag to
      // suppress the animation during route transitions.
      data-scroll-behavior="smooth"
      className={cn(
        display.variable,
        sans.variable,
        mono.variable,
        serif.variable,
      )}
    >
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <SkipLink />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
