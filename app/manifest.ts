import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OroActive",
    short_name: "OroActive",
    description: "Sito ufficiale OroActive",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0B0D",
    theme_color: "#FF7A00",
    icons: [
      { src: brand.logoSrc, sizes: "any", type: "image/svg+xml" },
      { src: brand.icon192, sizes: "192x192", type: "image/png" },
      { src: brand.icon512, sizes: "512x512", type: "image/png" }
    ]
  };
}
