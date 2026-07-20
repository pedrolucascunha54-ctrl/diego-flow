"use client";

import { useEffect, useRef, useState } from "react";
import { SPECIALTY_REELS, type SpecialtyReel } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";

function ReelCard({ reel }: { reel: SpecialtyReel }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // defer fetching each reel until its card is actually approaching —
    // otherwise all 4 videos fight for the phone's decoder at once on load
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) videoRef.current?.load();
  }, [shouldLoad]);

  useEffect(() => {
    // pause decoding while the card is off-screen — otherwise, once all
    // four reels have scrolled past, all four keep decoding in the
    // background at once
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
    <div
      ref={wrapperRef}
      className="vignette-corner relative h-[100dvh] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover object-left"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster={reel.poster}
        aria-label={reel.covers.join(", ")}
      >
        {shouldLoad && <source src={reel.video} type="video/mp4" />}
      </video>
    </div>
  );
}

export function Specialties() {
  return (
    <section id="especialidades" className="relative bg-primary">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14">
        <SectionLabel>Especialidades</SectionLabel>
        <RevealText
          text="Arte, técnica e propósito."
          as="h2"
          className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-foreground sm:text-5xl"
        />
      </div>

      {SPECIALTY_REELS.map((reel) => (
        <ReelCard key={reel.video} reel={reel} />
      ))}
    </section>
  );
}
