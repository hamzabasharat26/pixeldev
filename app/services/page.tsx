import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services } from "@/content/services";
import { faqs } from "@/content/faq";
import { faqJsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TagRow } from "@/components/ui/Tag";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Software Development Services",
  description:
    "Web, mobile, AI and automation, computer vision, UI/UX, and cloud — six disciplines delivered end-to-end by one senior team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          ...serviceJsonLd(
            services.map((s) => ({
              title: s.title,
              summary: s.summary,
              slug: s.slug,
            })),
          ),
          faqJsonLd(faqs),
        ]}
      />

      <PageHero
        eyebrow="Services"
        title="Everything it takes to ship a product."
        intro="Six disciplines, delivered by one team that owns the whole stack — so nothing gets lost between designer, developer, and deployment."
      />

      <section className="section-y bg-grey-50 pt-0">
        <div className="container-page">
          <p className="text-body-lg max-w-3xl text-grey-700">
            Most problems in software delivery aren&apos;t technical — they&apos;re
            handoff problems. A design that engineering can&apos;t build. A backend
            nobody documented. A launch with no plan for what happens next. We keep
            design, development, and infrastructure under one roof so the thing you
            approved is the thing that goes live.
          </p>

          <div className="mt-20 flex flex-col gap-24">
            {services.map((service, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
                >
                  <div className={cn(flip && "lg:order-2")}>
                    <Eyebrow>{`${service.index} · ${service.title}`}</Eyebrow>
                    <h2 className="text-h2 mt-4 text-navy">{service.deepTitle}</h2>
                    {service.deepBody.map((para) => (
                      <p
                        key={para.slice(0, 24)}
                        className="mt-4 max-w-xl leading-relaxed text-grey-700"
                      >
                        {para}
                      </p>
                    ))}
                    <TagRow items={service.deepTags} className="mt-6" />
                    <LinkButton
                      href="/contact"
                      variant="ghostLight"
                      className="mt-8"
                    >
                      Talk about {service.title.toLowerCase()}
                    </LinkButton>
                  </div>

                  <div
                    className={cn(
                      "rounded-[20px] border border-surface-border bg-surface-raised p-8 md:p-10",
                      flip && "lg:order-1",
                    )}
                  >
                    <p className="text-eyebrow text-amber-300">What you get</p>
                    <ul className="mt-6 flex flex-col gap-4">
                      {service.whatYouGet.map((item) => (
                        <li key={item} className="flex gap-3 text-grey-200">
                          <Check
                            size={18}
                            strokeWidth={2.5}
                            className="mt-0.5 shrink-0 text-amber"
                            aria-hidden="true"
                          />
                          <span className="text-[0.95rem] leading-relaxed">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ProcessSteps />
      <FaqAccordion />
      <CtaBand />
    </>
  );
}
