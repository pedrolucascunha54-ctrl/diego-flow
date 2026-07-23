"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[640px] items-end overflow-hidden bg-primary"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <div className="relative h-full w-full lg:mx-auto lg:aspect-[9/16] lg:w-auto">
          <Image
            src="/images/hero-photo.webp"
            alt="Diego Mesquita no estúdio Flow Tattoo"
            fill
            priority
            sizes="(min-width: 1024px) 100vh, 100vw"
            className="object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-background/30 to-background/10" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--color-gold) 22%, var(--color-background)) 0%, transparent 100%)",
            }}
          />

          <p className="absolute left-[12%] top-[49%] w-[78%] max-w-md font-sans text-xl font-bold leading-snug text-ivory sm:text-2xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="inline-block"
            >
              Projetos exclusivos em{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.15 }}
              className="inline-block text-orange-400"
            >
              Realismo Preto e Cinza{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="inline-block"
            >
              e Blackwork, desenvolvidos com{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.65 }}
              className="inline-block text-orange-400"
            >
              planejamento, composição e técnica{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.9 }}
              className="inline-block"
            >
              pra entregar uma tattoo que continua absurda com o passar dos
              anos.
            </motion.span>
          </p>
        </div>
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
