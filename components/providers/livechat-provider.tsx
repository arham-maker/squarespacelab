"use client";

import { useEffect } from "react";
import { setupZendeskAgentReplyListener } from "@/lib/livechat";

/** Boots Zendesk Classic Web Widget behavior site-wide. */
export function LiveChatProvider() {
  useEffect(() => setupZendeskAgentReplyListener(), []);
  return null;
}
