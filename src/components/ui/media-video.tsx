"use client";

import { cn } from "@/lib/utils";

export function MediaVideo({
  src,
  poster,
  className,
  priority = false,
}: {
  src: string;
  poster: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("vignette-corner relative overflow-hidden", className)}>
      <video
        className="h-full w-full object-cover"
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
