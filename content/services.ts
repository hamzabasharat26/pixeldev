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
 * Order matters — this array drives the homepage bento and the /services page.
 * Vision + AI lead (featured/wide) because that's the real portfolio.
 * Slugs are load-bearing: footer anchors, serviceJsonLd, /services#<slug>.
 */
export const services: Service[] = [
  {
    slug: "vision",
    index: "01",
    icon: "vision",
    title: "Computer Vision",
    headline: "Turn a camera feed into decisions.",
    summary:
      "Detection, tracking, measurement, segmentation, OCR and anomaly detection — built for messy real-world footage, not the demo reel.",
    tags: ["PyTorch", "YOLO", "OpenCV"],
    featured: true,
    deepTitle: "Systems that see, measure, and decide.",
    deepBody: [
      "We've shipped vision systems for racket-sport tracking, garment quality control, rail-track monitoring, dock turnaround, defect detection and LiDAR lane detection — deployed as web services, desktop apps, and on-device at the edge.",
      "Demo accuracy and production accuracy are different problems. We build for the second: bad lighting, awkward angles, motion blur, and the edge cases that only show up on a real line.",
    ],
    whatYouGet: [
      "A trained model with honest accuracy numbers on your data",
      "Deployment as a service, an app, or on edge hardware",
      "A retraining path as your data grows",
      "Clear reporting on where the model fails, not just where it works",
    ],
    deepTags: ["PyTorch", "YOLO", "OpenCV", "Detectron2", "TensorRT", "ONNX", "Edge AI"],
  },
  {
    slug: "ai",
    index: "02",
    icon: "ai",
    title: "AI & Automation",
    headline: "AI that answers from your data — and shows its sources.",
    summary:
      "RAG assistants, LLM agents, OCR extraction and workflow automation, grounded in your documents and wired into the tools your team already uses.",
    tags: ["LangChain", "RAG", "Python"],
    featured: true,
    deepTitle: "Grounded AI, not a chatbot demo.",
    deepBody: [
      "We build retrieval-grounded assistants that answer only from verified internal documents and cite the source, agents that clear repetitive inbound work, and automations that move data between systems. On-premise when the data can't leave the building.",
      "We're deliberate about where AI belongs. If a rule-based automation is more reliable and a tenth of the cost, you'll hear that instead of a pitch for a model.",
    ],
    whatYouGet: [
      "An assistant or agent grounded in your own content",
      "Source citations and human-in-the-loop controls",
      "Automations across your existing tools",
      "A clear cost-per-query so nothing surprises you",
    ],
    deepTags: ["LangChain", "FAISS", "LLMs", "RAG", "n8n", "FastAPI", "Python"],
  },
  {
    slug: "web",
    index: "03",
    icon: "web",
    title: "Web Platforms",
    headline: "Web platforms that carry real traffic.",
    summary:
      "Production sites, dashboards and web apps in Next.js and React — server-rendered where it counts, measured against Core Web Vitals before they ship.",
    tags: ["Next.js", "React", "TypeScript"],
    featured: false,
    deepTitle: "Not just landing pages.",
    deepBody: [
      "We build marketing sites, dashboards, portals and full web applications on Next.js and React — the same stack that powers this site. Server-rendered where it matters, static where it doesn't, and profiled before launch.",
      "Speed isn't a finishing touch. It's a day-one architecture decision, because a fast site converts better, ranks better, and costs less to run.",
    ],
    whatYouGet: [
      "A production Next.js codebase you own outright",
      "Core Web Vitals passing on mobile",
      "SEO structure, sitemaps and schema built in",
      "A content layer so you can edit copy without us",
    ],
    deepTags: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "PostgreSQL", "Supabase"],
  },
  {
    slug: "mobile",
    index: "04",
    icon: "mobile",
    title: "Mobile Apps",
    headline: "One codebase. Both app stores.",
    summary:
      "iOS and Android products in React Native and Flutter, backed by a documented API and an architecture you can build on for years.",
    tags: ["React Native", "Flutter", "REST/GraphQL"],
    featured: false,
    deepTitle: "Cross-platform, native feel.",
    deepBody: [
      "We build cross-platform mobile apps with React Native and Flutter — one team, shared logic, native feel. Push, offline, payments and auth are standard, not add-ons.",
      "We handle the unglamorous parts too: store listings, review submissions, versioning and crash reporting, so launch day isn't the first time anyone thinks about them.",
    ],
    whatYouGet: [
      "iOS and Android from one codebase",
      "App Store and Play Store submission handled",
      "Analytics and crash reporting wired in from day one",
      "A documented API your app talks to",
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
      "Research and flows through to accessible, high-fidelity UI and a design system your developers can build against.",
    tags: ["Figma", "Design systems", "WCAG"],
    featured: false,
    deepTitle: "From research to a handoff-ready system.",
    deepBody: [
      "We design from research through to a documented system: user flows, wireframes, high-fidelity screens, every state, and a component library — so developers build what was designed.",
      "Accessibility is decided in Figma, not retrofitted: contrast, focus states, touch targets and keyboard paths, before they get expensive.",
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
      "Secure, automated environments on AWS, Vercel and Docker with CI/CD — so your product ships often and stays up.",
    tags: ["AWS", "Docker", "CI/CD"],
    featured: false,
    deepTitle: "Infrastructure you never have to think about.",
    deepBody: [
      "We set up environments that deploy themselves: containerised services, automated pipelines, staging that mirrors production, and monitoring that warns you before your users do.",
      "A single Vercel project or a multi-service AWS setup — whichever your workload actually needs. We won't over-engineer it to look impressive.",
    ],
    whatYouGet: [
      "A CI/CD pipeline from commit to production",
      "A staging environment that matches production",
      "Backups, monitoring and alerting configured",
      "Documentation your next developer can follow",
    ],
    deepTags: ["AWS", "Vercel", "Docker", "GitHub Actions", "Cloudflare"],
  },
];
