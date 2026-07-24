import Image from "next/image";
import { cn } from "@/lib/utils";

export function MediaImage({
  src,
  alt,
  className,
  priority = false,
  fit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 640px, 92vw"
        className={fit === "contain" ? "!object-contain" : "object-cover"}
        style={{
          objectFit: fit,
          objectPosition: "center",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/45 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/60 to-transparent" />
    </div>
  );
}
