import type { Metadata } from "next";
import { GraphicDesignPage } from "@/components/pages/graphic-design-page";

export const metadata: Metadata = {
  title: "Professional Graphic Design Services",
  description:
    "Looking for professional graphic design services? We create stunning visuals, from logos to marketing materials, that captivate and engage your audience. Contact us today for a consultation!",
};

export default function GraphicDesign() {
  return <GraphicDesignPage />;
}
