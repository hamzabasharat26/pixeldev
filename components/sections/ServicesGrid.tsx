import Image from "next/image";
import Link from "next/link";
import { Cloud, Code2, PenTool, ScanEye, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services, type Service } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<Service["icon"], LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  ai: Sparkles,
  vision: ScanEye,
  uiux: PenTool,
  cloud: Cloud,
};

function WideCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-[var(--radius-panel)] border border-d-line bg-[linear-gradient(160deg,var(--color-d-surface-2),var(--color-navy-900))] p-7 transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-amber/45 md:p-8"
    >
      <Image
        src={`/services/${service.slug}-1400.webp`}
        alt=""
        width={900}
        height={675}
        quality={75}
        className="pointer-events-none absolute -right-8 -bottom-8 w-[62%] max-w-[26rem] opacity-70 [mask-image:radial-gradient(120%_120%_at_100%_100%,#000_35%,transparent_78%)] transition-transform duration-300 group-hover:scale-[1.03]"
      />
      <div className="relative flex items-start gap-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--radius-frame)] bg-white/6 text-amber">
          <Icon size={22} strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-eyebrow text-d-muted">{service.index}</p>
          <h3 className="text-h3 mt-1 text-d-text">{service.title}</h3>
        </div>
      </div>
      <div className="relative max-w-[24rem]">
        <p className="font-medium text-d-text">{service.headline}</p>
        <p className="mt-2 text-sm leading-relaxed text-d-muted">
          {service.summary}
        </p>
        <span className="text-eyebrow mt-5 inline-flex items-center gap-1.5 text-amber-300">
          Explore
          <span
            aria-hidden="true"
            className="transition-transform group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </span>
      </div>
    </Link>
  );
}

function StandardCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-2))] p-6 transition-[border-color,transform,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber-600/50 hover:shadow-e2"
    >
      <Image
        src={`/services/${service.slug}-800.webp`}
        alt=""
        width={520}
        height={390}
        quality={70}
        className="pointer-events-none absolute -right-6 -top-6 w-36 rotate-3 rounded-[var(--radius-frame)] opacity-90 [mask-image:radial-gradient(120%_120%_at_90%_10%,#000_40%,transparent_80%)]"
      />
      <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-frame)] bg-clay-soft text-clay-600">
        <Icon size={20} strokeWidth={1.75} />
      </span>
      <p className="text-eyebrow relative mt-5 text-faint">{service.index}</p>
      <h3 className="text-h4 relative mt-1 text-ink">{service.title}</h3>
      <p className="relative mt-3 text-sm leading-relaxed text-muted">
        {service.headline}
      </p>
      <div className="relative mt-5 flex flex-wrap gap-1.5">
        {service.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>
      <span className="text-eyebrow relative mt-auto inline-flex items-center gap-1.5 pt-6 text-amber-700">
        Learn more
        <span
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

export function ServicesGrid() {
  const wide = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section id="services" className="section bg-paper">
      <div className="container-wide">
        <Reveal>
          <SectionHeading
            eyebrow="What we build"
            title={
              <>
                Six disciplines, <em>one</em> senior team.
              </>
            }
            intro="We cover the full product surface — so you're not stitching four vendors together to ship one thing."
          />
        </Reveal>

        <Reveal className="mt-12 grid gap-4 md:grid-cols-2">
          {wide.map((s) => (
            <WideCard key={s.slug} service={s} />
          ))}
        </Reveal>

        <Reveal className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((s) => (
            <StandardCard key={s.slug} service={s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
