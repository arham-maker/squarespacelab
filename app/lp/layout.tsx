import type { Metadata } from "next";
import Script from "next/script";
import { LpInit } from "@/components/lp/lp-init";
import { LpMirrorInteractions } from "./lp-mirror-interactions";
import "./lp-mirror-fixes.css";

const SOURCE = "https://squarespacelab.com/lp";

const LATE_ICON_FIXES = `
  .lp-mirror .theme-btn i[class*="fa-arrow-right"] {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 40px !important;
    height: 40px !important;
    margin-left: 12px !important;
    border-radius: 8px !important;
    background: #ffffff !important;
    color: transparent !important;
    font-family: Arial, sans-serif !important;
    font-size: 0 !important;
    font-style: normal !important;
    line-height: 1 !important;
    vertical-align: middle !important;
  }

  .lp-mirror .theme-btn i[class*="fa-arrow-right"]::before {
    content: "" !important;
    display: block !important;
    width: 18px !important;
    height: 14px !important;
    background: #000000 !important;
    font-family: inherit !important;
    font-size: 0 !important;
    line-height: 1 !important;
    clip-path: polygon(0 42%, 70% 42%, 48% 12%, 58% 0, 100% 50%, 58% 100%, 48% 88%, 70% 58%, 0 58%);
  }

  .lp-mirror .theme-btn .lp-css-arrow-icon {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    width: 18px !important;
    height: 14px !important;
    margin-left: 10px !important;
    color: currentColor !important;
    font-family: inherit !important;
    font-size: 0 !important;
    font-style: normal !important;
    line-height: 1 !important;
    vertical-align: middle !important;
  }

  .lp-mirror .theme-btn .lp-css-arrow-icon::before {
    content: "" !important;
    display: block !important;
    width: 18px !important;
    height: 14px !important;
    background: currentColor !important;
    clip-path: polygon(0 42%, 70% 42%, 48% 12%, 58% 0, 100% 50%, 58% 100%, 48% 88%, 70% 58%, 0 58%);
  }
`;

export const metadata: Metadata = {
  title:
    "Custom Squarespace Website Design & Development Services | SquarespaceLab",
  description:
    "Find a professional Squarespace designer to build or redesign your website. Custom Squarespace website design by expert developers.",
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <link rel="stylesheet" href={`${SOURCE}/assets/css/layout.css`} />
      <link rel="stylesheet" href={`${SOURCE}/assets/css/style.css`} />
      <link
        rel="preload"
        as="image"
        href={`${SOURCE}/assets/images/banner/banner-image.png`}
      />
      {children}
      <style dangerouslySetInnerHTML={{ __html: LATE_ICON_FIXES }} />
      <LpInit designCardSliders fancyboxGroup="portfolio Design" />
      <LpMirrorInteractions />
      <Script id="lp-livechat" strategy="afterInteractive">
        {`
          function setButtonURL() {
            window.$crisp = window.$crisp || [];
            window.$crisp.push(["do", "chat:open"]);
          }
          window.setButtonURL = setButtonURL;
        `}
      </Script>
    </div>
  );
}
