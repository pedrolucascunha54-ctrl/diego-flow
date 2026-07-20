import Image from "next/image";

export function WatermarkBadge() {
  return (
    <div
      className="pointer-events-none absolute bottom-[1.5%] right-[1%] aspect-square w-[22%] max-w-[150px] min-w-[64px]"
      aria-hidden
    >
      <Image
        src="/images/logo-badge.webp"
        alt=""
        fill
        sizes="150px"
        className="object-contain"
      />
    </div>
  );
}
