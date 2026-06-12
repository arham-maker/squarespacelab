"use client";

import { useEffect } from "react";
import { LIVECHAT_WIDGET } from "@/lib/data/livechat-widget";
import { maximizeLiveChatOnAgentMessage } from "@/lib/livechat";

export function LiveChatWidgetConfig() {
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--livechat-maximized-height",
      `${LIVECHAT_WIDGET.maximizedHeightPx}px`
    );

    const onVisibilityChanged = (...args: unknown[]) => {
      const data = args[0] as { visibility?: string } | undefined;
      document.body.classList.toggle(
        "livechat-maximized",
        data?.visibility === "maximized"
      );
    };

    const onNewEvent = (...args: unknown[]) => {
      maximizeLiveChatOnAgentMessage(args[0]);
    };

    const bindWidgetListeners = () => {
      const widget = window.LiveChatWidget;
      if (!widget) return;

      widget.on("visibility_changed", onVisibilityChanged);
      widget.on("new_event", onNewEvent);

      return () => {
        widget.off("visibility_changed", onVisibilityChanged);
        widget.off("new_event", onNewEvent);
        document.body.classList.remove("livechat-maximized");
      };
    };

    const widget = window.LiveChatWidget;
    if (widget) {
      return bindWidgetListeners();
    }

    let cleanup: (() => void) | undefined;
    window.LiveChatWidget?.once("ready", () => {
      cleanup = bindWidgetListeners();
    });

    return () => {
      cleanup?.();
      document.body.classList.remove("livechat-maximized");
    };
  }, []);

  return null;
}
