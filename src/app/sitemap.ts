import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url.replace(/\/$/, "");

  const routes = ["", "/sobre-mi", "/proyectos", "/formacion", "/contacto"];

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectEntries: MetadataRoute.Sitemap = getProjects().map(
    (project) => ({
      url: `${baseUrl}/proyectos/${project.slug}`,
      lastModified: new Date(project.lastUpdated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  return [...staticEntries, ...projectEntries];
}
