import { StoryCopy, StoryPanel } from "@/components/ui/story-panel";

export function Hero() {
  return (
    <StoryPanel
      image="/images/pdf-story/panel-1.webp"
      alt="Diego Mesquita no estúdio Flow Tattoo"
      priority
      label="Projetos exclusivos em Realismo Preto e Cinza e Blackwork"
    >
      <div className="absolute left-[13.8%] top-[54.5%] w-[47%]">
        <div
          data-reveal-rule
          className="mb-5 h-px w-full bg-orange-500/90"
          aria-hidden
        />
        <StoryCopy
          as="h1"
          className="font-sans text-[clamp(0.82rem,2.08vh,1.25rem)] font-medium leading-[1.08] text-white"
          segments={[
            {
              text: "Projetos exclusivos em Realismo Preto e Cinza",
              accent: true,
              strong: true,
            },
            { text: " e Blackwork, desenvolvidos com " },
            {
              text: "planejamento, composição e técnica",
              accent: true,
              strong: true,
            },
            {
              text: " pra entregar uma tattoo que continua absurda com o passar dos anos.",
            },
          ]}
        />
      </div>
    </StoryPanel>
  );
}
