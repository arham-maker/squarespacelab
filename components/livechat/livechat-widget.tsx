import Script from "next/script";

export function LiveChatWidget() {
  return (
    <Script
      id="crisp-snippet"
      strategy="afterInteractive"
    >
      {`
        window.$crisp = window.$crisp || [];
        window.CRISP_WEBSITE_ID = "c3c61cb9-5b14-4368-b0b2-b7a3da048425";
        (function() {
          var d = document;
          var s = d.createElement("script");
          s.src = "https://client.crisp.chat/l.js";
          s.async = 1;
          d.getElementsByTagName("head")[0].appendChild(s);
        })();
      `}
    </Script>
  );
}
