"use client";

import { motion } from "framer-motion";
import { site } from "@/content/site";
import Bracket from "./Bracket";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Hero() {
  const headline = "Vision systems that count, inspect and measure.";
  const words = headline.split(" ");
  
  const [bracketsActive, setBracketsActive] = useState(false);
  
  useEffect(() => {
    // 70ms * words.length = ~500ms + initial delay. Trigger bracket snap after words settle.
    const timer = setTimeout(() => {
      setBracketsActive(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-layout pt-24 pb-16 relative">
      {/* Scan line effect */}
      <motion.div
        initial={{ top: 0, opacity: 1 }}
        animate={{ top: "100%", opacity: 0 }}
        transition={{ duration: 0.9, ease: "linear" }}
        className="absolute left-0 right-0 h-[1px] bg-signal z-20 pointer-events-none"
      />

      <div className="mb-4">
        <span className="mono-tag text-muted">
          LOC: {site.location} {"//"} {site.hours}
        </span>
      </div>
      
      <div className="mb-6 max-w-4xl inline-block relative">
        <Bracket active={bracketsActive} className="p-2 -m-2">
          <h1 className="flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 24, filter: "blur(8px)", opacity: 0 }}
                animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </Bracket>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-content"
      >
        <p className="text-lg text-ink/80 mb-8">
          We build custom computer vision software for manufacturers in Europe and the US. 
          Defect detection, counting, and measurement systems that run on edge devices and integrate into your existing workflow.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Link 
            href={site.calLink}
            target="_blank"
            className="bg-signal text-white px-6 py-3 rounded hover:bg-signal/90 transition-colors font-semibold"
          >
            Book a call
          </Link>
          <Link 
            href="/work"
            className="bg-line/30 text-ink px-6 py-3 rounded hover:bg-line/50 transition-colors font-semibold"
          >
            See the work
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
