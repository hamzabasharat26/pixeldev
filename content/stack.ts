import type { BrandIconKey } from "./brand-icons";

/**
 * The stack we build and maintain on. Two rows so the strip can run them in
 * opposite directions.
 *
 * Integrity: only tools the site already claims elsewhere (services and
 * project write-ups). No padding it out with fashionable names we don't ship.
 */
export type StackItem = {
  label: string;
  /** Official mark, from content/brand-icons.ts. */
  icon?: BrandIconKey;
  /** Generic glyph where no official mark exists or may be used. */
  glyph?: "cloud" | "radar" | "cpu" | "search";
};

export const stackRows: { title: string; items: StackItem[] }[] = [
  {
    title: "Vision and AI",
    items: [
      { label: "Python", icon: "python" },
      { label: "PyTorch", icon: "pytorch" },
      { label: "YOLO", icon: "ultralytics" },
      { label: "OpenCV", icon: "opencv" },
      { label: "Detectron2", icon: "meta" },
      { label: "TensorRT", icon: "nvidia" },
      { label: "ONNX", icon: "onnx" },
      { label: "Anomalib", icon: "intel" },
      { label: "LangChain", icon: "langchain" },
      { label: "Ollama", icon: "ollama" },
      { label: "FAISS", glyph: "search" },
      { label: "Streamlit", icon: "streamlit" },
      { label: "LiDAR", glyph: "radar" },
      { label: "Edge AI", glyph: "cpu" },
    ],
  },
  {
    title: "Product and cloud",
    items: [
      { label: "Next.js", icon: "nextjs" },
      { label: "React", icon: "react" },
      { label: "TypeScript", icon: "typescript" },
      { label: "Tailwind CSS", icon: "tailwind" },
      { label: "Node.js", icon: "nodejs" },
      { label: "FastAPI", icon: "fastapi" },
      { label: "PostgreSQL", icon: "postgresql" },
      { label: "Supabase", icon: "supabase" },
      { label: "Flutter", icon: "flutter" },
      { label: "Firebase", icon: "firebase" },
      { label: "Docker", icon: "docker" },
      // simple-icons removed the AWS mark at Amazon's request; plain glyph.
      { label: "AWS", glyph: "cloud" },
      { label: "Vercel", icon: "vercel" },
      { label: "GitHub Actions", icon: "githubactions" },
      { label: "Cloudflare", icon: "cloudflare" },
      { label: "Figma", icon: "figma" },
    ],
  },
];

/** Flat list for structured data / alt text. */
export const stackFlat = stackRows.flatMap((r) => r.items.map((i) => i.label));
