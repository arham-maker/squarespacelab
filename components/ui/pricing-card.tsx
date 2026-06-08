"use client";

import Image from "next/image";
import type { PricingPlan } from "@/lib/data/pricing";
import { PRICING_PACKAGE_ICON } from "@/lib/data/pricing";
import { SelectPackageButton } from "@/components/ui/select-package-button";
import { usePricingCardWheelScroll } from "@/hooks/use-pricing-card-wheel-scroll";
import { FaCheck } from "react-icons/fa";

type PricingCardProps = {
  plan: PricingPlan;
  packageIcon?: string;
  category?: string;
};

export function PricingCard({
  plan,
  packageIcon = PRICING_PACKAGE_ICON,
  category,
}: PricingCardProps) {
  const { bodyRef, featuresRef } = usePricingCardWheelScroll();

  return (
    <article className="pricing-card group">
      <div className="pricing-card__head">
        <h3 className="pricing-card__title">
          <Image
            src={packageIcon}
            alt=""
            width={40}
            height={40}
            className="pricing-card__icon"
            aria-hidden
          />
          {plan.title}
        </h3>
        <p className="pricing-card__price">
          {plan.price}{" "}
          <span className="pricing-card__original">
            <del>{plan.originalPrice}</del> {plan.discount}
          </span>
        </p>
      </div>
      <div ref={bodyRef} className="pricing-card__body">
        <p className="pricing-card__desc">{plan.description}</p>
        <ul ref={featuresRef} className="pricing-card__features">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className={
                feature.startsWith("Everything in") ? "pricing-card__feature-heading" : ""
              }
            >
              <FaCheck className="pricing-card__check shrink-0" aria-hidden />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <SelectPackageButton
          selectedPackage={{
            name: plan.title,
            price: plan.price,
            category,
            details: `${plan.originalPrice} → ${plan.discount}`,
          }}
        />
      </div>
    </article>
  );
}
