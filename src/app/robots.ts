import type { MetadataRoute } from "next";
import { business } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/bin-cleaning/signup", "/bin-cleaning/success", "/manage-plan"],
      },
    ],
    sitemap: `${business.siteUrl}/sitemap.xml`,
  };
}
