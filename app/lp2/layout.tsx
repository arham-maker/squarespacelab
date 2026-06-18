import type { Metadata } from "next";
import { Wix_Madefor_Display } from "next/font/google";
import "../lp/lp-overrides.css";

const wixMadeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hire a Squarespace Website Designer | SquarespaceLab",
  description:
    "Find a professional Squarespace designer to build or redesign your website. Custom Squarespace website design by expert developers.",
};

export default function Lp2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={wixMadeforDisplay.className}>
      <link rel="stylesheet" href="/lp/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp/assets/css/style.css" />
      {children}
    </div>
  );
}
