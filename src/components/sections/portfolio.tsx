"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { MediaImage } from "@/components/ui/media-image";
import { TraceReveal } from "@/components/ui/trace-reveal";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [active, setActive] = useState(0);
  const lastIndex = PORTFOLIO_ITEMS.length - 1;

  const previous = () => {
    setActive((current) => (current === 0 ? lastIndex : current - 1));
  };

  const next = () => {
    setActive((current) => (current === lastIndex ? 0 : current + 1));
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <section
      id="portfolio"
      className="relative overflow-hidden bg-background pb-12 pt-24 sm:pb-16 sm:pt-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel className="text-sm sm:text-base">Portfólio</SectionLabel>
      </div>

      <div className="relative mt-8 h-[82dvh] min-h-[620px] w-full sm:mt-10">
        <div className="relative h-full w-full">
          {PORTFOLIO_ITEMS.map((item, index) => {
            const isActive = index === active;
            let distance = index - active;

            if (distance > PORTFOLIO_ITEMS.length / 2) {
              distance -= PORTFOLIO_ITEMS.length;
            }
            if (distance < -PORTFOLIO_ITEMS.length / 2) {
              distance += PORTFOLIO_ITEMS.length;
            }

            const isNeighbor = Math.abs(distance) === 1;
            const isVisible = isActive || isNeighbor;
            const translate = distance * 45;
            const scale = isActive ? 1 : 0.72;

            return (
              <article
                key={item.slug}
                className="absolute left-1/2 top-[42%] flex h-[56dvh] w-[72vw] max-w-[500px] -translate-y-1/2 items-center justify-center transition-[transform,opacity,filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none sm:h-[58dvh] sm:w-[44vw]"
                aria-hidden={!isActive}
                style={{
                  transform: `translateX(calc(-50% + ${translate}vw)) translateY(-50%) scale(${scale})`,
                  opacity: isActive ? 1 : isNeighbor ? 0.48 : 0,
                  filter: isActive ? "brightness(1)" : "brightness(0.58)",
                  zIndex: isActive ? 20 : isNeighbor ? 10 : 0,
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <div
                  className="relative h-full w-full origin-center overflow-hidden rounded-[var(--radius-xl)] border border-border shadow-[0_28px_80px_rgb(0_0_0/0.65)]"
                >
                  {item.beforeImage ? (
                    <TraceReveal
                      before={item.beforeImage}
                      after={item.image}
                      alt={`${item.title} — ${item.category}`}
                      className="h-full w-full"
                    />
                  ) : (
                    <MediaImage
                      src={item.image}
                      alt={`${item.title} — ${item.category}`}
                      className="h-full w-full"
                      priority={index === 0}
                      fit="contain"
                    />
                  )}
                </div>

                <div
                  className={cn(
                    "pointer-events-none absolute -bottom-24 z-20 flex w-full flex-col gap-2 px-1 text-center transition-all duration-500 [text-shadow:0_2px_16px_rgb(0_0_0/0.95)]",
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-3 opacity-0"
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-orange-400">
                    {item.index} / {item.category}
                  </span>
                  <h3 className="font-display text-2xl italic leading-tight text-foreground sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          onClick={previous}
          aria-label="Ver tatuagem anterior"
          title="Anterior"
          className="portfolio-arrow portfolio-arrow-previous glass absolute top-[42%] z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:border-gold/50 hover:text-orange-400 sm:h-14 sm:w-14"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Ver próxima tatuagem"
          title="Próxima"
          className="portfolio-arrow portfolio-arrow-next glass absolute top-[42%] z-30 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-foreground transition-colors hover:border-gold/50 hover:text-orange-400 sm:h-14 sm:w-14"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>

        <div className="absolute inset-x-0 bottom-1 z-30 flex justify-center gap-2">
          {PORTFOLIO_ITEMS.map((item, index) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Ver ${item.title}`}
              aria-current={index === active ? "true" : undefined}
              className="flex h-8 items-center justify-center"
            >
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  index === active ? "w-6 bg-gold" : "w-1.5 bg-border"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
