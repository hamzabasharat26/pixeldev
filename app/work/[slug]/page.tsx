import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import {
  breadcrumbJsonLd,
  creativeWorkJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { JsonLd } from "@/components/ui/JsonLd";
import { MetricValue } from "@/components/ui/MetricValue";
import { AutoVideo } from "@/components/media/AutoVideo";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return projects.filter((p) => !p.placeholder).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const meta = pageMetadata({
    title: project.title,
    description: `${project.summary} — ${project.outcome.value} ${project.outcome.label}.`,
    path: `/work/${slug}`,
    ogType: "article",
  });
  if (project.placeholder) meta.robots = { index: false, follow: false };
  return meta;
}

const SECTIONS = [
  { key: "challenge", label: "The problem" },
  { key: "solution", label: "What we built" },
  { key: "results", label: "The result" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const live = projects.filter((p) => !p.placeholder);
  const liveIndex = live.findIndex((p) => p.slug === slug);
  const next = live[(liveIndex + 1) % live.length];
  // On the light hero these must be the measured mustard steps — `signal`
  // cyan is a dark-ground colour and falls to ~2:1 on white. The navy metrics
  // band below keeps its own on-dark accent.
  const accentClass =
    project.metricsAccent === "signal" ? "text-clay-600" : "text-amber-700";
  const accentOnDark =
    project.metricsAccent === "signal" ? "text-signal" : "text-amber-300";

  return (
    <>
      <JsonLd
        data={[
          creativeWorkJsonLd({
            title: project.title,
            summary: project.summary,
            slug: project.slug,
            year: project.year,
            cover: project.media.cover,
          }),
          breadcrumbJsonLd([
            { name: "Work", path: "/work" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        ]}
      />

      <article className="relative isolate overflow-hidden bg-paper pt-32 pb-10 md:pt-40">
        <div
          aria-hidden="true"
          className="glow-orb -right-24 -top-20 h-80 w-80 text-amber opacity-[0.1]"
        />
        <div className="container-wide relative">
          <nav aria-label="Breadcrumb" className="text-eyebrow text-faint">
            <Link href="/work" className="transition-colors hover:text-amber-700">
              Work
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-ink">{project.title}</span>
          </nav>

          <h1 className="text-h1 mt-6 max-w-3xl text-ink">{project.title}</h1>
          <p className="text-body-lg mt-4 max-w-2xl text-muted">
            <span className={cn("font-semibold", accentClass)}>
              {project.outcome.value}
            </span>{" "}
            {project.outcome.label}.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-line-2 py-6 sm:grid-cols-5">
            {[
              ["Client", project.client],
              ["Year", String(project.year)],
              ["Category", project.category],
              ["Role", project.role],
              ["Timeline", project.timeline],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-eyebrow text-faint">{label}</dt>
                <dd className="text-data mt-1 text-sm font-medium text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="container-wide relative mt-10">
          <AutoVideo
            poster={project.media.poster}
            webm={project.media.webm}
            mp4={project.media.mp4}
            alt={`${project.title} — ${project.summary}`}
            aspect="16 / 9"
            sizes="(min-width: 1400px) 1336px, 100vw"
            priority
            className="det-frame"
          />
        </div>
      </article>

      <div className="bg-paper">
        <div className="container-wide section flex flex-col gap-14">
          {SECTIONS.map((section) => (
            <section
              key={section.key}
              className="grid gap-4 md:grid-cols-[200px_1fr] md:gap-12"
            >
              <h2 className="text-eyebrow pt-1 text-clay-600">{section.label}</h2>
              <p className="max-w-[64ch] text-[1.08rem] leading-relaxed text-ink">
                {project[section.key]}
              </p>
            </section>
          ))}
        </div>
      </div>

      <section className="on-dark bg-navy-900">
        <div className="container-wide section">
          <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="border-t border-d-line pt-5">
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <MetricValue
                    value={metric.value}
                    size="hero"
                    className={accentOnDark}
                  />
                  <span className="mt-2 block max-w-[28ch] text-sm leading-relaxed text-d-muted">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {project.media.gallery.length > 0 && (
        <section className="section bg-paper">
          <div className="container-wide grid gap-5 sm:grid-cols-2">
            {project.media.gallery.map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[var(--radius-frame)] border border-line bg-surface-2"
              >
                <Image
                  src={src}
                  alt={`${project.title} — screen ${i + 1}`}
                  width={1600}
                  height={1000}
                  quality={75}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section--band">
        <div className="container-wide py-12">
          <p className="text-eyebrow text-faint">Built with</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {project.tech.map((tech) => (
              <li key={tech} className="text-data text-ink">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-paper pb-16 pt-14">
        <div className="container-wide">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-surface p-7 transition-colors hover:border-amber-600/50 hover:shadow-e1"
          >
            <span>
              <span className="text-eyebrow text-faint">Next project</span>
              <span className="text-h4 mt-1 block text-ink underline-offset-4 group-hover:underline group-hover:decoration-amber-600/50">
                {next.title}
              </span>
            </span>
            <span className="text-readout shrink-0 rounded-md border border-line-2 px-2.5 py-1.5 text-faint transition-colors group-hover:border-amber-600/50 group-hover:text-amber-700">
              {next.category}
            </span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
