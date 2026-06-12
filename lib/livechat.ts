export const LIVECHAT_LICENSE = 19774720;

export function isAgentMessageEvent(event: unknown): boolean {
  const data = event as { type?: string; author?: { type?: string } } | null;
  return data?.type === "message" && data?.author?.type === "agent";
}

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

export function maximizeLiveChatOnAgentMessage(event: unknown) {
  if (!isAgentMessageEvent(event)) return;

  const widget = window.LiveChatWidget;
  if (!widget) return;

  try {
    const state = widget.get("state") as { visibility?: string } | undefined;
    if (state?.visibility === "maximized") return;
  } catch {
    // get() throws before ready — fall through and open when possible
  }

  openLiveChat();
}
