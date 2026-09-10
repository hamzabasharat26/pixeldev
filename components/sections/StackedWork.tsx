import type { Project } from "@/content/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/media/ProjectCard";

/**
 * Featured case studies. A compact grid, not full-bleed rows: at container
 * width each project was taking most of a screen, which made five of them read
 * as five separate pages rather than a portfolio you can scan.
 *
 * Uses the same ProjectCard as /work on purpose — one card, one behaviour,
 * one place to change it.
 */
export function StackedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="section bg-paper">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Selected work"
          title={<>Shipped systems, measurable outcomes.</>}
          intro="A few of the systems we've designed, built and put into production."
          action={{ label: "View all work", href: "/work" }}
        />

        <Reveal className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
