"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import type { Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorkCardBody } from "./WorkCardBody";

// The scroll-linked deck (with `motion`) is only ever needed on a desktop
// viewport without reduced-motion — load it lazily so mobile never fetches it.
const StackedDeck = dynamic(() => import("./StackedDeck"), { ssr: false });

export function StackedWork({ projects }: { projects: Project[] }) {
  const [deck, setDeck] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () =>
      setDeck(mq.matches && !reduce.matches && projects.length >= 3);
    sync();
    mq.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [projects.length]);

  return (
    <section className="on-dark section bg-navy-ink">
      <div className="container-wide">
        <SectionHeading
          tone="light"
          eyebrow="Selected work"
          title={
            <>
              Shipped systems, <em>measurable</em> outcomes.
            </>
          }
          intro="A few of the systems we've designed, built and put into production."
          action={{ label: "View all work", href: "/work" }}
        />
      </div>

      {deck ? (
        <StackedDeck projects={projects} />
      ) : (
        <div className="container-wide mt-10 flex flex-col gap-5">
          {projects.map((project) => (
            <WorkCardBody key={project.slug} project={project} />
          ))}
        </div>
      )}
    </section>
  );
}
