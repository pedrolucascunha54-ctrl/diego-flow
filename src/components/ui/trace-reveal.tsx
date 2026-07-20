"use client";

import Image from "next/image";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const TraceReveal = forwardRef<
  HTMLDivElement,
  {
    before: string;
    after: string;
    alt: string;
    className?: string;
  }
>(function TraceReveal({ before, after, alt, className }, overlayRef) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={after}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 92vw"
        className="object-cover"
      />
      {/* opacity is driven imperatively by the horizontal scroll progress —
          see Portfolio's ScrollTrigger onUpdate */}
      <div ref={overlayRef} className="absolute inset-0">
        <Image
          src={before}
          alt=""
          fill
          sizes="(min-width: 1024px) 640px, 92vw"
          className="object-cover"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
});
