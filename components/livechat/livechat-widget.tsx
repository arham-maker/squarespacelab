import Script from "next/script";
import { CRISP_WEBSITE_ID } from "@/lib/livechat";

const CRISP_INIT = `
window.$crisp = window.$crisp || [];
window.$crisp.push(["config", "position:reverse", [false]]);
window.$crisp.push(["on", "message:received", function(message) {
  if (message && message.from && message.from !== "operator") return;
  window.$crisp.push(["do", "chat:open"]);
}]);
window.CRISP_WEBSITE_ID = "${CRISP_WEBSITE_ID}";
(function(){
  var d = document;
  var s = d.createElement("script");
  s.src = "https://client.crisp.chat/l.js";
  s.async = 1;
  d.getElementsByTagName("head")[0].appendChild(s);
})();
`.trim();

export function LiveChatWidget() {
  return (
    <Script
      id="crisp-chat-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: CRISP_INIT }}
    />
  );
}
