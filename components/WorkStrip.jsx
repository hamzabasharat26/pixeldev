"use client";

import { useState } from "react";
import Link from "next/link";
import ClipPlayer from "./ClipPlayer";
import Bracket from "./Bracket";
import ConfidenceTag from "./ConfidenceTag";
import { projects } from "@/content/projects";

const featuredProjects = projects.filter(p => p.featured);

function Tile({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/work/${project.slug}`}
      className="block relative w-[340px] h-[200px] shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Bracket active={isHovered} className="w-full h-full">
        <div className="w-full h-full overflow-hidden rounded relative bg-ink">
          <ClipPlayer 
            clip={project.clip} 
            poster={project.poster} 
            alt={project.name} 
          />
          <div className="absolute inset-0 bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-4 flex flex-col justify-end">
            <h3 className="text-white mb-1 font-bricolage font-semibold">{project.name}</h3>
            <div className="flex justify-between items-end">
              <span className="text-white/80 text-sm font-public-sans">{project.industry}</span>
              <ConfidenceTag 
                label="ID:01" 
                confidence={project.confidence} 
                className="text-white/90" 
              />
            </div>
          </div>
          {project.deployed && (
            <div className="absolute top-3 right-3 bg-signal text-white text-xs font-bold px-2 py-1 rounded-sm uppercase tracking-wide">
              In Production
            </div>
          )}
        </div>
      </Bracket>
    </Link>
  );
}

export default function WorkStrip() {
  // We duplicate the array to create the seamless loop effect
  const marqueeItems = [...featuredProjects, ...featuredProjects, ...featuredProjects];

  return (
    <div className="w-full overflow-hidden py-12">
      <div className="sm:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-6 hide-scrollbar">
        {featuredProjects.map((project, idx) => (
          <div key={`mobile-${project.slug}-${idx}`} className="snap-center">
            <Tile project={project} />
          </div>
        ))}
      </div>
      
      <div className="hidden sm:block pause-on-hover w-full relative">
        <div className="flex gap-6 px-3 whitespace-nowrap animate-marquee w-[fit-content]">
          {marqueeItems.map((project, idx) => (
            <Tile key={`desktop-${project.slug}-${idx}`} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
