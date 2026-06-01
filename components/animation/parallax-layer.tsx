import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ParallaxLayerProps = ComponentPropsWithoutRef<"div"> & {
  children?: ReactNode;
  speed?: number;
  scrub?: number;
};

export function ParallaxLayer({
  children,
  speed = 0.15,
  scrub,
  className,
  ...props
}: ParallaxLayerProps) {
  return (
    <div
      data-parallax-speed={speed}
      data-parallax-scrub={scrub}
      className={`will-change-transform ${className ?? ""}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
