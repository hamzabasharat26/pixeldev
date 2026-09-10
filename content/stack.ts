/**
 * The stack we build and maintain on. One flowing strip on the homepage —
 * two arrays only so the marquee can run two rows at different speeds.
 * Ordered roughly by how often it shows up in the work.
 */
export const stackRows: [string[], string[]] = [
  [
    "Python",
    "PyTorch",
    "YOLO",
    "OpenCV",
    "Detectron2",
    "TensorRT",
    "ONNX",
    "AnomalyLib",
    "LiDAR",
    "Edge AI",
  ],
  [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "LangChain",
    "FAISS",
    "Docker",
    "AWS",
    "Vercel",
  ],
];

/** Flat list for structured data / alt text. */
export const stackFlat = [...stackRows[0], ...stackRows[1]];
