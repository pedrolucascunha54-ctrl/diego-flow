"use client";

import { SPECIALTY_REELS } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";

export function Specialties() {
  return (
    <section id="especialidades" className="relative bg-primary">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
        <SectionLabel>Especialidades</SectionLabel>
        <RevealText
          text="Arte, técnica e propósito."
          as="h2"
          className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-foreground sm:text-5xl"
        />
      </div>

      {SPECIALTY_REELS.map((reel) => (
        // taller than the viewport so the sticky card gets a stable dwell
        // period before the next card starts sliding up to cover it —
        // a same-height sticky stack has zero dwell and instantly clips
        <div key={reel.video} className="relative h-[170dvh]">
          <div className="vignette-corner sticky top-0 h-[100dvh] w-full overflow-hidden">
            <video
              className="h-full w-full object-cover object-left"
              autoPlay
              muted
              playsInline
              preload="auto"
              poster={reel.poster}
              aria-label={reel.covers.join(", ")}
            >
              <source src={reel.video} type="video/mp4" />
            </video>
          </div>
        </div>
      ))}
    </section>
  );
}
