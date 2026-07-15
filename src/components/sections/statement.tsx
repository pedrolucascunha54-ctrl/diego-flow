"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let ready = false;

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
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        if (!ready || !video.duration) return;
        video.currentTime = self.progress * video.duration;
      },
    });

    return () => {
      trigger.kill();
      video.removeEventListener("loadedmetadata", unlock);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[240vh] bg-primary"
      aria-label="Tattoos que marcam presença"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          muted
          playsInline
          preload="auto"
          poster="/posters/lion-statement.jpg"
          aria-hidden
        >
          <source src="/video/lion-statement.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
