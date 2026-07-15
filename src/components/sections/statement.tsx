"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VIDEO_FPS = 24;

// how much of the section's scroll range it takes for the mask to clear —
// kept tiny so the video's own baked-in animation takes over almost
// immediately once the user starts scrolling
const MASK_CLEAR_BY = 0.01;

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

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
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const video = videoRef.current;
    const mask = maskRef.current;
    if (!section || !video || !mask) return;

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
      trigger: section,
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
        mask.style.opacity = String(
          1 - gsap.utils.clamp(0, 1, self.progress / MASK_CLEAR_BY)
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
      className="relative h-[160dvh] bg-primary"
      aria-label="Tattoos que marcam presença"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
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

        {/* hides the video's baked-in copy until the user starts scrolling */}
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
