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
        "group flex flex-col overflow-hidden rounded-[16px] border border-surface-border bg-surface-raised transition-[transform,border-color] duration-200 hover:-translate-y-1 hover:border-amber/50",
        className,
      )}
    >
      <div className="relative">
        <AutoVideo
          poster={project.media.poster}
          webm={project.media.webm}
          mp4={project.media.mp4}
          alt={`${project.title} — ${project.summary}`}
          aspect="16 / 10"
          rounded={false}
        />
        {project.placeholder && (
          <span className="text-eyebrow absolute left-3 top-3 rounded bg-navy px-2 py-1 text-[0.6rem] text-amber-300">
            Placeholder
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="text-data flex items-center gap-2 text-xs text-grey-500">
          <span className="text-amber-300">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>{project.year}</span>
        </div>

        <h3 className="text-h4 mt-2 text-grey-50">{project.title}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-grey-400">
          {project.summary}
        </p>

        <p className="text-data mt-4 text-sm text-grey-300">
          <span className="font-semibold text-amber">{project.outcome.value}</span>{" "}
          {project.outcome.label}
        </p>

        <TagRow
          items={project.tech.slice(0, 4)}
          tone="light"
          className="mt-4"
        />
      </div>
    </Link>
  );
}
