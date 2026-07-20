"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function TraceReveal({
  before,
  after,
  alt,
  className,
}: {
  before: string;
  after: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={after}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 640px, 92vw"
        className="object-cover"
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 1 }}
        animate={{ opacity: [1, 1, 0, 0, 1] }}
        transition={{
          duration: 7,
          times: [0, 0.4, 0.55, 0.9, 1],
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Image
          src={before}
          alt=""
          fill
          sizes="(min-width: 1024px) 640px, 92vw"
          className="object-cover"
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
}
