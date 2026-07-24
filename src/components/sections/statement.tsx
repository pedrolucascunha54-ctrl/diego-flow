import { StoryCopy, StoryPanel } from "@/components/ui/story-panel";

export function Statement() {
  return (
    <div aria-label="Projetos autorais">
      <StoryPanel
        image="/images/pdf-story/panel-2.webp"
        alt="Composição artística de uma tatuagem autoral no braço"
        label="Uma tatuagem que seja só sua"
        transition="ink-left"
      >
        <div className="absolute left-[7.4%] top-[24.2%] w-[49%]">
          <StoryCopy
            as="h2"
            className="font-sans text-[clamp(1rem,3vh,1.7rem)] font-black uppercase leading-[1.08] text-white"
            segments={[
              { text: "Chega de salvar referência. " },
              {
                text: "Bora criar uma tattoo que seja só sua.",
                accent: true,
              },
            ]}
          />
          <div
            data-reveal-rule
            className="my-6 h-px w-full bg-orange-500"
            aria-hidden
          />
          <StoryCopy
            className="font-sans text-[clamp(0.65rem,1.72vh,0.98rem)] leading-[1.48] text-white"
            segments={[
              {
                text: "Realismo preto e cinza e Blackwork",
                strong: true,
              },
              { text: " com projeto exclusivo, " },
              {
                text: "pensado pro seu braço e pro seu estilo.",
                accent: true,
                strong: true,
              },
              {
                text: " Antes de tatuar, você vê uma montagem realista do resultado final.\n\nNada de copiar tattoo dos outros. ",
              },
              {
                text: "Aqui a ideia é criar uma arte única,",
                accent: true,
                strong: true,
              },
              {
                text: " que encaixe no seu corpo e tenha a sua identidade.\n\n",
              },
              {
                text: "Se é pra marcar a pele, que seja com uma tattoo feita pra você.",
                strong: true,
              },
            ]}
          />
        </div>
      </StoryPanel>

      <StoryPanel
        image="/images/pdf-story/panel-3.webp"
        alt="Tatuagem realista em composição dramática preto e cinza"
        label="Sua tatuagem merece um projeto, não uma cópia"
        effect="smoke"
        transition="ink-right"
      >
        <div className="absolute left-[9.3%] top-[19.2%] w-[45%]">
          <StoryCopy
            as="h2"
            className="font-sans text-[clamp(1.1rem,3.4vh,1.9rem)] font-black uppercase leading-[1.08] text-white"
            segments={[
              {
                text: "Sua tatuagem merece um projeto,",
                accent: true,
              },
              { text: " não uma cópia." },
            ]}
          />
          <StoryCopy
            className="mt-[3vh] font-sans text-[clamp(0.66rem,1.85vh,1.04rem)] leading-[1.38] text-white"
            segments={[
              {
                text: "Realismo preto e cinza",
                accent: true,
                strong: true,
              },
              { text: " vai muito além de copiar referências. " },
              {
                text: "Cada projeto é criado do zero, com uma montagem exclusiva para que você veja como a composição vai ficar no seu corpo",
                accent: true,
                strong: true,
              },
              {
                text: " antes mesmo da primeira sessão.\n\nO resultado é uma tatuagem única, ",
              },
              {
                text: "feita para valorizar a anatomia e contar a sua história.",
                accent: true,
                strong: true,
              },
              {
                text: " Se você quer exclusividade de verdade, vamos criar o seu projeto.",
              },
            ]}
          />
        </div>
      </StoryPanel>
    </div>
  );
}
