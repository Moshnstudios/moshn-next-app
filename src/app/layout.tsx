import "~/styles/globals.css";

import { type Metadata } from "next";
import fonts from "next/font/local";
import { TRPCReactProvider } from "~/trpc/react";
import { Questrial } from "next/font/google";
import { Toaster } from "sonner";
import SmoothScroll from "./_components/smooth-scroll";
import Header from "./_components/header";
import Footer from "./_components/footer";

const garet = fonts({
  src: [
    {
      path: "../../public/fonts/garet/Garet-Book.woff2",
      weight: "400",
    },
  ],
  variable: "--garet-font",
});

const questrial = Questrial({
  weight: "400",
  style: "normal",
  variable: "--questrial-font",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Moshn Studios",
    template: "%s - Moshn Studios",
  },
  description:
    "A contemporary design studio specializing in digital image making, offering sophisticated art direction and execution at scale. We elevate brands, launch products, and collaborate with forward-thinking clients.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
    lang="en"
    className={`${garet.variable} ${questrial.variable} bg-black font-sans tracking-tighter text-white antialiased`}
    >
        <body>
          <TRPCReactProvider>
            <Header />

            {children}

            <Footer />
          </TRPCReactProvider>
        </body>

        <Toaster />
        <SmoothScroll />
      </html>
  );
}
