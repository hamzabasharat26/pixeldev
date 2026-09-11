import type { Metadata } from "next";
import { featuredProjects } from "@/content/projects";
import { site } from "@/content/site";
import { faqs } from "@/content/faq";
import { pageMetadata, faqJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { WorkStrip } from "@/components/sections/WorkStrip";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { StackedWork } from "@/components/sections/StackedWork";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { ProofBand } from "@/components/sections/ProofBand";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  description: site.metaDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <WorkStrip />
      <StackMarquee />
      <ServicesGrid />
      <StackedWork projects={featuredProjects} />
      <ProcessSteps />
      <ProofBand />
      <Testimonials />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
