import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { galleryRooms } from "@/lib/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/portfolio",
    ...galleryRooms.map((room) => `/portfolio/${room.slug}`),
    "/process",
    "/contact",
    "/estimator",
    "/privacy-policy",
    "/terms-of-use",
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route.startsWith("/portfolio") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/privacy") || route.startsWith("/terms") ? 0.2 : 0.8,
  }));
}
