import type { Metadata } from "next";
import { SupportPage } from "@/components/pages/support-page";

export const metadata: Metadata = {
  title: "Expert Squarespace Website Support | SquarespaceLab",
  description:
    "Your one-stop Squarespace support solution. Setup, design, SEO, troubleshooting, e-commerce, and ongoing site maintenance from dedicated experts.",
};

export default function Support() {
  return <SupportPage />;
}
