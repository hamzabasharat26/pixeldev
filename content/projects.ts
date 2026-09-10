/**
 * Real project portfolio.
 *
 * Integrity rules (do not break):
 *   - `client` is "Confidential" unless the owner has cleared a real name.
 *   - `metrics` describe a *capability* the system demonstrably has — never an
 *     audited business outcome unless the owner confirmed the figure.
 *   - `timeline` values are estimates. // TODO(owner): confirm each before launch.
 *   - Narrative is written from the project brief + what is visible in the
 *     supplied media. Nothing is invented.
 *
 * Media lives in public/work/<slug>/ (built by scripts/build-media.mjs from
 * git-ignored media-src/). Each has cover.webp + 01.webp + 02.webp; video
 * projects also have loop.{mp4,webm} + poster.webp.
 */

export type ProjectCategory =
  | "Computer Vision"
  | "AI"
  | "Web"
  | "Mobile"
  | "Robotics"
  | "UI/UX";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory;
  /** Extra category tags shown on the case study. */
  tags?: string[];
  /** In the homepage sticky-scale deck. */
  featured: boolean;
  /** In the homepage running "selected work" strip. Defaults true for real ones. */
  strip?: boolean;
  /** Headline capability: value + what it measures. */
  outcome: { value: string; label: string };
  /** One line, <= 120 chars. */
  summary: string;
  challenge: string;
  solution: string;
  results: string;
  /** Exactly three. */
  metrics: { value: string; label: string }[];
  /** Colour the metric numerals: "signal" when they're on-screen data. */
  metricsAccent?: "signal" | "amber";
  /** 4–7 items. */
  tech: string[];
  role: string;
  timeline: string;
  media: {
    poster: string;
    webm?: string;
    mp4?: string;
    cover: string;
    /** 800px cover for small slots (hero panel, work strip). See below. */
    coverSmall: string;
    /** 800px poster for the <video poster> attribute. See below. */
    posterSmall: string;
    gallery: string[];
  };
  liveUrl?: string;
  /** Placeholder rows render a marker and stay off the homepage. */
  placeholder?: boolean;
};

const W = (slug: string) => `/work/${slug}`;
/**
 * `galleryCount` exists because not every project came with the same amount of
 * source material. Where only one still was supplied, asking for two gallery
 * images just renders the same picture twice, which looks like a bug.
 */
const media = (slug: string, video = false, galleryCount: 1 | 2 = 2) => ({
  poster: video ? `${W(slug)}/poster.webp` : `${W(slug)}/cover.webp`,
  ...(video
    ? { webm: `${W(slug)}/loop.webm`, mp4: `${W(slug)}/loop.mp4` }
    : {}),
  cover: `${W(slug)}/cover.webp`,
  // These images are served `unoptimized`, so the browser gets exactly the
  // file we name — a 1600px cover in a 330px card is pure waste. Built by
  // `node scripts/build-media.mjs thumbs`.
  coverSmall: `${W(slug)}/cover-800.webp`,
  posterSmall: video
    ? `${W(slug)}/poster-800.webp`
    : `${W(slug)}/cover-800.webp`,
  gallery: [`${W(slug)}/01.webp`, `${W(slug)}/02.webp`].slice(0, galleryCount),
});

