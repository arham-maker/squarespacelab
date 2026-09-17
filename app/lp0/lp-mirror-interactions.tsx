"use client";

import { useEffect } from "react";
import { useLeadForm } from "@/components/providers/lead-form-provider";
import { openLiveChat } from "@/lib/livechat";
import type { SelectedPackage } from "@/lib/forms/selected-package";

function textFrom(root: ParentNode, selector: string) {
  return root.querySelector(selector)?.textContent?.trim().replace(/\s+/g, " ");
}

function packageFromButton(button: Element): SelectedPackage | null {
  const card = button.closest(".pckg");
  if (!card) return null;

  const name = textFrom(card, ".title");
  const price = textFrom(card, ".amount");
  const details = Array.from(card.querySelectorAll(".bottom li"))
    .map((item) => item.textContent?.trim().replace(/\s+/g, " "))
    .filter(Boolean)
    .join("\n");

  if (!name && !price && !details) return null;

  return {
    name: name ?? "Selected Package",
    price: price ? (price.startsWith("$") ? price : `$${price}`) : "",
    details,
  };
}

function activatePricingTab(tabItem: Element) {
  const targetClass = tabItem.getAttribute("data-targetit");
  const pricingSection = tabItem.closest(".pckg-sec");
  if (!targetClass || !pricingSection) return;

  pricingSection.querySelectorAll(".overview-nav li").forEach((item) => {
    item.classList.toggle("active", item === tabItem);
  });

  pricingSection.querySelectorAll<HTMLElement>(".port-content").forEach((panel) => {
    const isActive = panel.classList.contains(targetClass);
    panel.style.display = isActive ? "block" : "none";
    panel.classList.toggle("showfirst", isActive);
  });
}

export function LpMirrorInteractions() {
  const { openLeadForm } = useLeadForm();

  useEffect(() => {
    document
      .querySelectorAll<HTMLElement>(".lp-mirror .theme-btn i[class*='fa-arrow-right']")
      .forEach((icon) => {
        icon.className = "lp-css-arrow-icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "";
      });
  }, []);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const pricingTab = target.closest(".lp-mirror .overview-nav li[data-targetit]");
      if (pricingTab) {
        event.preventDefault();
        activatePricingTab(pricingTab);
        return;
      }

      const liveChatButton = target.closest(
        ".lp-mirror .open-livechat, .lp-mirror a[title='Live Chat'], .lp-mirror a[title='Chat With Us']"
      );
      if (liveChatButton) {
        event.preventDefault();
        openLiveChat();
        return;
      }

      const leadButton = target.closest(
        ".lp-mirror .popstatic, .lp-mirror .popdynamic"
      );
      if (leadButton) {
        event.preventDefault();
        openLeadForm(packageFromButton(leadButton));
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [openLeadForm]);

  return null;
}
