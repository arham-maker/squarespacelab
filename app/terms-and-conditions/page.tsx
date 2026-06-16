import type { Metadata } from "next";
import { TermsPage } from "@/components/pages/terms-page";

export const metadata: Metadata = {
  title: "Terms and Conditions | SquarespaceLab",
  description:
    "Read SquarespaceLab terms and conditions, including revision, refund, delivery, and communication policies.",
};

export default function TermsAndConditions() {
  return <TermsPage />;
}
