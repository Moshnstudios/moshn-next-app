/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import ReactPixel from "react-facebook-pixel";

export default function MetaPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    ReactPixel.init("594873450305993");
    ReactPixel.pageView();
  }, []);

  useEffect(() => {
    ReactPixel.pageView();
  }, [pathname, searchParams]);

  return (
    <noscript>
      <img
        alt="facebook-pixel"
        height="1"
        width="1"
        style={{ display: "none" }}
        src="https://www.facebook.com/tr?id=594873450305993&ev=PageView&noscript=1"
      />
    </noscript>
  );
}
