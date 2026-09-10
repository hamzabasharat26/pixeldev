export type Service = {
  slug: "web" | "mobile" | "ai" | "vision" | "uiux" | "cloud";
  index: string;
  icon: "web" | "mobile" | "ai" | "vision" | "uiux" | "cloud";
  title: string;
  /** One-line promise, used on the homepage card. */
  headline: string;
  /** ~2 lines, homepage card body. */
  summary: string;
  /** Homepage card capability tags (exactly 3). */
  tags: [string, string, string];
  /** Wide card on the homepage bento grid — the flagship pair. */
  featured: boolean;

  /* /services deep block */
  deepTitle: string;
  deepBody: [string, string];
  whatYouGet: [string, string, string, string];
  deepTags: string[];
};

/**
 * Order matters. This array drives the homepage grid and the /services page.
 * Vision + AI lead (featured) because that's the real portfolio.
 * Slugs are load-bearing: footer anchors, serviceJsonLd, /services#<slug>.
 *
 * HOUSE STYLE: no em dashes anywhere in these strings. See content/site.ts.
 */
export const services: Service[] = [
  {
    slug: "vision",
    index: "01",
    icon: "vision",
    title: "Computer Vision",
    headline: "Turn any camera into a decision you can act on.",
    summary:
      "Detection, tracking, measurement, segmentation, OCR and anomaly spotting, built for grainy real-world footage rather than a clean demo reel.",
    tags: ["PyTorch", "YOLO", "OpenCV"],
    featured: true,
    deepTitle: "Systems that see, measure, and decide.",
    deepBody: [
      "We have shipped vision systems for racket-sport tracking, garment quality control, rail-track monitoring, dock turnaround, defect detection and LiDAR lane detection. They run as web services, as desktop apps, and on-device at the edge.",
      "Demo accuracy and production accuracy are two different problems. We build for the second one: bad lighting, awkward angles, motion blur, and the edge cases that only ever show up on a real line.",
    ],
    whatYouGet: [
      "A trained model with honest accuracy numbers on your own footage",
      "Deployment as a service, an app, or on edge hardware at the line",
      "A retraining path that improves the model as your data grows",
      "Straight reporting on where it fails, not just where it wins",
    ],
    deepTags: ["PyTorch", "YOLO", "OpenCV", "Detectron2", "TensorRT", "ONNX", "Edge AI"],
  },
  {
    slug: "ai",
    index: "02",
    icon: "ai",
    title: "AI & Automation",
    headline: "AI that answers from your data and shows its sources.",
    summary:
      "Retrieval-grounded assistants, LLM agents, OCR extraction and workflow automation, tied to your documents and wired into the tools your team already opens every day.",
    tags: ["LangChain", "RAG", "Python"],
    featured: true,
    deepTitle: "Grounded AI, not a chatbot demo.",
    deepBody: [
      "We build assistants that answer only from your verified internal documents and cite the file they took it from, agents that clear repetitive inbound work, and automations that move data between systems. On-premise when the data cannot leave the building.",
      "We are deliberate about where AI belongs. If a rule-based automation is more reliable and a tenth of the cost, you will hear that instead of a pitch for a model.",
    ],
    whatYouGet: [
      "An assistant grounded in your own content, not the open internet",
      "A cited source on every answer, with a human in the loop",
      "Automations that run across the tools you already pay for",
      "A clear cost per query, so the bill never surprises you",
    ],
    deepTags: ["LangChain", "FAISS", "LLMs", "RAG", "n8n", "FastAPI", "Python"],
  },
  {
    slug: "web",
    index: "03",
    icon: "web",
    title: "Web Platforms",
    headline: "Web platforms built to carry real traffic.",
    summary:
      "Production sites, dashboards and web apps in Next.js and React. Server-rendered where it counts, and measured against Core Web Vitals before a single line goes live.",
    tags: ["Next.js", "React", "TypeScript"],
    featured: false,
    deepTitle: "Not just landing pages.",
    deepBody: [
      "We build marketing sites, dashboards, portals and full web applications on Next.js and React, the same stack that powers this site. Server-rendered where it matters, static where it does not, and profiled before launch.",
      "Speed is not a finishing touch. It is a day-one architecture decision, because a fast site converts better, ranks higher, and costs less to run.",
    ],
    whatYouGet: [
      "A production Next.js codebase you own outright, with no lock-in",
      "Core Web Vitals passing on a mid-range phone, not just on desktop",
      "SEO structure, sitemaps and schema markup built in from the start",
      "A content layer, so you can edit your own copy without calling us",
    ],
    deepTags: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
  },
  {
    slug: "mobile",
    index: "04",
    icon: "mobile",
    title: "Mobile Apps",
    headline: "One codebase. Both app stores. Native feel.",
    summary:
      "iOS and Android products in React Native and Flutter, backed by a documented API and an architecture you can keep building on for years.",
    tags: ["React Native", "Flutter", "REST/GraphQL"],
    featured: false,
    deepTitle: "Cross-platform, native feel.",
    deepBody: [
      "We build cross-platform mobile apps with React Native and Flutter: one team, shared logic, native feel. Push notifications, offline mode, payments and auth are standard here, not paid add-ons.",
      "We handle the unglamorous parts too. Store listings, review submissions, versioning and crash reporting, so launch day is not the first time anyone thinks about them.",
    ],
    whatYouGet: [
      "iOS and Android shipped from a single codebase",
      "App Store and Play Store submission handled end to end",
      "Analytics and crash reporting wired in from day one",
      "A documented API your app talks to, ready for the next feature",
    ],
    deepTags: ["React Native", "Flutter", "Expo", "Firebase", "REST", "GraphQL"],
  },
  {
    slug: "uiux",
    index: "05",
    icon: "uiux",
    title: "UI/UX Design",
    headline: "Design that survives contact with development.",
    summary:
      "Research and user flows through to accessible, high-fidelity screens and a design system your developers can actually build against.",
    tags: ["Figma", "Design systems", "WCAG"],
    featured: false,
    deepTitle: "From research to a handoff-ready system.",
    deepBody: [
      "We design from research through to a documented system: user flows, wireframes, high-fidelity screens, every empty and error state, and a component library. The result is that developers build what was designed.",
      "Accessibility gets decided in Figma rather than retrofitted later. Contrast, focus states, touch targets and keyboard paths, settled while they are still cheap to change.",
    ],
    whatYouGet: [
      "Research and user flows grounded in your real users",
      "High-fidelity screens covering every state, including the empty ones",
      "A component library and design tokens your team can extend",
      "WCAG AA contrast and interaction checks, verified not assumed",
    ],
    deepTags: ["Figma", "Design systems", "Prototyping", "WCAG 2.2 AA"],
  },
  {
    slug: "cloud",
    index: "06",
    icon: "cloud",
    title: "Cloud & DevOps",
    headline: "Infrastructure that scales quietly.",
    summary:
      "Secure, automated environments on AWS, Vercel and Docker with CI/CD, so your product ships often, recovers fast, and stays up.",
    tags: ["AWS", "Docker", "CI/CD"],
    featured: false,
    deepTitle: "Infrastructure you never have to think about.",
    deepBody: [
      "We set up environments that deploy themselves: containerised services, automated pipelines, a staging environment that mirrors production, and monitoring that warns you before your users do.",
      "A single Vercel project or a multi-service AWS setup, whichever your workload actually needs. We will not over-engineer it just to look impressive on a diagram.",
    ],
    whatYouGet: [
      "A CI/CD pipeline that runs from commit to production",
      "A staging environment that genuinely matches production",
      "Backups, monitoring and alerting configured and tested",
      "Documentation the next developer can actually follow",
    ],
    deepTags: ["AWS", "Vercel", "Docker", "GitHub Actions", "Cloudflare"],
  },
];
