import Title from "~/app/_components/title";
import { getProjects } from "~/lib/queries";
import { ProjectCard } from "./_components/project-card";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Discover our portfolio of high-quality CGI, product visualizations, and 3D animation projects. Explore how we've helped brands tell captivating stories through visually stunning and impactful content.",
};

export default async function ProjectsPage() {
  const projects = await getProjects(999999);

  return (
    <div className="min-h-screen bg-black pt-40">
      <div className="flex items-center justify-center">
        <Title text="Projects" className="text-6xl" />
      </div>

      <div className="mt-20 grid gap-4 p-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects.map((item) => (
          <ProjectCard
            key={item.slug}
            project={item}
            className="h-auto !w-full max-w-none"
          />
        ))}
      </div>

      <div className="py-20 text-center">You are all caught up!</div>
    </div>
  );
}
