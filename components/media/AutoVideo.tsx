"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AutoVideoProps = {
  poster: string;
  webm?: string;
  mp4?: string;
  /** Decorative alt for the poster fallback. */
  alt: string;
  /** e.g. "16 / 9" — required to reserve space and prevent layout shift. */
  aspect: string;
  className?: string;
  rounded?: boolean;
};

/**
 * Muted looping background video. Plays only while on screen; falls back to the
 * poster image entirely under prefers-reduced-motion.
 */
export function AutoVideo({
  poster,
  webm,
  mp4,
  alt,
  aspect,
  className,
  rounded = true,
}: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(true);
  const hasVideo = Boolean(webm || mp4);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !hasVideo) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, hasVideo]);

  const box = cn(
    "relative w-full overflow-hidden bg-surface-elevated",
    rounded && "rounded-[12px]",
    className,
  );

  if (reduce || !hasVideo) {
    return (
      <div className={box} style={{ aspectRatio: aspect }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt={alt}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className={box} style={{ aspectRatio: aspect }}>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-cover"
      >
        {webm && <source src={webm} type="video/webm" />}
        {mp4 && <source src={mp4} type="video/mp4" />}
      </video>
    </div>
  );
}
