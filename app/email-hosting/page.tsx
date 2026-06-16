import type { Metadata } from "next";
import { EmailHostingPage } from "@/components/pages/email-hosting-page";

export const metadata: Metadata = {
  title: "Domain Email Hosting Services | SquarespaceLab",
  description:
    "Fast, secure email hosting with professional branded accounts, spam filters, encryption, and expert support.",
};

export default function EmailHosting() {
  return <EmailHostingPage />;
}
