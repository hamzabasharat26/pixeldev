import type { Metadata } from "next";
import { site } from "@/content/site";

/** content/site.ts is the default; NEXT_PUBLIC_SITE_URL overrides it per env. */
export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_URL || site.url
).replace(/\/$/, "");

export const METADATA_BASE = new URL(SITE_ORIGIN);

type PageMetaInput = {
  title?: string;
  description: string;
  /** Path without domain, e.g. "/work" or "/". */
  path: string;
  /** Absolute or root-relative OG image. Defaults to the site OG route. */
  ogImage?: string;
  ogType?: "website" | "article";
};

/** Build a page's Metadata with canonical + OG + Twitter wired consistently. */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  ogType = "website",
}: PageMetaInput): Metadata {
  const canonical = path === "/" ? "/" : path.replace(/\/$/, "");
  const url = `${SITE_ORIGIN}${canonical === "/" ? "" : canonical}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: title ?? site.name,
      description,
      url,
      siteName: site.name,
      type: ogType,
      locale: "en_US",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? site.name,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/* ---------------------------------------------------------------- JSON-LD -- */

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: SITE_ORIGIN,
    email: site.email,
    telephone: "+92304070719",
    logo: `${SITE_ORIGIN}/opengraph-image`,
    description: site.positioning,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    sameAs: site.social.links,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: SITE_ORIGIN,
  };
}

export function serviceJsonLd(
  services: { title: string; summary: string; slug: string }[],
) {
  return services.map((s) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: s.title,
    description: s.summary,
    provider: { "@type": "Organization", name: site.name, url: SITE_ORIGIN },
    url: `${SITE_ORIGIN}/services#${s.slug}`,
  }));
}

export function creativeWorkJsonLd(project: {
  title: string;
  summary: string;
  slug: string;
  year: number;
  cover: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    abstract: project.summary,
    dateCreated: String(project.year),
    image: `${SITE_ORIGIN}${project.cover}`,
    url: `${SITE_ORIGIN}/work/${project.slug}`,
    creator: { "@type": "Organization", name: site.name, url: SITE_ORIGIN },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${item.path}`,
    })),
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
