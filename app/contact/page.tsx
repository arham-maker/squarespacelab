import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/contact-page";

export const metadata: Metadata = {
  title: "Connect with Us Today | SquarespaceLab",
  description:
    "Need assistance or want to discuss your project? Reach out now! Our team is ready to provide the help you need.",
};

export default function Contact() {
  return <ContactPage />;
}
