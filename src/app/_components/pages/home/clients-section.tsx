"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@nextui-org/react";
import Image from "next/image";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import Sbi from "~/assets/clients/sbi.png";
import Bewakoof from "~/assets/clients/bewakoof.png";
import Bluorng from "~/assets/clients/bluorng.png";
import JackAndJones from "~/assets/clients/jack&jones.png";
import Zara from "~/assets/clients/zara.png";

type Item = {
  name: string;
  image: StaticImport;
};

const items: Item[] = [
  { name: "SBI", image: Sbi },
  { name: "Bewakoof", image: Bewakoof },
  { name: "Bluorng", image: Bluorng },
  { name: "JackAndJones", image: JackAndJones },
  { name: "Zara", image: Zara },
];

interface Options extends React.HTMLAttributes<HTMLElement> {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}

export default function ClientsSection({ ...props }: Options) {
  const {
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
  } = props;
  const [start, setStart] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);

  const getDirection = useCallback(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  }, [direction]);

  const getSpeed = useCallback(() => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [speed]);

  const addAnimation = useCallback(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }, [getDirection, getSpeed]);

  useEffect(() => addAnimation(), [addAnimation]);

  return (
    <section className="mx-auto border-b border-white/10 py-6 md:py-20">
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
          className,
        )}
      >
        <ul
          ref={scrollerRef}
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-4 bg-black py-4",
            start && "animate-scroll",
            pauseOnHover && "hover:[animation-play-state:paused]",
          )}
        >
          {items.map((item) => (
            <li
              key={item.name}
              className="relative w-[240px] max-w-full flex-shrink-0 px-8 py-6"
              style={{
                background:
                  "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
              }}
            >
              <Image
                src={item.image}
                alt={item.name}
                className="invert filter"
                priority
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
