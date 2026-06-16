import type { Metadata } from "next";
import { PrivacyPage } from "@/components/pages/privacy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | SquarespaceLab",
  description:
    "Learn how SquarespaceLab collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return <PrivacyPage />;
}
