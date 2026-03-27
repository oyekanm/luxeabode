import React, { HTMLProps } from "react";
import { cn } from "./cn";
import { Button } from "./componentsui/button";

type Props = {
  text?: string;
  children?: React.ReactNode;
  click?: () => void;
  disable?: boolean;
  type?: "button" | "reset" | "submit";
  variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary";
  className?: HTMLProps<HTMLElement>["className"];
  asChild?: boolean;
  size?:
  | "default"
  | "sm"
  | "xs"
  | "lg"
  | "icon"
  | "icon-xs"
  | "icon-sm"
  | "icon-lg"
  | null;
};

export default function FunctionalButton({
  text,
  children,
  click,
  type = "submit",
  disable,
  className,
  asChild = false,
  variant = "default",
  size = "default",
}: Props) {
  // console.log(disable)
  return (
    <Button
      onClick={click}
      type={type}
      disabled={disable}
      className={cn(
        `cursor-pointer font-semibold text-base w-fit h-[4.8rem] radius-[.8rem] p-[1.6rem] px-[2.4rem]   ${disable ? "bg-[#EFEFEB] text-primary" : ""
        }`,
        className,
      )}
      asChild={asChild}
      variant={variant}
      size={size}
    >
      {children ? children : text}
    </Button>
  );
}
