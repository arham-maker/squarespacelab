import type { Metadata } from "next";
import "../lp0/lp-lead-modal.css";
import "../get-started-modal.css";
import "./lp2-overrides.css";
import { Lp2LiveChatClicks } from "./lp2-live-chat-clicks";
import { Lp2ClientAssets } from "./lp2-client-assets";

export const metadata: Metadata = {
  title:
    "Custom Squarespace Website Design & Development Services | SquarespaceLab",
  description:
    "Hire a Squarespace website designer in the USA for custom design, ecommerce, memberships, SEO, support, and conversion-focused Squarespace development.",
};

export default function Lp2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* Critical CSS linked for first paint; JS loaded via Lp2ClientAssets */}
      <link rel="stylesheet" href="/lp2w/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp2w/assets/css/style.css" />
      <link
        rel="preload"
        as="image"
        href="/lp2w/assets/images/banner/main-banner.webp"
      />
      {children}
      <Lp2LiveChatClicks />
      <Lp2ClientAssets />
    </div>
  );
}
