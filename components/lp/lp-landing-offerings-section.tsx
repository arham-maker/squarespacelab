import Link from "next/link";
import { LP_LANDING_OFFERINGS } from "@/lib/data/lp-landing";
import { LpCtaButton } from "@/components/lp/lp-buttons";

export function LpLandingOfferingsSection() {
  return (
    <section className="lp-offerings" id="services">
      <div className="container">
        <div className="row mb-4">
          <div className="col-lg-8 mx-auto text-center">
            <div className="sec-heading center">
              <h2>Services</h2>
              <p>
                Design, develop, and grow your brand with a full suite of
                creative and digital services—built to work together.
              </p>
            </div>
          </div>
        </div>

        <div className="lp-offerings-grid">
          {LP_LANDING_OFFERINGS.map((service, index) => (
            <Link
              key={service.title}
              href={service.href}
              className="lp-offering-card"
            >
              <span className="lp-offering-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <span className="lp-offering-link">Learn more →</span>
            </Link>
          ))}
        </div>

        <div className="btn-wrap justify-content-center mt-4">
          <LpCtaButton className="lp-btn-light" icon>
            Let&apos;s Get Started
          </LpCtaButton>
        </div>
      </div>
    </section>
  );
}
