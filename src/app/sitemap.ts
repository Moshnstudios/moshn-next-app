import { type MetadataRoute } from "next";
import { getProjects } from "~/lib/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getProjects(999999);

  const projects: MetadataRoute.Sitemap = data.map((project) => ({
    url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/projects/${project.slug}`,
    lastModified: new Date(project.modified),
  }));

  /**
   * Update the last-modified date individually for each static page
   */
  return [
    {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
      lastModified: "2024-10-15T01:22:07.000Z",
    },
    {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/projects`,
      lastModified: "2024-10-15T01:22:07.000Z",
    },
    {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/contact`,
      lastModified: "2024-10-15T01:22:07.000Z",
    },
    {
      url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/career`,
      lastModified: "2024-10-15T01:22:07.000Z",
    },
    ...projects,
  ];
}
