import type { MetadataRoute } from "next";
import { blogPosts, stores } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oroactive.it";
  return [
    "",
    "/academy",
    "/dashboard",
    "/login",
    ...stores.map((store) => `/stores/${store.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`)
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.75
  }));
}
