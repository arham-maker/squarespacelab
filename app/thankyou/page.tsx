import type { Metadata } from "next";
import Script from "next/script";
import { ThankYouPage } from "@/components/pages/thank-you-page";

export const metadata: Metadata = {
  title: "Thank You | SquarespaceLab",
  description:
    "Thanks! We have received your request. Expect a quick reply from our Squarespace experts.",
};

const BING_UET_SCRIPT = `(function(w,d,t,u,o){if(w.__sslBingUet)return;w.__sslBingUet=1;w[u]=w[u]||[],o.ts=(new Date).getTime();var n=d.createElement(t);n.src="https://bat.bing.net/bat.js?ti="+o.ti+("uetq"!=u?"&q="+u:""),n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&"loaded"!==s&&"complete"!==s||(o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad"),n.onload=n.onreadystatechange=null)};var i=d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n,i)})(window,document,"script","uetq",{ti:"343273347",enableAutoSpaTracking:true});`;

type ThankYouRouteProps = {
  searchParams: Promise<{ from?: string | string[] }>;
};

export default async function ThankYou({ searchParams }: ThankYouRouteProps) {
  const params = await searchParams;
  const from = Array.isArray(params.from) ? params.from[0] : params.from;
  const fromLp2 = from === "lp2";

  return (
    <>
      <Script id="bing-uet-thankyou" strategy="afterInteractive">
        {BING_UET_SCRIPT}
      </Script>
      <Script id="bing-uet-signup" strategy="afterInteractive">
        {`
          function uet_report_conversion() {
            window.uetq = window.uetq || [];
            window.uetq.push('event', 'signup', {});
          }
          uet_report_conversion();
        `}
      </Script>
      <ThankYouPage fromLp2={fromLp2} />
    </>
  );
}
