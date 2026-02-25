import React from "react";
import { cn } from "./cn";

interface CardContainerProps {
  title?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  className?: string;
}

export default function CardContainer({
  title,
  children,
  actionButton,
  className,
}: CardContainerProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E5E5] rounded-4xl py-4 px-3 w-full",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap ">
        {title && (
          <h1 className="text-xs lg:text-sm  xl:text-[1.6rem] font-medium 2xl:font-semibold text-text-primary">
            {title}
          </h1>
        )}
        {actionButton}
      </div>

      {children}
    </div>
  );
}
