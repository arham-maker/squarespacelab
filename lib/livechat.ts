export function openLiveChat() {
  if (typeof window === "undefined") return;

  window.zE?.("messenger", "open");
}
