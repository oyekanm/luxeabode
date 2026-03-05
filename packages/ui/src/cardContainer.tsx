import React from "react";
import { cn } from "./cn";

interface CardContainerProps {
  title?: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
  className?: string;
  description?: string;
}

export default function CardContainer({
  title,
  children,
  actionButton,
  className,
  description,
}: CardContainerProps) {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E5E5] rounded-4xl p-8 w-full",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 flex-wrap ">
        <div className="space-y-1">
          {title && (
            <h1 className="text-lg lg:text-xl  font-semibold text-neutral-900 ">
              {title}
            </h1>
          )}
          {description && <p className="text-sm xl:text-base font-medium text-neutral-500 ">{description}</p>}
        </div>
        {actionButton}
      </div>

      {children}
    </div>
  );
}
