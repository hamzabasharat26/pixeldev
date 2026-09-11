import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { TagRow } from "@/components/ui/Tag";
import { AutoVideo } from "./AutoVideo";

/**
 * Portfolio card, shared by the homepage and /portfolio. Compact on purpose:
 * four fit across a wide screen, so the whole body of work scans at a glance.
 * The case study carries the detail, which is why the text is clamped.
 */
export function ProjectCard({
  project,
  priority = false,
  className,
}: {
  project: Project;
  /** Above the fold: load the still eagerly, since it may be the LCP image. */
  priority?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={`/portfolio/${project.slug}`}
      className={cn(
        "group flex translate-y-0 flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-e1 transition-[translate,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber/50 hover:shadow-e2",
        className,
      )}
    >
      <div className="relative border-b border-line">
        <AutoVideo
          poster={project.media.poster}
          posterSmall={project.media.posterSmall}
          webm={project.media.webm}
          mp4={project.media.mp4}
          alt={`${project.title}: ${project.outcome.label}`}
          aspect="16 / 10"
          sizes="(min-width: 1280px) 330px, (min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          rounded={false}
          priority={priority}
          className="det-frame"
        />
        <span className="text-eyebrow absolute left-2.5 top-2.5 rounded-full bg-navy-ink/85 px-2 py-0.5 text-[0.6rem] text-amber-300 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-[1.05rem] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-amber-700">
            {project.title}
          </h3>
          <span className="text-data shrink-0 text-[0.7rem] text-faint">
            {project.year}
          </span>
        </div>
        <p className="mt-1.5 line-clamp-2 text-[0.84rem] leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Mono is the voice of the measured value only. Running it through
            the whole sentence turns the card into a wall of monospace. */}
        <p className="mt-3 line-clamp-2 flex-1 text-[0.8rem] leading-relaxed text-muted">
          <span
            className={cn(
              "text-data font-semibold",
              // `signal` cyan is a dark-ground colour and drops to ~2:1 on
              // white, so the light card uses a measured mustard step for both.
              project.metricsAccent === "signal"
                ? "text-clay-600"
                : "text-amber-700",
            )}
          >
            {project.outcome.value}
          </span>{" "}
          {project.outcome.label}
        </p>

        <TagRow items={project.tech.slice(0, 3)} className="mt-3" />
      </div>
    </Link>
  );
}