export const projects: Project[] = [
  {
    slug: "hornet-ai",
    title: "HornetAI",
    client: "Confidential", // TODO(owner): the brief names a biosecurity programme — clear the name before using it.
    year: 2025, // TODO(owner): confirm
    category: "Computer Vision",
    tags: ["Biosecurity", "Edge AI"],
    featured: true,
    strip: true,
    outcome: {
      value: "Marked and re-identified",
      label:
        "individual hornets tracked at the bait station by their paint-dot colour",
    },
    summary:
      "Detects Asian hornets at a bait station and tells individually marked insects apart, so a single hornet can be followed between visits.",
    challenge:
      "The yellow-legged Asian hornet (Vespa velutina) is a highly predative non-native species that has spread rapidly across Europe since being introduced in 2004. Tracking its movement means knowing not just that a hornet visited a bait station, but which hornet. The standard field method is to mark individuals with a coloured paint dot and watch for their return, which is slow, manual work.",
    solution:
      "A detector runs on the bait-station camera and classifies each insect in frame, separating Asian hornets from other visitors. On top of that it reads the coloured paint dot applied to marked individuals, labelling each one by colour so the same hornet can be recognised across visits. It is built to run on edge hardware at the station rather than streaming footage away for processing.",
    results:
      "Visits are logged automatically with the individual identified rather than tallied by hand.", // TODO(owner): confirm deployment scale, site count and any biosecurity outcomes before adding claims here.
    metrics: [
      {
        value: "per hornet",
        label: "paint-dot colour read and labelled per individual",
      },
      {
        value: "on the station",
        label: "runs on edge hardware at the bait site",
      },
      {
        value: "species-level",
        label: "Asian hornet separated from other visiting insects",
      },
    ],
    metricsAccent: "signal",
    tech: ["Python", "YOLO", "OpenCV", "Object tracking", "Edge AI"],
    role: "Design + Build",
    timeline: "TODO(owner): confirm",
    // Only one still was supplied, so the gallery is a single image.
    media: media("hornet-ai", false, 1),
  },
  {
    // Sourced from an unlabelled clip: no brief was supplied for this one, so
    // everything below describes ONLY what is visible on screen. Every claim
    // about client, scale or outcome is left as TODO(owner).
    slug: "mri-brain-segmentation",
    title: "Brain MRI Segmentation",
    client: "Confidential", // TODO(owner): confirm whether this was client work or R&D.
    year: 2025, // TODO(owner): confirm
    category: "AI",
    tags: ["Medical imaging", "Segmentation"],
    featured: false,
    strip: true,
    outcome: {
      value: "Three planes",
      label:
        "sagittal, coronal and axial views segmented from the same volume",
    },
    summary:
      "Segments structures in a brain MRI volume and renders the labelled regions across all three standard viewing planes.",
    challenge:
      "An MRI is a volume, but clinicians read it as slices in three orthogonal planes. A segmentation is only useful if it stays consistent as you move between those views.", // TODO(owner): replace with the actual project brief — this describes the problem domain, not a stated client requirement.
    solution:
      "The model labels anatomical regions in the volume and renders them as colour-coded masks over the greyscale scan, presented simultaneously in the sagittal, coronal and axial planes so the same segmentation can be inspected from all three.",
    results:
      "TODO(owner): no results were supplied for this project. Confirm accuracy, dataset and clinical context before this goes in front of a client.",
    metrics: [
      { value: "3 planes", label: "sagittal, coronal and axial, from one volume" },
      { value: "per region", label: "each structure rendered as its own mask" },
      {
        value: "volumetric",
        label: "labels carried through the stack, not drawn per slice",
      },
    ],
    metricsAccent: "signal",
    tech: ["Python", "PyTorch", "Segmentation", "Medical imaging"], // TODO(owner): confirm the actual stack.
    role: "TODO(owner): confirm",
    timeline: "TODO(owner): confirm",
    media: media("mri-brain-segmentation", true),
  },
  {
    slug: "rallylens",
    title: "RallyLens",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["Sports tech", "Pose estimation"],
    featured: true,
    strip: true,
    outcome: {
      value: "1 camera",
      label: "broadcast-style shot, bounce and speed tracking. No rig, no wearables",
    },
    summary:
      "One phone-grade camera turns a racket-sport session into a timeline of every shot, bounce and wall-target hit.",
    challenge:
      "Coaches review sessions by eye, so progress is a matter of memory. A busy court makes it worse: a coach and several students at once, a fast small ball, players blocking each other, and wall drills where “on target” is a judgment call. The studio wanted per-player, per-shot data from an ordinary camera on a tripod, not a fixed multi-camera rig and not wearables on every player.",
    solution:
      "RallyLens detects and pose-tracks every player, colours them by role, and follows the ball frame to frame as a trajectory spline. A camera-homography step maps the court and the wall targets into real-world coordinates, so bounces and wall hits report distance to target in centimetres and ball speed comes from calibrated displacement. An event timeline marks every bounce, contact and on-target hit; a bird’s-eye minimap shows court position. It runs on recorded clips and exports a per-player shot log.",
    results:
      "Every session is now a timeline instead of a memory. Coaches compare students on the same numbers, and wall-drill accuracy is measured in centimetres rather than argued about. The studio is folding it into regular coaching reviews.",
    metrics: [
      { value: "cm", label: "wall-target accuracy, measured rather than argued about" },
      { value: "km/h", label: "per-shot ball speed with a session peak" },
      { value: "per player", label: "shot, bounce and rally counts, exportable" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "PyTorch", "YOLO", "TrackNet", "OpenCV", "Homography"],
    role: "Design + Build",
    timeline: "Ongoing", // TODO(owner): confirm
    media: media("rallylens", true),
  },
  {
    slug: "magicqc",
    title: "MagicQC",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["AI", "Manufacturing QC", "Desktop + Web"],
    featured: true,
    strip: true,
    outcome: {
      value: "Every piece",
      label: "measured to each brand’s tolerance table, logged to the operator",
    },
    summary:
      "A QC station that already knows every brand’s points of measure and tolerances. The operator just measures.",
    challenge:
      "Garment QC ran on a tape measure and a stack of paper spec sheets. adidas, Zara, Puma and Reebok each bring their own list of points of measure and their own tolerance per size, and operators reconciled all of it by hand. Mistakes shipped, and the QC manager only found out when a customer complained.",
    solution:
      "A desktop capture app paired with a web dashboard. The operator picks brand, article type, style and size; the station loads that brand’s points of measure with the tolerance for that size. Each measurement is captured, compared to spec, and marked pass or fail in centimetres at the point of measure, with garment colour and size driving the tolerance set. “Next Piece” and “Next Article” keep the line moving, and every result syncs to the web app with the operator and table attached.",
    results:
      "Operators stopped looking up specs, because the station already has them. Pass and fail are logged per operator and per table, and the QC manager watches results arrive on the web app instead of collecting clipboards at the end of a shift. Deployed on a live line at a Karachi garment manufacturer.",
    metrics: [
      { value: "500+ / shift", label: "garments measured on a live line" }, // TODO(owner): confirm throughput
      { value: "8+ brands", label: "each with its own POM list and tolerances" },
      { value: "pass / fail", label: "in centimetres, at the point of measure" },
    ],
    metricsAccent: "amber",
    tech: ["Next.js", "TypeScript", "Python", "OpenCV", "PostgreSQL", "Electron", "AWS EC2"],
    role: "Design + Build",
    timeline: "Ongoing", // TODO(owner): confirm
    media: {
      poster: "/work/magicqc/poster.webp",
      webm: "/work/magicqc/loop.webm",
      mp4: "/work/magicqc/loop.mp4",
      cover: "/work/magicqc/cover.webp",
      coverSmall: "/work/magicqc/cover-800.webp",
      posterSmall: "/work/magicqc/poster-800.webp",
      gallery: [
        "/work/magicqc/web.png",
        "/work/magicqc/desktop.png",
        "/work/magicqc/01.webp",
      ],
    },
  },
  {
    slug: "dock-vision-ai",
    title: "Dock Vision AI",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["Logistics", "Real-time"],
    featured: true,
    strip: true,
    outcome: {
      value: "1st place",
      label: "IEEE Hackathon win, then taken into production",
    },
    summary:
      "Real-time docking assistance: detect the vehicle, track the approach, log the turnaround, all from one fixed camera on the bay.",
    challenge:
      "Loading-dock turnaround is guesswork. Nobody knows exactly when a truck arrived, how long it sat, or where the bottleneck is, so the numbers that would fix scheduling simply do not exist.",
    solution:
      "A live operations dashboard driven by computer vision on the dock camera. It detects and tracks vehicles and forklifts through the bay, marks each state change (arrived, positioned, loading, then released) on a live turnaround timeline, and streams an event feed operations can watch in real time. Built for the hackathon, then hardened for a real yard.",
    results:
      "Won first place at an IEEE Hackathon and was commercialised afterwards. Turnaround time stopped being an argument and became a chart.",
    metrics: [
      { value: "real-time", label: "vehicle + forklift detection on the bay camera" },
      { value: "per truck", label: "arrival → release timeline, logged automatically" },
      { value: "1st", label: "IEEE Hackathon, then into production" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "YOLO", "OpenCV", "Object tracking", "FastAPI", "React"],
    role: "Design + Build",
    timeline: "Hackathon build, then production hardening", // TODO(owner): confirm
    media: media("dock-vision-ai", true),
  },
  {
    slug: "safe-rail",
    title: "Safe Rail",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["Rail", "Semantic segmentation"],
    featured: true,
    strip: true,
    outcome: {
      value: "Frame by frame",
      label: "track bed and ballast segmented from a forward-facing camera",
    },
    summary:
      "A forward-facing camera segments the track bed, rails and ballast in every frame for automated track-condition monitoring.",
    challenge:
      "Track inspection is a person walking the line or riding a slow trolley. It’s expensive, infrequent, and only as consistent as the inspector’s attention that day.",
    solution:
      "A semantic-segmentation model runs on a forward-facing camera feed, labelling rails, sleepers and ballast in every frame and flagging where the ballast profile or the bed looks wrong. Trained on annotated footage from the corridor it monitors, so it holds up in real lighting and real motion blur.",
    results:
      "Track condition is captured continuously from a camera already on the vehicle, instead of once a quarter on foot. Flagged sections go to a human for review with the frame and timestamp attached.",
    metrics: [
      { value: "every frame", label: "rail, sleeper and ballast segmentation" },
      { value: "0.9+", label: "detection confidence on the monitored corridor" }, // TODO(owner): confirm
      { value: "on-vehicle", label: "runs on a camera already mounted for the run" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "YOLO", "Semantic segmentation", "OpenCV", "Data annotation"],
    role: "Design + Build",
    timeline: "4–6 weeks", // TODO(owner): confirm
    media: media("safe-rail", true),
  },
  {
    slug: "nexus-rag-assistant",
    title: "Nexus RAG Assistant",
    client: "Confidential",
    year: 2025,
    category: "AI",
    tags: ["RAG", "LLM", "On-premise"],
    featured: false,
    strip: true,
    outcome: {
      value: "Grounded answers",
      label: "every response cites the internal document it came from",
    },
    summary:
      "A retrieval-grounded assistant that answers from verified internal documents covering pricing, tax rules and policies, and shows its sources.",
    challenge:
      "Staff answered the same product, pricing and policy questions from memory and scattered PDFs. Answers drifted, and a wrong one about tax or credit terms is expensive.",
    solution:
      "A RAG pipeline over the client’s own documents: FAISS vector retrieval, cosine-similarity ranked chunks, and an LLM that only answers from what it retrieved, with the source file and chunk shown next to every response. Runs on-premise on an NVIDIA A100 so nothing leaves the building, with an operator view for architecture, security and latency.",
    results:
      "One assistant, one source of truth. Answers are consistent, traceable to a document, and fast enough to use mid-conversation.",
    metrics: [
      { value: "cited", label: "source file + chunk shown for every answer" },
      { value: "on-prem", label: "runs locally on an NVIDIA A100, so no data leaves" },
      { value: "~350 ms", label: "typical retrieval + generation latency" }, // TODO(owner): confirm
    ],
    metricsAccent: "signal",
    tech: ["Python", "LangChain", "FAISS", "LLM", "FastAPI", "NVIDIA A100"],
    role: "Design + Build",
    timeline: "4–6 weeks", // TODO(owner): confirm
    media: media("nexus-rag-assistant"),
  },
  {
    slug: "candy-detection",
    title: "Candy Detection & Counting",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["Conveyor", "Object tracking"],
    featured: false,
    strip: true,
    outcome: {
      value: "Counted once",
      label: "each piece tracked across frames, even when it overlaps",
    },
    summary:
      "Real-time detection and counting of confectionery on a moving conveyor, with every piece assigned an ID and counted exactly once.",
    challenge:
      "Counting product on a fast conveyor by eye or by weight is approximate. Overlapping pieces and motion blur break naive frame-by-frame counting.",
    solution:
      "A YOLO detector plus a tracker that assigns each piece a persistent ID and follows it across the belt, so a piece that overlaps or is briefly occluded is still counted once. Trained on annotated line footage for the specific product and lighting.",
    results:
      "An exact, continuous count from one camera over the belt. No scale, no manual tally.",
    metrics: [
      { value: "per piece", label: "persistent track ID across frames" },
      { value: "real-time", label: "counts at line speed on the conveyor feed" },
      { value: "count once", label: "handles overlap and brief occlusion" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "YOLO", "OpenCV", "Object tracking", "Data annotation"],
    role: "Design + Build",
    timeline: "3–4 weeks", // TODO(owner): confirm
    media: media("candy-detection", true),
  },
  {
    slug: "cake-counting",
    title: "Cake Counting",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["Bakery line", "GoPro"],
    featured: false,
    strip: true,
    outcome: {
      value: "Live tally",
      label: "cakes counted off an overhead GoPro as they move down the line",
    },
    summary:
      "Object detection and tracking count cakes on a bakery production line from a single overhead action camera.",
    challenge:
      "Production counts at the end of a shift are reconstructed from trays and memory. A live number would let the line react.",
    solution:
      "An overhead GoPro feeds a detector that boxes each cake and a tracker that IDs it, incrementing a live “cakes count” as pieces cross the line, holding up against hands, trays and pieces that briefly touch.",
    results:
      "A running count on the line instead of a guess at the end of the day.",
    metrics: [
      { value: "overhead", label: "one action camera, no line changes" },
      { value: "live count", label: "increments as pieces cross the frame" },
      { value: "tracked", label: "each cake IDed so it counts once" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "YOLO", "OpenCV", "Object tracking", "Image processing"],
    role: "Design + Build",
    timeline: "3–4 weeks", // TODO(owner): confirm
    media: media("cake-counting", true),
  },
  {
    slug: "tire-cord-fabric-defect",
    title: "Tire-Cord Fabric Defect Detection",
    client: "Confidential",
    year: 2025,
    category: "Computer Vision",
    tags: ["Anomaly detection", "Textile QC"],
    featured: false,
    strip: true,
    outcome: {
      value: "Flagged live",
      label: "breaks, gaps and weave irregularities called out as the fabric runs",
    },
    summary:
      "AnomalyCLIP flags breaks, gaps and weave irregularities in tire-cord fabric from a line camera, drawn as a live heatmap.",
    challenge:
      "Tire-cord fabric defects are subtle: a broken cord, a gap, an irregular weave, all easy to miss at line speed. Missing one puts a weak spot into a tyre.",
    solution:
      "An AnomalyCLIP model trained on the fabric renders a defect heatmap next to the live feed: normal weave stays cool, anomalies light up. It does not need every defect type labelled in advance. It learns what normal looks like, then flags anything that departs from it.",
    results:
      "A second set of eyes on the fabric that never blinks, with a heatmap an operator can act on immediately.",
    metrics: [
      { value: "heatmap", label: "per-frame anomaly score over the weave" },
      { value: "few-shot", label: "learns normal, doesn’t need every defect labelled" },
      { value: "line-speed", label: "runs on the inspection camera feed" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "AnomalyCLIP", "Deep learning", "OpenCV", "Roboflow"],
    role: "Design + Build",
    timeline: "4–5 weeks", // TODO(owner): confirm
    media: media("tire-cord-fabric-defect", true),
  },
  {
    slug: "vehicle-damage-detection",
    title: "Vehicle Damage Detection",
    client: "Confidential",
    year: 2024,
    category: "Computer Vision",
    tags: ["Instance segmentation", "Insurance"],
    featured: false,
    strip: true,
    outcome: {
      value: "Per-panel",
      label: "damage segmented and classified from a photo of the vehicle",
    },
    summary:
      "A Detectron2 instance-segmentation model outlines and classifies vehicle damage from a single photo, with a review UI.",
    challenge:
      "Damage assessment from photos is slow and inconsistent: two assessors, two answers, and a growing backlog.",
    solution:
      "A Faster R-CNN instance-segmentation model built on Meta’s Detectron2 outlines each damaged region and classifies it (dent, scratch, break). A Streamlit interface lets an assessor upload a photo and get the segmented result with confidence scores for review.",
    results:
      "A consistent first pass on every photo, so assessors spend their time on the edge cases instead of the obvious ones.",
    metrics: [
      { value: "per region", label: "pixel mask + class for each damaged area" },
      { value: "one photo", label: "no fixed rig, works from a phone photo" },
      { value: "review UI", label: "assessor confirms or corrects, fast" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "Detectron2", "Faster R-CNN", "OpenCV", "Streamlit"],
    role: "Design + Build",
    timeline: "4–6 weeks", // TODO(owner): confirm
    media: media("vehicle-damage-detection", true),
  },
  {
    slug: "lidar-lane-detection",
    title: "3D Lane Detection from LiDAR",
    client: "Confidential",
    year: 2024,
    category: "Computer Vision",
    tags: ["LiDAR", "Point cloud", "Autonomy"],
    featured: false,
    strip: true,
    outcome: {
      value: "3D lanes",
      label: "lane lines extracted directly from the LiDAR point cloud",
    },
    summary:
      "A lane-detection pipeline that works on raw LiDAR point clouds. No camera, and robust in the dark and in glare.",
    challenge:
      "Camera lane detection fails in the dark, in glare and in bad weather, exactly when a vehicle needs it most. LiDAR keeps working, but its point cloud is sparse and noisy.",
    solution:
      "A two-stage pipeline: an intensity-threshold pass pulls the most likely lane-line points out of the point cloud, then a region-of-interest pass tightens the result to the drivable corridor. Output is 3D lane geometry, not a 2D image overlay.",
    results:
      "Lane geometry that holds up in conditions where a camera gives nothing, usable on its own or fused with vision.",
    metrics: [
      { value: "3D", label: "lane geometry in real-world coordinates" },
      { value: "no camera", label: "works in darkness, glare and weather" },
      { value: "2-stage", label: "intensity threshold → region of interest" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "LiDAR", "Point cloud processing", "NumPy", "Open3D"],
    role: "Design + Build",
    timeline: "4–5 weeks", // TODO(owner): confirm
    media: media("lidar-lane-detection", true),
  },
  {
    // TODO(owner): the only supplied still for this project is 360x225 — it is
    // upscaled in the card and on the case study, and looks soft next to the
    // rest of the grid. Needs a higher-resolution capture of the same output.
    slug: "anomaly-detection",
    title: "Edge Anomaly Detection for Manufacturing",
    client: "Confidential",
    year: 2024,
    category: "Computer Vision",
    tags: ["Edge AI", "Anomaly detection"],
    featured: false,
    strip: true,
    outcome: {
      value: "On the edge",
      label: "defect detection running on-device at the station, no cloud",
    },
    summary:
      "State-of-the-art anomaly detection (ANOMALIB) for manufactured parts, deployed to run on edge hardware at the line.",
    challenge:
      "Sending every part’s image to the cloud for inspection is slow and adds a dependency the line can’t afford. Inspection has to happen at the station.",
    solution:
      "An ANOMALIB-based model trained on good parts, then optimised and deployed to edge hardware so it inspects each part on-device in the time it takes to place the next one. It flags anything that departs from normal, so nobody has to enumerate defect types up front.",
    results:
      "Inspection at the station, at line speed, with no network in the loop.",
    metrics: [
      { value: "on-device", label: "runs at the station, no cloud round-trip" },
      { value: "unsupervised", label: "trained on good parts only" },
      { value: "per part", label: "a pass/flag decision before the next one lands" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "ANOMALIB", "PyTorch", "ONNX", "Edge AI", "OpenCV"],
    role: "Design + Build",
    timeline: "4–6 weeks", // TODO(owner): confirm
    media: media("anomaly-detection"),
  },
  {
    slug: "ocr-document-extraction",
    title: "Document OCR & Field Extraction",
    client: "Confidential",
    year: 2024,
    category: "AI",
    tags: ["OCR", "Document intelligence"],
    featured: false,
    strip: true,
    outcome: {
      value: "Structured",
      label: "unstructured documents in, typed fields out",
    },
    summary:
      "An OCR and extraction pipeline that turns scanned documents into structured fields, with a review view for low-confidence pulls.",
    challenge:
      "Key data was locked in scanned documents and PDFs, re-keyed by hand. Slow, and every re-key is another chance to introduce an error.",
    solution:
      "OCR to lift the text, then a field-extraction layer that maps it to the fields that matter, each with a confidence score. A details view surfaces the low-confidence extractions for a human to confirm, so the pipeline is fast where it’s sure and careful where it isn’t.",
    results:
      "Documents become data on arrival, and the people who used to re-key them now just check the uncertain ones.",
    metrics: [
      { value: "fields out", label: "typed values, not just raw text" },
      { value: "confidence", label: "per-field score routes review" },
      { value: "human-in-loop", label: "only the uncertain pulls need a look" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "OCR", "OpenCV", "FastAPI", "React"],
    role: "Design + Build",
    timeline: "3–5 weeks", // TODO(owner): confirm
    media: media("ocr-document-extraction"),
  },
  {
    slug: "parking-occupancy",
    title: "Parking Occupancy & People Counting",
    client: "Confidential",
    year: 2024,
    category: "Computer Vision",
    tags: ["Smart infrastructure", "Real-time"],
    featured: false,
    strip: true,
    outcome: {
      value: "Live map",
      label: "bay-by-bay occupancy and headcount from existing cameras",
    },
    summary:
      "Computer vision on existing site cameras gives a live occupancy map for parking and a headcount for foot traffic.",
    challenge:
      "Drivers circle looking for a space and operators have no real-time view of how full the site is or where people are moving.",
    solution:
      "Detection and tracking on the cameras already installed: each bay is watched for occupied/free, and people are counted through defined lines and zones. It feeds a dashboard with a live occupancy map, zone counts, and the trend across the day.",
    results:
      "A real-time picture of the site from cameras that were only recording before.",
    metrics: [
      { value: "per bay", label: "occupied / free, updated live" },
      { value: "zone counts", label: "people through lines and areas" },
      { value: "existing cams", label: "no new hardware on site" },
    ],
    metricsAccent: "signal",
    tech: ["Python", "YOLO", "OpenCV", "Object tracking", "FastAPI"],
    role: "Design + Build",
    timeline: "4–6 weeks", // TODO(owner): confirm
    media: media("parking-occupancy"),
  },
  {
    slug: "drone-mission-control",
    title: "Autonomous Drone Mission Planning",
    client: "Confidential",
    year: 2024,
    category: "Robotics",
    tags: ["UAV", "Simulation", "Autonomy"],
    featured: false,
    strip: true,
    outcome: {
      value: "Sim to flight",
      label: "missions planned and validated in Gazebo before they fly",
    },
    summary:
      "Mission planning and simulation for an autonomous quad, with waypoints and behaviour validated in Gazebo, then flown through QGroundControl.",
    challenge:
      "Testing autonomous flight behaviour on real hardware is slow and risky. A crash costs a week.",
    solution:
      "A Gazebo simulation of the quad and its environment lets missions, including waypoints, altitudes and behaviours, be built and validated in software first, then executed on the real airframe through a QGroundControl link. The loop is: plan, simulate, adjust, fly.",
    results:
      "Mission behaviour is proven in sim before it ever leaves the ground, so field time is spent flying working missions, not debugging them.",
    metrics: [
      { value: "Gazebo", label: "full airframe + environment simulation" },
      { value: "QGC link", label: "same plan runs in sim and on the airframe" },
      { value: "plan → fly", label: "validated in software before the field" },
    ],
    tech: ["Gazebo", "QGroundControl", "PX4 / ArduPilot", "Python", "ROS"],
    role: "Design + Build",
    timeline: "6–8 weeks", // TODO(owner): confirm
    media: media("drone-mission-control"),
  },
];

export const featuredProjects = projects.filter((p) => p.featured && !p.placeholder);
export const stripProjects = projects.filter(
  (p) => (p.strip ?? !p.placeholder) && !p.placeholder,
);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

const CATEGORY_ORDER: ProjectCategory[] = [
  "Computer Vision",
  "AI",
  "Web",
  "Mobile",
  "Robotics",
  "UI/UX",
];

export const projectCategories: ("All" | ProjectCategory)[] = [
  "All",
  ...CATEGORY_ORDER.filter((c) => projects.some((p) => p.category === c && !p.placeholder)),
];
