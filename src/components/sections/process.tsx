"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS_STEPS } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 65%", "end 55%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="processo" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>O Processo</SectionLabel>
        <RevealText
          text="Da ideia à cicatrização."
          as="h2"
          className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-foreground sm:text-5xl"
        />
        <p className="mt-5 max-w-md text-balance leading-relaxed text-muted">
          Cada etapa é conduzida com atenção, técnica e cuidado — do primeiro
          contato ao resultado que fica.
        </p>

        <div ref={sectionRef} className="relative mt-16 sm:mt-20">
          <div className="absolute left-[7px] top-1 bottom-1 w-px bg-border sm:left-[9px]" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[7px] top-1 w-px bg-gold sm:left-[9px]"
          />

          <ol className="flex flex-col gap-14 sm:gap-16">
            {PROCESS_STEPS.map((step, i) => (
              <motion.li
                key={step.index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15% 0px" }}
                transition={{ duration: 0.7, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-9 sm:pl-12"
              >
                <span className="absolute left-0 top-1 h-[15px] w-[15px] rounded-full border border-gold bg-background sm:h-[19px] sm:w-[19px]" />
                <span className="font-mono text-xs text-orange-400/70">
                  {step.index}
                </span>
                <h3 className="mt-1 font-display text-2xl italic text-foreground sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted sm:text-base">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
