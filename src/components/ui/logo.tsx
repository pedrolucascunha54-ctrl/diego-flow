import { cn } from "@/lib/utils";

export function Logo({
  className,
  showArtist = false,
}: {
  className?: string;
  showArtist?: boolean;
}) {
  return (
    <div className={cn("flex flex-col leading-none select-none", className)}>
      <span className="flex items-center gap-2">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          className="shrink-0 text-gold"
          aria-hidden
        >
          <path
            d="M12 2L14.5 9H21.5L15.8 13.3L18 20.5L12 16.2L6 20.5L8.2 13.3L2.5 9H9.5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display text-2xl font-semibold italic tracking-tight text-foreground">
          Flow
        </span>
      </span>
      <span className="pl-[22px] font-mono text-[0.55rem] tracking-[0.45em] text-muted uppercase">
        Tattoo{showArtist ? " · Diego Mesquita" : ""}
      </span>
    </div>
  );
}
