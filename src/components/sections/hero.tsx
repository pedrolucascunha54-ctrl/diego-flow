"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/ui/reveal-text";
import { SectionLabel } from "@/components/ui/section-label";
import { GlassButton } from "@/components/ui/glass-button";
import { WHATSAPP_DEFAULT_LINK } from "@/lib/whatsapp";

const VIDEO_FPS = 24;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!sectionRef.current || !mediaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        scale: 0.94,
        opacity: 0.35,
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

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

    // the logo reveals out of the smoke as the visitor scrolls through the
    // hero — its timeline is scrubbed by scroll position instead of
    // autoplaying on a timer
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
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
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[640px] items-end overflow-hidden bg-primary"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <div className="vignette-corner relative h-full w-full overflow-hidden">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            muted
            playsInline
            preload="auto"
            poster="/posters/hero.jpg"
            aria-hidden
          >
            <source src="/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/70 to-transparent" />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/25 to-background/10" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <SectionLabel light>Flow Tattoo — Diego Mesquita</SectionLabel>
        </motion.div>

        <RevealText
          text="A arte do realismo em preto e cinza."
          as="h1"
          delay={0.35}
          className="mt-5 max-w-3xl font-display text-[2.6rem] font-medium italic leading-[1.02] text-ivory text-balance sm:text-6xl lg:text-7xl"
        />

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 max-w-md text-balance text-base leading-relaxed text-beige/90 sm:text-lg"
        >
          Projetos autorais que transformam referência em permanência — técnica
          apurada e um processo conduzido do primeiro traço à cicatrização.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-9"
        >
          <GlassButton href={WHATSAPP_DEFAULT_LINK} size="lg">
            Solicitar orçamento
          </GlassButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.6 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">
          Role
        </span>
        <span className="relative h-10 w-px overflow-hidden bg-border">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
