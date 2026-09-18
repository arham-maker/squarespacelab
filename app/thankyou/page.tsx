import type { Metadata } from "next";
import Script from "next/script";
import { ThankYouPage } from "@/components/pages/thank-you-page";

export const metadata: Metadata = {
  title: "Thank You | SquarespaceLab",
  description:
    "Thanks! We have received your request. Expect a quick reply from our Squarespace experts.",
};

export default function ThankYou() {
  return (
    <>
      <Script id="bing-uet-signup" strategy="afterInteractive">
        {`window.uetq = window.uetq || [];window.uetq.push('event', 'signup', {});`}
      </Script>
      <ThankYouPage />
    </>
  );
}
