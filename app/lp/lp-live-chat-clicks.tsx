"use client";

import { useEffect } from "react";
import { openLiveChat } from "@/lib/livechat";
import { SITE } from "@/lib/data/site";

const LIVE_CHAT_LABELS = new Set([
  "consult an expert",
  "free consultation",
  "book a free consultation",
  "live chat",
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
  if (clickable.classList.contains("lp-chat-mobile-only")) return false;

  if (
    clickable.getAttribute("title")?.toLowerCase() === "live chat" ||
    clickable.id === "testimonals"
  ) {
    return true;
  }

  return LIVE_CHAT_LABELS.has(normalizedText(clickable));
}

function enhanceLiveChatButtons() {
  const candidates = document.querySelectorAll<HTMLAnchorElement>(
    "a[title='Live Chat'], a#testimonals, a.theme-btn.bordered"
  );

  candidates.forEach((el) => {
    if (el.dataset.lpCallEnhanced === "1") return;
    if (!isLiveChatTrigger(el)) return;
    if (el.classList.contains("lp-chat-mobile-only")) return;

    el.dataset.lpCallEnhanced = "1";
    el.classList.add("lp-chat-desktop-only");

    const call = document.createElement("a");
    call.href = SITE.phoneHref;
    call.title = "Call Us";
    call.className = `${el.className
      .replace(/\blp-chat-desktop-only\b/g, "")
      .trim()} lp-chat-mobile-only lp-call-btn`;
    call.innerHTML = `<span>Call Us</span>`;
    el.insertAdjacentElement("afterend", call);
  });
}

export function LpLiveChatClicks() {
  useEffect(() => {
    enhanceLiveChatButtons();

    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const mobileCall = target.closest("a.lp-chat-mobile-only");
      if (mobileCall) return;

      if (!isLiveChatTrigger(target)) return;

      event.preventDefault();
      openLiveChat();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
