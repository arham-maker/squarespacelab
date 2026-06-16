import type { Metadata } from "next";
import { BrandingPage } from "@/components/pages/branding-page";

export const metadata: Metadata = {
  title: "Comprehensive Branding Services | SquarespaceLab",
  description:
    "A successful brand starts with a solid strategy. Our tailored branding strategies will position your brand for growth and success in your industry.",
};

export default function Branding() {
  return <BrandingPage />;
}
