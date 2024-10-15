import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { type ElementRef, useRef } from "react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { ProjectCard } from "../pages/home/projects-section";
import Link from "next/link";
import { type Projects } from "~/lib/queries";
import { cn } from "@nextui-org/react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectsSliderDesktopProps extends React.HTMLAttributes<HTMLElement> {
  projects: Projects;
}

export default function ProjectsSliderDesktop({
  ...props
}: ProjectsSliderDesktopProps) {
  const containerRef = useRef<ElementRef<"div">>(null);

  useGSAP(
    () => {
      const scrollResizer = () => {
        const container = containerRef.current;

        if (!container) return;

        const cards = container.querySelectorAll(
          ".card",
        ) as unknown as NodeListOf<HTMLElement>;

        const totalWidth = Array.from(cards).reduce((acc, card) => {
          return (
            acc +
            card.offsetWidth +
            parseFloat(getComputedStyle(card).marginLeft) +
            parseFloat(getComputedStyle(card).marginRight)
          );
        }, 0);

        const containerWidth = container.offsetWidth;

        return totalWidth - containerWidth;
      };

      gsap.to(".cards-wrapper", {
        x: -(scrollResizer() ?? 0),
        ease: "none",
        display: "flex",
        alignItems: "center",
        scrollTrigger: {
          trigger: ".cards-slider-container",
          start: "top top",
          end: "300% bottom",
          scrub: 0.5,
          pin: true,
          onUpdate: () => {
            scrollResizer();
          },
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div className="cards-slider-container relative py-20">
        <div className="cards-wrapper cards-container flex max-w-max px-4 will-change-transform md:px-0 md:pl-8">
          {props.projects.map((item, index) => (
            <ProjectCard
              key={item.slug}
              project={item}
              className="mr-4 md:mr-8"
            />
          ))}

          <div className="card flex aspect-[9/16] h-[calc(100vh-160px)] shrink-0 cursor-pointer flex-col items-center justify-center overflow-hidden bg-black p-6 text-white">
            <h3 className="mb-6 text-center font-title text-large">
              Want more?
            </h3>
            <div className="flex items-center gap-4 font-medium">
              View all projects{" "}
              <Link
                href="/projects"
                className="group relative flex aspect-square h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border"
              >
                <motion.div
                  className={cn(
                    "absolute inset-0 aspect-square h-full w-full scale-0 rounded-full bg-white duration-500 ease-in-out group-hover:scale-100",
                  )}
                ></motion.div>

                <ArrowRightIcon className="z-10 stroke-1 text-white duration-300 ease-in-out group-hover:text-black" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
