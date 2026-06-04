"use client";

import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, MouseEvent } from "react";
import { useLeadForm } from "@/components/providers/lead-form-provider";

type CtaButtonBaseProps = {
  className?: string;
  children?: React.ReactNode;
  opensLeadForm?: boolean;
};

type CtaButtonLinkProps = CtaButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CtaButtonBaseProps> & {
    opensLeadForm?: false;
    href: string;
  };

type CtaButtonModalProps = CtaButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CtaButtonBaseProps> & {
    opensLeadForm: true;
    href?: never;
  };

type CtaButtonProps = CtaButtonLinkProps | CtaButtonModalProps;

function getButtonClasses(className?: string) {
  return className && /\bbtn\b/.test(className)
    ? className
    : ["btn btn-primary", className].filter(Boolean).join(" ");
}

export function CtaButton(props: CtaButtonProps) {
  const { className, children, opensLeadForm, onClick, ...rest } = props;
  const { openLeadForm } = useLeadForm();
  const classes = getButtonClasses(className);

  if (opensLeadForm) {
    const buttonProps = rest as Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      "type" | "onClick"
    >;

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
      (onClick as ButtonHTMLAttributes<HTMLButtonElement>["onClick"])?.(event);
      openLeadForm();
    };

    return (
      <button
        type="button"
        className={classes}
        onClick={handleOpen}
        {...buttonProps}
      >
        {children}
      </button>
    );
  }

  const { href, ...anchorProps } = rest as ComponentPropsWithoutRef<"a">;

  return (
    <a className={classes} href={href} onClick={onClick} {...anchorProps}>
      {children}
    </a>
  );
}
