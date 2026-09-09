"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";

const reviews = [
  {
    quote: "The defect detection model they built caught flaws we didn't even know we had. It paid for itself in 3 weeks.",
    author: "Sarah Jenkins",
    role: "VP of Manufacturing, Omni Mfg",
    stars: 5
  },
  {
    quote: "Finally, an AI team that actually understands factory floor constraints instead of just building lab demos.",
    author: "David Chen",
    role: "Lead Engineer, Velocity Textiles",
    stars: 5
  },
  {
    quote: "Our shipping dock throughput increased by 40% after implementing their automated tracking system.",
    author: "Marcus Thorne",
    role: "Operations Director, Horizon Freight",
    stars: 5
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % reviews.length);
  const prev = () => setIndex((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-24 bg-ink text-paper">
      <div className="max-w-layout relative">
        <Reveal variant="scale">
          <div className="text-center mb-12">
            <span className="mono-tag text-signal mb-2 block">CLIENT_FEEDBACK</span>
            <h2 className="text-white">What our partners say</h2>
          </div>

          <div className="max-w-3xl mx-auto relative h-[250px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <div className="flex gap-1 text-signal mb-6">
                  {Array.from({ length: reviews[index].stars }).map((_, i) => (
                    <svg key={i} className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-2xl md:text-3xl font-medium leading-tight mb-8">
                  &ldquo;{reviews[index].quote}&rdquo;
                </blockquote>
                <div className="mono-tag text-white/80">
                  <span className="font-bold text-white">{reviews[index].author}</span> — {reviews[index].role}
                </div>
              </motion.div>
            </AnimatePresence>
            
            <button 
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink transition-colors"
            >
              ←
            </button>
            <button 
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white hover:text-ink transition-colors"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
