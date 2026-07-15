"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PORTFOLIO_ITEMS } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { MediaImage } from "@/components/ui/media-image";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const track = trackRef.current;
    if (!wrapper || !sticky || !track) return;

    let distance = 0;

    const setHeights = () => {
      distance = Math.max(0, track.scrollWidth - sticky.clientWidth);
      wrapper.style.height = `${sticky.clientHeight + distance}px`;
      ScrollTrigger.refresh();
    };

    setHeights();
    window.addEventListener("resize", setHeights);

    const trigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        track.style.transform = `translateX(-${self.progress * distance}px)`;
        setActive(
          Math.round(self.progress * (PORTFOLIO_ITEMS.length - 1))
        );
      },
    });

    return () => {
      trigger.kill();
      window.removeEventListener("resize", setHeights);
    };
  }, []);

  return (
    <section id="portfolio" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>Portfólio</SectionLabel>
      </div>

      <div ref={wrapperRef} className="relative mt-10 sm:mt-12">
        <div
          ref={stickyRef}
          className="sticky top-0 flex h-[100dvh] w-full flex-col justify-center overflow-hidden"
        >
          <div
            ref={trackRef}
            className="flex items-center gap-5 pl-5 will-change-transform sm:gap-8 sm:pl-8"
          >
            {PORTFOLIO_ITEMS.map((item) => (
              <div
                key={item.slug}
                className="flex h-[60vh] w-[78vw] shrink-0 flex-col gap-5 sm:h-[65vh] sm:w-[420px]"
              >
                <div className="relative flex-1 overflow-hidden rounded-[var(--radius-xl)] border border-border">
                  <MediaImage
                    src={item.image}
                    alt={`${item.title} — ${item.category}`}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex flex-col gap-2 px-1">
                  <span className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
                    {item.index} / {item.category}
                  </span>
                  <h3 className="font-display text-2xl italic leading-tight text-foreground sm:text-3xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
            <div className="w-5 shrink-0 sm:w-8" aria-hidden />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center gap-2">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <span
                key={item.slug}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-6 bg-gold" : "w-1.5 bg-border"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
