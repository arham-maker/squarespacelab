"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import {
  LP_LANDING_ADVANTAGES,
  LP_LANDING_BOTTOM_BANNER,
  LP_LANDING_CONTACT,
  LP_LANDING_DISCLAIMER,
  LP_LANDING_ECOMMERCE_PACKAGES,
  LP_LANDING_FAQ,
  LP_LANDING_HERO,
  LP_LANDING_INTRO,
  LP_LANDING_MID_BANNER,
  LP_LANDING_OFFERINGS,
  LP_LANDING_PORTFOLIO,
  LP_LANDING_PORTFOLIO_ROW1,
  LP_LANDING_PORTFOLIO_ROW2,
  LP_LANDING_PROCESS,
  LP_LANDING_PROMOTIONAL_PACKAGES,
  LP_LANDING_SERVICES,
  LP_LANDING_TOP_BANNER,
  type LpLandingPackage,
} from "@/lib/data/lp-landing";
import { SITE } from "@/lib/data/site";
import {
  LpCtaButton,
  LpPackageButton,
} from "@/components/lp/lp-buttons";

const WIX = "/lp2w/assets/images";
const LP = "/lp/assets/images";
const LP_PORTFOLIO = `${LP}/portfolio`;

const CHECK_SVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="23"
    viewBox="0 0 22 23"
    fill="none"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.29995 11.6057C3.29958 10.3762 3.59362 9.16454 4.15746 8.07201C4.72131 6.97948 5.53857 6.03785 6.54089 5.32588C7.54321 4.6139 8.70144 4.15229 9.91871 3.97965C11.136 3.80701 12.3769 3.92836 13.5376 4.33355C13.8132 4.42954 14.1156 4.41213 14.3783 4.28516C14.641 4.15818 14.8425 3.93205 14.9385 3.6565C15.0345 3.38096 15.0171 3.07857 14.8901 2.81586C14.7631 2.55315 14.537 2.35164 14.2614 2.25565C12.2345 1.54851 10.0327 1.51937 7.98775 2.17263C5.94282 2.82589 4.16564 4.12614 2.92407 5.87741C1.6825 7.62868 1.04381 9.73608 1.10427 11.882C1.16473 14.0278 1.92107 16.0959 3.25928 17.7745C4.5975 19.4531 6.44507 20.6512 8.52353 21.1883C10.602 21.7254 12.7987 21.5723 14.7826 20.7521C16.7665 19.932 18.43 18.4892 19.5225 16.6412C20.615 14.7933 21.0772 12.6403 20.8394 10.5068C20.8236 10.3632 20.7795 10.2241 20.7099 10.0975C20.6403 9.97096 20.5464 9.85934 20.4336 9.76904C20.3209 9.67875 20.1914 9.61155 20.0527 9.57128C19.9139 9.53101 19.7686 9.51846 19.625 9.53435C19.4815 9.55024 19.3424 9.59426 19.2158 9.66389C19.0893 9.73352 18.9776 9.8274 18.8873 9.94016C18.797 10.0529 18.7298 10.1824 18.6896 10.3211C18.6493 10.4599 18.6368 10.6052 18.6526 10.7488C18.7685 11.7892 18.671 12.8424 18.366 13.8439C18.061 14.8454 17.555 15.7742 16.8789 16.5736C16.2028 17.3729 15.3708 18.026 14.4338 18.4928C13.4967 18.9597 12.4743 19.2306 11.429 19.2889C10.3838 19.3473 9.33755 19.1919 8.35437 18.8322C7.37119 18.4725 6.47169 17.916 5.71084 17.1969C4.94999 16.4778 4.34377 15.6111 3.92925 14.6497C3.51472 13.6884 3.30059 12.6526 3.29995 11.6057ZM19.5249 5.73385C19.7181 5.51505 19.8164 5.22849 19.7982 4.93721C19.7801 4.64593 19.647 4.37379 19.4281 4.18065C19.2093 3.98752 18.9228 3.88922 18.6315 3.90738C18.3402 3.92553 18.0681 4.05865 17.8749 4.27745L10.7964 12.2855L7.29515 9.43315C7.1832 9.34186 7.05436 9.27351 6.91599 9.23201C6.77762 9.1905 6.63244 9.17666 6.48872 9.19127C6.19847 9.22076 5.93183 9.36436 5.74745 9.59045C5.65615 9.70241 5.5878 9.83124 5.5463 9.96961C5.5048 10.108 5.49095 10.2532 5.50556 10.3969C5.53506 10.6871 5.67865 10.9538 5.90475 11.1382L10.2266 14.6582C10.4468 14.8373 10.7277 14.9244 11.0106 14.9012C11.2935 14.8781 11.5565 14.7464 11.7446 14.5339L19.5249 5.73385Z"
      fill="#F7C43A"
    />
  </svg>
);

