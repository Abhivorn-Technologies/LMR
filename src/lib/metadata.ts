import { type Metadata } from "next";
import { getContent } from "@/services/contentService";
import { siteConfig as defaultSiteConfig } from "@/lib/content/company";

interface PageMetaOptions {
  title: string;
  description: string;
  path?: string;
}

export async function createPageMetadata({
  title,
  description,
  path = "",
}: PageMetaOptions): Promise<Metadata> {
  const siteConfig = await getContent('company:siteConfig', defaultSiteConfig);
  const url = `${siteConfig.url}${path}`;

  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: siteConfig.ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.ogImage],
    },
    alternates: { canonical: url },
  };
}
