import { LpImg } from "@/components/lp/lp-picture";

export function LpTestimonialsSection() {
  return (
    <section className="sec-3 fluid-padding" id="testimonials">
      <div className="container-fluid">
        <div className="row align-items-center mb-lg-5">
          <div className="col-lg-6" data-aos="fade-right" data-aos-duration="1000">
            <div className="sec-heading">
              <span>Trusted by 2000+ companies</span>
              <h2>What Our Clients Are Saying</h2>
            </div>
          </div>
          <div className="col-lg-6" data-aos="fade-left" data-aos-duration="1000">
            <div className="sec-heading">
              <p>
                We&apos;ve helped businesses across various industries achieve their
                goals with our Squarespace website development services.
                Here&apos;s what they have to say about working with us!
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <ul className="testimonial-wrapper">
              <li>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Mark J.</span>
                    </div>
                    <LpImg path="client/f3.png" alt="" />
                  </div>
                  <div className="detail-text pad-10">
                    <LpImg path="client/ss-txt2.png" alt="" />
                  </div>
                  <div className="client c2">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Emily R.</span>
                    </div>
                    <LpImg path="client/f4.png" alt="" />
                  </div>
                  <div className="detail-text">
                    <LpImg path="client/ss6.png" alt="" />
                  </div>
                  <div className="client c2">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
                <div className="testi-slide">
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Sarah Peter</span>
                    </div>
                    <LpImg path="client/f5.png" alt="" />
                  </div>
                  <div className="detail-text pad-10">
                    <LpImg path="client/ss-txt.png" alt="" />
                  </div>
                  <div className="client">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Jack Smith</span>
                    </div>
                    <LpImg path="client/f6.png" alt="" />
                  </div>
                  <div className="detail-text">
                    <LpImg path="client/ss7.png" alt="" />
                  </div>
                  <div className="client">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Lisa S.</span>
                    </div>
                    <LpImg path="client/f7.png" alt="" />
                  </div>
                  <div className="detail-text bg">
                    <LpImg path="client/whyus-2.png" alt="" />
                  </div>
                  <div className="client c2">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Justine Gab</span>
                    </div>
                    <LpImg path="client/f9.png" alt="" />
                  </div>
                  <div className="detail-text">
                    <LpImg path="client/ss8.png" alt="" />
                  </div>
                  <div className="client">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom b3">
                    <div className="det">
                      <span className="name">David Paul</span>
                    </div>
                    <LpImg path="client/f10.png" alt="" />
                  </div>
                  <div className="detail-text pad-10">
                    <LpImg path="client/ss-txt3.png" alt="" />
                  </div>
                  <div className="client c3">
                    <LpImg path="trustpilot.svg" alt="" />
                    <LpImg path="client/company-logo.png" alt="" />
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
