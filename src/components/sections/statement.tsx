"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const VIDEO_FPS = 24;

// step-reveal thresholds — progress through the section's scroll range at
// which each block snaps into view, with a short window for the snap itself
const TITLE_AT = 0.08;
const SUBTITLE_AT = 0.2;
const SNAP_WINDOW = 0.04;

// the video's own baked-in text animation is compressed into its first ~0.6s,
// so we hold the very first frame (full, crisp copy) while our two reveal
// steps play out, then hand off to the video's real motion for the rest
const TEXT_HOLD_UNTIL = 0.32;

function stepOpacity(progress: number, revealAt: number) {
  return 1 - gsap.utils.clamp(0, 1, (progress - revealAt) / SNAP_WINDOW);
}

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const subtitleMaskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const video = videoRef.current;
    const titleMask = titleMaskRef.current;
    const subtitleMask = subtitleMaskRef.current;
    if (!section || !video || !titleMask || !subtitleMask) return;

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
          // hold on frame 0 (full crisp copy) until both reveal steps have
          // played, then map the rest of the scroll to the rest of the clip
          const videoProgress =
            self.progress <= TEXT_HOLD_UNTIL
              ? 0
              : (self.progress - TEXT_HOLD_UNTIL) / (1 - TEXT_HOLD_UNTIL);

          // only issue a seek when the target frame actually changes —
          // setting currentTime on every scroll tick is what stutters on Android
          const frame = Math.round(videoProgress * video.duration * VIDEO_FPS);
          if (frame !== lastFrame) {
            lastFrame = frame;
            video.currentTime = frame / VIDEO_FPS;
          }
        }
        titleMask.style.opacity = String(stepOpacity(self.progress, TITLE_AT));
        subtitleMask.style.opacity = String(
          stepOpacity(self.progress, SUBTITLE_AT)
        );
      },
    });

    return () => {
      trigger.kill();
      video.removeEventListener("loadedmetadata", unlock);
    };
  }, []);

  const maskStyle = {
    background:
      "linear-gradient(to right, var(--color-background) 0%, var(--color-background) 78%, transparent 100%)",
    opacity: 1,
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-[240dvh] bg-primary"
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

        {/* hides the video's baked-in title until the 1st scroll step */}
        <div
          ref={titleMaskRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-[52%] w-[92%] sm:w-[70%]"
          style={maskStyle}
        />
        {/* hides the video's baked-in body copy until the 2nd scroll step */}
        <div
          ref={subtitleMaskRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 top-[52%] w-[92%] sm:w-[70%]"
          style={maskStyle}
        />
      </div>
    </section>
  );
}
