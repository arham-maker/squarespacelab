export function openLiveChat() {
  if (typeof window === "undefined") return;

  if (typeof window.zE === "function") {
    try {
      window.zE("messenger", "open");
      return;
    } catch {
      try {
        window.zE("webWidget", "open");
        return;
      } catch {
        // Fall through to the legacy zopim API below.
      }
    }
  }

  if (window.$zopim?.livechat?.window?.show) {
    window.$zopim.livechat.window.show();
    return;
  }
}
