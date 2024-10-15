"use client";

import { cn } from "@nextui-org/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type Projects } from "~/lib/queries";

const ProjectsSliderDesktop = dynamic(
  () => import("~/app/_components/slider/projects-slider-desktop"),
  { ssr: false },
);

interface ProjectsSectionProps extends React.HTMLAttributes<HTMLElement> {
  projects: Projects;
}

export default function ProjectsSection({ ...props }: ProjectsSectionProps) {
  return (
    <section>
      <ProjectsSliderDesktop projects={props.projects} />
    </section>
  );
}

interface ProjectCardProps extends React.HTMLAttributes<HTMLElement> {
  project: Projects[number];
}

export function ProjectCard({ ...props }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      href={`/projects/${props.project.slug}`}
      className={cn(
        "card relative aspect-[9/16] h-[calc(100vh-160px)] w-full shrink-0 cursor-pointer overflow-hidden rounded-3xl bg-black duration-300 ease-in-out md:max-w-max md:hover:scale-[1.08]",
        props.className,
      )}
    >
      {!isHovered ? (
        <Image
          src={
            props.project.projectFields.videoThumbnail?.node.mediaItemUrl ?? ""
          }
          alt=""
          fill
          className="aspect-[9/16] object-cover"
        />
      ) : (
        <video autoPlay muted playsInline loop>
          <source
            src={
              props.project.projectFields.videoPreview?.node.mediaItemUrl ?? ""
            }
            className="aspect-[9/16]"
            type="video/mp4"
          />
        </video>
      )}
    </Link>
  );
}
