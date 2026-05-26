import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://oroactive.it";
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/private", "/dashboard/private"] }],
    sitemap: `${base}/sitemap.xml`
  };
}
