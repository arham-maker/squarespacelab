import type { Metadata } from "next";
import { SocialMediaPage } from "@/components/pages/social-media-page";

export const metadata: Metadata = {
  title: "Expert Social Media Marketing Services | Squarespacedev",
  description:
    "Find, engage, and convert your target audience on social media with strategy, content, advertising, and community management.",
};

export default function SocialMedia() {
  return <SocialMediaPage />;
}
