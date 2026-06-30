export function openLiveChat() {
  if (typeof window === "undefined") return;

  if (typeof window.zE !== "function") return;

  try {
    window.zE("messenger", "open");
  } catch {
    window.zE("webWidget", "open");
  }
}
