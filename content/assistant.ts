import { faqs } from "./faq";
import { processSteps } from "./process";
import { projects, type Project } from "./projects";
import { services, type Service } from "./services";
import { aboutStory } from "./values";
import { site } from "./site";

/**
 * What Pixel AI is allowed to say.
 *
 * Every answer is composed from the content this site already publishes, so
 * the assistant cannot drift from the pages, invent a client, a price or a
 * result, or answer for anything the studio has not put in writing. Anything
 * it cannot match goes to the team instead.
 *
 * HOUSE STYLE: no em dashes. See content/site.ts.
 */

export type AssistantLink = { label: string; href: string };

export type AssistantTopic = {
  id: string;
  /** Starter chip, and the question a visitor is taken to have asked. */
  chip: string;
  /** Extra words a visitor might use. The chip's own words match too. */
  keywords: string[];
  answer: string[];
  links?: AssistantLink[];
  /** Ids of the next questions offered under the answer, so a chat can flow. */
  follow?: string[];
};

const byslug = Object.fromEntries(services.map((s) => [s.slug, s])) as Record<
  Service["slug"],
  Service
>;
const project = Object.fromEntries(projects.map((p) => [p.slug, p])) as Record<string, Project>;

/** Looked up rather than copied, so editing content/faq.ts edits the answer. */
const faq = (match: RegExp) => faqs.find((f) => match.test(f.question))?.answer;

const step = (n: string) => processSteps.find((s) => s.n === n);

const serviceTopic = (
  slug: Service["slug"],
  id: string,
  chip: string,
  keywords: string[],
  follow: string[],
): AssistantTopic => {
  const s = byslug[slug];
  return {
    id,
    chip,
    keywords,
    answer: [s.headline, s.summary, s.deepBody[1]],
    links: [
      { label: s.title, href: `/services#${s.slug}` },
      { label: "See the work", href: "/portfolio" },
    ],
    follow,
  };
};

/** A case study, told the way the site tells it: problem, build, result. */
const projectTopic = (
  slug: string,
  chip: string,
  keywords: string[],
  follow: string[],
): AssistantTopic => {
  const p = project[slug];
  return {
    id: slug,
    chip,
    keywords,
    answer: [p.summary, p.solution, `${p.outcome.value}: ${p.outcome.label}.`],
    links: [
      { label: `Read the ${p.title} case study`, href: `/portfolio/${p.slug}` },
      { label: "Start a project", href: "/contact" },
    ],
    follow,
  };
};

