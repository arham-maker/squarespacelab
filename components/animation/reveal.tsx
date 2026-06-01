import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function Reveal({ children, className, y }: RevealProps) {
  return (
    <div
      data-reveal
      data-reveal-y={y}
      className={className}
    >
      {children}
    </div>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
};

export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  y = 48,
}: RevealGroupProps) {
  return (
    <div
      data-reveal-group
      data-reveal-stagger={stagger}
      data-reveal-y={y}
      className={className}
    >
      {children}
    </div>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
};

export function RevealItem({ children, className }: RevealItemProps) {
  return (
    <div data-reveal className={className}>
      {children}
    </div>
  );
}
