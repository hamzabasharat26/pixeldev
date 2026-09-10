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

/**
 * The two disciplines this studio is actually known for. They get the screen
 * treatment — a dark panel on the paper ground, the render running to the
 * edge under a detection frame. The weight difference *is* the hierarchy.
 */
function LeadCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group glass relative flex flex-col overflow-hidden rounded-[var(--radius-panel)] transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-amber/55"
    >
      <span className="det-frame relative z-10 block aspect-[16/9] overflow-hidden border-b border-white/10">
        <Image
          src={`/services/${service.slug}-1400.webp`}
          alt=""
          fill
          unoptimized
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,var(--color-navy-900)_2%,transparent_58%)]"
        />
      </span>

      <span className="relative z-10 flex flex-1 flex-col p-7 md:p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-amber/30 bg-amber/12 text-amber-300">
          <Icon size={21} strokeWidth={1.75} />
        </span>
        <h3 className="text-h3 mt-5 text-d-text underline-offset-[6px] group-hover:underline group-hover:decoration-amber/60">
          {service.title}
        </h3>
        <p className="mt-2.5 max-w-[34ch] font-medium text-d-text/90">
          {service.headline}
        </p>
        <p className="mt-2 max-w-[42ch] text-sm leading-relaxed text-d-muted">
          {service.summary}
        </p>
      </span>
    </Link>
  );
}

/** The four that make the lead work shippable. Quiet, on the navy ground. */
function SupportCard({ service }: { service: Service }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-d-line bg-navy-800/50 p-6 transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-amber/40 hover:bg-navy-800/80"
    >
      <Image
        src={`/services/${service.slug}-800.webp`}
        alt=""
        width={520}
        height={390}
        unoptimized
        className="pointer-events-none absolute -right-8 -top-8 w-32 rounded-xl opacity-55 [mask-image:radial-gradient(120%_120%_at_88%_12%,#000_38%,transparent_78%)] transition-opacity duration-300 group-hover:opacity-75"
      />
      <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/6 text-amber-300">
        <Icon size={19} strokeWidth={1.75} />
      </span>
      <h3 className="text-h4 relative mt-5 text-d-text underline-offset-4 group-hover:underline group-hover:decoration-amber/50">
        {service.title}
      </h3>
      <p className="relative mt-2.5 text-sm leading-relaxed text-d-muted">
        {service.headline}
      </p>
      <div className="relative mt-auto flex flex-wrap gap-1.5 pt-5">
        {service.tags.map((t) => (
          <Tag key={t} tone="light">
            {t}
          </Tag>
        ))}
      </div>
    </Link>
  );
}

export function ServicesGrid() {
  const lead = services.filter((s) => s.featured);
  const support = services.filter((s) => !s.featured);

  return (
    <section
      id="services"
      className="on-dark section relative isolate overflow-hidden bg-navy-900"
    >
      <div
        aria-hidden="true"
        className="glow-orb -right-32 top-10 h-[30rem] w-[30rem] text-amber opacity-[0.13]"
      />
      <div className="container-wide relative">
        <Reveal>
          <SectionHeading
            tone="light"
            eyebrow="What we build"
            title="Six disciplines, one senior team."
            intro="Two of them are why clients call. The other four are why the work ships."
          />
        </Reveal>

        <Reveal className="mt-11 grid gap-4 md:grid-cols-2">
          {lead.map((s) => (
            <LeadCard key={s.slug} service={s} />
          ))}
        </Reveal>

        <Reveal className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {support.map((s) => (
            <SupportCard key={s.slug} service={s} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
