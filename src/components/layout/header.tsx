"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Logo } from "@/components/ui/logo";
import { GlassButton } from "@/components/ui/glass-button";
import { WHATSAPP_DEFAULT_LINK } from "@/lib/whatsapp";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#portfolio", label: "Portfólio" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-500 sm:px-8",
          scrolled ? "mt-3 rounded-full py-3 glass mx-4 sm:mx-auto" : "py-6"
        )}
      >
        <a href="#top" aria-label="FLOW TATTOO — início">
          <Logo />
        </a>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-orange-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram do Flow Tattoo"
            className="text-muted transition-colors duration-300 hover:text-gold"
          >
            <InstagramIcon className="h-[18px] w-[18px]" strokeWidth={1.5} />
          </a>
          <GlassButton href={WHATSAPP_DEFAULT_LINK} size="sm">
            Orçamento
          </GlassButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="glass-strong fixed inset-0 z-50 flex flex-col px-6 pt-6 md:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar menu"
                className="relative flex h-10 w-10 items-center justify-center"
              >
                <span className="absolute h-px w-6 rotate-45 bg-foreground" />
                <span className="absolute h-px w-6 -rotate-45 bg-foreground" />
              </button>
            </div>

            <nav className="mt-16 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-border py-5 font-display text-3xl italic text-foreground"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-auto mb-10 flex flex-col items-center gap-6"
            >
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram do Flow Tattoo"
                onClick={() => setOpen(false)}
                className="text-muted transition-colors duration-300 hover:text-gold"
              >
                <InstagramIcon className="h-6 w-6" strokeWidth={1.5} />
              </a>
              <GlassButton href={WHATSAPP_DEFAULT_LINK} size="lg" className="w-full">
                Fazer orçamento
              </GlassButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
