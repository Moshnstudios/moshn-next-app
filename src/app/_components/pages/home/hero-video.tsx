"use client";

import { useMediaQuery } from "react-responsive";

export default function HeroVideo() {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return isDesktopOrLaptop ? (
    <video
      src="/videos/hero-16-9.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 h-full w-full object-cover"
    ></video>
  ) : (
    <video
      src="/videos/hero-9-16.mp4"
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 h-full w-full object-cover"
    ></video>
  );
}
