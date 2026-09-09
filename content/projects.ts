export type ProjectCategory =
  | "Web"
  | "Mobile"
  | "AI"
  | "Computer Vision"
  | "E-commerce"
  | "UI/UX";

export type Project = {
  slug: string;
  title: string;
  client: string; // real name, or "Confidential"
  year: number;
  category: ProjectCategory;
  /** Shown in the homepage stacked-work deck. */
  featured: boolean;
  /** Headline result: value + what it measures. */
  outcome: { value: string; label: string };
  /** One line, <= 110 chars. */
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  /** Exactly three. */
  metrics: { value: string; label: string }[];
  /** 4–7 items. */
  tech: string[];
  role: string;
  timeline: string;
  media: {
    poster: string;
    webm?: string;
    mp4?: string;
    cover: string;
    gallery: string[];
  };
  liveUrl?: string;
  /** Placeholder rows render a "replace me" banner and stay off the homepage. */
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "rallylens",
    title: "RallyLens",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    featured: true,
    outcome: {
      value: "Real-time",
      label: "shot, bounce & speed tracking from a single camera",
    },
    summary:
      "One camera, broadcast-style tracking — ball speed, rallies, bounces and wall-target accuracy for racket-sport coaching.",
    challenge:
      "Coaches review sessions by eye. Improvement is hard to quantify, and a busy court holds a coach and several students at once — a fast, small ball, players occluding each other, and wall drills where “on target” is a judgment call. The studio wanted per-player, per-shot data from an ordinary camera on a tripod, not a fixed multi-camera rig or wearables on every player.",
    solution:
      "RallyLens detects and pose-tracks every player, colours them by role, and follows the ball frame to frame as a trajectory spline. A camera-homography step maps the court and the wall targets into real-world coordinates, so bounces and wall hits report distance to target in centimetres and ball speed comes from calibrated displacement. An event timeline marks every bounce, contact and on-target hit; a bird’s-eye minimap shows court position. It runs on recorded clips and exports a per-player shot log.",
    results:
      "Every session becomes a timeline of shots, bounces and wall-target distances instead of a memory. Coaches compare students on the same numbers, and wall-drill accuracy is measured in centimetres rather than argued about. The studio is rolling it into regular coaching reviews.",
    metrics: [
      { value: "cm", label: "wall-target accuracy, measured not judged" },
      { value: "1 cam", label: "no rig, no wearables" },
      { value: "km/h", label: "per-shot ball speed with session peak" },
    ],
    tech: ["Python", "PyTorch", "YOLO", "OpenCV", "TrackNet", "Homography"],
    role: "Design + Build",
    timeline: "Ongoing",
    media: {
      poster: "/work/rallylens/scene.jpg",
      mp4: "/clips/padel-8s.mp4",
      cover: "/work/rallylens/dashboard.jpg",
      gallery: ["/work/rallylens/scene.jpg", "/work/rallylens/dashboard.jpg"],
    },
  },
  {
    slug: "magicqc",
    title: "MagicQC",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    featured: true,
    outcome: {
      value: "Every piece",
      label: "measured against the right brand spec, logged to the operator",
    },
    summary:
      "A QC station that measures garment points-of-measure against each brand’s tolerance table, live on the line.",
    challenge:
      "Garment QC ran on a tape measure and a stack of paper spec sheets. Every brand — adidas, Zara, Puma, Reebok — has its own list of points of measure and its own tolerance per size, and operators reconciled all of it by hand. Mistakes shipped, and the QC manager only found out when a customer complained.",
    solution:
      "A desktop capture app paired with a web dashboard. The operator picks the brand, article type, style and size; the station loads that brand’s points of measure with the tolerance for that size. Each measurement is captured, compared to spec, and marked pass or fail in centimetres at the point of measure. Garment colour and size drive the tolerance set. “Next Piece” and “Next Article” keep the line moving, and every result syncs to the web app with the operator and table attached.",
    results:
      "Operators no longer look up specs — the station already knows them. Pass and fail are logged per operator and per table, and the QC manager watches results come in on the web app instead of collecting clipboards at the end of the shift.",
    metrics: [
      { value: "per operator", label: "every measurement tied to a person and a table" },
      { value: "8+ brands", label: "each with its own POM list and tolerances" },
      { value: "pass / fail", label: "in centimetres, at the point of measure" },
    ],
    tech: ["Next.js", "TypeScript", "Python", "OpenCV", "PostgreSQL", "Electron"],
    role: "Design + Build",
    timeline: "Ongoing",
    media: {
      poster: "/work/magicqc/desktop.png",
      mp4: "/clips/magic-8s.mp4",
      cover: "/work/magicqc/web.png",
      gallery: ["/work/magicqc/desktop.png", "/work/magicqc/web.png"],
    },
  },

  /* ------------------------------------------------------------------ *
   *  PLACEHOLDERS — replace these three by editing this file.          *
   *  Keep the shape; swap copy, metrics, tech, media, and set          *
   *  placeholder:false to publish. They stay off the homepage stack    *
   *  until then.                                                       *
   * ------------------------------------------------------------------ */
  {
    slug: "project-three",
    title: "Project Three",
    client: "Placeholder",
    year: 2025,
    category: "Web",
    featured: false,
    placeholder: true,
    outcome: { value: "+00%", label: "the headline result goes here" },
    summary:
      "One line describing what this project shipped and the outcome it drove (max ~110 characters).",
    challenge:
      "60–100 words on what was broken, slow, or missing before this project. Who it was hurting, and how that showed up day to day.",
    solution:
      "80–140 words on the solution in plain language, then the technical decisions that mattered and why you made them the way you did.",
    results:
      "60–100 words on what changed after launch, with numbers where you have them. If you don’t have numbers, describe the concrete difference in the client’s day.",
    metrics: [
      { value: "00", label: "metric one" },
      { value: "00", label: "metric two" },
      { value: "00", label: "metric three" },
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    role: "Design + Build",
    timeline: "0 weeks",
    media: {
      poster: "/posters/dock-poster.jpg",
      mp4: "/clips/dock-8s.mp4",
      cover: "/posters/dock-poster.jpg",
      gallery: ["/posters/dock-poster.jpg"],
    },
  },
  {
    slug: "project-four",
    title: "Project Four",
    client: "Placeholder",
    year: 2024,
    category: "Mobile",
    featured: false,
    placeholder: true,
    outcome: { value: "+00%", label: "the headline result goes here" },
    summary:
      "One line describing what this project shipped and the outcome it drove (max ~110 characters).",
    challenge:
      "60–100 words on what was broken, slow, or missing before this project. Who it was hurting, and how that showed up day to day.",
    solution:
      "80–140 words on the solution in plain language, then the technical decisions that mattered and why you made them the way you did.",
    results:
      "60–100 words on what changed after launch, with numbers where you have them.",
    metrics: [
      { value: "00", label: "metric one" },
      { value: "00", label: "metric two" },
      { value: "00", label: "metric three" },
    ],
    tech: ["React Native", "Expo", "Firebase"],
    role: "Design + Build",
    timeline: "0 weeks",
    media: {
      poster: "/posters/passenger-poster.jpg",
      mp4: "/clips/passenger-8s.mp4",
      cover: "/posters/passenger-poster.jpg",
      gallery: ["/posters/passenger-poster.jpg"],
    },
  },
  {
    slug: "project-five",
    title: "Project Five",
    client: "Placeholder",
    year: 2024,
    category: "AI",
    featured: false,
    placeholder: true,
    outcome: { value: "+00%", label: "the headline result goes here" },
    summary:
      "One line describing what this project shipped and the outcome it drove (max ~110 characters).",
    challenge:
      "60–100 words on what was broken, slow, or missing before this project.",
    solution:
      "80–140 words on the solution in plain language, then the technical decisions that mattered.",
    results:
      "60–100 words on what changed after launch, with numbers where you have them.",
    metrics: [
      { value: "00", label: "metric one" },
      { value: "00", label: "metric two" },
      { value: "00", label: "metric three" },
    ],
    tech: ["Python", "LangChain", "OpenAI", "Vercel"],
    role: "Design + Build",
    timeline: "0 weeks",
    media: {
      poster: "/posters/theft-poster.jpg",
      mp4: "/clips/theft-8s.mp4",
      cover: "/posters/theft-poster.jpg",
      gallery: ["/posters/theft-poster.jpg"],
    },
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  "Web",
  "Mobile",
  "AI",
  "Computer Vision",
  "E-commerce",
];
