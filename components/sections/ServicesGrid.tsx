import Image from "next/image";
import Link from "next/link";
import { Cloud, Code2, PenTool, ScanEye, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services, type Service } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";

const icons: Record<Service["icon"], LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  ai: Sparkles,
  vision: ScanEye,
  uiux: PenTool,
  cloud: Cloud,
};

/**
 * A real product screen, framed (see scripts/media/showcase.mjs), floating on a
 * lit navy panel. `object-contain` because the frame and its shadow are part
 * of the image: cropping would cut the window, not just the background.
 */
function Showcase({ slug, large = false }: { slug: Service["slug"]; large?: boolean }) {
  return (
    <span className="relative z-10 block overflow-hidden rounded-2xl bg-[radial-gradient(85%_70%_at_50%_0%,rgb(200_138_46/0.2),transparent_62%),linear-gradient(175deg,var(--color-navy-800),var(--color-navy-ink))]">
      <span className="showcase-img relative block aspect-[16/10]">
        <Image
          src={`/services/${slug}-${large ? 1400 : 800}.webp`}
          alt=""
          fill
          unoptimized
          sizes={large ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="scale-100 object-contain transition-[scale] duration-500 group-hover:scale-[1.035]"
        />
      </span>
    </span>
  );
}

/** Vision and AI: why clients call. Glass over the navy, tilts toward the pointer. */
function LeadCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <TiltCard className="h-full">
      <Link
        href={`/services#${service.slug}`}
        className="group glass flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] p-2.5 transition-[border-color] duration-300 hover:border-amber/55"
      >
        <Showcase slug={service.slug} large />
        <span className="relative z-10 flex flex-1 flex-col px-4 pb-4 pt-6 md:px-5">
          <span className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber/30 bg-amber/12 text-amber-300">
              <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="text-h3 text-d-text underline-offset-[6px] group-hover:underline group-hover:decoration-amber/60">
              {service.title}
            </h3>
          </span>
          <span className="mt-4 block max-w-[40ch] font-medium text-d-text/90">
            {service.headline}
          </span>
          <span className="mt-2 block max-w-[52ch] text-sm leading-relaxed text-d-muted">
            {service.summary}
          </span>
          <span className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {service.tags.map((t) => (
              <Tag key={t} tone="light">
                {t}
              </Tag>
            ))}
          </span>
        </span>
      </Link>
    </TiltCard>
  );
}

/**
 * The four that make the lead work shippable. Text only, on purpose: these
 * carried product screenshots whose UI was unreadable at card size, three of
 * them borrowed from other projects, and they made this section 1531px tall.
 * The two lead cards keep their screens, which is where the story is.
 */
function SupportCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex translate-y-0 flex-col overflow-hidden rounded-2xl border border-d-line bg-navy-800/55 transition-[border-color,background-color,translate] duration-200 hover:-translate-y-1 hover:border-amber/40 hover:bg-navy-800"
    >
      <span className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <span className="flex items-center gap-2.5">
          <Icon size={17} strokeWidth={1.75} aria-hidden="true" className="shrink-0 text-amber-300" />
          <h3 className="text-h4 text-d-text underline-offset-4 group-hover:underline group-hover:decoration-amber/50">
            {service.title}
          </h3>
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-d-muted">
          {service.headline}
        </span>
        <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {service.tags.map((t) => (
            <Tag key={t} tone="light">
              {t}
            </Tag>
          ))}
        </span>
      </span>
    </Link>
  );
}

export function ServicesGrid() {
  const lead = services.filter((s) => s.featured);
  const support = services.filter((s) => !s.featured);

  return (
    <section
      id="services"
      className="horizon on-dark section relative isolate overflow-hidden bg-navy-900"
    >
      <div
        aria-hidden="true"
        className="glow-orb -right-32 top-10 h-[30rem] w-[30rem] text-amber opacity-[0.13]"
      />
      <div
        aria-hidden="true"
        className="glow-orb -left-40 bottom-0 h-[26rem] w-[26rem] text-navy-500 opacity-30"
      />
      <div className="container-wide relative">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="What we build"
            title="Six disciplines, one senior team."
            intro="Two of them are why clients call. The other four are why the work ships. Every screen below is from a system we built."
          />
        </Reveal>

        <Reveal className="mt-11 grid gap-5 md:grid-cols-2">
          {lead.map((s) => (
            <LeadCard key={s.slug} service={s} />
          ))}
        </Reveal>

        <Reveal className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {support.map((s) => (
            <SupportCard key={s.slug} service={s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
