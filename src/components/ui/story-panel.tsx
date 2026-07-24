"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

type StoryPanelProps = {
  image: string;
  alt: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  priority?: boolean;
  label?: string;
  effect?: "smoke";
  transition?: "ink-left" | "ink-right";
};

export function StoryPanel({
  image,
  alt,
  children,
  className,
  contentClassName,
  priority = false,
  label,
  effect,
  transition,
}: StoryPanelProps) {
  const panelRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const smokeRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const panel = panelRef.current;
    const imageElement = imageRef.current;
    const smoke = smokeRef.current;
    const transitionElement = transitionRef.current;
    if (!panel || !imageElement) return;

    const words = panel.querySelectorAll<HTMLElement>("[data-reveal-word]");
    const rules = panel.querySelectorAll<HTMLElement>("[data-reveal-rule]");
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(words, { opacity: 0.08, yPercent: 105, filter: "blur(7px)" });
      gsap.set(rules, { scaleX: 0, transformOrigin: "left center" });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(rules, {
          scaleX: 1,
          duration: 0.08,
          stagger: 0.03,
          ease: "none",
        })
        .to(
          words,
          {
            opacity: 1,
            yPercent: 0,
            filter: "blur(0px)",
            duration: 0.16,
            stagger: 0.035,
            ease: "power2.out",
          },
          0.02
        );

      gsap.fromTo(
        imageElement,
        { scale: 1.04, yPercent: 0 },
        {
          scale: 1,
          yPercent: -1.5,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );

      if (smoke) {
        gsap.set(smoke, { opacity: 0.92 });

        gsap.fromTo(
          imageElement,
          { filter: "blur(10px) brightness(0.68) contrast(0.9)" },
          {
            filter: "blur(0px) brightness(1) contrast(1)",
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 88%",
              end: "top 18%",
              scrub: 0.7,
            },
          }
        );

        gsap.fromTo(
          smoke,
          { opacity: 0.92, xPercent: -8, yPercent: 5, scale: 1.12 },
          {
            opacity: 0,
            xPercent: 9,
            yPercent: -7,
            scale: 1.32,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 92%",
              end: "top 16%",
              scrub: 0.8,
            },
          }
        );
      }

      if (transitionElement) {
        const direction = transition === "ink-right" ? 1 : -1;

        gsap.fromTo(
          transitionElement,
          {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            scale: 1.08,
          },
          {
            opacity: 0,
            xPercent: direction * 18,
            yPercent: -24,
            scale: 1.22,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              start: "top 94%",
              end: "top 20%",
              scrub: 0.75,
            },
          }
        );
      }
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set([...words, ...rules], {
        clearProps: "all",
        opacity: 1,
        yPercent: 0,
        filter: "none",
        scaleX: 1,
      });
    });

    return () => mm.revert();
  }, [transition]);

  return (
    <section
      ref={panelRef}
      aria-label={label}
      className={cn(
        "relative h-[175dvh] bg-primary",
        transition && "-mt-[10dvh]",
        className
      )}
      data-story-panel
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-primary">
        <div
          ref={imageRef}
          className="absolute bottom-0 left-1/2 top-0 w-[max(100vw,56.25vh)] -translate-x-1/2 will-change-transform lg:w-[56.25vh]"
        >
          <Image
            src={image}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 56.25vh, 100vw"
            className="object-cover"
          />
        </div>

        {effect === "smoke" && (
          <div
            ref={smokeRef}
            className="story-smoke pointer-events-none absolute inset-0 z-[5] will-change-transform"
            aria-hidden
          >
            <span className="story-smoke-cloud story-smoke-cloud-one" />
            <span className="story-smoke-cloud story-smoke-cloud-two" />
            <span className="story-smoke-cloud story-smoke-cloud-three" />
          </div>
        )}

        {transition && (
          <div
            ref={transitionRef}
            className={cn(
              "story-ink-transition pointer-events-none absolute inset-0 z-[7] will-change-transform",
              transition === "ink-right" && "story-ink-transition-right"
            )}
            aria-hidden
          >
            <span className="story-ink-bloom story-ink-bloom-one" />
            <span className="story-ink-bloom story-ink-bloom-two" />
            <span className="story-ink-bloom story-ink-bloom-three" />
          </div>
        )}

        <div
          className={cn(
            "absolute bottom-0 left-1/2 top-0 z-10 w-[max(100vw,56.25vh)] -translate-x-1/2 lg:w-[56.25vh]",
            contentClassName
          )}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

type CopySegment = {
  text: string;
  accent?: boolean;
  strong?: boolean;
};

export function StoryCopy({
  segments,
  className,
  as: Tag = "p",
}: {
  segments: CopySegment[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const accessibleText = segments.map((segment) => segment.text).join("");

  return (
    <Tag
      className={cn("flex flex-wrap whitespace-pre-line", className)}
      aria-label={accessibleText}
    >
      {segments.flatMap((segment, segmentIndex) =>
        segment.text.split(/(\n\n|\s+)/).map((part, partIndex) => {
          if (part === "\n\n") {
            return (
              <span
                key={`${segmentIndex}-${partIndex}`}
                className="h-[0.7em] basis-full"
                aria-hidden
              />
            );
          }

          if (/^\s+$/.test(part) || part === "") {
            return null;
          }

          return (
            <span
              key={`${segmentIndex}-${partIndex}`}
              className="mr-[0.24em] overflow-visible pb-[0.08em]"
              aria-hidden
            >
              <span
                data-reveal-word
                className={cn(
                  "inline-block will-change-transform",
                  segment.accent && "text-orange-500",
                  segment.strong && "font-extrabold"
                )}
              >
                {part}
              </span>
            </span>
          );
        })
      )}
    </Tag>
  );
}
