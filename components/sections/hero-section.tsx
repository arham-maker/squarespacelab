import { Container } from "@/components/layout/container";
import { CtaButton } from "@/components/ui/cta-button";

export function HeroSection() {
  return (
    <section
      id="hero"
      data-hero-section
      className="relative flex min-h-0 flex-1 flex-col justify-center"
    >
      <Container className="grid items-center py-6 sm:py-8 lg:grid-cols-2 lg:gap-12 lg:py-10">
        <div
          data-hero-fg
          className="flex flex-col items-start will-change-transform lg:max-w-xl"
        >
          <h1 className="text-display-hero text-black">
            <span className="block">
              <span>Start </span>
              <span className="font-light">Selling</span>
            </span>
            <span className="block">Today!</span>
          </h1>
          <p className="text-body mt-5 max-w-md text-black sm:mt-6 lg:max-w-sm">
            Our experts provide customizable e-commerce solutions, ensuring a
            smooth shopping experience for your customers.
          </p>
          <CtaButton
            opensLeadForm
            className="mt-6 w-full max-w-sm sm:mt-8 sm:w-auto"
          >
            Get Started
          </CtaButton>
        </div>
        <div className="hidden lg:block" aria-hidden />
      </Container>
    </section>
  );
}
