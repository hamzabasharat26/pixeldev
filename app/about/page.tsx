import type { Metadata } from "next";
import { aboutStory, values } from "@/content/values";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { StatsBar } from "@/components/sections/StatsBar";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMetadata({
  title: "About Us",
  description:
    "A small, senior software studio that owns design, code, and deployment — and hands you full ownership at the end.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A small team that ships."
        intro="Pixel Dev Solutions is a software studio for people who need serious engineering without agency overhead."
      />

      <section className="section-y bg-grey-50 pt-0">
        <div className="container-page grid gap-10 lg:grid-cols-[200px_1fr] lg:gap-16">
          <Eyebrow>Our story</Eyebrow>
          <div className="max-w-[62ch] space-y-5 text-[1.05rem] leading-relaxed text-grey-800">
            {aboutStory.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y bg-grey-100">
        <div className="container-page">
          <Eyebrow>What we hold to</Eyebrow>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-[16px] border border-grey-200 bg-white p-8"
              >
                <h3 className="text-h4 text-navy">{value.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-grey-700">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team section intentionally omitted until there are real photos + names. */}

      <ProcessSteps />
      <StatsBar />
      <CtaBand />
    </>
  );
}
