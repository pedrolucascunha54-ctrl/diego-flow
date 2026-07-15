import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  light = false,
}: {
  children: React.ReactNode;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.3em]",
        light ? "text-ivory/60" : "text-muted",
        className
      )}
    >
      <span className="h-px w-6 bg-gold/60" />
      {children}
    </span>
  );
}
