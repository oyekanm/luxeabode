import { X } from "lucide-react";
import React from "react";
import { cn } from "./cn";

interface ModalBgProps {
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
  noClose?: boolean;
}

export default function ModalBg(props: ModalBgProps) {
  const { onClose, className, children, noClose = false } = props;
  return (
    <div className="fixed flex justify-center items-center bg-[#ffff7] z-60 backdrop-blur-[1rem] bottom-0 left-0 right-0 top-0 h-full animate-in fade-in-0 duration-300 ease-in-out">
      <div
        className={cn(
          "relative overflow-auto max-w-[66.8rem] flexcol gap-[2.6rem]  p-[2.4rem] py-[3rem] items-center  w-[90%] mx-auto  bg-white rounded-[2.4rem] shadow-[0_0_2rem_.4rem_#00000052] animate-in fade-in-0 zoom-in-95 duration-300 ease-in-out delay-75",
          className
        )}
      >
        {!noClose && (
          <X
            onClick={onClose}
            className="p-2 !size-12 sm:!size-16 border border-neutral-200 cursor-pointer rounded-[.6rem] absolute right-8 top-12"
          />
        )}
        {children}
      </div>
    </div>
  );
}
