import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/writing";

const SITE_URL = "https://marwandiallo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const tags = getAllTags().map((t) => ({
    url: `${SITE_URL}/writing/tag/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/writing`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/writing/tags`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/now`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
  return [...staticRoutes, ...posts, ...tags];
}
