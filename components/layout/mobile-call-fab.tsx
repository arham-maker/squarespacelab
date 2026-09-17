"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/data/site";

const MOBILE_MQ = "(max-width: 991px)";

function setMessengerVisible(visible: boolean) {
  const zE = typeof window !== "undefined" ? window.zE : undefined;
  if (typeof zE !== "function") return;

  try {
    zE("webWidget", visible ? "show" : "hide");
  } catch {
    try {
      zE("messenger", visible ? "show" : "hide");
    } catch {
      // Widget API not ready
    }
  }
}

/** Mobile: hide Zendesk Chat launcher and show Call Us instead. */
export function MobileCallFab() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setMessengerVisible(!mobile);
    };

    sync();
    mq.addEventListener("change", sync);

    const pollId = window.setInterval(() => {
      setMessengerVisible(!mq.matches);
    }, 800);
    const stopPoll = window.setTimeout(() => clearInterval(pollId), 12000);

    return () => {
      mq.removeEventListener("change", sync);
      clearInterval(pollId);
      clearTimeout(stopPoll);
      setMessengerVisible(true);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <a
      href={SITE.phoneHref}
      className="site-mobile-call-fab"
      aria-label="Call Us"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
          fill="currentColor"
        />
      </svg>
      Call Us
    </a>
  );
}
