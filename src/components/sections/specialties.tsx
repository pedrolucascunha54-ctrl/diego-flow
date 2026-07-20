"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SPECIALTY_REELS, type SpecialtyReel } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";
import { WatermarkBadge } from "@/components/ui/watermark-badge";

const VIDEO_FPS = 24;

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
    // each reel's segments (e.g. reel-04 runs through Arte Sacra, Mitologia
    // and Anime Realista back to back) are baked into the footage, so its
    // timeline has to be scrubbed by scroll position — otherwise it cycles
    // through them on its own timer regardless of what the visitor is
    // actually looking at
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    const video = videoRef.current;
    if (!wrapper || !video) return;

    let ready = false;
    let lastFrame = -1;

    const unlock = () => {
      // iOS Safari only allows currentTime scrubbing after an initial play/pause cycle
      video
        .play()
        .then(() => video.pause())
        .catch(() => {});
      ready = true;
    };

    if (video.readyState >= 1) {
      unlock();
    } else {
      video.addEventListener("loadedmetadata", unlock, { once: true });
    }

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (ready && video.duration) {
          // only issue a seek when the target frame actually changes —
          // setting currentTime on every scroll tick is what stutters on Android
          const frame = Math.round(self.progress * video.duration * VIDEO_FPS);
          if (frame !== lastFrame) {
            lastFrame = frame;
            video.currentTime = frame / VIDEO_FPS;
          }
        }
      },
    });

    return () => {
      trigger.kill();
      video.removeEventListener("loadedmetadata", unlock);
    };
  }, []);

  return (
    // taller than the viewport so scrolling through it has room to scrub
    // the video's own timeline instead of just flashing past it
    <div ref={wrapperRef} className="relative h-[170dvh]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden bg-primary">
        <div className="vignette-corner relative h-full w-full lg:mx-auto lg:aspect-[9/16] lg:w-auto">
          <video
            ref={videoRef}
            className="h-full w-full object-cover object-left"
            muted
            playsInline
            preload="none"
            poster={reel.poster}
            aria-label={reel.covers.join(", ")}
          >
            {shouldLoad && <source src={reel.video} type="video/mp4" />}
          </video>
          <WatermarkBadge />
        </div>
      </div>
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
