import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/writing";

const SITE_URL = "https://marwandiallo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
  }));
  const tags = getAllTags().map((t) => ({
    url: `${SITE_URL}/writing/tag/${t.slug}`,
    lastModified: new Date(),
  }));
  const staticRoutes = ["", "/writing", "/projects", "/about", "/now"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...posts, ...tags];
}
