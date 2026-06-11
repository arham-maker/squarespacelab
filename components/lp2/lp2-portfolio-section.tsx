import { lpImage } from "@/components/lp/lp-assets";
import { LP2_PORTFOLIO_ROW1, LP2_PORTFOLIO_ROW2 } from "@/lib/data/lp2";
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

export function Lp2PortfolioSection() {
  return (
    <section className="sec-7">
      <div className="container">
        <div className="row">
          <div className="col-lg-6" data-aos="fade-right" data-aos-duration="1000">
            <div className="sec-heading">
              <h4 className="text-white">See Our Work</h4>
            </div>
          </div>
          <div
            className="col-lg-5 offset-lg-1"
            data-aos="fade-left"
            data-aos-duration="1000"
          >
            <div className="sec-heading">
              <p className="text-white">
                Our portfolio showcases the high-quality Squarespace websites we
                create that not only look great but drive real results.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <ul className="design-card-list">
          {[...LP2_PORTFOLIO_ROW1, ...LP2_PORTFOLIO_ROW1].map((src, index) => (
            <PortfolioSlide key={`row1-${src}-${index}`} src={src} />
          ))}
        </ul>

        <ul className="design-card-list-2">
          {[...LP2_PORTFOLIO_ROW2, ...LP2_PORTFOLIO_ROW2].map((src, index) => (
            <PortfolioSlide key={`row2-${src}-${index}`} src={src} />
          ))}
        </ul>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="btn-wrap justify-content-center">
              <LpCtaButton icon>Let&apos;s Get Started</LpCtaButton>
              <LpLiveChatButton
                className="theme-btn bordered text-white"
                iconSrc="chat.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
