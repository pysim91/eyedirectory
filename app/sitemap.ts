import type { MetadataRoute } from "next";
import { hospitals, serviceLevels } from "@/data/hospitals";

const BASE_URL = "https://emergency-eyecare.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/hospitals`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/service-levels`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
  ];

  const serviceLevelRoutes: MetadataRoute.Sitemap = serviceLevels.map((level) => ({
    url: `${BASE_URL}/service-levels/${level}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const hospitalRoutes: MetadataRoute.Sitemap = hospitals.map((h) => ({
    url: `${BASE_URL}/hospitals/${h.slug}`,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...serviceLevelRoutes, ...hospitalRoutes];
}
