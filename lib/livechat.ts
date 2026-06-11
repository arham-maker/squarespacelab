export const LIVECHAT_LICENSE = 19774720;

export function openLiveChat() {
  if (typeof window === "undefined") return;

  const widget = window.LiveChatWidget;
  if (!widget) return;

  const maximize = () => widget.call("maximize");

  try {
    maximize();
  } catch {
    widget.once("ready", maximize);
  }
}
