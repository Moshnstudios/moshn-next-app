import Image from "next/image";
import Jewelry from "~/assets/industries/Jewelry.webp";
import Cosmetics from "~/assets/industries/cosmetics.webp";
import Campaign from "~/assets/industries/campaign.webp";
import Product from "~/assets/industries/product.webp";
import Title from "../../title";

export default function IndustriesSection() {
  return (
    <section className="flex flex-col gap-4 px-4 md:px-20">
      <div className="relative col-span-2 h-[400px] overflow-hidden rounded-[60px] md:h-[600px]">
        <video
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover"
        >
          <source src="/videos/fashion.m4v" type="video/mp4" />
        </video>

        <div className="absolute bottom-10 left-10">
          <Title text="Fashion" className="text-4xl" />
          <p className="opacity-60">
            Sneakers • Garments • Accessories • Digital Fashion
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative col-span-2 h-[400px] overflow-hidden rounded-[60px] md:h-[800px] md:w-[58%]">
          <Image src={Cosmetics} alt="" fill className="object-cover" />

          <div className="absolute bottom-10 left-10">
            <Title text="Cosmetics" className="text-4xl" />
            <p className="opacity-60">
              Product Commercials • R&D • Visual Film
            </p>
          </div>
        </div>

        <div className="relative h-[400px] overflow-hidden rounded-[60px] md:h-[800px] md:w-[42%]">
          <Image
            src={Jewelry}
            alt=""
            fill
            className="object-cover object-[20%_top]"
          />

          <div className="absolute bottom-10 left-10">
            <Title text="Jewellery" className="text-4xl" />
            <p className="opacity-60">Product Showcase • Commercial • CGI</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative col-span-2 aspect-[9/16] h-[400px] overflow-hidden rounded-[60px] md:h-[800px] md:w-[30%]">
          <Image src={Campaign} alt="" fill className="object-cover" />

          <div className="absolute bottom-10 left-10">
            <Title text="Marketing" className="text-4xl" />
            <p className="opacity-60">
              Mixed Reality • Character Creation • Commercials
            </p>
          </div>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden rounded-[60px] md:h-[800px] md:w-[70%]">
          <Image src={Product} alt="" fill className="object-cover" />

          <div className="absolute bottom-10 left-10">
            <Title text="Tech" className="text-4xl" />
            <p className="opacity-60">
              Car • Tech Products • CGI • Product Showcase
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
