import { projects } from "@/content/projects";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClipPlayer from "@/components/ClipPlayer";
import ContactBlock from "@/components/ContactBlock";

function ServiceProjectCard({ project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded">
      <div className="bg-white border border-line rounded overflow-hidden shadow-sm group-hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
        <div className="aspect-[4/3] relative bg-ink shrink-0 overflow-hidden">
          <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700">
            <ClipPlayer clip={project.clip} poster={project.poster} alt={project.name} />
          </div>
        </div>
        <div className="p-4 border-t border-line bg-paper">
          <h4 className="font-bricolage text-base leading-tight group-hover:text-signal transition-colors">{project.name}</h4>
          <span className="text-xs text-muted mt-1 block">{project.industry}</span>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Services",
  description: "Computer vision and web platforms for manufacturers.",
};

export default function ServicesPage() {
  const visionProjects = projects.filter(p => p.industry !== "Logistics" && p.industry !== "Retail security").slice(0, 3);
  const platformProjects = projects.filter(p => p.industry === "Logistics" || p.industry === "Retail security" || p.industry === "Transport").slice(0, 3);
  
  return (
    <div className="pt-24 pb-24">
      <div className="max-w-layout mb-24 relative">
        <Reveal>
          <h1 className="mb-4 text-5xl md:text-7xl font-bricolage bg-clip-text text-transparent bg-gradient-to-r from-ink to-signal">Services</h1>
          <p className="text-xl text-ink/80 max-w-content">
            We build the models that see the problem, and the platforms that solve it. 
          </p>
        </Reveal>
      </div>

      {/* Service 1: Computer Vision */}
      <section className="border-t border-line py-24 bg-white relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-signal/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="max-w-layout relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            <div>
              <Reveal variant="scale">
                <div className="flex items-center gap-4 mb-6">
                  <span className="mono-tag text-signal bg-signal/10 px-2 py-1 rounded shadow-sm border border-signal/20">SERVICE_01</span>
                  <h2>Computer Vision</h2>
                </div>
                <p className="text-xl font-medium mb-8 text-signal">Software that sees like you do.</p>
                <div className="space-y-6 text-lg text-ink/80 max-w-content mb-12">
                  <p>
                    We train models to detect defects on fast-moving assembly lines, count items accurately, and measure dimensions without physical contact.
                  </p>
                  <p>
                    This isn&apos;t about lab accuracy; it&apos;s about factory reliability. We optimize our models using TensorRT to run smoothly on edge devices like the Jetson Orin directly on your floor, integrating with your existing PLCs and cameras.
                  </p>
                </div>
                
                <div className="mb-12 p-6 bg-paper rounded border border-line shadow-inner">
                  <h4 className="mono-tag text-muted mb-4 block">THE STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {["PyTorch", "TensorRT", "YOLO", "OpenCV", "CUDA", "Python"].map(t => (
                      <span key={t} className="bg-white border border-line px-3 py-1.5 rounded-sm text-sm font-medium hover:bg-signal hover:text-white transition-colors">{t}</span>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/contact"
                  className="inline-block bg-signal text-white px-8 py-4 rounded hover:bg-signal/90 transition-all font-semibold shadow-lg hover:shadow-signal/30 hover:-translate-y-1"
                >
                  Discuss a vision project
                </Link>
              </Reveal>
            </div>
            
            <div className="lg:border-l lg:border-line lg:pl-16">
              <Reveal delay={0.2} variant="slide">
                <h4 className="mono-tag text-muted mb-6 block">EXAMPLE PROJECTS</h4>
                <div className="space-y-6">
                  {visionProjects.map(p => <ServiceProjectCard key={p.slug} project={p} />)}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Web Platforms */}
      <section className="border-t border-line py-24 bg-ink text-paper relative overflow-hidden">
        {/* Background decorative element */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-signal/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-layout relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            <div>
              <Reveal variant="scale">
                <div className="flex items-center gap-4 mb-6">
                  <span className="mono-tag text-signal bg-signal/20 px-2 py-1 rounded shadow-sm border border-signal/40">SERVICE_02</span>
                  <h2 className="text-white">Web Platforms & Automation</h2>
                </div>
                <p className="text-xl font-medium mb-8 text-signal">Dashboards that make sense of the data.</p>
                <div className="space-y-6 text-lg text-paper/80 max-w-content mb-12">
                  <p>
                    A vision model is useless if the operators can&apos;t see what it&apos;s doing. We build secure, real-time web applications to monitor your factory floor.
                  </p>
                  <p>
                    We aggregate data across multiple edge nodes, stream video feeds via WebSockets, and trigger automated alerts when metrics fall outside of control limits. Everything is accessible from a secure browser window.
                  </p>
                </div>
                
                <div className="mb-12 p-6 bg-white/5 rounded border border-white/10 shadow-inner">
                  <h4 className="mono-tag text-paper/50 mb-4 block">THE STACK</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Next.js", "React", "Node.js", "PostgreSQL", "WebSockets", "Tailwind"].map(t => (
                      <span key={t} className="bg-white/10 border border-white/20 px-3 py-1.5 rounded-sm text-sm font-medium hover:bg-signal hover:border-signal transition-colors">{t}</span>
                    ))}
                  </div>
                </div>

                <Link 
                  href="/contact"
                  className="inline-block bg-white text-ink px-8 py-4 rounded hover:bg-white/90 transition-all font-semibold shadow-lg hover:shadow-white/20 hover:-translate-y-1"
                >
                  Discuss a platform project
                </Link>
              </Reveal>
            </div>
            
            <div className="lg:border-l lg:border-white/10 lg:pl-16">
              <Reveal delay={0.2} variant="slide">
                <h4 className="mono-tag text-paper/50 mb-6 block">EXAMPLE PROJECTS</h4>
                <div className="space-y-6">
                  {platformProjects.map(p => <ServiceProjectCard key={p.slug} project={p} />)}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
