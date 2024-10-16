import Image from "next/image";
import parse from "html-react-parser";
import { getProjectBySlug, getProjects } from "~/lib/queries";
import { type Metadata } from "next";

export const dynamicParams = true;

export const generateMetadata = async ({
  params,
}: {
  params: { project_id: string };
}): Promise<Metadata> => {
  const project = await getProjectBySlug(params.project_id);

  return {
    title: project.title,
    description: project.projectFields?.projectSeoDescription,
  };
};

export default async function ProjectPage({
  params,
}: {
  params: { project_id: string };
}) {
  const project = await getProjectBySlug(params.project_id);

  return (
    <div className="h-full w-full bg-black">
      <div className="z-10 w-full bg-black">
        <div className="relative flex h-[calc(100vh-200px)] w-full items-center justify-center">
          <div className="prose prose-invert z-10 prose-headings:mb-4 prose-headings:font-title">
            {parse(project.projectFields.projectTitle ?? "")}
          </div>

          <Image
            src={
              project.projectFields.projectThumbnail?.node.mediaItemUrl ?? ""
            }
            alt=""
            fill
            className="h-full w-full object-cover opacity-90"
          />
        </div>
      </div>

      <div className="bg-black">
        <div className="prose prose-invert mx-auto w-full px-6 py-10 prose-headings:font-title prose-headings:text-white md:max-w-7xl lg:py-20">
          <div>{parse(project.projectFields?.projectOverview ?? "")}</div>

          <div className="flex flex-col items-center justify-center py-10">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="aspect-[9/16] max-w-[400px]"
              controls
            >
              <source
                src={project.projectFields.video?.node.mediaItemUrl}
                type="video/mp4"
              />
            </video>
          </div>

          <div className="pb-10">
            {parse(project.projectFields?.projectDetails ?? "")}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {project.projectFields.imageGrid?.map((image, index) => (
              <div key={index} className="relative h-[500px] w-full">
                <Image
                  src={image}
                  alt=""
                  fill
                  className="overflow-hidden rounded-3xl object-cover object-center"
                />
              </div>
            ))}
          </div>

          <div className="pt-40">
            {parse(project.projectFields?.projectConclusion ?? "")}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = await getProjects(999999);

  return projects.map((project) => ({ project_id: project.slug }));
}
