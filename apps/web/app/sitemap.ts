import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";

const publicRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/jobs", priority: 0.9, changeFrequency: "daily" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/privacy-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms-conditions", priority: 0.4, changeFrequency: "yearly" },
  { path: "/refund-policy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/accessibility", priority: 0.4, changeFrequency: "yearly" },
] satisfies Array<{
  path: string;
  priority: number;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
}>;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return publicRoutes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
