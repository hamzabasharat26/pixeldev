"use client";

import { useState } from "react";
import type { Project, ProjectCategory } from "@/content/projects";
import { projectCategories } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/media/ProjectCard";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");

  const shown =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="on-dark bg-navy-ink pb-20 pt-8 md:pt-10">
      <div className="container-wide">
        <h2 className="sr-only">All projects</h2>
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
                  ? "border-amber-600 bg-amber-600 text-surface"
                  : "border-d-line text-d-muted hover:border-d-text/40 hover:text-d-text",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-d-muted">No projects in this category yet.</p>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
