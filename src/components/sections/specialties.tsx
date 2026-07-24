import { StoryCopy, StoryPanel } from "@/components/ui/story-panel";

function SpecialtyTitle({ children }: { children: string }) {
  return (
    <div className="flex items-center text-orange-500">
      <StoryCopy
        as="h2"
        className="font-sans text-[clamp(1rem,3vh,1.7rem)] font-black leading-none"
        segments={[{ text: children }]}
      />
    </div>
  );
}

export function Specialties() {
  return (
    <section id="especialidades" className="relative bg-primary">
      <StoryPanel
        image="/images/pdf-story/panel-4-clean.webp"
        alt="Composição visual de Blackwork e fechamento"
        label="Blackwork e fechamento"
        transition="ink-left"
      >
        <div className="absolute left-[10%] top-[27.5%] w-[43%]">
          <SpecialtyTitle>Blackwork</SpecialtyTitle>
          <StoryCopy
            className="mt-[2.2vh] font-sans text-[clamp(0.65rem,1.72vh,0.98rem)] leading-[1.38] text-white"
            segments={[
              {
                text: "Não é só tinta preta. É presença, contraste e uma tatuagem que chama atenção de longe. Se você quer um fechamento com personalidade e feito para durar, esse é o momento de começar. Me chama no direct e vamos tirar esse projeto do papel.",
              },
            ]}
          />

          <div className="mt-[4.2vh]">
            <SpecialtyTitle>Fechamento</SpecialtyTitle>
            <StoryCopy
              className="mt-[2.2vh] font-sans text-[clamp(0.65rem,1.72vh,0.98rem)] leading-[1.38] text-white"
              segments={[
                {
                  text: "O detalhe faz a diferença. Um fechamento bem planejado não é só mais uma tatuagem, é uma composição que valoriza todo o braço. Se esse é o seu projeto, essa é a hora de começar.",
                },
              ]}
            />
          </div>
        </div>
      </StoryPanel>

      <StoryPanel
        image="/images/pdf-story/panel-5-clean.webp"
        alt="Composição visual de fechamento e cobertura"
        label="Fechamento e cobertura"
        transition="ink-right"
      >
        <div className="absolute left-[9.6%] top-[33.2%] w-[43%]">
          <SpecialtyTitle>Fechamento</SpecialtyTitle>
          <StoryCopy
            className="mt-[2.2vh] font-sans text-[clamp(0.65rem,1.72vh,0.98rem)] leading-[1.38] text-white"
            segments={[
              {
                text: "Sua tattoo começa antes da agulha. Criamos um projeto exclusivo com montagem personalizada para garantir um resultado único, pensado para o seu corpo e seu estilo. A hora de começar.",
              },
            ]}
          />

          <div className="mt-[4.2vh]">
            <SpecialtyTitle>Cobertura</SpecialtyTitle>
            <StoryCopy
              className="mt-[2.2vh] font-sans text-[clamp(0.65rem,1.72vh,0.98rem)] leading-[1.38] text-white"
              segments={[
                {
                  text: "Arrependimento não precisa ser definitivo. Com uma cobertura bem planejada, sua tattoo antiga ganha um novo significado e um resultado que dá orgulho de mostrar.",
                },
              ]}
            />
          </div>
        </div>
      </StoryPanel>
    </section>
  );
}
