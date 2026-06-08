import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";

export function HeroSection() {
  return (
    <section
      id="hero"
      data-hero-section
      className="home-hero relative flex min-h-0 flex-1 flex-col justify-center"
    >
      <Container className="home-hero__container py-6 sm:py-8 lg:py-10">
        <div
          data-hero-fg
          className="home-hero__text flex flex-col items-start will-change-transform"
        >
          <h1 className="home-hero__title text-display-hero text-black">
            <span className="block">
              <span>Start </span>
              <span className="home-hero__title-light">Selling</span>
            </span>
            <span className="block">Today!</span>
          </h1>
          <p className="home-hero__desc text-body mt-5 text-black sm:mt-6">
            Our experts provide customizable e-commerce solutions, ensuring a
            smooth shopping experience for your customers.
          </p>
          <div className="home-hero__cta mt-6 sm:mt-0">
            <CtaButton opensLeadForm className="w-full max-w-sm sm:w-auto">
              Get started
            </CtaButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
