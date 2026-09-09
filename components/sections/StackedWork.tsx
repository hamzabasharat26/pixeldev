"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagRow } from "@/components/ui/Tag";
import { AutoVideo } from "@/components/media/AutoVideo";

function useIsDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return desktop;
}

function CardBody({ project }: { project: Project }) {
  return (
    <article className="grid gap-8 rounded-[20px] border border-surface-border bg-surface-raised p-6 md:grid-cols-2 md:items-center md:p-10">
      <AutoVideo
        poster={project.media.poster}
        webm={project.media.webm}
        mp4={project.media.mp4}
        alt={`${project.title}: ${project.summary}`}
        aspect="16 / 10"
        sizes="(min-width: 768px) 512px, 100vw"
      />

      <div>
        <span className="text-eyebrow inline-flex items-center rounded-full border border-amber/50 px-2.5 py-1 text-amber-300">
          {project.category}
        </span>

        <p className="mt-5">
          <span className="text-data text-3xl font-bold text-amber md:text-4xl">
            {project.outcome.value}
          </span>
        </p>
        <p className="mt-1 text-sm text-grey-400">{project.outcome.label}</p>

        <h3 className="text-h3 mt-5 text-grey-50">
          {project.title}
          <span className="text-data ml-3 align-middle text-sm font-normal text-grey-400">
            {project.year}
          </span>
        </h3>
        <p className="mt-3 max-w-md text-grey-300">{project.summary}</p>

        <TagRow items={project.tech.slice(0, 5)} tone="light" className="mt-6" />

        <Link
          href={`/work/${project.slug}`}
          className="text-eyebrow mt-7 inline-flex items-center gap-1.5 text-grey-100 hover:text-white"
        >
          View case study
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}

function StackCard({
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
  const targetScale = 1 - (count - index - 1) * 0.045;
  const scale = useTransform(progress, [index / count, 1], [1, targetScale]);

  return (
    <div className="sticky top-[12vh] flex h-[74vh] items-start justify-center">
      <motion.div
        style={{
          scale,
          top: `${index * 22}px`,
          willChange: "transform",
        }}
        className="relative w-full max-w-[1080px] origin-top shadow-[0_-1px_0_rgba(233,161,60,0.25),0_30px_60px_-20px_rgba(0,0,0,0.6)]"
      >
        <CardBody project={project} />
      </motion.div>
    </div>
  );
}

function AnimatedStack({ projects }: { projects: Project[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="container-page relative mt-8">
      {projects.map((project, i) => (
        <StackCard
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

export function StackedWork({ projects }: { projects: Project[] }) {
  const reduce = useReducedMotion();
  const desktop = useIsDesktop();
  // The deck only earns its scroll distance with 3+ cards; below that, a plain
  // stack reads better. Add a third featured project and the deck turns on.
  const animated = desktop && !reduce && projects.length >= 3;

  return (
    <section className="on-dark section-y">
      <div className="container-page">
        <SectionHeading
          tone="light"
          eyebrow="Selected work"
          title="Shipped products. Measurable outcomes."
          intro="A few of the systems we've designed, built, and put into production."
          action={{ label: "View all projects", href: "/work" }}
        />
      </div>

      {animated ? (
        <AnimatedStack projects={projects} />
      ) : (
        <div className="container-page mt-8 flex flex-col gap-6">
          {projects.map((project) => (
            <CardBody key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
