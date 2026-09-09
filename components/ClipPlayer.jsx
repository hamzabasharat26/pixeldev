"use client";

import { useEffect, useRef, useState } from "react";
import { videoController } from "./VideoController";

export default function ClipPlayer({ clip, poster, alt = "Video clip", className = "" }) {
  const videoRef = useRef(null);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if autoplay is allowed
    const isMobile = window.innerWidth < 640;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = connection?.saveData;
    const isSlow = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";

    if (isMobile || isSaveData || isSlow) {
      requestAnimationFrame(() => {
        setCanAutoplay(false);
      });
    }
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!clip || !canAutoplay || !videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoController?.requestPlay(videoEl);
            setIsPlaying(true);
          } else {
            videoController?.unregister(videoEl);
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
      if (videoEl) {
        videoController?.unregister(videoEl);
      }
    };
  }, [clip, canAutoplay]);

  const handleTapPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!clip) {
    return (
      <img
        src={poster}
        alt={alt}
        className={`w-full h-full object-cover rounded ${className}`}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <video
        ref={videoRef}
        src={clip}
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
        className="w-full h-full object-cover rounded"
        onClick={!canAutoplay ? handleTapPlay : undefined}
      />
      {!canAutoplay && !isPlaying && (
        <button
          onClick={handleTapPlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors rounded"
          aria-label="Play video"
        >
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
          </div>
        </button>
      )}
    </div>
  );
}
