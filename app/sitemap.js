import { projects } from "@/content/projects";

export default function sitemap() {
  const baseUrl = "https://pixel-dev.com";

  const staticRoutes = ["", "/work", "/services", "/about", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: `${baseUrl}/work/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
