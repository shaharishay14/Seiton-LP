import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Per-page title, description, canonical and Open Graph (canonical only once the site URL is set). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const hasUrl = Boolean(siteConfig.url);
  return {
    title,
    description,
    alternates: hasUrl ? { canonical: path } : undefined,
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: hasUrl ? path : undefined,
      locale: "en_US",
    },
    twitter: { card: "summary", title, description },
  };
}
