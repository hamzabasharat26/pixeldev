import { featuredProjects } from "@/content/projects";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StackedWork } from "@/components/sections/StackedWork";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProofBand } from "@/components/sections/ProofBand";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";
import { JsonLd } from "@/components/ui/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import { faqs } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <StackedWork projects={featuredProjects} />
      <ProcessSteps />
      <ProofBand />
      <StackMarquee />
      <Testimonials />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
