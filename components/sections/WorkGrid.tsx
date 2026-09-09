"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { projectCategories } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/media/ProjectCard";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const shown =
    active === "All"
      ? projects
      : projects.filter((p) => p.category === active);

  return (
    <section className="bg-surface-base pb-24 pt-10 md:pt-12">
      <div className="container-page">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {projectCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={active === cat}
              onClick={() => setActive(cat)}
              className={cn(
                "text-eyebrow rounded-full border px-3.5 py-2 transition-colors",
                active === cat
                  ? "border-amber bg-amber text-navy"
                  : "border-surface-border text-grey-400 hover:border-grey-500 hover:text-grey-200",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-grey-400">No projects in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