const CHAT_SVG_WHITE = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="34"
    height="23"
    viewBox="0 0 34 23"
    fill="none"
    aria-hidden
  >
    <path
      d="M29.9762 10.0452H27.2189V5.05227C27.2189 2.3871 25.0762 0.226562 22.4344 0.226562H4.78583C2.14268 0.226562 0 2.3871 0 5.05227V11.8378C0 14.503 2.14268 16.6635 4.78583 16.6635H6.28064L8.82424 19.2283L11.3678 16.6635H15.8206L15.8219 17.6648C15.8219 19.6058 17.3871 21.1842 19.3122 21.1842H25.7521L27.5364 22.9846L29.3206 21.1842H29.9764C31.9014 21.1842 33.4677 19.6059 33.4677 17.6648L33.4664 13.5646C33.4664 11.6249 31.9014 10.0452 29.9762 10.0452ZM7.62813 10.1804C6.67759 10.1804 5.90762 9.40402 5.90762 8.44556C5.90762 7.4871 6.67759 6.71071 7.62813 6.71071C8.57867 6.71071 9.34864 7.4871 9.34864 8.44556C9.34731 9.40402 8.57734 10.1804 7.62813 10.1804ZM19.592 6.71208C20.5425 6.71208 21.3125 7.48847 21.3125 8.44693C21.3125 9.40539 20.5425 10.1818 19.592 10.1818C18.6415 10.1818 17.8715 9.40539 17.8715 8.44693C17.8715 7.48847 18.6415 6.71208 19.592 6.71208ZM13.6099 10.1804C12.6594 10.1804 11.8894 9.40402 11.8894 8.44556C11.8894 7.4871 12.6594 6.71071 13.6099 6.71071C14.5604 6.71071 15.3304 7.4871 15.3304 8.44556C15.3291 9.40268 14.5591 10.1804 13.6099 10.1804ZM32.2699 17.6647C32.2699 18.9404 31.2411 19.9791 29.9746 19.9791H28.8236L27.5345 21.2803L26.2455 19.9791H19.3118C18.0466 19.9791 17.0178 18.9417 17.0178 17.6647V16.6634H17.0164H22.434C25.0759 16.6634 27.2185 14.5028 27.2185 11.839V11.2527H29.9758C31.241 11.2527 32.2712 12.2902 32.2712 13.5645L32.2699 17.6647Z"
      fill="white"
    />
  </svg>
);

