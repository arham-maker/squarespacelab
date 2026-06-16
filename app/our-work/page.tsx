import type { Metadata } from "next";
import { WorkPage } from "@/components/pages/work-page";

export const metadata: Metadata = {
  title: "Our Work | SquarespaceLab",
  description:
    "Explore our portfolio, highlighting our dedication to quality and creativity. From design to development, see how we bring visions to life across industries.",
};

export default function OurWork() {
  return <WorkPage />;
}
