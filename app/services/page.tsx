import type { Metadata } from "next";
import Image from "next/image";
import { Check } from "lucide-react";
import { services, type Service } from "@/content/services";
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
    "Computer vision, AI and automation, web platforms, mobile apps, UI/UX and cloud. Six disciplines, delivered end to end by one senior team.",
  path: "/services",
});

/**
 * Every visual here is a real screen from a shipped project, not a render.
 * The caption says which one, because "this is our actual work" is the whole
 * point of showing it. Alt text describes what is on screen, not the service.
 */
const VISUAL: Record<Service["slug"], { alt: string; from: string }> = {
  vision: {
    alt: "RallyLens tracking four players, the ball and its speed, and distances to each wall target, from a single camera",
    from: "RallyLens",
  },
  ai: {
    alt: "Nexus assistant answering a payment-terms question, with the retrieved document chunks and their relevance scores alongside",
    from: "Nexus RAG assistant",
  },
  web: {
    alt: "MagicQC web dashboard with brand, operator, purchase-order and article summaries",
    from: "MagicQC",
  },
  mobile: {
    alt: "RallyLens court view and session readouts, laid out for a phone screen",
    from: "RallyLens, phone layout",
  },
  uiux: {
    alt: "MagicQC measurement station: brand, article and size on the left, points of measure with tolerances on the right",
    from: "MagicQC",
  },
  cloud: {
    alt: "Nexus architecture: chat interface, FastAPI, FAISS vector search and an on-premise LLaMA 3 model",
    from: "Nexus RAG assistant",
  },
};

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
        title={<>Everything it takes to ship a product.</>}
        intro="Six disciplines, one team that owns the whole stack, so the thing you approved is the thing that goes live."
      />

      <section className="section bg-paper">
        <div className="container-wide">
          <Reveal>
            <p className="max-w-3xl text-lg leading-relaxed text-muted">
              Most problems in software delivery aren&apos;t technical.
              They&apos;re handoff problems. A design engineering can&apos;t
              build. A backend nobody documented. A launch with no plan for the
              day after. We keep design, development and infrastructure under
              one roof.
            </p>
          </Reveal>

          <div className="mt-20 flex flex-col gap-28">
            {services.map((service, i) => {
              const flip = i % 2 === 1;
              const visual = VISUAL[service.slug];
              return (
                <article
                  key={service.slug}
                  id={service.slug}
                  className="grid scroll-mt-28 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16"
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
                    <LinkButton href="/contact" variant="ghostLight" className="mt-8">
                      Talk to us about {service.title}
                    </LinkButton>
                  </Reveal>

                  <Reveal className={cn("relative", flip && "lg:order-1")}>
                    <figure className="relative">
                      <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-navy-600/40 bg-[radial-gradient(90%_75%_at_50%_0%,rgb(200_138_46/0.22),transparent_60%),linear-gradient(170deg,var(--color-navy-800),var(--color-navy-ink))] px-2 pb-24 pt-10 shadow-e3 sm:px-4">
                        <div className="showcase-img relative aspect-[16/10]">
                          <Image
                            src={`/services/${service.slug}-1400.webp`}
                            alt={visual.alt}
                            fill
                            unoptimized
                            sizes="(min-width: 1024px) 640px, 100vw"
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <figcaption className="absolute left-4 top-4 rounded-full border border-white/15 bg-navy-ink/70 px-3 py-1 text-[0.72rem] font-medium text-d-text backdrop-blur-sm">
                        Real screen: {visual.from}
                      </figcaption>
                    </figure>

                    <div className="relative z-10 -mt-20 mx-3 rounded-2xl border border-line bg-surface/95 p-6 shadow-e2 backdrop-blur-md md:mx-6 md:p-7">
                      <p className="text-eyebrow text-amber-700">What you get</p>
                      <ul className="mt-4 flex flex-col gap-3">
                        {service.whatYouGet.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[0.95rem] leading-relaxed text-ink"
                          >
                            <Check
                              size={18}
                              strokeWidth={2.5}
                              className="mt-0.5 shrink-0 text-amber-600"
                              aria-hidden="true"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
