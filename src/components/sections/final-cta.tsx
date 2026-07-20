import Image from "next/image";
import { RevealText } from "@/components/ui/reveal-text";
import { SectionLabel } from "@/components/ui/section-label";
import { GlassButton } from "@/components/ui/glass-button";
import { WHATSAPP_DEFAULT_LINK } from "@/lib/whatsapp";

export function FinalCta() {
  return (
    <section
      id="contato"
      className="noise-overlay relative overflow-hidden bg-primary pb-28 pt-64 sm:pb-36 sm:pt-80"
    >
      <div className="absolute inset-0" aria-hidden>
        <Image
          src="/images/diego-studio.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-[center_22%]"
        />
        <div className="absolute inset-0 bg-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-background/45" />
      </div>

      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-20 blur-[110px]"
        style={{ background: "radial-gradient(circle, var(--color-gold), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 text-center sm:px-8">
        <SectionLabel>Vamos conversar</SectionLabel>

        <RevealText
          text="Sua próxima obra começa com uma conversa."
          as="h2"
          className="mt-5 justify-center font-display text-4xl italic leading-[1.05] text-foreground text-balance sm:text-6xl"
        />

        <p className="mt-6 max-w-md text-balance leading-relaxed text-muted">
          Envie sua ideia, referências e o local do corpo — o orçamento é
          personalizado e a resposta chega direto no seu WhatsApp.
        </p>

        <div className="mt-10">
          <GlassButton href={WHATSAPP_DEFAULT_LINK} size="lg">
            Quero fazer um orçamento
          </GlassButton>
        </div>
      </div>
    </section>
  );
}
