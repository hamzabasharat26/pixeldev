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

  /**
   * HOUSE STYLE (applies to every string in this file and every other content
   * file): no em dashes. Use a comma, a colon, a full stop, or rewrite the
   * sentence. The client asked for this specifically, and it is the single
   * fastest way to stop marketing copy reading as machine-written.
   */

  /** Lead line: hero sub, meta description base, OG description, JSON-LD. */
  positioning:
    "An AI and computer vision studio with the full stack team to ship it.",
  /** Hero brand line. "ordinary" renders as <em> (serif italic). */
  tagline: "We are more than ordinary.",
  /** The commitment line. Closing sections, contact, footer. */
  promise: "We deliver what we commit.",

  /** app/layout.tsx metadata reads these. Do not hardcode there. */
  metaTitle: "Pixel Dev Solutions | AI & Computer Vision Studio",
  metaTitleTemplate: "%s | Pixel Dev Solutions",
  // Kept under ~155 characters so Google shows it whole instead of cutting it.
  metaDescription:
    "We build production computer vision and AI systems: detection, tracking, quality control, OCR and RAG assistants, plus the web and cloud stack to run them.",
  keywords: [
    "computer vision development company",
    "AI development studio",
    "object detection and tracking",
    "automated visual quality control",
    "RAG and LLM application development",
    "OCR and document extraction",
    "machine learning engineering",
    "custom software development",
    "Next.js development agency",
    "software house in Lahore Pakistan",
  ],

  email: "pixeldevsolutions@gmail.com",
  phoneDisplay: "+92 304070719",
  phoneHref: "tel:+92304070719",
  whatsapp: "https://wa.me/92304070719",

  locationShort: "Lahore, Pakistan. Working with clients worldwide.",
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
    { value: "10+", label: "AI systems running in production" },
    { value: "1st", label: "IEEE Hackathon win for Dock Vision AI" },
    { value: "3-8 wk", label: "from brief to live system" },
    { value: "24h", label: "median reply to a new enquiry" },
  ],

  /**
   * Proof band — claims we can defend today, each mapped to a real project.
   * TODO(owner): confirm the MagicQC throughput/accuracy figures below.
   */
  proof: [
    {
      value: "1 camera",
      label:
        "RallyLens reads ball speed, bounces and wall-target accuracy from one phone-grade camera. No rig, no wearables.",
    },
    {
      value: "500+ / shift",
      label:
        "MagicQC measures over 500 garments a shift at 90%+ accuracy, checked against each brand's own tolerance table.", // source: LinkedIn, owner to confirm
    },
    {
      value: "1st place",
      label:
        "Dock Vision AI won an IEEE Hackathon, then went straight into production on a live loading bay.",
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
