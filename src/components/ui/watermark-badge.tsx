import Image from "next/image";

export function WatermarkBadge() {
  return (
    <div
      className="pointer-events-none absolute bottom-[3%] right-[3%] aspect-square w-[14%] max-w-[110px] min-w-[44px]"
      aria-hidden
    >
      <Image
        src="/images/logo-badge.webp"
        alt=""
        fill
        sizes="110px"
        className="object-contain"
      />
    </div>
  );
}
