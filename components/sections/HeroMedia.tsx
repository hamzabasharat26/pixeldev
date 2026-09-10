"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Hero background: the navy + amber "data highway" render, full-bleed, with a
 * slow scale-up as the hero scrolls out. Transform is written straight to the
 * node in a rAF-throttled scroll handler — no state, no animation lib. Off
 * under prefers-reduced-motion.
 */
export function HeroMedia() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layerRef.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const read = () => {
      raf = 0;
      const y = window.scrollY;
      // 0 → ~1 across the first viewport height
      const p = Math.min(1, y / Math.max(1, window.innerHeight));
      el.style.transform = `scale(${1 + p * 0.09}) translateY(${p * 22}px)`;
      el.style.opacity = String(1 - p * 0.35);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div
        ref={layerRef}
        className="absolute inset-0 origin-top will-change-transform"
      >
        {/* Pre-optimised by the media pipeline — skip the Next optimiser
            (double work + a cold-start delay on the LCP image). */}
        <Image
          src="/services/hero-bg-1920.webp"
          alt=""
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
        {/* robot render bleeding off the right edge, desktop only */}
        <Image
          src="/services/hero-robot-1400.webp"
          alt=""
          width={760}
          height={988}
          unoptimized
          className="pointer-events-none absolute -right-16 top-1/2 hidden max-h-[720px] w-auto -translate-y-1/2 opacity-40 [mask-image:linear-gradient(100deg,transparent,#000_60%)] lg:block xl:-right-4"
          style={{ height: "82%" }}
        />
      </div>
      {/* navy readability wash — text stays >= AA, bottom butts the next section */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgb(7 14 28 / 0.42) 0%, rgb(7 14 28 / 0.58) 42%, rgb(7 14 28 / 0.86) 80%, var(--color-navy-ink) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgb(7 14 28 / 0.78) 0%, rgb(7 14 28 / 0.32) 42%, transparent 68%)",
        }}
      />
    </div>
  );
}
