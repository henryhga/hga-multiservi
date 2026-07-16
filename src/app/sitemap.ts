import type { MetadataRoute } from "next";
import { business } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/exterior-cleaning",
    "/bin-cleaning",
    "/privacy",
    "/terms",
    "/bin-cleaning-terms",
  ];

  return routes.map((route) => ({
    url: `${business.siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));
}
