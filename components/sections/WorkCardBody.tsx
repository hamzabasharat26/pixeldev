import Link from "next/link";
import type { Project } from "@/content/projects";
import { TagRow } from "@/components/ui/Tag";
import { AutoVideo } from "@/components/media/AutoVideo";

/** The card used by both the plain stack and the animated deck. */
export function WorkCardBody({ project }: { project: Project }) {
  return (
    <article className="grid gap-6 overflow-hidden rounded-[var(--radius-panel)] border border-d-line bg-[linear-gradient(165deg,var(--color-d-surface-2),var(--color-navy-900))] p-5 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-10 md:p-8">
      <AutoVideo
        poster={project.media.poster}
        webm={project.media.webm}
        mp4={project.media.mp4}
        alt={`${project.title} — ${project.outcome.label}`}
        aspect="16 / 10"
        sizes="(min-width: 768px) 560px, 100vw"
      />

      <div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-eyebrow inline-flex items-center rounded-full border border-amber/40 px-2.5 py-1 text-amber-300">
            {project.category}
          </span>
          <span className="text-data text-xs text-d-muted">{project.year}</span>
        </div>

        <p className="mt-5 flex items-baseline gap-2">
          <span
            className={`text-data text-3xl font-bold md:text-4xl ${
              project.metricsAccent === "signal" ? "text-signal" : "text-amber"
            }`}
          >
            {project.outcome.value}
          </span>
        </p>
        <p className="mt-1 max-w-sm text-sm text-d-muted">
          {project.outcome.label}
        </p>

        <h3 className="text-h3 mt-5 text-d-text">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-d-muted">
          {project.summary}
        </p>

        <TagRow
          items={project.tech.slice(0, 5)}
          tone="light"
          className="mt-5"
        />

        <Link
          href={`/work/${project.slug}`}
          className="text-eyebrow mt-6 inline-flex items-center gap-1.5 text-d-text transition-colors hover:text-amber-300"
        >
          Read the case study
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </article>
  );
}
