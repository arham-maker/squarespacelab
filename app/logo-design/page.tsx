import type { Metadata } from "next";
import { LogoDesignPage } from "@/components/pages/logo-design-page";

export const metadata: Metadata = {
  title: "Professional Logo Design Services | SquarespaceLab",
  description:
    "Every brand has a story to tell, and your logo should reflect that. Our design team specializes in creating logos that convey your brand's message and values.",
};

export default function LogoDesign() {
  return <LogoDesignPage />;
}
