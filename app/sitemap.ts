import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/writing";

const SITE_URL = "https://marwandiallo.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${SITE_URL}/writing/${p.slug}`,
    lastModified: new Date(p.date),
  }));
  const staticRoutes = ["", "/writing", "/about", "/now"].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: new Date(),
  }));
  return [...staticRoutes, ...posts];
}
