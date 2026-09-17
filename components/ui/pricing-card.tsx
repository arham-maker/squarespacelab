"use client";

import type { PricingPlan } from "@/lib/data/pricing";
import { SelectPackageButton } from "@/components/ui/select-package-button";
import { usePricingCardWheelScroll } from "@/hooks/use-pricing-card-wheel-scroll";
import { openLiveChat } from "@/lib/livechat";

type PricingCardProps = {
  plan: PricingPlan;
  packageIcon?: string;
  category?: string;
};

export function PricingCard({ plan, category }: PricingCardProps) {
  const { bodyRef, featuresRef } = usePricingCardWheelScroll();
  const amount = plan.price.replace("$", "");

  return (
    <article className="pricing-pckg group">
      <div className="pricing-pckg__upper">
        <h3 className="pricing-pckg__title">{plan.title}</h3>
        <p className="pricing-pckg__desc">{plan.description}</p>
        <div className="pricing-pckg__price">
          <span className="pricing-pckg__amount">
            <small>$</small>
            {amount}
          </span>
          <span className="pricing-pckg__compare">
            <del>{plan.originalPrice}</del> {plan.discount}
          </span>
        </div>
        <SelectPackageButton
          className="pricing-pckg__select"
          selectedPackage={{
            name: plan.title,
            price: plan.price,
            category,
            details: `${plan.originalPrice} → ${plan.discount}`,
          }}
        />
      </div>

      <div ref={bodyRef} className="pricing-pckg__bottom">
        <span className="pricing-pckg__deliverables">Deliverables</span>
        <ul ref={featuresRef} className="pricing-pckg__features">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={
                feature.startsWith("Everything in")
                  ? "pricing-pckg__feature-heading"
                  : undefined
              }
            >
              {feature}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="pricing-pckg__chat"
          onClick={() => openLiveChat()}
        >
          Live Chat
        </button>
      </div>
    </article>
  );
}
