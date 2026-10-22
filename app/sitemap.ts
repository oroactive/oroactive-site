import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/privacy-policy",
    "/indice-del-sito"
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.75
  }));
}
