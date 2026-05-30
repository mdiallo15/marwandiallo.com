import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marwan Diallo",
    short_name: "Marwan Diallo",
    description:
      "Security architect by trade, builder by habit. Notes from the seam between AI coding tools, identity, and the production reality of shipping secure software.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff1e5",
    theme_color: "#fff1e5",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  };
}
