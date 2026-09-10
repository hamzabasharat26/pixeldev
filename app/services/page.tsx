import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { services } from "@/content/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { TagRow } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Computer vision, AI and automation, web platforms, mobile apps, UI/UX and cloud — six disciplines, delivered end-to-end by one senior team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd(
          services.map((s) => ({
            title: s.title,
            summary: s.summary,
            slug: s.slug,
          })),
        )}
      />

      <PageHero
        eyebrow="Services"
        title={
          <>
            Everything it takes to ship a product.
          </>
        }
        intro="Six disciplines, one team that owns the whole stack — so the thing you approved is the thing that goes live."
      />

      <section className="section bg-paper">
        <div className="container-wide">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              Most problems in software delivery aren&apos;t technical — they&apos;re
              handoff problems. A design engineering can&apos;t build. A backend
              nobody documented. A launch with no plan for the day after. We keep
              design, development and infrastructure under one roof.
            </p>
          </Reveal>

          <div className="mt-20 flex flex-col gap-24">
            {services.map((service, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="grid scroll-mt-28 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
                >
                  <Reveal className={cn(flip && "lg:order-2")}>
                    <Eyebrow>{service.title}</Eyebrow>
                    <h2 className="text-h2 mt-4 text-ink">{service.deepTitle}</h2>
                    {service.deepBody.map((para) => (
                      <p
                        key={para.slice(0, 24)}
                        className="mt-4 max-w-xl leading-relaxed text-muted"
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
                  </Reveal>

                  <Reveal
                    className={cn(
                      "relative overflow-hidden rounded-[var(--radius-panel)] border border-d-line bg-[linear-gradient(160deg,var(--color-d-surface-2),var(--color-navy-900))] p-7 md:p-9",
                      flip && "lg:order-1",
                    )}
                  >
                    <Image
                      src={`/services/${service.slug}-800.webp`}
                      alt=""
                      width={420}
                      height={315}
                      quality={70}
                      className="pointer-events-none absolute -right-6 -top-6 w-40 opacity-80 [mask-image:radial-gradient(120%_120%_at_90%_10%,#000_40%,transparent_82%)]"
                    />
                    <p className="text-eyebrow relative text-amber-300">
                      What you get
                    </p>
                    <ul className="relative mt-6 flex flex-col gap-4">
                      {service.whatYouGet.map((item) => (
                        <li
                          key={item}
                          className="flex gap-3 text-[0.95rem] leading-relaxed text-d-text"
                        >
                          <Check
                            size={18}
                            strokeWidth={2.5}
                            className="mt-0.5 shrink-0 text-amber-300"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
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
