"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// portion of the section's scroll range over which the text mask fully clears
const REVEAL_END = 0.4;

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const video = videoRef.current;
    const mask = maskRef.current;
    if (!section || !video || !mask) return;

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
        if (ready && video.duration) {
          video.currentTime = self.progress * video.duration;
        }
        mask.style.opacity = String(
          1 - gsap.utils.clamp(0, 1, self.progress / REVEAL_END)
        );
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

        {/* hides the video's baked-in copy until the user scrolls, then fades away */}
        <div
          ref={maskRef}
          className="pointer-events-none absolute inset-y-0 left-0 w-[92%] sm:w-[70%]"
          style={{
            background:
              "linear-gradient(to right, var(--color-background) 0%, var(--color-background) 78%, transparent 100%)",
            opacity: 1,
          }}
        />
      </div>
    </section>
  );
}
