import { LP_ASSETS, LP_SSD_LOGO, LP_TRUSTPILOT_EXCELLENT, lpImage } from "@/components/lp/lp-assets";

export function Lp2TestimonialsSection() {
  return (
    <section className="sec-3 fluid-padding">
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
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Jake Hanson</span>
                    </div>
                    <img src={lpImage("client/f2.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text pad-10">
                    <img
                      src={`${LP_ASSETS}/${encodeURIComponent("Frame 2 (1).png")}`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Winston J.</span>
                    </div>
                    <img src={lpImage("client/f3.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text pad-10">
                    <img src={lpImage("client/ss-txt2.png")} alt="" loading="lazy" />
                  </div>
                  <div className="client">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Ethan Oliver</span>
                    </div>
                    <img src={lpImage("client/f4.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text">
                    <video
                      controls
                      src={lpImage("video-1.mp4")}
                      style={{ width: "100%" }}
                      loop
                      playsInline
                    />
                  </div>
                  <div className="client c2">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                </div>
                <div className="testi-slide">
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Sarah Peter</span>
                    </div>
                    <img src={lpImage("client/f5.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text pad-10">
                    <img src={lpImage("client/ss-txt.png")} alt="" loading="lazy" />
                  </div>
                  <div className="client">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Zephyra Rupert</span>
                    </div>
                    <img src={lpImage("client/f6.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text">
                    <img src={lpImage("client/ss7.png")} alt="" loading="lazy" />
                  </div>
                  <div className="client">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                </div>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Lisa S.</span>
                    </div>
                    <img src={lpImage("client/f7.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text bg">
                    <img src={lpImage("client/whyus-2.png")} alt="" loading="lazy" />
                  </div>
                  <div className="client c2">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom b2">
                    <div className="det">
                      <span className="name">Squarespacedev</span>
                    </div>
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                  <div className="detail-text pad-10">
                    <img
                      src={`${LP_ASSETS}/${encodeURIComponent("Frame 1 (1).png")}`}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className="testi-slide">
                  <div className="bottom">
                    <div className="det">
                      <span className="name">Richard Albert</span>
                    </div>
                    <img src={lpImage("client/f9.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text">
                    <video
                      controls
                      src={lpImage("video-2.mp4")}
                      style={{ width: "100%" }}
                      loop
                      playsInline
                    />
                  </div>
                  <div className="client">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
                  </div>
                </div>
                <div className="testi-slide">
                  <div className="bottom b3">
                    <div className="det">
                      <span className="name">David Paul</span>
                    </div>
                    <img src={lpImage("client/f10.png")} alt="" loading="lazy" />
                  </div>
                  <div className="detail-text pad-10">
                    <img src={lpImage("client/ss-txt3.png")} alt="" loading="lazy" />
                  </div>
                  <div className="client c3">
                    <img src={LP_TRUSTPILOT_EXCELLENT} alt="" className="lp-trustpilot-logo" loading="lazy" />
                    <img src={LP_SSD_LOGO} alt="" className="lp-ssd-logo" loading="lazy" />
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
