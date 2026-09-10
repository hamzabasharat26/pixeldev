/**
 * Single source of truth for company facts + top-level SEO strings.
 * Every phone / email / domain / address reference in the app imports from
 * here — never hardcode a contact string (or the tagline / positioning line)
 * in a component or in app/layout.tsx.
 *
 * Locked facts (do not "correct" or reformat):
 *   phone displays as "+92 304070719", links as "tel:+92304070719".
 */

export const site = {
  name: "Pixel Dev Solutions",
  shortName: "PixelDev",
  domain: "pixeldevsolutions.tech",
  url: "https://pixeldevsolutions.tech",

  /** Lead line — hero sub, meta description base, OG description, JSON-LD. */
  positioning:
    "AI & computer-vision studio — with the full-stack team to ship it.",
  /** Hero brand line. "ordinary" renders as <em> (serif italic). */
  tagline: "We are more than ordinary.",

  /** app/layout.tsx metadata reads these — do not hardcode there. */
  metaTitle: "Pixel Dev Solutions — AI & Computer Vision Studio",
  metaTitleTemplate: "%s · Pixel Dev Solutions",
  metaDescription:
    "We build production AI and computer-vision systems — object detection, tracking, quality control, OCR, RAG and LLM apps — plus the web, mobile and cloud stack to run them. A small senior team in Pakistan, working with clients worldwide.",
  keywords: [
    "computer vision development",
    "AI development studio",
    "object detection",
    "RAG and LLM applications",
    "machine learning engineering",
    "Next.js development",
    "software studio Pakistan",
  ],

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
   * Homepage hero stat card. Honest-minimal — every value is defensible today.
   * Sourced from the LinkedIn company page unless noted.
   * TODO(owner): confirm each figure; raise as the portfolio grows.
   */
  stats: [
    { value: "10+", label: "AI systems in production" },
    { value: "1st", label: "IEEE Hackathon — Dock Vision AI" },
    { value: "3–8 wk", label: "brief to production" },
    { value: "24h", label: "median reply time" },
  ],

  /**
   * Proof band — claims we can defend today, each mapped to a real project.
   * TODO(owner): confirm the MagicQC throughput/accuracy figures below.
   */
  proof: [
    {
      value: "1 camera",
      label:
        "RallyLens tracks ball speed, bounces and wall-target accuracy from a single phone-grade camera",
    },
    {
      value: "500+ / shift",
      label:
        "MagicQC measures 500+ garments per shift at 90%+ accuracy against each brand's tolerance table", // source: LinkedIn — owner to confirm
    },
    {
      value: "1st place",
      label:
        "Dock Vision AI won an IEEE Hackathon and went into production",
    },
  ],

  social: {
    // TODO(owner): add real profile URLs. Empty array is valid for JSON-LD sameAs.
    links: ["https://www.linkedin.com/company/pixeldevsolutions"] as string[],
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Match the path exactly rather than by prefix — otherwise "/" is
   *  active on every route. */
  exact?: boolean;
};

/** Primary navigation (header + mobile drawer). */
export const primaryNav: NavItem[] = [
  { label: "Home", href: "/", exact: true },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** Footer link columns. Service anchors match /services section ids. */
export const footerNav = {
  Services: [
    { label: "Computer Vision", href: "/services#vision" },
    { label: "AI & Automation", href: "/services#ai" },
    { label: "Web Platforms", href: "/services#web" },
    { label: "Mobile Apps", href: "/services#mobile" },
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
