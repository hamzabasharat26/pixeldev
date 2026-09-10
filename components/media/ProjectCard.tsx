import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { TagRow } from "@/components/ui/Tag";
import { AutoVideo } from "./AutoVideo";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-e1 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber/50 hover:shadow-e2",
        className,
      )}
    >
      <div className="relative border-b border-line">
        <AutoVideo
          poster={project.media.poster}
          posterSmall={project.media.posterSmall}
          webm={project.media.webm}
          mp4={project.media.mp4}
          alt={`${project.title} — ${project.outcome.label}`}
          aspect="16 / 10"
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          rounded={false}
          className="det-frame"
        />
        <span className="text-eyebrow absolute left-3 top-3 rounded-full bg-navy-ink/85 px-2.5 py-1 text-[0.6rem] text-amber-300 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-h4 text-ink">{project.title}</h3>
          <span className="text-data shrink-0 text-xs text-faint">
            {project.year}
          </span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        {/* Mono is the voice of the measured value only — running it through
            the whole sentence turns the card into a wall of monospace. */}
        <p className="mt-4 text-sm leading-relaxed text-muted">
          <span
            className={cn(
              "text-data font-semibold",
              // `signal` cyan is a dark-ground colour; on white it drops to
              // ~2:1, so the light card uses the measured mustard step for
              // both. The distinction still reads on the case-study page.
              project.metricsAccent === "signal"
                ? "text-clay-600"
                : "text-amber-700",
            )}
          >
            {project.outcome.value}
          </span>{" "}
          {project.outcome.label}
        </p>

        <TagRow items={project.tech.slice(0, 4)} className="mt-4" />
      </div>
    </Link>
  );
}
