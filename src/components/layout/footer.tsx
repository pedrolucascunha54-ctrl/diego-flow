import { MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/instagram-icon";
import { Logo } from "@/components/ui/logo";
import { WHATSAPP_DEFAULT_LINK } from "@/lib/whatsapp";
import { SITE } from "@/lib/content";

const LINKS = [
  { href: "#portfolio", label: "Portfólio" },
  { href: "#especialidades", label: "Especialidades" },
  { href: "#processo", label: "Processo" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-10 sm:flex-row sm:items-end">
          <div>
            <Logo showArtist />
            <p className="mt-5 max-w-xs text-sm italic text-muted">
              Sua história. Minha arte.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-orange-400"
              >
                {link.label}
              </a>
            ))}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.2em] text-orange-400 transition-colors hover:text-orange-300"
            >
              <InstagramIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
              Instagram
            </a>
            <a
              href={WHATSAPP_DEFAULT_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400 transition-colors hover:text-orange-300"
            >
              WhatsApp
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-2 text-sm text-muted">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
            <span>{SITE.address}</span>
          </div>
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.2em] text-orange-400 transition-colors hover:text-orange-300"
          >
            Ver no Google Maps
          </a>
        </div>

        <div className="hairline" />

        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted/70">
          © {year} Flow Tattoo — Diego Mesquita. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
