import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/content/company";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/business-lines",
    "/reinsurance",
    "/industries",
    "/why-lmb",
    "/leadership",
    "/careers",
    "/resources",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
