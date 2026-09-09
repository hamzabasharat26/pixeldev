import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description:
    "Selected software projects with measurable outcomes across web, mobile, AI, and computer vision.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        tone="dark"
        eyebrow="Selected work"
        title="Work we've shipped."
        intro="Real products, in production, with results we can point to."
      />
      <WorkGrid projects={projects} />
      <CtaBand />
    </>
  );
}
