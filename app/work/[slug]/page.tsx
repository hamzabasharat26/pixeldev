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
import { JsonLd } from "@/components/ui/JsonLd";
import { AutoVideo } from "@/components/media/AutoVideo";
import { CtaBand } from "@/components/sections/CtaBand";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
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
    description: `${project.summary} ${project.outcome.value} ${project.outcome.label}.`,
    path: `/work/${slug}`,
    ogImage: project.media.cover,
    ogType: "article",
  });
  // Placeholder entries are previewable at their URL but must not be indexed.
  if (project.placeholder) meta.robots = { index: false, follow: false };
  return meta;
}

const SECTIONS = [
  { key: "challenge", label: "The Challenge" },
  { key: "solution", label: "What We Built" },
  { key: "results", label: "The Results" },
] as const;

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

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

      <article className="bg-grey-50 pb-8 pt-32 md:pt-40">
        <div className="container-page">
          <nav aria-label="Breadcrumb" className="text-eyebrow text-grey-500">
            <Link href="/work" className="hover:text-navy">
              Work
            </Link>
            <span aria-hidden="true"> / </span>
            <span className="text-navy">{project.title}</span>
          </nav>

          <h1 className="text-h1 mt-6 max-w-3xl text-navy">{project.title}</h1>
          <p className="text-body-lg mt-4 max-w-2xl text-grey-700">
            <span className="font-semibold text-navy">
              {project.outcome.value}
            </span>{" "}
            {project.outcome.label}.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-grey-200 py-6 sm:grid-cols-5">
            {[
              ["Client", project.client],
              ["Year", String(project.year)],
              ["Category", project.category],
              ["Role", project.role],
              ["Timeline", project.timeline],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-eyebrow text-grey-500">{label}</dt>
                <dd className="text-data mt-1 text-sm font-medium text-navy">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="container-page mt-10">
          <AutoVideo
            poster={project.media.poster}
            webm={project.media.webm}
            mp4={project.media.mp4}
            alt={`${project.title}: ${project.summary}`}
            aspect="16 / 9"
            sizes="(min-width: 1280px) 1216px, 100vw"
            priority
          />
        </div>
      </article>

      <div className="bg-grey-50">
        <div className="container-page section-y flex flex-col gap-16 pt-4">
          {SECTIONS.map((section) => (
            <section
              key={section.key}
              className="grid gap-6 md:grid-cols-[180px_1fr] md:gap-12"
            >
              <h2 className="text-eyebrow pt-1 text-grey-500">{section.label}</h2>
              <p className="max-w-[62ch] text-[1.05rem] leading-relaxed text-grey-800">
                {project[section.key]}
              </p>
            </section>
          ))}
        </div>
      </div>

      <section className="bg-navy text-white">
        <div className="container-page section-y">
          <dl className="grid gap-10 sm:grid-cols-3 sm:gap-8">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="sr-only">{metric.label}</dt>
                <dd>
                  <span className="text-data block text-3xl font-bold text-amber md:text-4xl">
                    {metric.value}
                  </span>
                  <span className="mt-2 block text-sm text-grey-300">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {project.media.gallery.length > 0 && (
        <section className="section-y bg-grey-50">
          <div className="container-page grid gap-6 sm:grid-cols-2">
            {project.media.gallery.map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-[12px] border border-grey-200"
              >
                <Image
                  src={src}
                  alt={`${project.title} — view ${i + 1}`}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="border-t border-grey-200 bg-grey-50">
        <div className="container-page section-y">
          <p className="text-eyebrow text-grey-500">Built with</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {project.tech.map((tech) => (
              <li key={tech} className="text-data text-navy">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-grey-50 pb-16">
        <div className="container-page">
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-6 rounded-[16px] border border-grey-200 bg-white p-8 transition-colors hover:border-amber/60"
          >
            <span>
              <span className="text-eyebrow text-grey-500">Next project</span>
              <span className="text-h4 mt-1 block text-navy">{next.title}</span>
            </span>
            <span
              aria-hidden="true"
              className="text-2xl text-amber transition-transform group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
