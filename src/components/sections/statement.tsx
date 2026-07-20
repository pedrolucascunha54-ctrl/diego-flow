"use client";

import { useEffect, useRef, useState } from "react";

export function Statement() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    // pause decoding while the section is off-screen — an autoplaying
    // video left running behind the viewport is pure wasted CPU/GPU
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100dvh] bg-primary"
      aria-label="Tattoos que marcam presença"
    >
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/posters/lion-statement.jpg"
        aria-hidden
      >
        {shouldLoad && (
          <source src="/video/lion-statement.mp4" type="video/mp4" />
        )}
      </video>
    </section>
  );
}
