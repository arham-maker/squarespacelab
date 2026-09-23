import type { Metadata } from "next";
import Script from "next/script";
import { LpLiveChatClicks } from "./lp-live-chat-clicks";

export const metadata: Metadata = {
  title:
    "Struggling to Find a Squarespace Designer? Hire a Pro for a Stunning Site!",
  description:
    "Hire a Squarespace website designer in the USA for custom design, redesign, ecommerce, memberships, SEO, support, and conversion-focused Squarespace development.",
};

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <link rel="stylesheet" href="/lp2/assets/css/layout.css" />
      <link rel="stylesheet" href="/lp2/assets/css/style.css" />
      <Script
        id="bing-uet-lp"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,t,u,o){if(w.__sslBingUet)return;w.__sslBingUet=1;w[u]=w[u]||[],o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.net/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:""),n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)})(window,document,"script","uetq",{ti:"343273347",enableAutoSpaTracking:true});`,
        }}
      />
      {children}
      <LpLiveChatClicks />
      <Script src="/lp2/assets/js/jquery.js" strategy="afterInteractive" />
      <Script src="/lp2/assets/js/custom.js" strategy="afterInteractive" />
      <Script id="lp-livechat" strategy="afterInteractive">
        {`
          function setButtonURL() {
            if (typeof window.__squarespacelabOpenLiveChat === "function") {
              window.__squarespacelabOpenLiveChat();
              return;
            }
            if (typeof zE === "function") {
              try {
                zE("messenger", "open");
              } catch (error) {
                try {
                  zE("webWidget", "open");
                } catch (e2) {}
              }
            }
          }
          window.setButtonURL = setButtonURL;
        `}
      </Script>
    </div>
  );
}
