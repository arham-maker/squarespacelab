import type { Metadata } from "next";
import { AdvertisingPage } from "@/components/pages/advertising-page";

export const metadata: Metadata = {
  title: "Professional Advertising Services | SquarespaceLab",
  description:
    "Creative advertising that grabs attention and converts. SEO, SMM, and SEM packages tailored to your brand and budget.",
};

export default function Advertising() {
  return <AdvertisingPage />;
}
