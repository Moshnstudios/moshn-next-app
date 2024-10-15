import { Button } from "@nextui-org/react";
import { CornerRightDown } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroVideo = dynamic(() => import("./hero-video"), { ssr: false });

export function HeroSection() {
  return (
    <section className="relative h-[105vh] overflow-hidden text-white">
      <div className="flex h-screen w-full items-center justify-center p-8 md:items-center">
        <div className="z-20 flex w-full flex-col items-center">
          <h2 className="mt-8 max-w-2xl text-balance text-center text-xl font-light !leading-[120%] tracking-tight sm:text-2xl">
            We are a contemporary design studio specializing in digital image
            making.Offering sophisticated art direction and execution at scale.
            We specialize in elevating brands, launching products, and fostering
            collaborative relationships with forward-thinking clients.
          </h2>

          <Button
            as={Link}
            href="/contact"
            className="glass mt-10 px-8 text-base text-white"
          >
            Let&apos;s Connect
          </Button>
        </div>

        <div className="absolute bottom-20 right-8 z-50 flex gap-2 text-sm">
          <span>Scroll down</span> <CornerRightDown className="stroke-1" />
        </div>
      </div>

      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>

      {/* Gradient fade at the bottom */}
      <div className="absolute bottom-0 left-0 z-20 h-1/3 w-full bg-gradient-to-b from-transparent to-black"></div>

      <HeroVideo />
    </section>
  );
}
