"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type AutoVideoProps = {
  poster: string;
  webm?: string;
  mp4?: string;
  /** Alt text for the still image. */
  alt: string;
  /** e.g. "16 / 9" — reserves space and prevents layout shift. */
  aspect: string;
  /** next/image sizes hint for the still. */
  sizes?: string;
  className?: string;
  rounded?: boolean;
  /** Above-the-fold media — load the still eagerly for LCP. */
  priority?: boolean;
};

/**
 * Muted looping background video where one is supplied; otherwise an optimized
 * still. Video plays only while on screen and never under prefers-reduced-motion.
 */
export function AutoVideo({
  poster,
  webm,
  mp4,
  alt,
  aspect,
  sizes = "100vw",
  className,
  rounded = true,
  priority = false,
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
        if (entry.isIntersecting) el.play().catch(() => {});
        else el.pause();
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

  const showVideo = hasVideo && !reduce;

  return (
    <div className={box} style={{ aspectRatio: aspect }}>
      {showVideo ? (
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
      ) : (
        <Image
          src={poster}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
    </div>
  );
}
