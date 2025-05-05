import Image from "next/image";
import Services from "~/assets/images/services.webp";
import Title from "../../title";

export default function OurService() {
  return (
    <section className="flex flex-col-reverse gap-10 px-4 lg:flex-row lg:pr-20">
      <div className="relative h-[600px] overflow-hidden lg:h-[calc(100vh-20px)] lg:w-[50%]">
        <div className="absolute left-0 top-0 z-20 h-[40px] w-full bg-gradient-to-t from-transparent to-black"></div>

        <Image src={Services} alt="" fill className="object-cover" />

        <div className="absolute bottom-0 left-0 z-20 h-[40px] w-full bg-gradient-to-b from-transparent to-black"></div>
      </div>

      <div className="flex flex-col justify-center lg:w-[50%] lg:pl-24">
        <Title
          text="Our Service"
          className="gap-6 text-5xl tracking-tighter lg:text-6xl"
        />

        <div className="mt-10 max-w-xl space-y-3 text-pretty text-lg">
          <p>
            We offer high-quality Virtual visual production, trough delivering
            visually stunning and story-driven content that elevates your brand.
            We offer product visualization and marketing campaigns through 3D
            animations and motion graphics.
          </p>

          <p>
            We create dynamic visuals that captivate audiences and drive
            results. Every project is tailored to your unique needs, ensuring
            our custom solutions align with your vision and goals.
          </p>
        </div>
      </div>
    </section>
  );
}
