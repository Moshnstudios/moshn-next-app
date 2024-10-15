import { type Metadata } from "next";
import CareerForm from "./_components/career-form";

export const metadata: Metadata = {
  title: "Career",
  description:
    "Explore career opportunities in high-quality CGI, 3D animation, and visual production. Join our creative team and help craft story-driven visuals that elevate brands and captivate audiences.",
};

export default function CareerPage() {
  return <CareerForm />;
}
