import type { Metadata } from "next";
import { DigitalMarketingPage } from "@/components/pages/digital-marketing-page";

export const metadata: Metadata = {
  title: "Digital Marketing Services | SquarespaceLab",
  description:
    "From SEO to social media, we help you connect with the right audience on the right platforms at the right time.",
};

export default function DigitalMarketing() {
  return <DigitalMarketingPage />;
}