export const assistantTopics: AssistantTopic[] = [
  {
    id: "build",
    chip: "What do you build?",
    keywords: ["build", "make", "services", "offer", "capabilities", "specialise", "specialize", "what do you do", "kaam"],
    answer: [
      `${site.positioning} We build the vision and AI systems, then the web, mobile and cloud work that puts them in front of the people who use them.`,
      `Six disciplines: ${services.map((s) => s.title).join(", ")}.`,
    ],
    links: [{ label: "See services", href: "/services" }],
    follow: ["vision", "ai", "shipped"],
  },
  serviceTopic("vision", "vision", "Computer vision", [
    "vision", "camera", "detect", "detection", "tracking", "track", "ocr", "segmentation",
    "measure", "measurement", "inspection", "defect", "yolo", "opencv", "image", "video", "cctv",
  ], ["magicqc", "dock-vision-ai", "cost"]),
  serviceTopic("ai", "ai", "AI and RAG assistants", [
    "rag", "llm", "chatbot", "assistant", "agent", "automation", "langchain", "gpt",
    "documents", "knowledge base", "automate", "openai",
  ], ["nexus-rag-assistant", "stack", "start"]),
  serviceTopic("web", "web", "Web platforms", [
    "web", "website", "site", "nextjs", "next.js", "react", "dashboard", "portal", "frontend", "backend",
  ], ["cost", "timeline", "start"]),
  serviceTopic("mobile", "mobile", "Mobile apps", [
    "mobile", "app", "ios", "android", "react native", "flutter", "play store", "app store",
  ], ["cost", "timeline", "start"]),
  serviceTopic("uiux", "design", "Design", [
    "design", "ux", "figma", "wireframe", "accessibility", "wcag", "design system", "branding", "prototype",
  ], ["process", "cost", "start"]),
  serviceTopic("cloud", "cloud", "Cloud and DevOps", [
    "cloud", "devops", "aws", "docker", "pipeline", "infrastructure", "hosting", "deploy", "deployment", "vercel", "scaling", "edge",
  ], ["stack", "support", "start"]),
  {
    id: "shipped",
    chip: "Has any of it shipped?",
    keywords: ["shipped", "production", "live", "real", "proof", "results", "evidence", "actually", "working", "case study"],
    answer: [
      "Yes. Everything on the site is work that runs, and each claim is tied to the project behind it.",
      ...site.proof.map((p) => `${p.value}: ${p.label}`),
      "Client names stay confidential unless the client has cleared them, so the write-ups describe the problem and the system rather than the logo.",
    ],
    links: [{ label: "See the portfolio", href: "/portfolio" }],
    follow: ["magicqc", "dock-vision-ai", "work"],
  },
  {
    id: "work",
    chip: "Show me the work",
    keywords: ["work", "projects", "portfolio", "examples", "built", "case studies", "showcase", "clients"],
    answer: [
      "Every project has its own write-up: the problem, what we built, and what changed.",
      `${projects.length} are published, across ${[...new Set(projects.map((p) => p.category))].join(", ")}.`,
      "The flagships are MagicQC, Dock Vision AI, RallyLens and Safe Rail.",
    ],
    links: [{ label: "Open the portfolio", href: "/portfolio" }],
    follow: ["magicqc", "rallylens", "safe-rail"],
  },
  projectTopic("magicqc", "MagicQC, garment QC", [
    "magicqc", "magic qc", "garment", "textile", "apparel", "quality control", "qc", "factory", "tolerance", "measurement station",
  ], ["dock-vision-ai", "cost", "start"]),
  projectTopic("dock-vision-ai", "Dock Vision AI", [
    "dock", "vision ai", "truck", "loading", "logistics", "yard", "turnaround", "warehouse", "hackathon", "ieee",
  ], ["magicqc", "safe-rail", "start"]),
  projectTopic("rallylens", "RallyLens, sports tracking", [
    "rallylens", "rally", "sport", "sports", "padel", "squash", "tennis", "ball", "coach", "player tracking",
  ], ["magicqc", "vision", "start"]),
  projectTopic("safe-rail", "Safe Rail, track monitoring", [
    "safe rail", "rail", "railway", "train", "track", "ballast", "infrastructure monitoring",
  ], ["dock-vision-ai", "vision", "start"]),
  projectTopic("nexus-rag-assistant", "A RAG assistant we built", [
    "nexus", "rag assistant", "internal documents", "policy", "pricing questions", "sources", "cited",
  ], ["ai", "cost", "start"]),
  {
    id: "cost",
    chip: "What does it cost?",
    keywords: ["cost", "price", "pricing", "budget", "quote", "expensive", "how much", "rate", "hourly", "fee", "charges", "kitna", "kharcha", "qeemat", "paisa"],
    answer: [faq(/cost/i) ?? ""],
    links: [{ label: "Get a quote", href: "/contact" }],
    follow: ["timeline", "start", "ownership"],
  },
  {
    id: "timeline",
    chip: "How long does it take?",
    keywords: ["long", "timeline", "weeks", "deadline", "duration", "when", "fast", "quick", "schedule", "kitna time", "delivery"],
    answer: [faq(/how long/i) ?? "", `Typical AI engagement: ${site.stats[2].value} ${site.stats[2].label}.`],
    links: [{ label: "Start a project", href: "/contact" }],
    follow: ["process", "cost", "start"],
  },
  {
    id: "start",
    chip: "How does a project start?",
    keywords: ["start", "begin", "first step", "kick off", "hire", "engage", "get started", "book", "call", "brief", "onboard", "contact", "email", "whatsapp"],
    answer: [
      `Discovery first. ${step("01")?.body ?? ""}`,
      `Send the brief through the contact page, or email ${site.email}. You get an answer ${site.responseTime.toLowerCase()}.`,
    ],
    links: [
      { label: "Start a project", href: "/contact" },
      { label: "WhatsApp", href: site.whatsapp },
    ],
    follow: ["process", "cost", "limits"],
  },
  {
    id: "process",
    chip: "How do you work?",
    keywords: ["process", "method", "stages", "steps", "workflow", "weekly", "demo", "staging", "updates", "communication", "manage"],
    answer: processSteps.map((s) => `${s.title}. ${s.body}`),
    links: [{ label: "See the process", href: "/#process" }],
    follow: ["timeline", "support", "start"],
  },
  {
    id: "stack",
    chip: "What's your stack?",
    keywords: ["stack", "tech", "technology", "tools", "framework", "language", "python", "pytorch", "typescript", "database", "yolo"],
    answer: services.map((s) => `${s.title}: ${s.deepTags.join(", ")}.`),
    links: [{ label: "See services", href: "/services" }],
    follow: ["vision", "cloud", "existing"],
  },
  {
    id: "ownership",
    chip: "Who owns the code?",
    keywords: ["own", "owns", "ownership", "code", "rights", "repository", "licence", "license", "lock-in", "intellectual property", "ip", "source code"],
    answer: [faq(/owns the code/i) ?? ""],
    follow: ["support", "existing", "start"],
  },
  {
    id: "support",
    chip: "What happens after launch?",
    keywords: ["after", "launch", "support", "maintenance", "retainer", "bugs", "warranty", "monitoring", "handover", "training"],
    answer: [faq(/after launch/i) ?? ""],
    follow: ["ownership", "process", "start"],
  },
  {
    id: "existing",
    chip: "Can you work with our codebase?",
    keywords: ["existing", "legacy", "codebase", "our code", "take over", "audit", "inherit", "rebuild", "rescue", "maintain", "migrate"],
    answer: [faq(/existing codebase/i) ?? ""],
    links: [{ label: "Ask for an audit", href: "/contact" }],
    follow: ["cost", "timeline", "stack"],
  },
  {
    id: "worldwide",
    chip: "Do you work internationally?",
    keywords: ["outside", "worldwide", "international", "remote", "time zone", "abroad", "overseas", "usa", "america", "uk", "europe", "canada", "australia", "dubai"],
    answer: [faq(/outside pakistan/i) ?? "", `${site.stats[0].value} ${site.stats[0].label}.`],
    follow: ["start", "process", "cost"],
  },
  {
    id: "where",
    chip: "Where are you based?",
    keywords: ["where", "located", "location", "office", "address", "lahore", "pakistan", "visit", "city"],
    answer: [
      site.locationShort,
      `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.country}.`,
    ],
    links: [{ label: "Contact details", href: "/contact" }],
    follow: ["worldwide", "team", "start"],
  },
  {
    id: "team",
    chip: "Who is behind this?",
    keywords: ["who", "team", "about", "company", "people", "founder", "senior", "agency", "size", "experience", "years"],
    answer: [aboutStory[1], aboutStory[2]],
    links: [{ label: "About the studio", href: "/about" }],
    follow: ["shipped", "process", "careers"],
  },
  {
    id: "careers",
    chip: "Are you hiring?",
    keywords: ["hiring", "job", "jobs", "career", "careers", "join", "internship", "intern", "cv", "resume", "apply", "vacancy", "naukri"],
    answer: ["Open roles, and how to apply, are on the Careers page."],
    links: [{ label: "Careers", href: "/careers" }],
    follow: ["team", "stack", "where"],
  },
  {
    id: "limits",
    chip: "What can't you do?",
    keywords: ["cant", "cannot", "limits", "limitations", "weakness", "not do", "wont", "bad at", "downside", "honest"],
    answer: [
      "I answer from what this site publishes, so I will not quote your project, promise a date, or name a client. Those come from a person.",
      byslug.ai.deepBody[1],
    ],
    links: [{ label: "Talk to the team", href: "/contact" }],
    follow: ["cost", "start", "identity"],
  },
  {
    id: "identity",
    chip: "What are you?",
    keywords: ["pixel ai", "bot", "robot", "human", "real person", "who are you", "chatgpt", "model", "ai assistant"],
    answer: [
      "I am Pixel AI, the assistant for this site. I answer from the pages you are reading: services, portfolio, process, pricing and contact.",
      "I do not guess and I do not invent figures. Anything the site does not cover goes to the team, who reply within 24 hours.",
    ],
    follow: ["build", "shipped", "start"],
  },
  {
    id: "hello",
    chip: "Hello",
    keywords: ["hi", "hello", "hey", "salam", "assalam", "thanks", "thank you", "good morning", "good evening", "aoa"],
    answer: ["Hello. Ask what we build, what it costs, or how a project starts."],
    follow: ["build", "cost", "start"],
  },
];

/** Shown as chips when the panel opens, in this order. */
export const assistantStarterIds = [
  "build",
  "shipped",
  "cost",
  "start",
  "stack",
  "existing",
  "limits",
] as const;

export const assistantIntro = [
  "I am Pixel AI. I answer from this site: what we build, what has shipped, how a project runs, and what it costs.",
  "Ask in your own words, or start with one of these.",
];

export const assistantFallback: Pick<AssistantTopic, "answer" | "links" | "follow"> = {
  answer: [
    "I only answer from what this site publishes, and I could not match that one.",
    `Try one of the questions below, or send it to the team and you will have a reply ${site.responseTime.toLowerCase()}.`,
  ],
  links: [{ label: "Ask the team", href: "/contact" }],
  follow: ["build", "cost", "start"],
};
