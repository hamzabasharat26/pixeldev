"use client";

import Reveal from "./Reveal";
import { Hexagon, Triangle, Circle, Square, Infinity, Focus, Box, Command } from "lucide-react";

const clients = [
  { name: "NEXUS LOGISTICS", Icon: Hexagon },
  { name: "OMNI MFG", Icon: Triangle },
  { name: "VELOCITY", Icon: Infinity },
  { name: "APEX SYSTEMS", Icon: Command },
  { name: "HORIZON", Icon: Focus },
  { name: "QUANTUM", Icon: Box },
  { name: "SYNERGY MED", Icon: Circle },
  { name: "ECHO DYNAMICS", Icon: Square }
];

export default function ClientLogos() {
  // Triple the array to ensure smooth infinite scrolling without gaps
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section className="py-16 border-y border-line overflow-hidden bg-white/50 backdrop-blur-sm">
      <Reveal>
        <div className="flex flex-col items-center">
          <span className="mono-tag text-muted mb-12 tracking-widest text-xs uppercase">Trusted by industry leaders</span>
          
          <div className="w-full relative flex group pause-on-hover">
            {/* Left fade out - stronger gradient for smoother entry */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-paper to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-20 px-10 whitespace-nowrap animate-marquee w-[fit-content] items-center">
              {marqueeItems.map((client, idx) => {
                const Icon = client.Icon;
                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3 text-ink/30 hover:text-signal transition-all duration-300 cursor-pointer select-none group/logo hover:scale-105"
                  >
                    <Icon className="w-8 h-8 md:w-10 md:h-10 opacity-70 group-hover/logo:opacity-100 transition-opacity" strokeWidth={1.5} />
                    <span className="text-2xl md:text-3xl font-bricolage font-bold tracking-tighter uppercase">
                      {client.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Right fade out - stronger gradient for smoother exit */}
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-paper to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
