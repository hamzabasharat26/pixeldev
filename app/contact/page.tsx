import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. We reply within 24 hours with honest thoughts on scope, timeline and cost, even if the answer is that we're not the right fit.",
  path: "/contact",
});

const blocks = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone / WhatsApp", value: site.phoneDisplay, href: site.phoneHref },
  {
    label: "Office",
    value: `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.country}`,
  },
  { label: "Response time", value: site.responseTime },
];

export default function ContactPage() {
  return (
    <section className="bg-paper pb-24 pt-32 md:pt-40">
      <div className="container-wide grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-h1 mt-5 max-w-lg text-ink">
            Tell us what you&apos;re building.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            A few sentences on the project is plenty. We reply within 24 hours
            with honest thoughts on scope, timeline and cost, even if the answer
            is that we&apos;re not the right fit.
          </p>

          <dl className="mt-10 flex flex-col gap-6 border-t border-line-2 pt-8">
            {blocks.map((block) => (
              <div key={block.label}>
                <dt className="text-eyebrow text-faint">{block.label}</dt>
                <dd className="mt-1 text-ink">
                  {block.href ? (
                    <a
                      href={block.href}
                      className="underline decoration-amber-600/60 underline-offset-4 transition-colors hover:text-amber-700"
                    >
                      {block.value}
                    </a>
                  ) : (
                    block.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
