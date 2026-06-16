import type { Metadata } from "next";
import { PricingPage } from "@/components/pages/pricing-page";

export const metadata: Metadata = {
  title: "Affordable Packages | SquarespaceLab",
  description:
    "Our affordable design packages provide exceptional quality and service for every budget. Take your business to the next level with us!",
};

export default function OurPricing() {
  return <PricingPage />;
}
