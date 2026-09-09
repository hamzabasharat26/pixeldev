/**
 * Single source of truth for company facts.
 * Every phone / email / domain / address reference in the app imports from
 * here — never hardcode a contact string in a component.
 *
 * Locked facts (do not "correct" or reformat):
 *   phone displays as "+92 304070719", links as "tel:+92304070719".
 */

export const site = {
  name: "Pixel Dev Solutions",
  shortName: "PixelDev",
  domain: "pixeldevsolutions.tech",
  url: "https://pixeldevsolutions.tech",

  positioning: "Software studio — web, mobile & AI, engineered end-to-end",
  tagline: "Web, mobile & AI — engineered end-to-end.",

  email: "pixeldevsolutions@gmail.com",
  phoneDisplay: "+92 304070719",
  phoneHref: "tel:+92304070719",
  whatsapp: "https://wa.me/92304070719",

  locationShort: "Pakistan · Working with clients worldwide",
  address: {
    line1: "Al Kabir Group Heights",
    line2: "Office 302",
    city: "Lahore",
    country: "Pakistan",
  },
  responseTime: "Within 24 hours",

  /**
   * Homepage stat bar. Honest-minimal — every value here is defensible today.
   * TODO(owner): raise "Products in production" and add real project/client
   * counts as the portfolio grows. Keep under-claiming until then.
   */
  stats: [
    { value: "6", label: "Core disciplines" },
    { value: "2", label: "Products in production" },
    { value: "24h", label: "Average reply time" },
    { value: "100%", label: "Code ownership handed over" },
  ],

  /**
   * Proof band — outcomes we can point to. Reframed around real work rather
   * than invented percentages.
   * TODO(owner): confirm the RallyLens / MagicQC figures before launch.
   */
  proof: [
    { value: "<40ms", label: "per-frame latency in the RallyLens tracking pipeline" },
    { value: "7 POMs", label: "measured live per garment in MagicQC, against brand tolerances" },
    { value: "1 team", label: "owns design, build and deployment on every project" },
  ],

  social: {
    // TODO(owner): add real profile URLs. Empty array is valid for JSON-LD sameAs.
    links: [] as string[],
  },
} as const;

/** Primary navigation (header + mobile drawer). */
export const primaryNav = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/** Footer link columns. Service anchors match /services section ids. */
export const footerNav = {
  Services: [
    { label: "Web Development", href: "/services#web" },
    { label: "Mobile Apps", href: "/services#mobile" },
    { label: "AI & Automation", href: "/services#ai" },
    { label: "Computer Vision", href: "/services#vision" },
    { label: "UI/UX Design", href: "/services#uiux" },
    { label: "Cloud & DevOps", href: "/services#cloud" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
} as const;

export type Site = typeof site;
