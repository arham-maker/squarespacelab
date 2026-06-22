export function openLiveChat() {
  if (typeof window === "undefined") return;

  window.$crisp = window.$crisp || [];
  window.$crisp.push(["do", "chat:open"]);
}
