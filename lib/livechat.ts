export const CRISP_WEBSITE_ID = "c3c61cb9-5b14-4368-b0b2-b7a3da048425";

export function openLiveChat() {
  if (typeof window === "undefined") return;

  window.$crisp = window.$crisp || [];
  window.$crisp.push(["do", "chat:open"]);
}
