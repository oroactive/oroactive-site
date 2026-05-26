import type { MetadataRoute } from "next";

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
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" }
    ]
  };
}
