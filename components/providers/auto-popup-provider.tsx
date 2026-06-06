"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { AutoPopupModal } from "@/components/ui/auto-popup-modal";
import { useLeadForm } from "@/components/providers/lead-form-provider";
import { AUTO_POPUP_FORM } from "@/lib/data/auto-popup-form";

function hasSeenAutoPopup(): boolean {
  try {
    return sessionStorage.getItem(AUTO_POPUP_FORM.sessionStorageKey) === "1";
  } catch {
    return false;
  }
}

function markAutoPopupSeen(): void {
  try {
    sessionStorage.setItem(AUTO_POPUP_FORM.sessionStorageKey, "1");
  } catch {
    // Ignore storage errors (private browsing, etc.)
  }
}

export function AutoPopupProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isOpen: isLeadFormOpen } = useLeadForm();
  const [isOpen, setIsOpen] = useState(false);
  const pendingOpenRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isExcluded = AUTO_POPUP_FORM.excludedPaths.some(
    (path) => path === pathname
  );

  const tryOpen = useCallback(() => {
    if (isExcluded || hasSeenAutoPopup()) return;

    if (isLeadFormOpen) {
      pendingOpenRef.current = true;
      return;
    }

    pendingOpenRef.current = false;
    setIsOpen(true);
  }, [isExcluded, isLeadFormOpen]);

  const closeAutoPopup = useCallback(() => {
    markAutoPopupSeen();
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (isExcluded || hasSeenAutoPopup()) return;

    timerRef.current = setTimeout(tryOpen, AUTO_POPUP_FORM.delayMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isExcluded, tryOpen]);

  useEffect(() => {
    if (!isLeadFormOpen) return;

    markAutoPopupSeen();
    pendingOpenRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (isOpen) setIsOpen(false);
  }, [isLeadFormOpen, isOpen]);

  useEffect(() => {
    if (!isLeadFormOpen && pendingOpenRef.current) {
      tryOpen();
    }
  }, [isLeadFormOpen, tryOpen]);

  useEffect(() => {
    if (isOpen) {
      markAutoPopupSeen();
    }
  }, [isOpen]);

  return (
    <>
      {children}
      {!isExcluded ? (
        <AutoPopupModal isOpen={isOpen} onClose={closeAutoPopup} />
      ) : null}
    </>
  );
}
