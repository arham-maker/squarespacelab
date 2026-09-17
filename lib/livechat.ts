const ZE_POLL_MS = 100;
const ZE_POLL_MAX_ATTEMPTS = 150;
const AUTO_OPEN_DELAY_MS = 2000;
const SHOW_AFTER_MINIMIZE_MS = 150;

const LIVE_CHAT_LABELS = new Set([
  "live chat",
  "free consultation",
  "book a free consultation",
  "consult an expert",
  "get in touch",
  "text us for instant answers",
  "check out our customer reviews",
]);

let reopenTimer: ReturnType<typeof setTimeout> | undefined;
let autoOpenTimer: ReturnType<typeof setTimeout> | undefined;
let listenersReady = false;
let ctaClicksBound = false;

function showWidget() {
  try {
    window.zE?.("webWidget", "show");
  } catch {
    try {
      window.zE?.("messenger", "show");
    } catch {
      // Widget not ready / Messaging-only account
    }
  }
}

function openFullWidget() {
  if (reopenTimer) {
    window.clearTimeout(reopenTimer);
    reopenTimer = undefined;
  }
  showWidget();
  try {
    window.zE?.("webWidget", "open");
  } catch {
    try {
      window.zE?.("messenger", "open");
    } catch {
      // Widget not ready / Messaging-only account
    }
  }
}

/** Keep launcher visible after minimize/close. */
function scheduleShowAfterMinimize() {
  showWidget();
  if (reopenTimer) window.clearTimeout(reopenTimer);
  reopenTimer = window.setTimeout(() => {
    showWidget();
    reopenTimer = undefined;
  }, SHOW_AFTER_MINIMIZE_MS);
}

function whenZeReady(callback: () => (() => void) | void): () => void {
  let cancelled = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let cleanupFromCallback: (() => void) | undefined;
  let attempts = 0;

  const tryAttach = () => {
    if (cancelled) return;
    if (typeof window.zE === "function") {
      cleanupFromCallback = callback() ?? undefined;
      return;
    }
    if (attempts >= ZE_POLL_MAX_ATTEMPTS) return;
    attempts += 1;
    timer = window.setTimeout(tryAttach, ZE_POLL_MS);
  };

  tryAttach();

  return () => {
    cancelled = true;
    if (timer) window.clearTimeout(timer);
    cleanupFromCallback?.();
  };
}

function normalizedText(element: Element) {
  return element.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
}

function isLiveChatTrigger(element: Element) {
  const clickable = element.closest("a, button");
  if (!clickable) return false;

  // Mobile call CTAs should not open chat
  if (clickable.classList.contains("lp-chat-mobile-only")) return false;
  if (clickable.classList.contains("site-mobile-call-fab")) return false;

  if (
    clickable.getAttribute("title")?.toLowerCase() === "live chat" ||
    clickable.id === "testimonals"
  ) {
    return true;
  }

  return LIVE_CHAT_LABELS.has(normalizedText(clickable));
}

function bindCtaClicks() {
  if (ctaClicksBound || typeof document === "undefined") return;
  ctaClicksBound = true;

  const onClick = (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (target.closest("a.lp-chat-mobile-only, a.site-mobile-call-fab")) return;
    if (!isLiveChatTrigger(target)) return;

    event.preventDefault();
    openLiveChat();
  };

  document.addEventListener("click", onClick, true);
}

function exposeOpeners() {
  if (typeof window === "undefined") return;
  window.openLiveChat = openLiveChat;
  window.setButtonURL = openLiveChat;
  window.__squarespacelabOpenLiveChat = openLiveChat;
}

/**
 * Zendesk Web Widget (Classic) behavior:
 * - wait for zE ready (poll 100ms, max ~15s)
 * - auto-open 2s after load
 * - keep launcher after minimize/close
 * - reopen full widget on chat:unreadMessages when count > 0
 * - wire common CTA labels to openLiveChat()
 */
export function setupZendeskAgentReplyListener(): () => void {
  exposeOpeners();
  bindCtaClicks();

  // Auto-open 2s after page load (waits for zE inside openLiveChat if needed)
  if (autoOpenTimer) window.clearTimeout(autoOpenTimer);
  autoOpenTimer = window.setTimeout(() => {
    openLiveChat();
    autoOpenTimer = undefined;
  }, AUTO_OPEN_DELAY_MS);

  const stopReady = whenZeReady(() => {
    if (listenersReady) return;
    listenersReady = true;
    showWidget();

    const unsubscribers: Array<() => void> = [];

    try {
      const onClose = window.zE?.("webWidget:on", "close", () => {
        scheduleShowAfterMinimize();
      });
      if (typeof onClose === "function") unsubscribers.push(onClose);

      const onUserEvent = window.zE?.(
        "webWidget:on",
        "userEvent",
        (...args: unknown[]) => {
          const event = args[0] as { action?: string } | undefined;
          const action = event?.action?.toLowerCase() ?? "";
          if (
            action.includes("minimised") ||
            action.includes("minimized") ||
            action.includes("web widget closed")
          ) {
            scheduleShowAfterMinimize();
          }
        }
      );
      if (typeof onUserEvent === "function") unsubscribers.push(onUserEvent);

      const onUnread = window.zE?.(
        "webWidget:on",
        "chat:unreadMessages",
        (...args: unknown[]) => {
          const count =
            typeof args[0] === "number" ? args[0] : Number(args[0]) || 0;
          if (count > 0) openFullWidget();
        }
      );
      if (typeof onUnread === "function") unsubscribers.push(onUnread);
    } catch (error) {
      console.warn("Unable to register Zendesk listeners:", error);
      listenersReady = false;
    }

    return () => {
      if (reopenTimer) {
        window.clearTimeout(reopenTimer);
        reopenTimer = undefined;
      }
      unsubscribers.forEach((unsubscribe) => unsubscribe());
      listenersReady = false;
    };
  });

  return () => {
    if (autoOpenTimer) {
      window.clearTimeout(autoOpenTimer);
      autoOpenTimer = undefined;
    }
    stopReady();
  };
}

/** @deprecated Use setupZendeskAgentReplyListener */
export function initLiveChatBehavior(): () => void {
  return setupZendeskAgentReplyListener();
}

/** Open full Live Chat window once Zendesk is ready. */
export function openLiveChat() {
  whenZeReady(() => {
    openFullWidget();
  });
}

/** @deprecated Use openLiveChat */
export function forceOpenMessenger() {
  openLiveChat();
}
