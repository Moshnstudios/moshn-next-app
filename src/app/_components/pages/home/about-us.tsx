import Image from "next/image";
import About from "~/assets/images/about-us.webp";
import Title from "../../title";

export default function AboutUs() {
  return (
    <section className="flex flex-col gap-10 px-4 pb-20 pt-28 lg:flex-row lg:px-20 lg:pt-36">
      <div className="flex flex-col justify-center lg:w-[50%]">
        <Title
          text="About Us"
          className="gap-4 text-5xl tracking-tighter lg:gap-6 lg:text-6xl"
        />

        <div className="mt-10 space-y-3 text-pretty text-lg lg:max-w-xl">
          <p>
            We deliver high-quality CGI with precision and attention to detail,
            ensuring your brand stands out. Our visuals go beyond aesthetics, we
            tell powerful stories that connect with your audience and crate
            visuals resonate with your brand&apos;s message.
          </p>

          <p>
            We bring your brand and products to life, helping you tell
            unforgettable stories that captivate and inspire. We create CGI
            content that not only looks great but drives leads and boosts
            engagement, turning views into conversions.
          </p>
        </div>
      </div>

      <div className="relative h-[600px] w-full overflow-hidden rounded-[60px] lg:h-[calc(100vh-20px)] lg:w-[50%]">
        <Image
          src={About as never}
          alt=""
          fill
          className="object-cover object-right-top"
        />
      </div>
    </section>
  );
}
