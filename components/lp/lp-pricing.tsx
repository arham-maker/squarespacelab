"use client";

import { useState } from "react";
import {
  LP_ECOMMERCE_PACKAGES,
  LP_PROMOTIONAL_PACKAGES,
  type LpPackage,
} from "@/lib/data/lp";
import { LpLiveChatButton, LpPackageButton } from "@/components/lp/lp-buttons";

function PackageCard({ pkg, category }: { pkg: LpPackage; category: string }) {
  const amount = pkg.price.replace("$", "");

  return (
    <div>
      <div className="pckg">
        <div className="upper">
          <h3 className="title">{pkg.title}</h3>
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
            <LpPackageButton pkg={pkg} category={category} />
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
          <div className="btn-wrap">
            <LpLiveChatButton className="theme-btn bordered" label="Chat With Us" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function LpPricingSection() {
  const [activeTab, setActiveTab] = useState<"box-1" | "box-2">("box-1");

  return (
    <section className="pckg-sec" id="pricing">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-duration="1000">
            <div className="sec-heading center">
              <h2>Affordable Squarespace Packages</h2>
              <p>
                Not sure which package is right for you? Contact us for a free
                consultation, and we&apos;ll help you choose the best option for
                your needs!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <ul className="overview-nav d2">
              <li
                className={activeTab === "box-1" ? "active" : ""}
                data-targetit="box-1"
              >
                <a
                  href="javascript:;"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("box-1");
                  }}
                >
                  Promotional Website
                </a>
              </li>
              <li
                className={activeTab === "box-2" ? "active" : ""}
                data-targetit="box-2"
              >
                <a
                  href="javascript:;"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab("box-2");
                  }}
                >
                  E-Commerce Website
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="box-1 showfirst port-content"
          style={{ display: activeTab === "box-1" ? "block" : "none" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="pkg-list">
                {LP_PROMOTIONAL_PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.title}
                    pkg={pkg}
                    category="Promotional Website"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="box-2 port-content"
          style={{ display: activeTab === "box-2" ? "block" : "none" }}
        >
          <div className="row">
            <div className="col-lg-12">
              <div className="pkg-list">
                {LP_ECOMMERCE_PACKAGES.map((pkg) => (
                  <PackageCard
                    key={pkg.title}
                    pkg={pkg}
                    category="E-Commerce Website"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
