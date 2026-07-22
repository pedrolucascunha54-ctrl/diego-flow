"use client";

import { useEffect, useRef, useState } from "react";

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
      {/* the clip's text is burned in from frame one, so nothing is visible
          until the visitor scrolls to this section — it then opens through
          an expanding circular iris instead of a plain fade */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: revealed
            ? "circle(150% at 50% 50%)"
            : "circle(0% at 50% 50%)",
          transition: "clip-path 1.4s cubic-bezier(0.65, 0, 0.35, 1)",
        }}
      >
        <div
          className="h-full w-full lg:mx-auto lg:aspect-[9/16] lg:w-auto"
          style={{
            transform: revealed ? "scale(1)" : "scale(1.2)",
            transition: "transform 1.4s cubic-bezier(0.65, 0, 0.35, 1)",
          }}
        >
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
        </div>
      </div>
    </section>
  );
}
