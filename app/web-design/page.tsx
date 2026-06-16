import type { Metadata } from "next";
import { WebDesignPage } from "@/components/pages/web-design-page";

export const metadata: Metadata = {
  title: "Custom Squarespace Website Development Services | SquarespaceLab",
  description:
    "Let's build a custom Squarespace website for your brand. With clean design and easy navigation, we make every element count.",
};

export default function WebDesign() {
  return <WebDesignPage />;
}
