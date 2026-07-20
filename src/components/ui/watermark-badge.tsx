import Image from "next/image";

export function WatermarkBadge() {
  return (
    <Image
      src="/images/logo-crown.png"
      alt=""
      width={163}
      height={140}
      aria-hidden
      className="pointer-events-none absolute bottom-3 right-3 h-8 w-auto opacity-95 sm:bottom-4 sm:right-4 sm:h-10"
    />
  );
}
