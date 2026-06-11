import type { Metadata } from "next";
import { Wix_Madefor_Display } from "next/font/google";
import "./lp-overrides.css";
import "./lp-lead-modal.css";
import "../lp2/lp2-overrides.css";

const wixMadeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title:
    "Custom Squarespace Website Design & Development Services | Squarespacedev",
  description:
    "Find a professional Squarespace designer to build or redesign your website. Custom Squarespace website design by expert developers.",
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={wixMadeforDisplay.className}>
      <link rel="stylesheet" href="/lp/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp/assets/css/style.css" />
      <link
        rel="preload"
        as="image"
        href="/lp/assets/images/banner/banner-image.png"
      />
      {children}
    </div>
  );
}
