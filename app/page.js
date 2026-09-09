import Hero from "@/components/Hero";
import WorkStrip from "@/components/WorkStrip";
import ProcessSection from "@/components/ProcessSection";
import FAQ from "@/components/FAQ";
import ContactBlock from "@/components/ContactBlock";
import MetricCounter from "@/components/MetricCounter";
import Reveal from "@/components/Reveal";
import Link from "next/link";
import { projects } from "@/content/projects";
import ClipPlayer from "@/components/ClipPlayer";
import ClientLogos from "@/components/ClientLogos";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const featuredDeployed = projects.find(p => p.featured && p.deployed) || projects[0];

export default function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      
      {/* Trust Strip */}
      <section className="max-w-layout py-12 border-t border-line">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <Reveal delay={0.1} variant="flip">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <MetricCounter endValue={12} />
              </div>
              <span className="text-sm text-muted mt-2">Projects shipped and still running</span>
            </div>
          </Reveal>
          <Reveal delay={0.2} variant="flip">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <MetricCounter endValue={4} />
              </div>
              <span className="text-sm text-muted mt-2">Systems currently in production</span>
            </div>
          </Reveal>
          <Reveal delay={0.3} variant="flip">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <MetricCounter endValue={2} />
                <span className="metric text-2xl">hr</span>
              </div>
              <span className="text-sm text-muted mt-2">Average first reply time</span>
            </div>
          </Reveal>
          <Reveal delay={0.4} variant="flip">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1">
                <MetricCounter endValue={3} />
              </div>
              <span className="text-sm text-muted mt-2">Client timezones supported</span>
            </div>
          </Reveal>
        </div>
      </section>

      <WorkStrip />

      {/* Services */}
      <section className="max-w-layout py-24">
        <Reveal variant="scale">
          <h2 className="mb-12">What we build</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1: Computer Vision */}
          <Reveal delay={0.1} variant="scale">
            <div className="bg-white p-8 rounded border border-line h-full flex flex-col group hover:shadow-xl hover:border-signal/50 transition-all duration-300">
              <h3 className="mb-2 group-hover:text-signal transition-colors">Computer Vision</h3>
              <p className="font-semibold mb-4">Software that sees like you do.</p>
              <p className="text-ink/80 mb-6 flex-grow">
                We build models to detect defects on fast-moving assembly lines, count items accurately, and measure dimensions without physical contact. Using YOLO architectures and PyTorch, optimized with TensorRT to run smoothly on edge devices like Jetson Orin.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="mono-tag bg-paper px-2 py-1 rounded">PyTorch</span>
                <span className="mono-tag bg-paper px-2 py-1 rounded">TensorRT</span>
                <span className="mono-tag bg-paper px-2 py-1 rounded">OpenCV</span>
              </div>
              <Link href="/work?filter=Manufacturing" className="text-signal font-semibold hover:underline underline-offset-4 w-fit mt-auto">
                See vision projects
              </Link>
            </div>
          </Reveal>
          
          {/* Service 2: Web Platforms & Automation */}
          <Reveal delay={0.2} variant="scale">
            <div className="bg-white p-8 rounded border border-line h-full flex flex-col group hover:shadow-xl hover:border-signal/50 transition-all duration-300">
              <h3 className="mb-2 group-hover:text-signal transition-colors">Web Platforms & Automation</h3>
              <p className="font-semibold mb-4">Dashboards that make sense of the data.</p>
              <p className="text-ink/80 mb-6 flex-grow">
                We build secure, real-time web applications to monitor your factory floor, aggregate data across multiple edge nodes, and trigger alerts. Built with Next.js and WebSockets for low-latency streaming of video and metrics directly to your browser.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                <span className="mono-tag bg-paper px-2 py-1 rounded">Next.js</span>
                <span className="mono-tag bg-paper px-2 py-1 rounded">WebSockets</span>
                <span className="mono-tag bg-paper px-2 py-1 rounded">PostgreSQL</span>
              </div>
              <Link href="/work" className="text-signal font-semibold hover:underline underline-offset-4 w-fit mt-auto">
                See platform projects
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <TestimonialCarousel />

      <ProcessSection />

      {/* Featured Case Study */}
      <section className="max-w-layout py-24">
        <Reveal>
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-line pb-4">
            <div>
              <span className="mono-tag text-signal mb-2 block">FEATURED_DEPLOYMENT</span>
              <h2>{featuredDeployed.name}</h2>
            </div>
            <Link href={`/work/${featuredDeployed.slug}`} className="bg-line/30 text-ink px-4 py-2 rounded hover:bg-line/50 transition-colors font-semibold text-sm whitespace-nowrap">
              Read case study
            </Link>
          </div>
        </Reveal>
        
        <Reveal delay={0.1} variant="scale">
          <div className="bg-white border border-line p-2 rounded hover:shadow-2xl transition-shadow duration-500">
            <div className="aspect-video relative rounded overflow-hidden">
              <ClipPlayer clip={featuredDeployed.clip} poster={featuredDeployed.poster} />
            </div>
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-xl">
                <p className="text-lg text-ink/90 font-medium mb-2">{featuredDeployed.line}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="mono-tag bg-paper px-2 py-1 rounded">{featuredDeployed.industry}</span>
                  <span className="mono-tag bg-paper px-2 py-1 rounded">{featuredDeployed.duration}</span>
                </div>
              </div>
              <div className="border-l-4 border-signal pl-6">
                <div className="text-4xl md:text-5xl font-bricolage font-bold text-signal mb-1">
                  {featuredDeployed.metric}
                </div>
                <div className="text-sm text-muted uppercase tracking-wider font-semibold">
                  Result achieved
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <FAQ />
      <ContactBlock />
    </>
  );
}
