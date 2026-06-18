"use client";

import Link from "next/link";
import Image from "next/image";
import { LpInit } from "@/components/lp/lp-init";
import { LpCtaButton, LpLiveChatButton } from "@/components/lp/lp-buttons";
import { LpPicture, LpImg } from "@/components/lp/lp-picture";
import { Lp2PortfolioSection } from "@/components/lp2/lp2-portfolio-section";
import { Lp2PricingSection } from "@/components/lp2/lp2-pricing";
import { Lp2TestimonialsSection } from "@/components/lp2/lp2-testimonials";
import { lpImage } from "@/components/lp/lp-assets";
import {
  LP_ADVANTAGES,
  LP_COUNTERS,
  LP_FAQ_LEFT,
  LP_FAQ_RIGHT,
  LP_PORTFOLIO_SLIDES,
  LP_PROCESS_STEPS,
  LP_SERVICES,
} from "@/lib/data/lp";
import { LP2_CONTACT, LP2_DISCLAIMER } from "@/lib/data/lp2";
import { SITE } from "@/lib/data/site";

const TRUSTED_ICONS = [7, 8, 9, 10, 11] as const;

export function Lp2Page() {
  const year = new Date().getFullYear();

  return (
    <div className="lp-root lp2-root">
      <LpInit designCardSliders fancyboxGroup="portfolio Design" />

      <div
        className="mainBanner"
        style={{
          backgroundImage: `url(${lpImage("banner/banner-image.png")})`,
        }}
      >
        <header>
          <div className="main-header fluid-padding">
            <div className="container-fluid">
              <div className="menu-Bar">
                <span />
                <span />
                <span />
              </div>
              <div className="row align-items-center">
                <div className="col-md-5 col-lg-5 text-left">
                  <Link href="/" className="logo" style={{ maxWidth: 500 }}>
                    <Image
                      src={SITE.logoBlack}
                      alt={`${SITE.name} logo`}
                      width={500}
                      height={107}
                      priority
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Link>
                </div>
                <div className="col-lg-7 col-md-7 text-end">
                  <ul className="menu">
                    <li>
                      <LpLiveChatButton
                        iconSrc="chat-icon.svg"
                        label="Live Chat"
                      />
                    </li>
                    <li>
                      <a href={LP2_CONTACT.phoneHref}>
                        <img src={lpImage("call-icon.svg")} alt="" />
                        {LP2_CONTACT.phone}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container-fluid">
          <div className="banner-content padding1">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-8 lp2-hero-copy">
                <h1 className="banner-heading">
                  Build Your Dream Website with Squarespace <br />
                  starting at $199
                </h1>
                <p className="banner-text">
                  Let us help you create a stunning, responsive website <br />
                  that reflects your brand and vision using the Squarespace
                  platform.
                </p>
                <div className="btn-wrap">
                  <LpCtaButton icon>Let&apos;s Get Started</LpCtaButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-1">
        <div className="container-fluid">
          <div className="row fluid-padding">
            <div className="col-lg-9 mx-auto">
              <div className="icon-wrapper justify-content-around">
                <div>
                  <h3>Trusted by Thousands of Clients</h3>
                </div>
                <div>
                  <ul className="trusted-icons">
                    {TRUSTED_ICONS.map((n) => (
                      <li key={n}>
                        <LpPicture base={`trusted/logo-side${n}`} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row align-items-center padding1">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading images-wrap">
                <h3>We&apos;re Trusted Squarespace Partners</h3>
                <p>
                  Launch your online store with confidence! We provide complete
                  e-commerce solutions on Squarespace to help you sell your
                  products quickly.
                </p>
              </div>
              <div className="images-wrap wrap2">
                <LpPicture base="sec1-img1" />
                <LpPicture base="sec1-img2" />
              </div>
            </div>
            <div className="col-lg-6">
              <div
                className="sec1-image"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                <LpPicture base="sec1-img" />
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row portfolio-padding">
            <div className="portfolio-slider">
              {LP_PORTFOLIO_SLIDES.map((n) => (
                <div key={n}>
                  <div className="slide-wrap">
                    <LpPicture base={`portfolio-slide/s${n}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Lp2PortfolioSection />
      <Lp2PricingSection />
      <Lp2TestimonialsSection />

      <section className="sec-4">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2>Our Process to Build Your Squarespace Website</h2>
                <p>
                  We believe in making the web development process as smooth and
                  straightforward as possible. Here is how it works:
                </p>
              </div>
              <div data-aos="fade-right" data-aos-duration="1000">
                {LP_PROCESS_STEPS.map((step) => (
                  <div className="chooseus-card" key={step.title}>
                    <h3>
                      <i className="far fa-arrow-right" />
                      {step.title}
                    </h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="btn-wrap">
                <LpCtaButton className="bg-black text-white" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <LpPicture base="chooseus-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="sec-5">
        <div className="container">
          <div className="row align-items-center mb-lg-5">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2 className="text-white">
                  Explore Our <br /> Squarespace Lab <br /> Services
                </h2>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <p className="text-white">
                  Our full range of Squarespace services ensures your website
                  looks great and performs effectively.
                </p>
              </div>
            </div>
          </div>

          <div className="row gy-lg-4">
            {LP_SERVICES.map((service) => (
              <div className="col-lg-4 col-md-6" key={service.title}>
                <div className="service-card">
                  <LpPicture
                    base={`services/${service.image.replace(/_1x\.webp$/, "")}`}
                  />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </div>
            ))}
            <div className="col-lg-12">
              <div className="btn-wrap justify-content-center">
                <LpCtaButton className="bg-orange" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
              </div>
            </div>
          </div>

          <div className="guarantee-sec">
            <div className="row align-items-center">
              <div
                className="col-lg-6"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <div className="money-back-guarantee">
                  <h3 className="text-white">Money Back Guarantee*</h3>
                  <p className="text-white">
                    We stand by the quality of our Squarespace services and are
                    committed to your satisfaction. That&apos;s why we offer a
                    money-back guarantee. If you&apos;re not completely satisfied
                    with the final product, we&apos;ll work with you to make it
                    right. If we&apos;re unable to meet your expectations,
                    we&apos;ll provide a full refund. Your investment is
                    risk-free, ensuring peace of mind throughout the entire
                    process.
                  </p>
                </div>
                <div className="btn-wrap">
                  <LpCtaButton className="bg-orange" icon>
                    Let&apos;s Get Started
                  </LpCtaButton>
                  <LpLiveChatButton
                    className="theme-btn bordered text-white"
                    iconSrc="chat.svg"
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="guarantee-image">
                  <LpImg path="badge.png" alt="" className="badge-img" />
                  <LpPicture base="money-back-image" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-6">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 text-center">
              <div className="sec6-wrapper">
                <div>
                  <LpPicture base="vector-image1" className="v1" />
                  <LpPicture base="vector-image2" className="v2" />
                </div>
                <div className="sec-heading">
                  <h6>Get a Free Consultation Today</h6>
                  <p>Contact us for a free, no-obligation consultation.</p>
                </div>
                <div className="btn-wrap justify-content-center">
                  <LpCtaButton className="bg-black text-white" icon>
                    Let&apos;s Get Started
                  </LpCtaButton>
                  <LpLiveChatButton
                    className="theme-btn bordered"
                    iconSrc="chat-black.svg"
                  />
                </div>
                <div>
                  <LpPicture base="vector-image3" className="v3" />
                  <LpPicture base="vector-image4" className="v4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-2">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h4 className="text-white">
                  How Does Your Current Website Measure Up?
                </h4>
                <p className="text-white my-5">
                  Is your current website delivering the results you need?
                  Here&apos;s how our Squarespace development services can
                  improve your website&apos;s performance, engagement, and
                  overall effectiveness. See the difference we make in the
                  numbers.
                </p>
              </div>
              <div className="btn-wrap">
                <LpCtaButton icon>Let&apos;s Get Started</LpCtaButton>
                <LpLiveChatButton
                  className="theme-btn bordered text-white"
                  iconSrc="chat.svg"
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="goto">
                    <ul className="counter-wrap" id="counter">
                      {LP_COUNTERS.slice(0, 2).map((c) => (
                        <li
                          key={c.label}
                          data-aos="zoom-in"
                          data-aos-duration={c.duration}
                        >
                          <div className="counter">
                            <div>
                              <div>
                                <span className="count">{c.value}</span>%
                              </div>
                              <p>{c.label}</p>
                              <span className="text">{c.sub}</span>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="goto">
                    <ul className="counter-wrap" id="counter">
                      <li
                        data-aos="zoom-in"
                        data-aos-duration={LP_COUNTERS[2].duration}
                      >
                        <div className="counter">
                          <div>
                            <div>
                              <span className="count">
                                {LP_COUNTERS[2].value}
                              </span>
                              %
                            </div>
                            <p>{LP_COUNTERS[2].label}</p>
                            <span className="text">{LP_COUNTERS[2].sub}</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-8">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2>Frequently Asked Question</h2>
                <p>Got more questions? Call us!</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <ul className="accordion-list">
                {LP_FAQ_LEFT.map((item) => (
                  <li key={item.q}>
                    <span>
                      <h3>{item.q}</h3>
                    </span>
                    <div className="answer" style={{ display: "none" }}>
                      <p>{item.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="accordion-list">
                {LP_FAQ_RIGHT.map((item, i) => (
                  <li key={item.q} className={i === 2 ? "active" : undefined}>
                    <span>
                      <h3>{item.q}</h3>
                    </span>
                    <div className="answer" style={{ display: "none" }}>
                      <p>{item.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-9">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="rating"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <p>
                  With years of experience, we know the ins and outs of
                  Squarespace.
                </p>
              </div>
              <div
                className="advantages"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                {LP_ADVANTAGES.map((adv) => (
                  <div className="adv-card" key={adv.title}>
                    <LpPicture base={adv.image.replace(/_1x\.webp$/, "")} />
                    <h3>{adv.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-5">
              <div className="footer-sec">
                <Link href="/" className="logo" style={{ maxWidth: 700 }}>
                  <Image
                    src={SITE.logoWhite}
                    alt={`${SITE.name} logo`}
                    width={700}
                    height={150}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="f-menu flex-wrap">
                <div>
                  <span>Email Us At</span>
                  <a href={LP2_CONTACT.emailHref}>{LP2_CONTACT.email}</a>
                </div>
                <div>
                  <span> Call us now at</span>
                  <a href={LP2_CONTACT.phoneHref}>{LP2_CONTACT.phone}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <ul className="f-logos">
                <li>
                  <LpImg path="f-logo1.svg" alt="" />
                </li>
                <li>
                  <LpImg path="f-logo2.svg" alt="" />
                </li>
                <li>
                  <LpImg path="f-logo3.svg" alt="" />
                </li>
                <li>
                  <LpImg path="f-logo4.svg" alt="" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright">
                <p>
                  © {year} {LP2_CONTACT.brand}
                </p>
                <ul className="f-link">
                  <li>
                    <Link href="/terms-and-conditions">Terms & Conditions</Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">Privacy Policy</Link>
                  </li>
                </ul>
              </div>
              <div className="copyright border-top">
                <p className="text-center disclaimer">{LP2_DISCLAIMER}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
