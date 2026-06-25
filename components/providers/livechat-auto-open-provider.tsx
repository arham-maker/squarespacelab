"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { useLeadForm } from "@/components/providers/lead-form-provider";
import { LIVECHAT_AUTO_OPEN } from "@/lib/data/livechat-auto-open";
import { openLiveChat } from "@/lib/livechat";

const AUTO_OPEN_WINDOW_FLAG = "__squarespacelabLiveChatAutoOpened";

declare global {
  interface Window {
    [AUTO_OPEN_WINDOW_FLAG]?: boolean;
  }
}

function hasAutoOpenedLiveChat(): boolean {
  if (typeof window !== "undefined" && window[AUTO_OPEN_WINDOW_FLAG]) {
    return true;
  }

  try {
    if (sessionStorage.getItem(LIVECHAT_AUTO_OPEN.sessionStorageKey) === "1") {
      return true;
    }
  } catch {
    // Continue to localStorage/window flag checks if sessionStorage is blocked.
  }

  try {
    return localStorage.getItem(LIVECHAT_AUTO_OPEN.sessionStorageKey) === "1";
  } catch {
    return false;
  }
}

function markLiveChatAutoOpened(): void {
  if (typeof window !== "undefined") {
    window[AUTO_OPEN_WINDOW_FLAG] = true;
  }

  try {
    sessionStorage.setItem(LIVECHAT_AUTO_OPEN.sessionStorageKey, "1");
  } catch {
    // Ignore storage errors (private browsing, etc.)
  }

  try {
    localStorage.setItem(LIVECHAT_AUTO_OPEN.sessionStorageKey, "1");
  } catch {
    // Ignore storage errors (private browsing, etc.)
  }
}

export function LiveChatAutoOpenProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isOpen: isLeadFormOpen } = useLeadForm();
  const pendingOpenRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isExcluded = LIVECHAT_AUTO_OPEN.excludedPaths.some(
    (path) => path === pathname
  );

  const tryOpen = useCallback(() => {
    if (isExcluded || hasAutoOpenedLiveChat()) return;

    if (isLeadFormOpen) {
      pendingOpenRef.current = true;
      return;
    }

    pendingOpenRef.current = false;
    markLiveChatAutoOpened();
    openLiveChat();
  }, [isExcluded, isLeadFormOpen]);

  useEffect(() => {
    if (isExcluded || hasAutoOpenedLiveChat()) return;

    timerRef.current = setTimeout(tryOpen, LIVECHAT_AUTO_OPEN.delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isExcluded, tryOpen, pathname]);

  useEffect(() => {
    if (!isLeadFormOpen) return;

    markLiveChatAutoOpened();
    pendingOpenRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, [isLeadFormOpen]);

  useEffect(() => {
    if (!isLeadFormOpen && pendingOpenRef.current) {
      tryOpen();
    }
  }, [isLeadFormOpen, tryOpen]);

  return children;
}