const CHAT_SVG_DARK = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="35"
    height="24"
    viewBox="0 0 35 24"
    fill="none"
    aria-hidden
  >
    <path
      d="M30.7424 10.4395H27.985V5.44656C27.985 2.78138 25.8423 0.62085 23.2006 0.62085H5.55194C2.90879 0.62085 0.766113 2.78138 0.766113 5.44656V12.2321C0.766113 14.8973 2.90879 17.0578 5.55194 17.0578H7.04675L9.59036 19.6226L12.134 17.0578H16.5867L16.5881 18.0591C16.5881 20.0001 18.1533 21.5785 20.0784 21.5785H26.5183L28.3025 23.3789L30.0867 21.5785H30.7425C32.6675 21.5785 34.2339 20.0002 34.2339 18.0591L34.2325 13.9588C34.2325 12.0192 32.6675 10.4395 30.7424 10.4395ZM8.39424 10.5747C7.4437 10.5747 6.67373 9.79831 6.67373 8.83985C6.67373 7.88139 7.4437 7.105 8.39424 7.105C9.34478 7.105 10.1148 7.88139 10.1148 8.83985C10.1134 9.79831 9.34345 10.5747 8.39424 10.5747ZM20.3581 7.10637C21.3087 7.10637 22.0786 7.88276 22.0786 8.84122C22.0786 9.79968 21.3087 10.5761 20.3581 10.5761C19.4076 10.5761 18.6376 9.79968 18.6376 8.84122C18.6376 7.88276 19.4076 7.10637 20.3581 7.10637ZM14.376 10.5747C13.4255 10.5747 12.6555 9.79831 12.6555 8.83985C12.6555 7.88139 13.4255 7.105 14.376 7.105C15.3265 7.105 16.0965 7.88139 16.0965 8.83985C16.0952 9.79697 15.3252 10.5747 14.376 10.5747ZM33.036 18.059C33.036 19.3347 32.0072 20.3734 30.7407 20.3734H29.5897L28.3006 21.6746L27.0116 20.3734H20.0779C18.8127 20.3734 17.7839 19.336 17.7839 18.059V17.0577H17.7825H23.2001C25.842 17.0577 27.9846 14.8971 27.9846 12.2333V11.647H30.742C32.0071 11.647 33.0373 12.6844 33.0373 13.9588L33.036 18.059Z"
      fill="#0B0B0B"
    />
  </svg>
);

type PricingTab = "promotional" | "ecommerce";

const PRICING_TABS = [
  {
    id: "promotional" as const,
    label: "Promotional",
    category: "Promotional Website",
    packages: LP_LANDING_PROMOTIONAL_PACKAGES,
    boxClass: "box-1",
  },
  {
    id: "ecommerce" as const,
    label: "E-commerce",
    category: "E-commerce Website",
    packages: LP_LANDING_ECOMMERCE_PACKAGES,
    boxClass: "box-2",
  },
] as const;

/** LP0 client names fitted into the WixProfs testimonial card layout */
const TESTIMONIALS = [
  {
    site: `${WIX}/client/1.webp`,
    avatar: `${WIX}/client/m1.webp`,
    name: "Jake Hanson",
    role: "Business Owner",
    quote:
      "SquarespaceLab made building our site feel easy. They listened, refined every detail, and delivered a site we’re proud to share.",
    badge: `${WIX}/client/g1.webp`,
  },
  {
    site: `${WIX}/client/2.webp`,
    avatar: `${WIX}/client/f1.webp`,
    name: "Winston J.",
    role: "Founder",
    quote:
      "What an exceptional Squarespace site! The team took care of every detail, and the final result was better than we imagined.",
    badge: `${WIX}/client/g2.webp`,
  },
  {
    site: `${WIX}/client/3.webp`,
    avatar: `${WIX}/client/m2.webp`,
    name: "Ethan Oliver",
    role: "Marketing Lead",
    quote:
      "Managing our business online became so much easier after SquarespaceLab launched our site. Clear process, strong design.",
    badge: `${WIX}/client/g3.webp`,
  },
  {
    site: `${WIX}/client/4.webp`,
    avatar: `${WIX}/client/m3.webp`,
    name: "Zephyra Rupert",
    role: "Operations Manager",
    quote:
      "I’m not tech-savvy, but SquarespaceLab made everything stress-free. They explained each step in plain language.",
    badge: `${WIX}/client/g1.webp`,
  },
  {
    site: `${WIX}/client/5.webp`,
    avatar: `${WIX}/client/f2.webp`,
    name: "Sarah Peter",
    role: "Founder",
    quote:
      "Our small business needed a site that felt premium. SquarespaceLab delivered — friendly, fast, and clearly experts.",
    badge: `${WIX}/client/g2.webp`,
  },
];

const ADVANTAGES = LP_LANDING_ADVANTAGES.map((item) => ({
  title: item.title,
  image: `${LP}/${item.image}`,
}));

