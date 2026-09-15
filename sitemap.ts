import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { galleryRooms } from "@/lib/data/gallery";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/portfolio",
    "/portfolio/inspirations",
    ...galleryRooms.map((room) => `/portfolio/${room.slug}`),
    "/process",
    "/contact",
    "/estimator",
  ];
  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));
}
