import { type Metadata } from "next";
import ContactForm from "./_components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch for expert CGI, 3D animations, and custom visual production solutions. Let us help bring your brand’s story to life with captivating visuals that drive results.",
};

export default function Contact() {
  return <ContactForm />;
}
