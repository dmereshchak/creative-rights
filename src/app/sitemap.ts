import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

export const dynamic = "force-static";

// /news/ сюда не входит: страница только для клиентов и закрыта от поиска.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/privacy/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/consent/`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/cookies/`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
