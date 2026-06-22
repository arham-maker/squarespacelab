import { lpImage } from "@/components/lp/lp-assets";
import {
  LP_LANDING_PORTFOLIO,
  LP_LANDING_PORTFOLIO_ROW1,
  LP_LANDING_PORTFOLIO_ROW2,
} from "@/lib/data/lp-landing";
import { LpCtaButton, LpLiveChatButton } from "@/components/lp/lp-buttons";

const FANCYBOX_GROUP = "portfolio Design";

function PortfolioSlide({ src }: { src: string }) {
  const image = lpImage(`portfolio/${src}`);

  return (
    <li>
      <a data-src={image} data-fancybox={FANCYBOX_GROUP} href={image}>
        <picture>
          <source className="img-fluid" src={image} />
          <img loading="lazy" className="img-fluid" alt="work1" src={image} />
        </picture>
      </a>
    </li>
  );
}

export function LpLandingPortfolioSection() {
  return (
    <section className="sec-7" id="portfolio">
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-right" data-aos-duration="1000">
            <div className="sec-heading">
              <h4 className="text-white">{LP_LANDING_PORTFOLIO.title}</h4>
            </div>
          </div>
          <div
            className="col-lg-5 offset-lg-1"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="sec-heading">
              <p className="text-white">{LP_LANDING_PORTFOLIO.lead}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <ul className="design-card-list">
          {[...LP_LANDING_PORTFOLIO_ROW1, ...LP_LANDING_PORTFOLIO_ROW1].map(
            (src, index) => (
              <PortfolioSlide key={`row1-${src}-${index}`} src={src} />
            )
          )}
        </ul>

        <ul className="design-card-list-2">
          {[...LP_LANDING_PORTFOLIO_ROW2, ...LP_LANDING_PORTFOLIO_ROW2].map(
            (src, index) => (
              <PortfolioSlide key={`row2-${src}-${index}`} src={src} />
            )
          )}
        </ul>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="btn-wrap justify-content-center">
              <LpCtaButton icon>View Pricing &amp; Packages</LpCtaButton>
              <LpLiveChatButton
                className="theme-btn bordered text-white"
                iconSrc="chat.svg"
                label="Book a Free Consultation"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
