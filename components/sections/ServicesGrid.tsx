import Link from "next/link";
import { Cloud, Code2, PenTool, ScanEye, Smartphone, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { services, type Service } from "@/content/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TagRow } from "@/components/ui/Tag";

const icons: Record<Service["icon"], LucideIcon> = {
  web: Code2,
  mobile: Smartphone,
  ai: Sparkles,
  vision: ScanEye,
  uiux: PenTool,
  cloud: Cloud,
};

function ServiceCard({ service, wide = false }: { service: Service; wide?: boolean }) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex h-full flex-col rounded-[16px] border border-grey-200 bg-white p-6 transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:border-amber/60 hover:shadow-[0_12px_32px_rgb(16_24_40/0.10)] md:p-8"
    >
      <div className="flex items-center gap-4">
        <span
          aria-hidden="true"
          className={
            wide
              ? "inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] bg-amber/12 text-amber-700"
              : "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-amber/12 text-amber-700"
          }
        >
          <Icon size={wide ? 26 : 22} strokeWidth={1.75} />
        </span>
        <h3 className={wide ? "text-h3 text-navy" : "text-h4 text-navy"}>
          {service.title}
        </h3>
      </div>

      <p className="mt-5 font-medium text-navy-600">{service.headline}</p>
      <p className="mt-3 text-[0.95rem] leading-relaxed text-grey-700">
        {service.summary}
      </p>

      <TagRow items={service.tags} className="mt-6" />

      <span className="text-eyebrow mt-auto inline-flex items-center gap-1.5 pt-7 text-navy">
        Learn more
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-1"
        >
          &rarr;
        </span>
      </span>
    </Link>
  );
}

export function ServicesGrid() {
  const featured = services.filter((s) => s.featured);
  const rest = services.filter((s) => !s.featured);

  return (
    <section id="services" className="section-y bg-grey-50">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we do"
          title="Six disciplines, one senior team."
          intro="We cover the full product surface — so you're not stitching four vendors together to ship one thing."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {featured.map((s) => (
            <ServiceCard key={s.slug} service={s} wide />
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {rest.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
