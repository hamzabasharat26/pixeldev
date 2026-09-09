import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that apply to your use of the ${site.name} website.`,
  path: "/terms",
});

const UPDATED = "September 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" />
      <section className="section-y bg-grey-50 pt-0">
        <div className="container-page">
          <Prose>
            <p>
              <em>Last updated: {UPDATED}. These terms cover your use of this
              website only. Project work is governed by a separate written
              agreement. TODO(owner): have this reviewed before launch.</em>
            </p>

            <h2>Using this site</h2>
            <p>
              This website is provided for information about {site.name} and its
              services. You may read, share, and link to it. You may not
              misrepresent it as your own, use it to break the law, or attempt to
              disrupt or gain unauthorised access to it.
            </p>

            <h2>Content and ownership</h2>
            <p>
              The text, design, code, and images on this site are owned by{" "}
              {site.name} unless credited otherwise. Project case studies
              describe work delivered to clients and are published with their
              awareness.
            </p>

            <h2>No warranty</h2>
            <p>
              The site is provided &ldquo;as is&rdquo;. We work to keep it
              accurate and available, but we don&apos;t guarantee it will always
              be error-free or uninterrupted, and nothing here is a binding offer
              or professional advice.
            </p>

            <h2>Enquiries</h2>
            <p>
              Sending us a message through the contact form does not create a
              contract or a client relationship. Work begins only once we&apos;ve
              both signed a project agreement.
            </p>

            <h2>Changes</h2>
            <p>
              We may update these terms. The current version always lives at this
              URL, with the date above.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these terms:{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
