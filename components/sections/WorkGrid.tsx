"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project, ProjectCategory } from "@/content/projects";
import { projectCategories } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/media/ProjectCard";

export function WorkGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<"All" | ProjectCategory>("All");
  const reduce = useReducedMotion();

  const shown =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="bg-paper pb-20 pt-8 md:pt-10">
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
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-line-2 text-muted hover:border-ink/35 hover:text-ink",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-muted">No projects in this category yet.</p>
        ) : (
          /* Filtering is a user action that changes what's on screen, so it
             gets motion: cards that survive the filter slide to their new
             slot instead of teleporting, which makes the change readable.
             `layout` on the item is what does that work. */
          <motion.div
            layout={!reduce}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((project) => (
                <motion.div
                  key={project.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex"
                >
                  <ProjectCard project={project} className="w-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
