import type { MetadataRoute } from "next";
import { blogPosts, stores } from "@/lib/data";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/academy",
    "/dashboard",
    "/login",
    ...stores.map((store) => `/stores/${store.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`)
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.75
  }));
}
