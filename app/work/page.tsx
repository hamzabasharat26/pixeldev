import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { WorkGrid } from "@/components/sections/WorkGrid";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Computer vision, AI and full-stack systems Pixel Dev Solutions has designed, built and put into production: detection, tracking, quality control, RAG, OCR and more.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Systems we&apos;ve shipped, in production.
          </>
        }
        intro="Real projects, real footage. Client names are held back; the capability is what's on show."
      />
      <WorkGrid projects={projects} />
      <CtaBand />
    </>
  );
}
