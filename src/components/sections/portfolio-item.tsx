"use client";

import { motion, type Variants } from "framer-motion";
import { MediaImage } from "@/components/ui/media-image";
import { cn } from "@/lib/utils";
import type { PortfolioItem as PortfolioItemType } from "@/lib/content";

const VARIANTS: Record<PortfolioItemType["animation"], Variants> = {
  "slide-left": {
    hidden: { opacity: 0, x: -60, clipPath: "inset(0 0 0 0)" },
    show: { opacity: 1, x: 0 },
  },
  "slide-right": {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0 },
  },
  "fade-up": {
    hidden: { opacity: 0, y: 56 },
    show: { opacity: 1, y: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.92 },
    show: { opacity: 1, scale: 1 },
  },
  "clip-reveal": {
    hidden: { opacity: 0, clipPath: "inset(12% 0 12% 0)" },
    show: { opacity: 1, clipPath: "inset(0% 0 0% 0)" },
  },
};

export function PortfolioItem({ item }: { item: PortfolioItemType }) {
  const rightAligned = item.align === "right";

  return (
    <div className="grid gap-6 sm:gap-8">
      <motion.div
        variants={VARIANTS[item.animation]}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-xl)] border border-border sm:aspect-[4/5]"
      >
        <MediaImage
          src={item.image}
          alt={`${item.title} — ${item.category}`}
          className="h-full w-full"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex flex-col gap-3 px-1",
          rightAligned ? "sm:items-end sm:text-right sm:self-end sm:max-w-md" : "sm:max-w-md"
        )}
      >
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
          {item.index} / {item.category}
        </span>
        <h3 className="font-display text-3xl italic leading-tight text-foreground sm:text-4xl">
          {item.title}
        </h3>
      </motion.div>
    </div>
  );
}
