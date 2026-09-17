"use client";

import Link from "next/link";
import Image from "next/image";
import { LpInit } from "@/components/lp/lp-init";
import { LpCtaButton, LpLiveChatButton } from "@/components/lp/lp-buttons";
import { LpPicture, LpImg } from "@/components/lp/lp-picture";
import { LpLandingPortfolioSection } from "@/components/lp/lp-landing-portfolio-section";
import { LpLandingPricingSection } from "@/components/lp/lp-landing-pricing";
import { LpLandingOfferingsSection } from "@/components/lp/lp-landing-offerings-section";
import { LpLandingTestimonialsSection } from "@/components/lp/lp-landing-testimonials";
import { LpBackToTop } from "@/components/lp/lp-back-to-top";
import { lpImage } from "@/components/lp/lp-assets";
import { LP_PORTFOLIO_SLIDES } from "@/lib/data/lp";
import {
  LP_LANDING_ADVANTAGES,
  LP_LANDING_BOTTOM_BANNER,
  LP_LANDING_CONTACT,
  LP_LANDING_DISCLAIMER,
  LP_LANDING_FAQ,
  LP_LANDING_HERO,
  LP_LANDING_INTRO,
  LP_LANDING_MID_BANNER,
  LP_LANDING_PROCESS,
  LP_LANDING_SERVICES,
  LP_LANDING_TOP_BANNER,
} from "@/lib/data/lp-landing";
import { SITE } from "@/lib/data/site";

const TRUSTED_ICONS = [7, 8, 9, 10, 11] as const;

const NAV_LINKS = [
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#faq", label: "FAQs" },
] as const;

