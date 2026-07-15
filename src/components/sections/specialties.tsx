"use client";

import { motion } from "framer-motion";
import { SPECIALTIES } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";

export function Specialties() {
  return (
    <section id="especialidades" className="bg-primary py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>Especialidades</SectionLabel>
        <RevealText
          text="Arte, técnica e propósito."
          as="h2"
          className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-foreground sm:text-5xl"
        />

        <div className="mt-16 grid gap-x-12 sm:mt-20 sm:grid-cols-2">
          {SPECIALTIES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.6,
                delay: (i % 2) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex items-start gap-5 border-t border-border py-7 first:border-t sm:py-8"
            >
              <span className="font-mono text-sm text-gold/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl italic text-foreground transition-colors duration-300 group-hover:text-gold sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