const TRUSTED_ICONS = [7, 8, 9, 10, 11] as const;

function portfolioSrc(file: string) {
  return `${LP_PORTFOLIO}/${file}`;
}

function PackageCard({
  pkg,
  category,
  popular,
}: {
  pkg: LpLandingPackage;
  category: string;
  popular?: boolean;
}) {
  const amount = pkg.price.replace("$", "");

  return (
    <div>
      <div className={`pckg${popular ? " popular" : ""}`}>
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
            <LpPackageButton
              pkg={pkg}
              category={category}
              className="theme-btn w-100 text-center popdynamic"
            >
              Let&apos;s Get Started
            </LpPackageButton>
          </div>
        </div>
        <div className="bottom">
          <span>
            Features <i className="fas fa-info-circle" />
          </span>
          <ul>
            {pkg.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="btn-wrap">
            <LiveChatLink
              className="theme-btn bordered"
              darkIcon
              label="Chat With Us"
              callLabel="Call Us"
              hideIcon
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeaderChatOrCall() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <a href={SITE.phoneHref} title="Call Us" className="lp-call-btn">
        <i className="fa-regular fa-square-phone" /> Call Us
      </a>
    );
  }

  return (
    <a
      href="javascript:;"
      title="Live Chat"
      onClick={(e) => {
        e.preventDefault();
        window.setButtonURL?.();
      }}
    >
      <i className="fa-regular fa-comment" /> Chat Now
    </a>
  );
}

function useIsMobile(breakpoint = 991) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [breakpoint]);

  return isMobile;
}

function LiveChatLink({
  className,
  darkIcon,
  label = "Live Chat",
  callLabel = "Call Us",
  hideIcon = false,
}: {
  className: string;
  darkIcon?: boolean;
  label?: string;
  callLabel?: string;
  hideIcon?: boolean;
}) {
  const classes = className.trim();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <a
        href={SITE.phoneHref}
        className={`lp-call-btn ${classes}`.trim()}
        title={callLabel}
      >
        {!hideIcon ? (
          <img src="/lp/assets/images/call-icon.svg" alt="" />
        ) : null}
        {callLabel}
      </a>
    );
  }

  return (
    <a
      href="javascript:;"
      className={`open-livechat ${classes}`.trim()}
      title={label}
      onClick={(e) => {
        e.preventDefault();
        if (typeof window.setButtonURL === "function") {
          window.setButtonURL();
        }
      }}
    >
      {!hideIcon ? (darkIcon ? CHAT_SVG_DARK : CHAT_SVG_WHITE) : null}
      {label}
    </a>
  );
}

declare global {
  interface Window {
    setButtonURL?: () => void;
  }
}

