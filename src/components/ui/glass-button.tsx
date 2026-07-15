"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type GlassButtonProps = {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
};

export function GlassButton({
  href,
  children,
  size = "sm",
  className,
}: GlassButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "glass group relative inline-flex items-center justify-center gap-2 rounded-full text-foreground transition-colors duration-300",
        "hover:border-gold/40",
        size === "sm" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-8 py-4 text-base",
        className
      )}
    >
      <svg
        width={size === "lg" ? 18 : 15}
        height={size === "lg" ? 18 : 15}
        viewBox="0 0 24 24"
        fill="currentColor"
        className="shrink-0 text-gold transition-transform duration-300 group-hover:scale-110"
        aria-hidden
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.47 3.47 1.29 4.93L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.02a8.1 8.1 0 0 1-4.13-1.13l-.3-.18-3.09.81.82-3.01-.19-.31a8.06 8.06 0 0 1-1.24-4.29c0-4.46 3.63-8.09 8.13-8.09 4.5 0 8.13 3.63 8.13 8.09 0 4.46-3.63 8.11-8.13 8.11Zm4.46-6.07c-.24-.12-1.44-.71-1.67-.79-.22-.08-.38-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z" />
      </svg>
      <span className="font-medium">{children}</span>
    </motion.a>
  );
}
