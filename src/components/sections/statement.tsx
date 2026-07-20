"use client";

import { useEffect, useRef, useState } from "react";
import { WatermarkBadge } from "@/components/ui/watermark-badge";
import { cn } from "@/lib/utils";

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // defer fetching the video until the section is actually approaching —
    // otherwise it competes with the hero video for the phone's decoder
    // right at page load, which is what was making the site feel heavy
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (shouldLoad) videoRef.current?.load();
  }, [shouldLoad]);

  useEffect(() => {
    // pause decoding while the section is off-screen — an autoplaying
    // video left running behind the viewport is pure wasted CPU/GPU
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let ended = false;
    const onEnded = () => {
      ended = true;
    };
    video.addEventListener("ended", onEnded);

    const observer = new IntersectionObserver(
      ([entry]) => {
        // once it's played through, leave it on its last frame — calling
        // play() again after "ended" restarts it from frame zero in most
        // browsers, which is what was making it look like it kept looping
        if (entry.isIntersecting) {
          if (!ended) {
            video.play().catch(() => {});
            setRevealed(true);
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] overflow-hidden bg-primary"
      aria-label="Tattoos que marcam presença"
    >
      <div className="relative h-full w-full lg:mx-auto lg:aspect-[9/16] lg:w-auto">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="none"
          poster="/posters/lion-statement.jpg"
          aria-hidden
        >
          {shouldLoad && (
            <source src="/video/lion-statement.mp4" type="video/mp4" />
          )}
        </video>
        <WatermarkBadge />
        {/* the clip's text is burned in from frame one, so mask it until the
            visitor actually scrolls to this section instead of flashing the
            finished copy before the reveal plays */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-primary transition-opacity duration-700",
            revealed ? "opacity-0" : "opacity-100"
          )}
        />
      </div>
    </section>
  );
}
