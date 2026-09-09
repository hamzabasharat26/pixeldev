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
  /** Wide card on the homepage bento grid. */
  featured: boolean;

  /* /services deep block */
  deepTitle: string;
  deepBody: [string, string];
  whatYouGet: [string, string, string, string];
  deepTags: string[];
};

export const services: Service[] = [
  {
    slug: "web",
    index: "01",
    icon: "web",
    title: "Web Development",
    headline: "Fast, scalable web platforms — not just landing pages.",
    summary:
      "Production-grade sites and web apps in Next.js, React, and Node.js, engineered for speed, SEO, and growth.",
    tags: ["Next.js", "React", "Node.js"],
    featured: true,
    deepTitle: "Web platforms built to carry real traffic.",
    deepBody: [
      "We build marketing sites, dashboards, portals, and full web applications on Next.js and React — the same stack that powers this site. Every build is server-rendered where it matters, statically generated where it doesn't, and measured against Core Web Vitals before it ships.",
      "Speed isn't a feature we add at the end. It's an architectural decision we make on day one, because a fast site converts better, ranks better, and costs less to run.",
    ],
    whatYouGet: [
      "Production-ready Next.js codebase you own",
      "Core Web Vitals passing on mobile",
      "SEO structure, sitemaps, and schema built in",
      "CMS or content layer so you can update copy yourself",
    ],
    deepTags: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL"],
  },
  {
    slug: "mobile",
    index: "02",
    icon: "mobile",
    title: "Mobile App Development",
    headline: "Cross-platform apps that feel native.",
    summary:
      "iOS and Android products with React Native and Flutter, backed by reliable APIs and clean architecture you can build on for years.",
    tags: ["React Native", "Flutter", "REST/GraphQL"],
    featured: true,
    deepTitle: "One codebase. Both app stores.",
    deepBody: [
      "We build cross-platform mobile apps with React Native and Flutter — native feel, shared logic, and a single team maintaining it instead of two. Push notifications, offline support, payments, and auth are standard, not add-ons.",
      "We also handle the unglamorous parts: store listings, review submissions, versioning, and crash reporting, so launch day isn't the first time anyone thinks about them.",
    ],
    whatYouGet: [
      "iOS + Android from one codebase",
      "App Store and Play Store submission handled",
      "Analytics and crash reporting wired in",
      "A documented API your app talks to",
    ],
    deepTags: ["React Native", "Flutter", "Expo", "Firebase", "REST", "GraphQL"],
  },
  {
    slug: "ai",
    index: "03",
    icon: "ai",
    title: "AI & Automation",
    headline: "Put AI to work on real workflows.",
    summary:
      "Custom AI agents, RAG chatbots, and automations that connect your existing tools, answer from your own data, and remove repetitive busywork.",
    tags: ["OpenAI", "LangChain", "n8n"],
    featured: false,
    deepTitle: "AI that does work, not demos.",
    deepBody: [
      "We build AI systems grounded in your own data — RAG chatbots that answer from your documentation, agents that handle repetitive inbound requests, and automations that move information between the tools your team already uses.",
      "We're deliberate about where AI belongs. If a rule-based automation solves it more reliably and for a tenth of the cost, we'll tell you that instead of selling you a model.",
    ],
    whatYouGet: [
      "Custom chatbot or agent trained on your content",
      "Workflow automations across your existing tools",
      "Human-in-the-loop controls and audit logging",
      "Clear cost-per-query so nothing surprises you",
    ],
    deepTags: ["OpenAI", "Anthropic", "LangChain", "n8n", "Vector DBs", "Python"],
  },
  {
    slug: "vision",
    index: "04",
    icon: "vision",
    title: "Computer Vision",
    headline: "Turn pixels into decisions.",
    summary:
      "Detection, tracking, measurement, and OCR systems that hit production accuracy — not just demo accuracy.",
    tags: ["OpenCV", "PyTorch", "Python"],
    featured: false,
    deepTitle: "Systems that see, measure, and decide.",
    deepBody: [
      "We develop computer vision applications for detection, classification, tracking, measurement, and OCR — deployed as web services, desktop applications, or on-device.",
      "Demo accuracy and production accuracy are different problems. We build for the second one: messy lighting, imperfect angles, real hardware, and the edge cases that only show up in the field.",
    ],
    whatYouGet: [
      "Trained model with documented accuracy on your data",
      "Deployment as a service, app, or embedded system",
      "A retraining pipeline as your data grows",
      "Honest reporting on where the model fails",
    ],
    deepTags: ["OpenCV", "PyTorch", "YOLO", "Python", "ONNX"],
  },
  {
    slug: "uiux",
    index: "05",
    icon: "uiux",
    title: "UI/UX Design",
    headline: "Interfaces people actually want to use.",
    summary:
      "Research and wireframes through to polished, accessible UI and a design system your developers can build against.",
    tags: ["Figma", "Design systems", "WCAG"],
    featured: false,
    deepTitle: "Design that survives contact with development.",
    deepBody: [
      "We design interfaces from research through to a handoff-ready system: user flows, wireframes, high-fidelity screens, states, and components — documented so developers build what was designed.",
      "Accessibility is part of the design phase, not a retrofit. Contrast, focus states, touch targets, and keyboard paths are decided in Figma, before they become expensive.",
    ],
    whatYouGet: [
      "Research and user flows",
      "High-fidelity screens for every state",
      "A component library and design tokens",
      "WCAG AA contrast and interaction checks",
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
      "Secure, automated cloud environments on AWS, Vercel, and Docker with CI/CD, so your product ships often and stays up.",
    tags: ["AWS", "Docker", "CI/CD"],
    featured: false,
    deepTitle: "Infrastructure you never have to think about.",
    deepBody: [
      "We set up cloud environments that deploy themselves: containerized services, automated pipelines, staging that mirrors production, and monitoring that tells you about a problem before your users do.",
      "Whether that's a single Vercel project or a multi-service AWS setup depends on what you actually need — we won't over-engineer infrastructure to look impressive.",
    ],
    whatYouGet: [
      "CI/CD pipeline from commit to production",
      "Staging environment that matches production",
      "Backups, monitoring, and alerting configured",
      "Documentation your future developer can follow",
    ],
    deepTags: ["AWS", "Vercel", "Docker", "GitHub Actions", "Cloudflare"],
  },
];
