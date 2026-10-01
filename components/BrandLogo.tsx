import Image from "next/image";
import { brand } from "@/lib/brand";

export function BrandLogo({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={brand.logoSrc}
      alt="OroActive · Compro Oro"
      width={1000}
      height={1000}
      priority={priority}
      className={`h-auto shrink-0 object-contain ${className}`}
    />
  );
}
