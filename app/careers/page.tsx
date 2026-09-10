import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Prose } from "@/components/ui/Prose";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "We hire senior people and keep the team small. No open roles right now — but we read every good message.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            We keep the team small on purpose.
          </>
        }
        intro="Senior people, one group that owns the whole build, no layers in between. That only works if we stay deliberate about who joins."
      />

      <section className="section bg-paper">
        <div className="container-wide">
          <Prose>
            <h2>No open roles right now</h2>
            <p>
              We&apos;re not actively hiring. When that changes, the roles land
              here first.
            </p>
            <h2>If you think you&apos;re a fit anyway</h2>
            <p>
              We&apos;d rather meet strong people early than scramble later. If
              you&apos;re a senior engineer, designer or ML practitioner who
              likes owning work end to end, send a note to{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> with a couple of
              things you&apos;ve shipped and what you want to build next. Skip the
              cover letter.
            </p>
          </Prose>
        </div>
      </section>

      <CtaBand
        heading="Here to build something instead?"
        sub="If you're here for a project rather than a job, the contact form is the fastest way in."
      />
    </>
  );
}
