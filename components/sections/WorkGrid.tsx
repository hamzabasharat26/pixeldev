"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { Project, ProjectCategory } from "@/content/projects";
import { projectCategories } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ProjectCard } from "@/components/media/ProjectCard";

/** Cards in the first row load eagerly: one of them is the page's LCP image. */
const FIRST_ROW = 4;

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
          {projectCategories.map((cat) => {
            const on = active === cat;
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={on}
                onClick={() => setActive(cat)}
                className={cn(
                  "text-eyebrow inline-flex items-center gap-2 rounded-full border px-3.5 py-2 transition-colors",
                  on
                    ? "border-amber-600 bg-amber-600 text-white"
                    : "border-line-2 text-muted hover:border-ink/35 hover:text-ink",
                )}
              >
                {cat}
                {/* A solid pill on the active chip. The old translucent white
                    wash over mustard measured 3.71:1 and failed AA. */}
                <span
                  className={cn(
                    "text-data rounded-full px-1.5 text-[0.68rem]",
                    on ? "bg-white text-amber-700" : "bg-surface-2 text-faint",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {shown.length === 0 ? (
          <p className="mt-16 text-muted">No projects in this category yet.</p>
        ) : (
          /* Filtering is a user action that changes what's on screen, so it
             gets motion: cards that survive the filter slide to their new
             slot instead of teleporting, which makes the change readable.
             Four columns on wide screens keep each card compact enough to scan
             the whole set. */
          <motion.div
            layout={!reduce}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout={!reduce}
                  initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="flex"
                >
                  <ProjectCard
                    project={project}
                    priority={active === "All" && i < FIRST_ROW}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
