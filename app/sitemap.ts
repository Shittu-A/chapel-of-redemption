import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chapelofredemption.org";
  const lastModified = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/missions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/missions/council", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/deacons", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/ushers", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/band", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/choir", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/technical", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/mis", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/missions/brigade", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/chad-missions", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/schools", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/activities", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/staff", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/newsletter", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/giving", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
