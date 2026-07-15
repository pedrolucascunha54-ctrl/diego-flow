"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  once = true,
}: {
  text: string;
  as?: "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
  once?: boolean;
}) {
  const words = text.split(" ");

  return (
    <Tag className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="mr-[0.28em] overflow-hidden pb-[0.15em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * 0.06,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
