import { featuredProjects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StackedWork } from "@/components/sections/StackedWork";
import { ProcessSteps } from "@/components/sections/ProcessSteps";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <StackedWork projects={featuredProjects} />
      <ProcessSteps />
    </>
  );
}
