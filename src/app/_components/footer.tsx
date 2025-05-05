import Image from "next/image";
import Link from "next/link";
import GrayLogoText from "~/assets/brand/logo-text-gray.png";
import { Socials } from "./header";

export default function Footer() {
  return (
    <footer className="z-50 border-t border-white/10 bg-black py-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center justify-between gap-4 px-6 md:grid-cols-3">
        <div className="flex items-center justify-center">
          <Link href="/">
            <div className="flex w-[30.38vw] items-center gap-4 md:w-[clamp(45px,10.57vw,160px)]">
              <Image src={GrayLogoText} alt="" className="h-full w-full" />
            </div>
          </Link>
        </div>

        <div className="mb-2 flex h-10 items-center justify-center md:mb-0">
          <Socials />
        </div>

        <div className="flex flex-col items-center md:items-end">
          <div className="flex items-center gap-2">
            <Link
              href="/privacy-policy"
              className="flex items-center gap-1 text-sm hover:underline"
            >
              Privacy Policy
            </Link>
            |
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm hover:underline"
            >
              Projects
            </Link>
            |
            <Link
              href="/contact"
              className="flex items-center gap-1 text-sm hover:underline"
            >
              Contact
            </Link>
          </div>
          <div className="text-center md:text-end">
            ©2024 Moshn Studios All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
