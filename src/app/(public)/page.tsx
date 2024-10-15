import { getProjects } from "~/lib/queries";
import { HeroSection } from "../_components/pages/home/hero-section";
import ProjectsSection from "../_components/pages/home/projects-section";
import IndustriesSection from "../_components/pages/home/industries-section";
import AboutUs from "../_components/pages/home/about-us";
import OurService from "../_components/pages/home/our-service";
import ClientsSection from "../_components/pages/home/clients-section";
import ContactSection from "../_components/pages/home/contact-section";

export default async function Home() {
  const projects = await getProjects();

  return (
    <main>
      <HeroSection />

      <ProjectsSection projects={projects} />

      <div className="mx-auto max-w-[1800px]">
        <IndustriesSection />

        <AboutUs />

        <OurService />
      </div>

      <ClientsSection />

      <ContactSection />
    </main>
  );
}
