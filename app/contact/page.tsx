import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ContactForm } from "@/components/sections/ContactForm";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us what you're building. We reply within 24 hours with honest thoughts on scope, timeline, and cost.",
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
    <section className="bg-grey-50 pb-24 pt-32 md:pt-40">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="text-h1 mt-5 max-w-lg text-navy">
            Let&apos;s talk about what you&apos;re building.
          </h1>
          <p className="text-body-lg mt-5 max-w-md text-grey-700">
            Tell us about the project. We reply within 24 hours with honest
            thoughts on scope, timeline, and cost — even if the answer is that
            we&apos;re not the right fit.
          </p>

          <dl className="mt-10 flex flex-col gap-6 border-t border-grey-200 pt-8">
            {blocks.map((block) => (
              <div key={block.label}>
                <dt className="text-eyebrow text-grey-500">{block.label}</dt>
                <dd className="mt-1 text-navy">
                  {block.href ? (
                    <a
                      href={block.href}
                      className="underline decoration-amber/60 underline-offset-4 hover:text-navy-600"
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
