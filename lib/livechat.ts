export const CRISP_WEBSITE_ID = "6667cdcf-5e18-4742-a7b2-1bccade8273b";

export function openLiveChat() {
  if (typeof window === "undefined") return;

  window.$crisp = window.$crisp || [];
  window.$crisp.push(["do", "chat:open"]);
}
