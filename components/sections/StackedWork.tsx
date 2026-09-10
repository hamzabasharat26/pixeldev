import type { Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WorkCardBody } from "./WorkCardBody";

/** Featured case studies — a clean stacked set. No scroll effect, no JS. */
export function StackedWork({ projects }: { projects: Project[] }) {
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

        <div className="mt-10 flex flex-col gap-5">
          {projects.map((project) => (
            <Reveal key={project.slug}>
              <WorkCardBody project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
