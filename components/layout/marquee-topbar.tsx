const MARQUEE_SEGMENTS = [
  "SquarespaceLab is an independent company that provides design and development services for e-commerce solutions.",
  "We are not in any way officially connected with Squarespace Inc., or any of its subsidiaries or affiliates.",
  'The name "Squarespace" as well as related names, marks, emblems, and images are registered trademarks of their respective owners.',
] as const;

const FULL_DISCLAIMER = MARQUEE_SEGMENTS.join(" ");

function MarqueeContent({ copy }: { copy: number }) {
  return (
    <div className="marquee-topbar__group" aria-hidden>
      {MARQUEE_SEGMENTS.map((text, index) => (
        <p
          key={`${copy}-${index}`}
          className="marquee-topbar__segment font-normal uppercase"
        >
          {text}
        </p>
      ))}
    </div>
  );
}

export function MarqueeTopbar() {
  return (
    <div className="marquee-topbar" role="region" aria-label="Legal disclaimer">
      <p className="sr-only">{FULL_DISCLAIMER}</p>
      <div className="marquee-topbar__viewport">
        <div className="marquee-topbar__track">
          <MarqueeContent copy={0} />
          <MarqueeContent copy={1} />
        </div>
      </div>
    </div>
  );
}
