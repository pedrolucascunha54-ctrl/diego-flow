import { PORTFOLIO_ITEMS } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { RevealText } from "@/components/ui/reveal-text";
import { PortfolioItem } from "@/components/sections/portfolio-item";

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>Portfólio</SectionLabel>
        <RevealText
          text="Peças que marcam presença."
          as="h2"
          className="mt-4 max-w-xl font-display text-4xl italic leading-[1.05] text-foreground sm:text-5xl"
        />
        <p className="mt-5 max-w-md text-balance leading-relaxed text-muted">
          Uma seleção de trabalhos autorais em realismo preto e cinza —
          cada peça documentada do primeiro traço ao resultado final.
        </p>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-24 px-5 sm:mt-20 sm:gap-32 sm:px-8">
        {PORTFOLIO_ITEMS.map((item) => (
          <PortfolioItem key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
