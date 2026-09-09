import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/PageHero";
import { Prose } from "@/components/ui/Prose";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share with us.`,
  path: "/privacy",
});

const UPDATED = "September 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="section-y bg-grey-50 pt-0">
        <div className="container-page">
          <Prose>
            <p>
              <em>Last updated: {UPDATED}. This is a plain-language summary of
              how we handle your information. TODO(owner): have this reviewed
              against your jurisdiction&apos;s requirements before launch.</em>
            </p>

            <h2>What we collect</h2>
            <p>
              When you contact us through this site we collect the details you
              submit: your name, email address, and anything you write in the
              message, budget, and service fields. If you email or message us
              directly, we keep that correspondence.
            </p>
            <p>
              This site uses privacy-friendly analytics that measure page views
              and general traffic patterns without cookies or cross-site
              tracking. We do not build advertising profiles.
            </p>

            <h2>How we use it</h2>
            <ul>
              <li>To reply to your enquiry and scope potential work.</li>
              <li>To send you information you asked for.</li>
              <li>To understand, in aggregate, which pages are useful.</li>
            </ul>
            <p>
              We do not sell your information or share it with third parties for
              their own marketing.
            </p>

            <h2>Where it lives</h2>
            <p>
              Contact submissions are delivered to us by email through our email
              provider. Analytics data is processed by our analytics provider.
              These providers process data on our behalf under their own security
              and privacy terms.
            </p>

            <h2>How long we keep it</h2>
            <p>
              We keep enquiry correspondence for as long as it&apos;s useful for
              an active or prospective project, and then delete it. You can ask us
              to delete your data at any time.
            </p>

            <h2>Your choices</h2>
            <p>
              Email us at <a href={`mailto:${site.email}`}>{site.email}</a> to
              see what we hold about you, correct it, or have it deleted.
            </p>

            <h2>Contact</h2>
            <p>
              {site.name} · {site.address.line1}, {site.address.line2},{" "}
              {site.address.city}, {site.address.country} ·{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
          </Prose>
        </div>
      </section>
    </>
  );
}
