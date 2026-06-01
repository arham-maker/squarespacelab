import type { ComponentPropsWithoutRef } from "react";

type CtaButtonProps = ComponentPropsWithoutRef<"a">;

export function CtaButton({ className, children, ...props }: CtaButtonProps) {
  const classes = ["btn btn-primary", className].filter(Boolean).join(" ");

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  );
}