export function LpLandingPage() {
  const year = new Date().getFullYear();

  return (
    <div className="lp-root lp-landing-root">
      <LpInit designCardSliders fancyboxGroup="portfolio Design" />

      <div className="lp-top-banner">
        <div className="container">
          <p>
            {LP_LANDING_TOP_BANNER.lead}{" "}
            <strong>{LP_LANDING_TOP_BANNER.price}</strong>{" "}
            <del>{LP_LANDING_TOP_BANNER.compareAt}</del>{" "}
            <span>{LP_LANDING_TOP_BANNER.savings}</span>
          </p>
        </div>
      </div>

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
                <div className="col-md-4 col-lg-3 text-left">
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
                <div className="col-lg-9 col-md-8 text-end">
                  <ul className="menu">
                    {NAV_LINKS.map((link) => (
                      <li key={link.href}>
                        <a href={link.href}>{link.label}</a>
                      </li>
                    ))}
                    <li>
                      <LpLiveChatButton
                        className="theme-btn lp-btn-light"
                        iconSrc="chat-black.svg"
                        label="Live Chat"
                      />
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
              <div className="col-lg-5 col-md-8 lp-landing-hero-copy">
                <span className="lp-hero-eyebrow">{LP_LANDING_HERO.eyebrow}</span>
                <h1 className="banner-heading">{LP_LANDING_HERO.title}</h1>
                <p className="banner-text">{LP_LANDING_HERO.lead}</p>
                <ul className="lp-check-list">
                  {LP_LANDING_INTRO.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
                <div className="btn-wrap">
                  <LpCtaButton className="lp-btn-light" icon>
                    Let&apos;s Get Started
                  </LpCtaButton>
                  <LpLiveChatButton
                    className="theme-btn bordered lp-btn-light-outline"
                    iconSrc="chat-black.svg"
                    label="Live Chat"
                  />
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
                <h3>{LP_LANDING_INTRO.title}</h3>
                <p>{LP_LANDING_INTRO.lead}</p>
              </div>
              <ul className="lp-check-list">
                {LP_LANDING_INTRO.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="btn-wrap">
                <LpCtaButton className="lp-btn-light" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
                <LpLiveChatButton
                  className="theme-btn bordered lp-btn-light-outline"
                  iconSrc="chat-black.svg"
                  label="Live Chat"
                />
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

      <LpLandingPortfolioSection />

      <section className="lp-mid-banner">
        <div className="container">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <div className="sec-heading">
                <h2>{LP_LANDING_MID_BANNER.title}</h2>
                <p>{LP_LANDING_MID_BANNER.lead}</p>
              </div>
              <div className="btn-wrap">
                <LpCtaButton className="lp-btn-light" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
                <LpLiveChatButton
                  className="theme-btn bordered lp-btn-light-outline"
                  iconSrc="chat-black.svg"
                  label="Live Chat"
                />
              </div>
            </div>
            <div className="col-lg-5">
              <ul className="lp-stat-list">
                {LP_LANDING_MID_BANNER.stats.map((stat) => (
                  <li key={stat.label}>
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <LpLandingOfferingsSection />

      <LpLandingPricingSection />

      <section className="sec-4" id="process">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2>How We Work</h2>
                <p>
                  A clear, structured process that keeps you informed at every
                  stage. You&apos;ll always know where your project stands while
                  we fine-tune every detail to match your requirements.
                </p>
              </div>
              <div data-aos="fade-right" data-aos-duration="1000">
                {LP_LANDING_PROCESS.map((step, index) => (
                  <div className="chooseus-card" key={step.title}>
                    <h3>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      {step.title}
                    </h3>
                    <p>{step.text}</p>
                  </div>
                ))}
              </div>
              <div className="btn-wrap">
                <LpCtaButton className="lp-btn-light" icon>
                  Schedule Your Free Consultation
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

      <section className="sec-5" id="squarespace-services">
        <div className="container">
          <div className="row align-items-center mb-lg-5">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2 className="text-white">Explore Our Services</h2>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-left"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <p className="text-white">
                  Discover our range of Squarespace services designed to support
                  your business at every step—from setup and optimization to
                  ongoing maintenance.
                </p>
              </div>
            </div>
          </div>

          <div className="row gy-lg-4">
            {LP_LANDING_SERVICES.map((service) => (
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
                <LpCtaButton className="lp-btn-light" icon>
                  Schedule Your Free Consultation
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
                  <h3 className="text-white">100% Money Back Guarantee*</h3>
                  <p className="text-white">
                    We guarantee complete satisfaction with our Squarespace
                    website development services. If we are unable to deliver
                    your store within the agreed time frame, notify us within 15
                    days and we will issue a full refund.
                  </p>
                </div>
                <div className="btn-wrap">
                  <LpCtaButton className="lp-btn-light" icon>
                    Hire Squarespace Website Designer
                  </LpCtaButton>
                  <LpLiveChatButton
                    className="theme-btn bordered text-white"
                    iconSrc="chat.svg"
                    label="Live Chat"
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

      <LpLandingTestimonialsSection />

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
                  <h6>Detailed Initial Consultation, Free of Cost</h6>
                  <p>
                    Unlock the potential of your website with a free, in-depth
                    consultation. We&apos;ll discuss your goals, outline
                    strategies, and answer all your questions, helping you make
                    informed decisions - no strings attached.
                  </p>
                </div>
                <div className="btn-wrap justify-content-center">
                  <LpCtaButton className="lp-btn-light" icon>
                    Hire Squarespace Website Designer
                  </LpCtaButton>
                  <LpLiveChatButton
                    className="theme-btn bordered lp-btn-light-outline"
                    iconSrc="chat-black.svg"
                    label="Live Chat"
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

      <section className="sec-8" id="faq">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2>Frequently Asked Questions</h2>
                <p>
                  Get answers to common questions about our process, pricing,
                  and how our Squarespace designers ensure your website stands
                  out. We&apos;re here to provide clarity and confidence every
                  step of the way.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <ul className="accordion-list">
                {LP_LANDING_FAQ.slice(0, 3).map((item) => (
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
                {LP_LANDING_FAQ.slice(3).map((item) => (
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
                  Your Squarespace Website, Delivered to Your Liking
                  <span>
                    With years of experience building and designing experiences
                    that attract and convert, we know exactly what goes into a
                    Squarespace website, and what does not.
                  </span>
                </p>
              </div>
              <div
                className="advantages"
                data-aos="zoom-in"
                data-aos-duration="1000"
              >
                {LP_LANDING_ADVANTAGES.map((adv) => (
                  <div className="adv-card" key={adv.title}>
                    <LpPicture base={adv.image.replace(/_1x\.webp$/, "")} />
                    <h3>{adv.title}</h3>
                  </div>
                ))}
              </div>
              <div className="btn-wrap justify-content-center mt-4">
                <LpCtaButton className="lp-btn-light" icon>
                  Squarespace Designer Near Me
                </LpCtaButton>
                <LpLiveChatButton
                  className="theme-btn bordered lp-btn-light-outline"
                  iconSrc="chat-black.svg"
                  label="Live Chat"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="lp-bottom-banner">
        <div className="container">
          <div className="lp-bottom-banner__inner">
            <div className="sec-heading">
              <h2>{LP_LANDING_BOTTOM_BANNER.title}</h2>
              <p>{LP_LANDING_BOTTOM_BANNER.lead}</p>
            </div>
            <div className="btn-wrap justify-content-center">
              <LpCtaButton className="lp-btn-light" icon>
                Let&apos;s Get Started
              </LpCtaButton>
              <LpLiveChatButton
                className="theme-btn bordered lp-btn-light-outline"
                iconSrc="chat-black.svg"
                label="Live Chat"
              />
            </div>
          </div>
        </div>
      </section>

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
                  <a href={LP_LANDING_CONTACT.emailHref}>
                    {LP_LANDING_CONTACT.email}
                  </a>
                </div>
                <div>
                  <span> Call us now at</span>
                  <a href={LP_LANDING_CONTACT.phoneHref}>
                    {LP_LANDING_CONTACT.phone}
                  </a>
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
                  © {year} {LP_LANDING_CONTACT.brand}
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
                <p className="text-center disclaimer">{LP_LANDING_DISCLAIMER}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LpBackToTop />
    </div>
  );
}
