import Script from "next/script";

export function LiveChatWidget() {
  return (
    <Script
      id="ze-snippet"
      src="https://static.zdassets.com/ekr/snippet.js?key=6d3a51b6-29cd-40bb-afd3-451b39d0da0a"
      strategy="afterInteractive"
    />
  );
}
