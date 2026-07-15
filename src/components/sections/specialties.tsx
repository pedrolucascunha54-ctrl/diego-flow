"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Eye,
  Hexagon,
  Shield,
  RefreshCw,
  PenLine,
  Cross,
  Landmark,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { SPECIALTIES } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";

const ICONS: LucideIcon[] = [
  Eye,
  Hexagon,
  Shield,
  RefreshCw,
  PenLine,
  Cross,
  Landmark,
  Zap,
];

export function Specialties() {
  return (
    <section id="especialidades" className="relative bg-primary">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
        <SectionLabel>Especialidades</SectionLabel>
        <RevealText
          text="Arte, técnica e propósito."
          as="h2"
          className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-foreground sm:text-5xl"
        />
      </div>

      {SPECIALTIES.map((item, i) => {
        const Icon = ICONS[i];
        return (
          // taller than the viewport so the sticky card gets a stable dwell
          // period before the next card starts sliding up to cover it —
          // a same-height sticky stack has zero dwell and instantly clips
          <div key={item.title} className="relative h-[170dvh]">
            <div className="sticky top-0 flex h-[100dvh] w-full items-end overflow-hidden">
              <motion.div
                initial={{ scale: 1 }}
                whileInView={{ scale: 1.08 }}
                viewport={{ once: true }}
                transition={{ duration: 10, ease: "easeOut" }}
                className="vignette-corner absolute inset-0"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </motion.div>

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />

              <div className="relative z-10 w-full px-5 pb-14 sm:max-w-md sm:px-8 sm:pb-20">
                <span className="font-mono text-sm text-gold/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-full border border-border text-gold">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-display text-3xl italic text-foreground sm:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted sm:text-base">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
