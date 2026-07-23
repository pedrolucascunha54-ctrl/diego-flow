"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.6 });
  const photoX = useTransform(springX, [-1, 1], [-16, 16]);
  const photoY = useTransform(springY, [-1, 1], [-12, 12]);
  const textX = useTransform(springX, [-1, 1], [8, -8]);
  const textY = useTransform(springY, [-1, 1], [5, -5]);

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
    // parallax only makes sense with a real cursor — skip on touch devices
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    const handleMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex h-[100dvh] min-h-[640px] items-end overflow-hidden bg-primary"
    >
      <div ref={mediaRef} className="absolute inset-0">
        <motion.div
          style={{ x: photoX, y: photoY }}
          className="relative h-full w-full lg:mx-auto lg:aspect-[9/16] lg:w-auto"
        >
          <Image
            src="/images/hero-photo.webp"
            alt="Diego Mesquita no estúdio Flow Tattoo"
            fill
            priority
            sizes="(min-width: 1024px) 100vh, 100vw"
            className="scale-110 object-cover"
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/55 via-background/30 to-background/10" />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
            style={{
              background:
                "linear-gradient(to top, color-mix(in oklab, var(--color-gold) 22%, var(--color-background)) 0%, transparent 100%)",
            }}
          />

          <motion.p
            style={{ x: textX, y: textY }}
            className="absolute left-[12%] top-[49%] w-[78%] max-w-md font-sans text-xl font-bold leading-snug text-ivory sm:text-2xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              Projetos exclusivos em{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-orange-400"
            >
              Realismo Preto e Cinza{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              e Blackwork, desenvolvidos com{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 1.65, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-orange-400"
            >
              planejamento, composição e técnica{" "}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 26, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
            >
              pra entregar uma tattoo que continua absurda com o passar dos
              anos.
            </motion.span>
          </motion.p>
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
