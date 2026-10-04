import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** One-page release: only the landing page is listed. */
const routes = ["/"];

/** Needs absolute URLs, so it stays empty until NEXT_PUBLIC_SITE_URL is set. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteConfig.url) return [];
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.5,
  }));
}
