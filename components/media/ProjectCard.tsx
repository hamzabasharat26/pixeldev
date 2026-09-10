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
        "group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-d-line bg-[linear-gradient(180deg,var(--color-d-surface-2),var(--color-navy-900))] transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-amber/45",
        className,
      )}
    >
      <div className="relative border-b border-d-line">
        <AutoVideo
          poster={project.media.poster}
          webm={project.media.webm}
          mp4={project.media.mp4}
          alt={`${project.title} — ${project.outcome.label}`}
          aspect="16 / 10"
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 100vw"
          rounded={false}
        />
        <span className="text-eyebrow absolute left-3 top-3 rounded-full bg-navy-ink/80 px-2.5 py-1 text-[0.6rem] text-amber-300 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-h4 text-d-text">{project.title}</h3>
          <span className="text-data text-xs text-d-muted">{project.year}</span>
        </div>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-d-muted">
          {project.summary}
        </p>

        <p className="text-data mt-4 text-sm text-d-muted">
          <span
            className={cn(
              "font-semibold",
              project.metricsAccent === "signal" ? "text-signal" : "text-amber-300",
            )}
          >
            {project.outcome.value}
          </span>{" "}
          {project.outcome.label}
        </p>

        <TagRow items={project.tech.slice(0, 4)} tone="light" className="mt-4" />
      </div>
    </Link>
  );
}
