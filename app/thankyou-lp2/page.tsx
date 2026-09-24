import type { Metadata } from "next";
import Script from "next/script";
import { ThankYouPage } from "@/components/pages/thank-you-page";

export const metadata: Metadata = {
  title: "Thank You | SquarespaceLab",
  description:
    "Thanks! We have received your request. Expect a quick reply from our Squarespace experts.",
};

/**
 * Dedicated LP2 thank-you page.
 * Keeps /thankyou untouched for the main site.
 * Sitewide Bing UET lives in root layout; only the signup conversion fires here.
 */
export default function ThankYouLp2() {
  return (
    <>
      <Script
        id="bing-uet-signup"
        src="/js/bing-uet-signup.js"
        strategy="afterInteractive"
      />
      <ThankYouPage fromLp2 />
    </>
  );
}
