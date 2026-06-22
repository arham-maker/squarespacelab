"use client";

import { useState } from "react";
import {
  LP_LANDING_ECOMMERCE_PACKAGES,
  LP_LANDING_PROMOTIONAL_PACKAGES,
  LP_LANDING_REDESIGN_PACKAGES,
  type LpLandingPackage,
} from "@/lib/data/lp-landing";
import { LpLiveChatButton, LpPackageButton } from "@/components/lp/lp-buttons";

type PricingTab = "promotional" | "ecommerce" | "redesign";

const PRICING_TABS = [
  {
    id: "promotional",
    label: "Promotional",
    category: "Promotional Website",
    packages: LP_LANDING_PROMOTIONAL_PACKAGES,
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    category: "E-commerce Website",
    packages: LP_LANDING_ECOMMERCE_PACKAGES,
  },
  {
    id: "redesign",
    label: "Redesign",
    category: "Website Redesign",
    packages: LP_LANDING_REDESIGN_PACKAGES,
  },
] satisfies {
  id: PricingTab;
  label: string;
  category: string;
  packages: LpLandingPackage[];
}[];

function PackageCard({
  pkg,
  category,
}: {
  pkg: LpLandingPackage;
  category: string;
}) {
  const amount = pkg.price.replace("$", "");

  return (
    <div className="col-lg-6 col-md-6">
      <div className="pckg">
        <div className="upper">
          <h3 className="title">{pkg.title}</h3>
          <p>{pkg.description}</p>
          <div className="price">
            <span className="amount">
              <small>$</small>
              {amount}
            </span>
            <span className="uspto">
              <del>{pkg.compareAt}</del> {pkg.discount}
            </span>
          </div>
          <div className="btn-wrap">
            <LpPackageButton pkg={pkg} category={category}>
              Select Package
            </LpPackageButton>
          </div>
        </div>
        <div className="bottom">
          <span>
            Deliverables <i className="fas fa-info-circle" />
          </span>
          <ul>
            {pkg.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="btn-wrap lp-package-actions">
            <LpLiveChatButton
              className="theme-btn bordered"
              label="Live Chat"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LpLandingPricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTab>("promotional");

  return (
    <section className="pckg-sec" id="pricing">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-duration="1000">
            <div className="sec-heading center">
              <h4>Affordable Squarespace Packages For Every Business</h4>
              <p>
                Not sure which package fits your goals? Book a free consultation
                and let us help you choose the right solution.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="overview-nav d2">
              {PRICING_TABS.map((tab) => (
                <li
                  key={tab.id}
                  className={activeTab === tab.id ? "active" : ""}
                  data-targetit={tab.id}
                >
                  <a
                    href="javascript:;"
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(tab.id);
                    }}
                  >
                    {tab.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {PRICING_TABS.map((tab) => (
          <div
            key={tab.id}
            className={`${tab.id} port-content`}
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            <div className="row gy-4 mt-4">
              {tab.packages.map((pkg) => (
                <PackageCard key={pkg.title} pkg={pkg} category={tab.category} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
