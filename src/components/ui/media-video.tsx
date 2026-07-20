"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function MediaVideo({
  src,
  poster,
  className,
  priority = false,
  videoStyle,
}: {
  src: string;
  poster: string;
  className?: string;
  priority?: boolean;
  videoStyle?: React.CSSProperties;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // pause decoding once scrolled past — a background video left playing
    // for the rest of the scroll is pure wasted CPU/GPU
    const el = wrapperRef.current;
    const video = videoRef.current;
    if (!el || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={cn("vignette-corner relative overflow-hidden", className)}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        style={videoStyle}
        autoPlay
        muted
        loop
        playsInline
        preload={priority ? "auto" : "metadata"}
        poster={poster}
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* soft cinematic vignette — also conceals the AI-generation watermark in the source clip */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
    </div>
  );
}
