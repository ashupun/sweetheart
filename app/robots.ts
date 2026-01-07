import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/api/", "/forgot", "/reset"],
    },
    sitemap: "https://sweethe.art/sitemap.xml",
  };
}

