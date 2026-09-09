export const projects = [
  {
    slug: "magic-qc",
    name: "Magic QC Inspector",
    industry: "Manufacturing",
    year: "2024",
    duration: "8 weeks",
    clip: "/clips/magic-8s.mp4",
    poster: "/posters/magic-poster.jpg",
    featured: true,
    deployed: true,
    line: "Real-time micro-defect detection on high-speed circuit board assembly lines.",
    metric: "99.8%",
    problem: "A European PCB manufacturer was losing $40k a month to micro-soldering defects that slipped past human inspectors. They needed a system capable of analyzing boards moving at 2 meters per second, detecting anomalies as small as 0.1mm.\n\nOff-the-shelf software failed because the reflective nature of solder joints confused standard computer vision models.",
    constraint: "The system had to run entirely offline on the factory floor, with a hard latency limit of 40ms per frame to trigger the pneumatic rejection arm in time.",
    built: "We developed a custom YOLOv8 architecture tailored for small object detection, trained on a synthetic dataset we generated to simulate various lighting conditions and solder reflections. \n\nWe quantized the model to INT8 and optimized it using TensorRT, deploying it directly onto an NVIDIA Jetson Orin Nano mounted above the conveyor belt. The model communicates with the factory PLC via Modbus TCP.",
    screenshots: [
      { src: "/posters/magic-poster.jpg", caption: "Bounding boxes identifying bridge defects on the PCB in real-time." }
    ],
    stack: ["PyTorch", "TensorRT", "YOLOv8", "C++", "Modbus"],
    confidence: 0.98,
    quote: {
      text: "The defect detection model they built caught flaws we didn't even know we had. It paid for itself in 3 weeks.",
      author: "Sarah Jenkins",
      role: "VP of Manufacturing"
    }
  },
  {
    slug: "garment-counting",
    name: "Automated Garment Tally",
    industry: "Textile",
    year: "2023",
    duration: "5 weeks",
    clip: "/clips/tshirt-8s.mp4",
    poster: "/posters/tshirt-poster.jpg",
    featured: true,
    deployed: true,
    line: "High-speed bulk inventory counting for a global apparel distributor.",
    metric: "12,000/hr",
    problem: "Inventory counts at the end of the shift were highly inaccurate. Workers were manually counting garments as they were thrown onto sorting belts, leading to fatigue and a 4% error rate that caused massive shipping discrepancies.",
    constraint: "Garments overlap, fold, and occlude each other on the belt. The model couldn't rely on clean, flat shapes—it had to understand messy, bunched-up fabric.",
    built: "We implemented a DeepSORT tracking algorithm combined with a custom object detection model. By tracking the centroid of each garment across multiple frames, we prevented double-counting even when items tumbled over each other. \n\nThe live count is streamed via WebSockets to a React dashboard on the floor manager's tablet.",
    screenshots: [
      { src: "/posters/tshirt-poster.jpg", caption: "DeepSORT tracking IDs assigned to garments on the sorting belt." }
    ],
    stack: ["DeepSORT", "OpenCV", "Next.js", "WebSockets"],
    confidence: 0.95
  },
  {
    slug: "dock-vision",
    name: "Dock Vision Tracking",
    industry: "Logistics",
    year: "2023",
    duration: "10 weeks",
    clip: "/clips/dock-8s.mp4",
    poster: "/posters/dock-poster.jpg",
    featured: true,
    deployed: true,
    line: "Automated forklift and pallet tracking for a 200,000 sq ft warehouse.",
    metric: "40% faster",
    problem: "Warehouse managers had no real-time visibility into dock utilization. Forklifts were causing bottlenecks at loading bays, and pallets were frequently staged in the wrong zones, delaying truck departures.",
    constraint: "The warehouse ceiling was 40 feet high. The cameras had a massive field of view with severe fisheye distortion, making standard object detection incredibly inaccurate at the edges of the frame.",
    built: "We wrote a custom camera calibration pipeline to undistort the video feeds in real-time. We then trained a model to identify empty vs. loaded forklifts and specific pallet types. \n\nBy mapping the camera view to a 2D floor plan, we built a digital twin dashboard that tracks exactly where bottlenecks are forming.",
    screenshots: [
      { src: "/posters/dock-poster.jpg", caption: "Heatmap visualization of forklift traffic at the loading bays." }
    ],
    stack: ["OpenCV", "Python", "React", "PostgreSQL"],
    confidence: 0.99,
    quote: {
      text: "Our shipping dock throughput increased by 40% after implementing their automated tracking system.",
      author: "Marcus Thorne",
      role: "Operations Director"
    }
  },
  {
    slug: "passenger-tracking",
    name: "Transit Flow Analytics",
    industry: "Transport",
    year: "2024",
    duration: "6 weeks",
    clip: "/clips/passenger-8s.mp4",
    poster: "/posters/passenger-poster.jpg",
    featured: true,
    deployed: false,
    line: "Crowd density and flow analysis for municipal train stations.",
    metric: "94% accuracy",
    problem: "The transit authority needed to optimize train scheduling based on actual platform crowding, rather than historical estimates. They needed to count people entering and exiting trains in real-time.",
    constraint: "Strict GDPR compliance meant no facial recognition or PII could be stored or processed. The edge devices had limited compute power and had to run entirely off solar/battery setups.",
    built: "We deployed a lightweight, privacy-first head-tracking model using MobileNetV3. The system processes frames locally, discards the video instantly, and only transmits raw numerical telemetry (count, direction, speed) to the central server via LoRaWAN.",
    screenshots: [
      { src: "/posters/passenger-poster.jpg", caption: "Privacy-first tracking lines monitoring platform boarding flow." }
    ],
    stack: ["TensorFlow Lite", "MobileNet", "LoRaWAN", "Go"],
    confidence: 0.92
  },
  {
    slug: "fabric-inspection",
    name: "Textile Flaw Detector",
    industry: "Textile",
    year: "2022",
    duration: "12 weeks",
    clip: null, // Note: must render poster
    poster: "/posters/fabric-poster.jpg",
    featured: true,
    deployed: true,
    line: "Automated loom inspection catching thread breaks instantly.",
    metric: "Zero waste",
    problem: "A single thread break on a high-speed loom can ruin hundreds of meters of fabric before an operator notices. The factory was losing thousands of dollars a week in wasted material.",
    constraint: "The camera was subjected to intense vibration from the looms, and the fabric patterns changed daily, meaning a standard pattern-matching algorithm would fail instantly.",
    built: "We implemented an anomaly detection autoencoder. Instead of training the model on what a 'defect' looks like (which varies wildly), we trained it on what 'normal' fabric looks like for that specific run. \n\nWhen a thread breaks, the model registers a high reconstruction error and sends a hardware interrupt to stop the loom instantly.",
    screenshots: [
      { src: "/posters/fabric-poster.jpg", caption: "Autoencoder heatmaps highlighting structural anomalies in the weave." }
    ],
    stack: ["PyTorch", "Autoencoders", "CUDA", "Hardware Interrupts"],
    confidence: 0.97
  },
  {
    slug: "theft-detection",
    name: "Retail Anomaly Vision",
    industry: "Retail security",
    year: "2023",
    duration: "7 weeks",
    clip: "/clips/theft-8s.mp4",
    poster: "/posters/theft-poster.jpg",
    featured: true,
    deployed: true,
    line: "Behavioral analysis at self-checkout kiosks to prevent shrinkage.",
    metric: "18% drop",
    problem: "A supermarket chain was experiencing heavy 'shrinkage' (theft) at self-checkout lanes, specifically the 'sweet-hearting' technique where a barcode is covered during scanning.",
    constraint: "The model had to differentiate between a clumsy customer struggling to scan an item and deliberate theft. False positives would anger honest shoppers.",
    built: "We trained a multi-stage pipeline: first tracking the user's hands, then identifying the product, and finally correlating the visual scan motion with the actual point-of-sale API logs. If a scan motion occurred without a corresponding API ping, a silent alert is flagged to the floor manager's smartwatch.",
    screenshots: [
      { src: "/posters/theft-poster.jpg", caption: "Hand-tracking overlay cross-referenced with POS data streams." }
    ],
    stack: ["Pose Estimation", "Node.js", "Redis", "Webhooks"],
    confidence: 0.96
  },
  {
    slug: "mri-segmentation",
    name: "MRI Scan Segmenter",
    industry: "Medical imaging",
    year: "2023",
    duration: "14 weeks",
    clip: "/clips/mri-8s.mp4",
    poster: "/posters/mri-poster.jpg",
    featured: false,
    deployed: false,
    line: "Volumetric segmentation of brain lesions in 3D MRI scans.",
    metric: "91% DICE",
    problem: "Radiologists were spending hours manually tracing lesion boundaries on 3D MRI scans to track tumor growth. The process was tedious and subject to high inter-operator variability.",
    constraint: "Medical data is 3-dimensional (voxels, not pixels) and extremely large. The models needed to run on local hospital workstations with limited GPU VRAM.",
    built: "We built a 3D U-Net architecture optimized with mixed-precision training. The model processes the scans in smaller overlapping 3D patches, reassembling them to provide a complete volumetric mask of the lesion in under 2 minutes.",
    screenshots: [
      { src: "/posters/mri-poster.jpg", caption: "3D U-Net voxel segmentation mask isolating the lesion." }
    ],
    stack: ["3D U-Net", "PyTorch", "DICOM", "Python"],
    confidence: 0.94
  },
  {
    slug: "padel-analytics",
    name: "Court Motion Analytics",
    industry: "Sport",
    year: "2024",
    duration: "4 weeks",
    clip: "/clips/padel-8s.mp4",
    poster: "/posters/padel-poster.jpg",
    featured: false,
    deployed: false,
    line: "Player positioning and ball-tracking for automated match highlights.",
    metric: "60fps",
    problem: "A sports analytics startup wanted to provide amateur Padel players with automated highlight reels and heatmaps, similar to professional tennis broadcasts.",
    constraint: "The ball in Padel is small, moves incredibly fast (blurring heavily), and blends in with the background court colors.",
    built: "We utilized TrackNetV2 for high-speed ball tracking, combined with YOLOv8 for player pose estimation. We built a Next.js web application where players can log in, view their court coverage heatmaps, and watch auto-generated highlight clips of their best rallies.",
    screenshots: [
      { src: "/posters/padel-poster.jpg", caption: "Player court coverage heatmaps and high-speed ball trajectory tracking." }
    ],
    stack: ["TrackNet", "YOLOv8", "Next.js", "Tailwind"],
    confidence: 0.91
  }
];
