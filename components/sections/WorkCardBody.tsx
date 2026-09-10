import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";
import { TagRow } from "@/components/ui/Tag";
import { MetricValue } from "@/components/ui/MetricValue";
import { AutoVideo } from "@/components/media/AutoVideo";

/**
 * One case study. `flip` mirrors the layout so a run of these reads as a
 * sequence rather than four copies of the same row.
 */
export function WorkCardBody({
  project,
  flip = false,
}: {
  project: Project;
  flip?: boolean;
}) {
  return (
    <article className="grid gap-6 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface p-5 shadow-e1 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10 md:p-8">
      <AutoVideo
        poster={project.media.poster}
        posterSmall={project.media.posterSmall}
        webm={project.media.webm}
        mp4={project.media.mp4}
        alt={`${project.title} — ${project.outcome.label}`}
        aspect="16 / 10"
        sizes="(min-width: 768px) 560px, 100vw"
        className={cn("det-frame", flip && "md:order-2")}
      />

      <div className={cn(flip && "md:order-1")}>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow inline-flex items-center rounded-full border border-amber/45 px-2.5 py-1 text-amber-700">
            {project.category}
          </span>
          <span className="text-data text-xs text-faint">{project.year}</span>
        </div>

        <MetricValue
          value={project.outcome.value}
          className={`mt-5 ${
            // `signal` cyan is a dark-ground colour and fails on white.
            project.metricsAccent === "signal"
              ? "text-clay-600"
              : "text-amber-700"
          }`}
        />
        <p className="mt-1.5 max-w-sm text-sm text-muted">
          {project.outcome.label}
        </p>

        <h3 className="text-h3 mt-5 text-ink">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <TagRow items={project.tech.slice(0, 5)} className="mt-5" />

        <Link
          href={`/work/${project.slug}`}
          className="mt-6 inline-block text-[0.9rem] font-medium text-ink underline decoration-amber/60 decoration-1 underline-offset-4 transition-colors hover:text-amber-700 hover:decoration-amber-700"
        >
          Read the case study
        </Link>
      </div>
    </article>
  );
}