export function Lp2WixPage() {
  const [activeTab, setActiveTab] = useState<PricingTab>("promotional");
  const faqLeft = LP_LANDING_FAQ.slice(0, 3);
  const faqRight = LP_LANDING_FAQ.slice(3);
  const year = new Date().getFullYear();

  useEffect(() => {
    let cleaned = false;
    let destroyFancybox: (() => void) | undefined;
    let sliderTimer: number | undefined;

    async function initFancybox() {
      const [{ Fancybox }] = await Promise.all([
        import("@fancyapps/ui"),
        import("@fancyapps/ui/dist/fancybox/fancybox.css"),
      ]);
      if (cleaned) return;
      Fancybox.bind('[data-fancybox="gallery"]', {});
      destroyFancybox = () => Fancybox.destroy();
    }

    function tryInitSliders() {
      const init = (
        window as Window & { initLp2wSliders?: () => void }
      ).initLp2wSliders;
      if (typeof init === "function") {
        init();
        return true;
      }
      return false;
    }

    initFancybox();

    if (!tryInitSliders()) {
      let attempts = 0;
      sliderTimer = window.setInterval(() => {
        attempts += 1;
        if (tryInitSliders() || attempts > 40 || cleaned) {
          window.clearInterval(sliderTimer);
        }
      }, 150);
    }

    return () => {
      cleaned = true;
      destroyFancybox?.();
      if (sliderTimer) window.clearInterval(sliderTimer);
    };
  }, []);

  return (
    <div className="lp-root lp-landing-root">
      <div
        className="mainBanner"
        style={{ backgroundImage: `url(${WIX}/banner/main-banner.webp)` }}
      >
        <header>
          <div className="header-bar">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="head-bar">
                    <p className="text-white">
                      {LP_LANDING_TOP_BANNER.lead}{" "}
                      <span> {LP_LANDING_TOP_BANNER.price} </span>
                    </p>
                    <span className="offprice">
                      <em>{LP_LANDING_TOP_BANNER.compareAt}</em>{" "}
                      {LP_LANDING_TOP_BANNER.savings}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-header">
            <div className="container">
              <div className="menu-Bar">
                <span />
                <span />
                <span />
              </div>
              <div className="row align-items-center">
                <div className="col-md-2 col-lg-2 col-12">
                  <a href="/" className="logo">
                    <img src={SITE.logoWhite} alt={SITE.name} />
                  </a>
                </div>
                <div className="col-lg-10 col-md-10">
                  <div className="menuWrap">
                    <ul className="menu menu-nav">
                      <li>
                        <a href="#process">Process</a>
                      </li>
                      <li>
                        <a href="#pricing">Pricing</a>
                      </li>
                      <li>
                        <a href="#portfolio">Portfolio</a>
                      </li>
                      <li>
                        <a href="#services">Services</a>
                      </li>
                      <li>
                        <a href="#testimonial">Testimonials</a>
                      </li>
                      <li>
                        <a href="#faqs">FAQs</a>
                      </li>
                    </ul>
                    <ul className="menu menu-ctas">
                      <li className="menu-cta">
                        <a href={SITE.phoneHref}>
                          <i className="fa-regular fa-square-phone" />
                          {SITE.phone}
                        </a>
                      </li>
                      <li className="menu-cta menu-cta-chat">
                        <HeaderChatOrCall />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container">
          <div className="banner-content">
            <div className="row align-items-center">
              <div
                className="col-lg-5 col-md-12"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <span className="sub-heading">{LP_LANDING_HERO.eyebrow}</span>
                <h1 className="banner-heading text-white">
                  {LP_LANDING_HERO.title}
                </h1>
                <p className="banner-text text-white">{LP_LANDING_HERO.lead}</p>
                <ul>
                  {LP_LANDING_INTRO.bullets.map((bullet) => (
                    <li key={bullet}>
                      {CHECK_SVG}
                      {bullet}
                    </li>
                  ))}
                </ul>
                <div className="btn-wrap">
                  <LpCtaButton className="btn" icon>
                    Let&apos;s Get Started
                  </LpCtaButton>
                  <LiveChatLink className="theme-btn bordered text-white noborder" />
                </div>
                <p className="banner-text text-white">
                  We&apos;re rated 4.6 out of{" "}
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                  <i className="fa-solid fa-star" />
                </p>
              </div>
              <div className="col-lg-6 offset-lg-1">
                <div className="banner-image">
                  <div className="banner-img-inner">
                    <div className="scroll-image">
                      <div className="ban-image">
                        <img src={`${WIX}/v2.webp`} alt="Scrolling Image" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sec-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="sec-heading center"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h3>Trusted by Thousands of Clients</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="trusted-slider">
            {TRUSTED_ICONS.map((n) => (
              <div key={n}>
                <img
                  src={`${LP}/trusted/logo-side${n}_1x.webp`}
                  alt="trusted"
                  onError={(e) => {
                    e.currentTarget.src = `${WIX}/trusted/${Math.min(n, 11)}.webp`;
                  }}
                />
              </div>
            ))}
            {TRUSTED_ICONS.map((n) => (
              <div key={`dup-${n}`}>
                <img
                  src={`${LP}/trusted/logo-side${n}_1x.webp`}
                  alt="trusted"
                  onError={(e) => {
                    e.currentTarget.src = `${WIX}/trusted/${Math.min(n, 11)}.webp`;
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="sec-intro">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <div className="sec-heading">
                <h2>{LP_LANDING_INTRO.title}</h2>
                <p>{LP_LANDING_INTRO.lead}</p>
              </div>
              <ul className="lp2w-check-list">
                {LP_LANDING_INTRO.bullets.map((bullet) => (
                  <li key={bullet}>
                    {CHECK_SVG}
                    {bullet}
                  </li>
                ))}
              </ul>
              <div className="btn-wrap">
                <LpCtaButton className="btn" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
                <LiveChatLink
                  className="theme-btn bordered noborder"
                  darkIcon
                />
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="zoom-in"
              data-aos-duration="1000"
            >
              <div className="lp2w-intro-visual">
                <img
                  src={`${LP}/sec1-img_1x.webp`}
                  alt="Squarespace design partnership"
                  className="img-fluid lp2w-hand-img"
                  width={376}
                  height={378}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="webdesignSec" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div
                className="sec-heading center"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2>{LP_LANDING_PORTFOLIO.title}</h2>
                <p>{LP_LANDING_PORTFOLIO.lead}</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="design-card-list">
          {LP_LANDING_PORTFOLIO_ROW1.map((file) => {
            const src = portfolioSrc(file);
            return (
              <li key={`row1-${file}`}>
                <a
                  href={src}
                  data-fancybox="gallery"
                  className="portfolio-img"
                >
                  <img src={src} alt="" />
                </a>
              </li>
            );
          })}
        </ul>
        <ul className="design-card-list-2">
          {LP_LANDING_PORTFOLIO_ROW2.map((file) => {
            const src = portfolioSrc(file);
            return (
              <li key={`row2-${file}`}>
                <a
                  href={src}
                  data-fancybox="gallery"
                  className="portfolio-img"
                >
                  <img src={src} alt="" />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="btn-wrap justify-content-center">
                <LpCtaButton className="btn" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
                <LiveChatLink
                  className="theme-btn bordered noborder"
                  darkIcon
                />
              </div>
              <div className="rated d-flex align-items-center justify-content-center">
                <p>We&apos;re rated 4.6 out of 5</p>
                <span>
                  <img
                    src={`${WIX}/green-stars.svg`}
                    alt="green-stars"
                    loading="lazy"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-counter">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="sec-heading"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h2 className="text-white">{LP_LANDING_MID_BANNER.title}</h2>
                <p className="text-white">{LP_LANDING_MID_BANNER.lead}</p>
              </div>
              <div className="btn-wrap">
                <LpCtaButton className="btn" icon>
                  Let&apos;s Get Started
                </LpCtaButton>
                <LiveChatLink className="theme-btn bordered noborder text-white" />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="goto" data-aos="zoom-in" data-aos-duration="1000">
                <ul className="counter-wrap" id="counter">
                  {LP_LANDING_MID_BANNER.stats.map((stat) => {
                    const isRating = stat.value.includes("/");
                    const ratingWhole = isRating
                      ? stat.value.split(".")[0]
                      : null;
                    const ratingRest = isRating
                      ? stat.value.slice(stat.value.indexOf("."))
                      : null;

                    return (
                      <li key={stat.label}>
                        <div className="counter">
                          <div>
                            <div>
                              {isRating ? (
                                <>
                                  <span className="count">{ratingWhole}</span>
                                  {ratingRest}
                                </>
                              ) : (
                                <span className="count">{stat.value}</span>
                              )}
                            </div>
                            <span className="text">{stat.label}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp2w-offerings" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="sec-heading center"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2>Services</h2>
                <p>
                  Design, develop, and grow your brand with a full suite of
                  creative and digital services—built to work together.
                </p>
              </div>
            </div>
          </div>
          <div className="row gy-4">
            {LP_LANDING_OFFERINGS.map((service, index) => (
              <div className="col-lg-4 col-md-6" key={service.title}>
                <a href={service.href} className="lp2w-offering-card">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </a>
              </div>
            ))}
          </div>
          <div className="btn-wrap justify-content-center mt-4">
            <LpCtaButton className="btn" icon>
              Let&apos;s Get Started
            </LpCtaButton>
          </div>
        </div>
      </section>

      <section className="pckg-sec" id="pricing">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="sec-heading center">
                <h2>Our Affordable Packages</h2>
                <p>
                  Choose the best Squarespace web development option tailored to
                  your needs.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul
                className="overview-nav d2"
                data-aos="fade-up"
                data-aos-duration="1200"
              >
                {PRICING_TABS.map((tab, index) => (
                  <li
                    key={tab.id}
                    className={[
                      index === 0 ? "first" : "",
                      index === PRICING_TABS.length - 1 ? "last" : "",
                      activeTab === tab.id ? "active" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    data-targetit={tab.boxClass}
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
              className={`${tab.boxClass} ${
                tab.id === "promotional" ? "showfirst" : ""
              } port-content`}
              style={{ display: activeTab === tab.id ? "block" : "none" }}
            >
              <div className="row">
                <div className="col-lg-12">
                  <div className="pkg-list">
                    {tab.packages.map((pkg, i) => (
                      <PackageCard
                        key={pkg.title}
                        pkg={pkg}
                        category={tab.category}
                        popular={tab.id === "promotional" && i === 0}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="sec-2"
        style={{
          backgroundImage: `url(${WIX}/banner/guarantee-banner.webp)`,
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="sec-heading"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h2 className="text-white">100% Money Back Guarantee*</h2>
                <p className="text-white">
                  We guarantee complete satisfaction with our Squarespace
                  website development services. If we are unable to deliver your
                  store within the agreed time frame, notify us within 15 days
                  and we will issue a full refund. Your trust and satisfaction
                  mean everything to us.
                </p>
              </div>
              <div className="btn-wrap">
                <LpCtaButton className="btn" icon>
                  Hire Squarespace Website Designer
                </LpCtaButton>
                <LiveChatLink className="theme-btn bordered noborder text-white" />
              </div>
            </div>
            <div
              className="col-lg-5 offset-lg-1"
              data-aos="flip-left"
              data-aos-duration="1000"
            >
              <img
                src={`${WIX}/guarantee.webp`}
                alt="guarantee"
                className="dnone"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec-3" id="process">
        <div className="container">
          <div className="row">
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
              {LP_LANDING_PROCESS.map((step, index) => (
                <div className="chooseus-list" key={step.title}>
                  <h3>
                    <span className="lp2w-step-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </h3>
                  <p>{step.text}</p>
                </div>
              ))}
              <div className="btn-wrap">
                <LpCtaButton className="btn" icon>
                  Schedule Your Free Consultation
                </LpCtaButton>
                <LiveChatLink
                  className="theme-btn bordered noborder"
                  darkIcon
                />
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="flip-right"
              data-aos-duration="1000"
            >
              <img
                src={`${LP}/chooseus-image_1x.webp`}
                alt="How we work"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="sec-4" id="explore-services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="sec-heading center"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2 className="text-white">Explore Our Services</h2>
                <p className="text-white">
                  Discover our range of Squarespace services designed to support
                  your business at every step—from setup and optimization to
                  ongoing maintenance.
                </p>
              </div>
            </div>
          </div>
          <div className="row gy-lg-4 mb-lg-5">
            {LP_LANDING_SERVICES.map((service, index) => (
              <div
                className="col-lg-4 col-md-6"
                key={service.title}
                data-aos="fade-up"
                data-aos-duration={String(1000 + index * 100)}
              >
                <div className="service-card">
                  <img
                    src={`${LP}/services/${service.image}`}
                    alt={service.title}
                    onError={(e) => {
                      e.currentTarget.src = `${WIX}/service/${index + 1}.webp`;
                    }}
                  />
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-wrap justify-content-center">
            <LpCtaButton className="btn" icon>
              Schedule Your Free Consultation
            </LpCtaButton>
            <LiveChatLink className="theme-btn bordered noborder text-white" />
          </div>
        </div>
      </section>

      <section className="sec-5" id="testimonial">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="sec-heading center"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <span className="sub-heading">Trusted by 2000+ companies</span>
                <h2>What Our Clients Are Saying</h2>
                <p>
                  We&apos;ve helped businesses across various industries achieve
                  their goals with our Squarespace website development services.
                  Here&apos;s what they have to say about working with us!
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="testi-slider">
                {TESTIMONIALS.map((item) => (
                  <div className="testi-slide" key={item.name}>
                    <img src={item.site} alt="" />
                    <div className="client-detail">
                      <img src={item.avatar} alt="" />
                      <span className="name">{item.name}</span>
                      <span className="des">{item.role}</span>
                      <p>{item.quote}</p>
                      <img src={item.badge} alt="" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-6">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div
                className="sec-heading center lp2w-consult"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2>Detailed Initial Consultation, Free of Cost</h2>
                <p>
                  Unlock the potential of your website with a free, in-depth
                  consultation. We&apos;ll discuss your goals, outline
                  strategies, and answer all your questions, helping you make
                  informed decisions - no strings attached.
                </p>
              </div>
              <div className="btn-wrap justify-content-center mb-5">
                <LpCtaButton className="btn" icon>
                  Hire Squarespace Website Designer
                </LpCtaButton>
                <LiveChatLink className="theme-btn bordered noborder text-white" />
              </div>
              <div
                className="rating"
                data-aos="fade-up"
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
              <div className="advantages">
                {ADVANTAGES.map((item) => (
                  <div className="adv-card" key={item.title}>
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = `${WIX}/adv1.webp`;
                      }}
                    />
                    <h3>{item.title}</h3>
                  </div>
                ))}
              </div>
              <div className="btn-wrap justify-content-center mt-4">
                <LpCtaButton className="btn" icon>
                  Squarespace Designer Near Me
                </LpCtaButton>
                <LiveChatLink className="theme-btn bordered noborder text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec-7" id="faqs">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="sec-heading center"
                data-aos="fade-up"
                data-aos-duration="1000"
              >
                <h2>Frequently Asked Questions</h2>
                <p>
                  Get answers to common questions about our process, pricing,
                  and how our Squarespace designers ensure your website stands
                  out. We&apos;re here to provide clarity and confidence every
                  step of the way.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <ul className="accordion-list">
                {faqLeft.map((item) => (
                  <li key={item.q}>
                    <span>
                      <h3>{item.q}</h3>
                    </span>
                    <div className="answer">
                      <p>{item.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-6">
              <ul className="accordion-list">
                {faqRight.map((item) => (
                  <li key={item.q}>
                    <span>
                      <h3>{item.q}</h3>
                    </span>
                    <div className="answer">
                      <p>{item.a}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="lp2w-bottom-banner">
        <div className="container">
          <div className="sec-heading center">
            <h2 className="text-white">{LP_LANDING_BOTTOM_BANNER.title}</h2>
            <p className="text-white">{LP_LANDING_BOTTOM_BANNER.lead}</p>
          </div>
          <div className="btn-wrap justify-content-center">
            <LpCtaButton className="btn" icon>
              Let&apos;s Get Started
            </LpCtaButton>
            <LiveChatLink className="theme-btn bordered noborder text-white" />
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-5">
              <div className="footer-sec">
                <a href="/" className="logo">
                  <img src={SITE.logoBlack} alt={SITE.name} />
                </a>
              </div>
            </div>
            <div className="col-lg-6 col-md-7">
              <div className="f-menu">
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
            <div className="col-lg-10">
              <ul className="f-logos">
                <li className="first last">
                  <img src={`${WIX}/f-logo1.svg`} alt="" />
                </li>
              </ul>
              <div className="text-center">
                <img src={`${WIX}/footer-trustpilot.svg`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-sec">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="copyright">
                <p>
                  © {year} {LP_LANDING_CONTACT.brand}
                </p>
                <p className="mt-2" style={{ fontSize: 12, opacity: 0.85 }}>
                  {LP_LANDING_DISCLAIMER}
                </p>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <ul className="f-link" style={{ listStyle: "none", padding: 0 }}>
                <li>
                  <a href="/terms-and-conditions">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
              </ul>
              <img src={`${WIX}/visa.svg`} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
