"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ContactBlock from "@/components/ContactBlock";
import { site } from "@/content/site";

const roles = [
  {
    title: "Senior Computer Vision Engineer",
    type: "Full-time",
    location: "Remote (EU/US timezone overlap)",
    description: "Lead the development of custom YOLO models and optimize them with TensorRT for edge deployment on Jetson Orin devices in active manufacturing environments."
  },
  {
    title: "Frontend Architect",
    type: "Full-time",
    location: "Remote",
    description: "Design and build real-time monitoring dashboards using Next.js, WebSockets, and WebGL to visualize live factory floor metrics with sub-second latency."
  }
];

export default function CareersPage() {
  return (
    <div className="pt-24 pb-24 overflow-hidden">
      <div className="max-w-layout mb-24 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-signal/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <Reveal variant="scale">
          <span className="mono-tag text-signal mb-4 block tracking-widest bg-signal/10 w-fit px-3 py-1 rounded">JOIN THE TEAM</span>
          <h1 className="mb-6 text-5xl md:text-7xl font-bricolage bg-clip-text text-transparent bg-gradient-to-r from-ink to-signal">Careers</h1>
          <p className="text-xl text-ink/80 max-w-content leading-relaxed">
            We are looking for builders who want to step away from generic SaaS CRUD apps and start deploying software into the physical world.
          </p>
        </Reveal>
      </div>

      {/* Why Work With Us */}
      <section className="py-24 bg-ink text-paper relative">
        <div className="max-w-layout z-10 relative">
          <Reveal>
            <h2 className="mb-16 text-white text-center text-4xl">Why work with us?</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1} variant="flip">
              <div className="bg-white/5 border border-white/10 p-8 rounded hover:bg-white/10 transition-colors h-full">
                <div className="w-12 h-12 rounded bg-signal/20 flex items-center justify-center mb-6">
                  <span className="text-signal font-bold text-xl">1</span>
                </div>
                <h3 className="text-white mb-4 text-xl">Real impact</h3>
                <p className="text-paper/70 leading-relaxed">
                  Your code doesn&apos;t just sit on a server. It runs on physical machines inside factories, catching defects and preventing massive waste.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2} variant="flip">
              <div className="bg-white/5 border border-white/10 p-8 rounded hover:bg-white/10 transition-colors h-full">
                <div className="w-12 h-12 rounded bg-signal/20 flex items-center justify-center mb-6">
                  <span className="text-signal font-bold text-xl">2</span>
                </div>
                <h3 className="text-white mb-4 text-xl">No black boxes</h3>
                <p className="text-paper/70 leading-relaxed">
                  We don&apos;t do hype AI. We do measurable engineering. You&apos;ll work directly with clients to prove your models work on their actual factory floor footage.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3} variant="flip">
              <div className="bg-white/5 border border-white/10 p-8 rounded hover:bg-white/10 transition-colors h-full">
                <div className="w-12 h-12 rounded bg-signal/20 flex items-center justify-center mb-6">
                  <span className="text-signal font-bold text-xl">3</span>
                </div>
                <h3 className="text-white mb-4 text-xl">Deep technical work</h3>
                <p className="text-paper/70 leading-relaxed">
                  Forget fighting over button colors. You&apos;ll be optimizing CUDA cores, writing WebSocket servers, and squeezing every ounce of performance out of edge devices.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-24 relative">
        <div className="max-w-layout">
          <Reveal>
            <h2 className="mb-12 text-4xl">Open Roles</h2>
          </Reveal>

          <div className="space-y-6">
            {roles.map((role, i) => (
              <Reveal key={i} delay={i * 0.1} variant="slide">
                <div className="group block bg-white border border-line p-8 rounded hover:border-signal/50 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                    <h3 className="text-2xl font-bricolage group-hover:text-signal transition-colors">{role.title}</h3>
                    <div className="flex gap-2">
                      <span className="mono-tag bg-paper px-3 py-1 rounded border border-line">{role.type}</span>
                      <span className="mono-tag bg-paper px-3 py-1 rounded border border-line">{role.location}</span>
                    </div>
                  </div>
                  <p className="text-ink/80 text-lg max-w-3xl mb-8">
                    {role.description}
                  </p>
                  <a 
                    href={`mailto:${site.email}?subject=Application for ${role.title}`}
                    className="inline-flex items-center text-signal font-semibold hover:underline underline-offset-4"
                  >
                    Apply for this role <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ContactBlock />
    </div>
  );
}
