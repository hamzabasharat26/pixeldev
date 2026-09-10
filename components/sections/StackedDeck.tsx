"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";
import type { Project } from "@/content/projects";
import { WorkCardBody } from "./WorkCardBody";

/**
 * The sticky/scale deck — the second "bold" moment. Desktop + motion only;
 * loaded lazily by StackedWork so mobile never fetches motion.
 */
function DeckCard({
  project,
  index,
  count,
  progress,
}: {
  project: Project;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (count - index - 1) * 0.04;
  const scale = useTransform(progress, [index / count, 1], [1, targetScale]);

  return (
    <div className="sticky top-[14vh] flex h-[72vh] items-start justify-center">
      <motion.div
        style={{ scale, top: `${index * 20}px`, willChange: "transform" }}
        className="relative w-full max-w-[1080px] origin-top rounded-[var(--radius-panel)] shadow-[0_-1px_0_rgb(233_161_60/0.22),0_36px_70px_-24px_rgb(0_0_0/0.65)]"
      >
        <WorkCardBody project={project} />
      </motion.div>
    </div>
  );
}

export default function StackedDeck({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="container-wide relative mt-10">
      {projects.map((project, i) => (
        <DeckCard
          key={project.slug}
          project={project}
          index={i}
          count={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
