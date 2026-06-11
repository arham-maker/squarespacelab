"use client";

import { useState } from "react";
import type { LpPackage } from "@/lib/data/lp";
import {
  LP2_ECOMMERCE_PACKAGES,
  LP2_PROMOTIONAL_PACKAGES,
  LP2_VIDEO_PACKAGES,
  type Lp2VideoPackage,
} from "@/lib/data/lp2";
import { LpLiveChatButton, LpPackageButton } from "@/components/lp/lp-buttons";

function PromoPackageCard({ pkg }: { pkg: LpPackage }) {
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
            <LpPackageButton pkg={pkg} category="Promotional Website">
              Let&apos;s Get Started
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
          <div className="btn-wrap">
            <LpLiveChatButton
              className="theme-btn bordered"
              label="Chat With Us"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function EcommercePackageCard({ pkg }: { pkg: LpPackage }) {
  const amount = pkg.price.replace("$", "");

  return (
    <div className="col-lg-6 col-md-6">
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
            <LpPackageButton pkg={pkg} category="E-Commerce Website">
              Let&apos;s Get Started
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
        </div>
      </div>
    </div>
  );
}

function VideoPackageCard({ pkg }: { pkg: Lp2VideoPackage }) {
  const amount = pkg.price.replace("$", "");

  return (
    <div>
      <div className="pckg">
        <div className="upper">
          <h3 className="title">{pkg.title}</h3>
          {pkg.subtitle ? <p>{pkg.subtitle}</p> : null}
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
            <LpPackageButton pkg={pkg} category="Video Animation">
              Let&apos;s Get Started
            </LpPackageButton>
          </div>
        </div>
        <div className="bottom">
          <span>
            Deliverables <i className="fas fa-info-circle" />
          </span>
          <ul>
            {pkg.deliverables.map((item, index) => (
              <li
                key={item}
                className={
                  index === 0
                    ? "first"
                    : index === pkg.deliverables.length - 1
                      ? "last"
                      : undefined
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

type PricingTab = "box-1" | "box-2";

export function Lp2PricingSection() {
  const [activeTab, setActiveTab] = useState<PricingTab>("box-1");

  return (
    <section className="pckg-sec" id="pricing">
      <div className="container">
        <div className="row">
          <div className="col-lg-12" data-aos="fade-up" data-aos-duration="1000">
            <div className="sec-heading center">
              <h4>Affordable Squarespace Packages</h4>
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
                {LP2_PROMOTIONAL_PACKAGES.map((pkg) => (
                  <PromoPackageCard key={pkg.title} pkg={pkg} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="box-2 port-content"
          style={{ display: activeTab === "box-2" ? "block" : "none" }}
        >
          <div className="row gy-4 mt-4">
            {LP2_ECOMMERCE_PACKAGES.map((pkg) => (
              <EcommercePackageCard key={pkg.title} pkg={pkg} />
            ))}
          </div>
        </div>

        <div className="box-3 port-content">
          <div className="row">
            <div className="col-lg-12">
              <div className="pkg-list">
                {LP2_VIDEO_PACKAGES.map((pkg) => (
                  <VideoPackageCard key={pkg.title} pkg={pkg} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
