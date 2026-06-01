import type { ElementType, ReactNode } from "react";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
};

export function Container({ as: Component = "div", children, className }: ContainerProps) {
  const classes = ["container-main", className].filter(Boolean).join(" ");

  return <Component className={classes}>{children}</Component>;
}
