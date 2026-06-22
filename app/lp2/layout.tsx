import type { Metadata } from "next";
import Script from "next/script";
import { Lp2LiveChatClicks } from "./lp2-live-chat-clicks";

export const metadata: Metadata = {
  title:
    "Struggling to Find a Squarespace Designer? Hire a Pro for a Stunning Site!",
  description:
    "Hire a Squarespace website designer in the USA for custom design, redesign, ecommerce, memberships, SEO, support, and conversion-focused Squarespace development.",
};

export default function Lp2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <link rel="stylesheet" href="/lp2/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp2/assets/css/style.css" />
      {children}
      <Lp2LiveChatClicks />
      <Script src="/lp2/assets/js/jquery.js" strategy="afterInteractive" />
      <Script src="/lp2/assets/js/custom.js" strategy="afterInteractive" />
      <Script id="lp2-livechat" strategy="afterInteractive">
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
