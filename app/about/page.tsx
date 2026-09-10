import type { Metadata } from "next";
import { aboutStory, values } from "@/content/values";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StatsBar } from "@/components/sections/StatsBar";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "A small senior team building computer vision and AI systems, plus the full stack to ship them. Design, code, infrastructure and launch under one roof.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            A small team that ships.
          </>
        }
        intro="Pixel Dev Solutions is for people who need serious engineering without agency overhead."
      />

      <section className="section bg-paper">
        <div className="container-wide grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-16">
          <Eyebrow as="h2">Our story</Eyebrow>
          <Reveal className="max-w-[64ch] space-y-5 text-[1.08rem] leading-relaxed text-ink">
            {aboutStory.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section--band section">
        <div className="container-wide">
          <Eyebrow as="h2">What we hold to</Eyebrow>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <Reveal
                key={value.title}
                className="rounded-[var(--radius-card)] border border-line bg-surface p-7"
              >
                <h3 className="text-h4 text-ink">{value.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* No team section until there are real photos + names. */}

      <ProcessSteps />
      <StatsBar />
      <CtaBand />
    </>
  );
}
