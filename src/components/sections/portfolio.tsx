import { PORTFOLIO_ITEMS } from "@/lib/content";
import { SectionLabel } from "@/components/ui/section-label";
import { PortfolioItem } from "@/components/sections/portfolio-item";

export function Portfolio() {
  return (
    <section id="portfolio" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <SectionLabel>Portfólio</SectionLabel>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-24 px-5 sm:mt-12 sm:gap-32 sm:px-8">
        {PORTFOLIO_ITEMS.map((item) => (
          <PortfolioItem key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
