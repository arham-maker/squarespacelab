import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkVariant = "primary" | "secondary";

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-dark-accent text-white hover:opacity-90",
  secondary:
    "border border-secondary-neutral bg-white text-black hover:bg-primary-light",
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ButtonLinkProps) {
  const classes = [
    "btn inline-flex items-center justify-center rounded-full transition-colors",
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <a className={classes} {...props} />;
}
