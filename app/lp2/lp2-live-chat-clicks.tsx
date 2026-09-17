"use client";

import { useEffect } from "react";
import { openLiveChat } from "@/lib/livechat";

const LIVE_CHAT_LABELS = new Set([
  "consult an expert",
  "free consultation",
  "book a free consultation",
  "live chat",
  "chat now",
  "chat with us",
  "check out our customer reviews",
  "text us for instant answers",
  "get in touch",
]);

function normalizedText(element: Element) {
  return element.textContent?.replace(/\s+/g, " ").trim().toLowerCase() ?? "";
}

function isLiveChatTrigger(element: Element) {
  const clickable = element.closest("a, button");
  if (!clickable) return false;
  if (clickable.classList.contains("lp-call-btn")) return false;
  if (clickable.getAttribute("title")?.toLowerCase() === "call us") return false;

  if (
    clickable.getAttribute("title")?.toLowerCase() === "live chat" ||
    clickable.id === "testimonals"
  ) {
    return true;
  }

  return LIVE_CHAT_LABELS.has(normalizedText(clickable));
}

export function Lp2LiveChatClicks() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const callBtn = target.closest("a.lp-call-btn, a[title='Call Us']");
      if (callBtn) return;

      if (!isLiveChatTrigger(target)) return;

      // On mobile, never open live chat from CTA labels
      if (window.matchMedia("(max-width: 991px)").matches) return;

      event.preventDefault();
      openLiveChat();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
