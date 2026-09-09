import { projects } from "@/content/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Bracket from "@/components/Bracket";
import Reveal from "@/components/Reveal";
import ContactBlock from "@/components/ContactBlock";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} Case Study`,
    description: project.line,
    openGraph: {
      images: [project.poster],
    }
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const currentIndex = projects.findIndex(p => p.slug === slug);
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pt-24 pb-24">
      <div className="max-w-layout">
        <Reveal>
          <Link href="/work" className="inline-flex items-center text-sm font-semibold text-ink/70 hover:text-signal transition-colors mb-12 group">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Back to work
          </Link>
          <h1 className="mb-4">{project.name}</h1>
          <p className="text-xl text-ink/80 max-w-content mb-8">{project.line}</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 py-6 border-y border-line mb-12">
            <div>
              <span className="mono-tag text-muted block mb-1">CLIENT</span>
              <span className="font-semibold">{project.industry}</span>
            </div>
            <div>
              <span className="mono-tag text-muted block mb-1">YEAR</span>
              <span className="font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="mono-tag text-muted block mb-1">DURATION</span>
              <span className="font-semibold">{project.duration}</span>
            </div>
            {project.deployed && (
              <div>
                <span className="mono-tag text-muted block mb-1">STATUS</span>
                <span className="font-semibold text-signal flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-signal"></div>
                  In Production
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Hero Media */}
      <Reveal delay={0.1}>
        <div className="w-full max-w-[1400px] mx-auto px-6 mb-24">
          <div className="aspect-video w-full bg-ink rounded overflow-hidden shadow-lg border border-line">
            {project.clip ? (
              <video 
                src={project.clip}
                poster={project.poster}
                controls
                preload="metadata"
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={project.poster} 
                alt={`${project.name} hero`} 
                className="w-full h-full object-cover" 
              />
            )}
          </div>
        </div>
      </Reveal>

      <div className="max-w-layout space-y-24">
        {/* The Problem */}
        <Reveal>
          <section className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            <h2 className="text-xl font-bricolage text-muted">The Problem</h2>
            <div className="max-w-content text-lg whitespace-pre-wrap">
              {project.problem}
            </div>
          </section>
        </Reveal>

        {/* The Constraint */}
        <Reveal>
          <section className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            <h2 className="text-xl font-bricolage text-alert">The Constraint</h2>
            <div className="max-w-content text-lg font-medium border-l-2 border-alert pl-6">
              {project.constraint}
            </div>
          </section>
        </Reveal>

        {/* What We Built */}
        <Reveal>
          <section className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
            <h2 className="text-xl font-bricolage text-muted">What We Built</h2>
            <div className="max-w-content text-lg whitespace-pre-wrap">
              {project.built}
            </div>
          </section>
        </Reveal>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <Reveal>
            <section className="space-y-12">
              {project.screenshots.map((shot, i) => (
                <div key={i} className="flex flex-col">
                  <img src={shot.src} alt={shot.caption} className="w-full rounded border border-line bg-white shadow-sm mb-4" />
                  <span className="text-sm text-muted text-center italic">{shot.caption}</span>
                </div>
              ))}
            </section>
          </Reveal>
        )}

        {/* The Result */}
        <Reveal>
          <section className="py-12 flex justify-center">
            <Bracket active={true} className="p-8 sm:p-12 text-center bg-white border border-line">
              <span className="mono-tag text-signal mb-4 block">RESULT_ACHIEVED</span>
              <div className="text-4xl sm:text-6xl font-bricolage font-bold text-signal mb-2">
                {project.metric}
              </div>
            </Bracket>
          </section>
        </Reveal>

        {/* Client Quote - Omit if not present */}
        {project.quote && (
          <Reveal>
            <blockquote className="border-l-4 border-signal pl-6 max-w-content text-xl italic text-ink/90">
              &ldquo;{project.quote.text}&rdquo;
              <footer className="mt-4 text-base font-semibold not-italic">
                — {project.quote.author}
              </footer>
            </blockquote>
          </Reveal>
        )}

        {/* Stack Tags */}
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {project.stack.map(tech => (
              <span key={tech} className="bg-paper border border-line px-4 py-2 rounded text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="mt-24">
        <ContactBlock />
      </div>

      <div className="max-w-layout pt-12">
        <Link href={`/work/${nextProject.slug}`} className="group block bg-white border border-line p-8 rounded hover:border-signal/50 transition-colors">
          <span className="mono-tag text-muted mb-2 block">NEXT_PROJECT</span>
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bricolage group-hover:text-signal transition-colors">{nextProject.name}</h3>
            <span className="transition-transform group-hover:translate-x-2 text-2xl">→</span>
          </div>
        </Link>
      </div>
    </article>
  );
}
