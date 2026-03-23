import React from "react";
import ModalWhiteBlurBg from "./modalWhiteBlurBg";
import FunctionalButton from "./functionalButton";

interface ModalProps {
  onClose: () => void;
  deleteFunc: () => void;
  title: string;
  description?: string;
  deleteBtnText?: string;
  isDeleting?: boolean;
}

export default function DeleteWarningModal({
  onClose,
  deleteFunc,
  title,
  description,
  deleteBtnText,
  isDeleting
}: ModalProps) {
  return (
    <ModalWhiteBlurBg
      onClose={onClose}
      className="!gap-[3.2rem] max-w-[58.6rem] "
    >
      <div className="flexcol w-full h-[31.8rem] ">
        <div className="flexcol justify-center text-center !gap-[.8rem] items-center mt-auto">
          <div className="size-[10rem] rounded-full bg-[#FEF2F2] flex items-center justify-center ">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              className="!size-[5.2rem] "
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44.1021 15.6107C37.7223 14.3314 31.2731 13.3579 24.8106 12.7152C20.9795 12.3342 17.1291 12.1467 13.2595 12.1527L9.27386 12.1471"
                stroke="#EF4444"
                stroke-width="2.91667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.1072 11.2525L20.7849 8.76013C21.2773 6.95276 21.6461 5.60207 24.9161 5.92726L29.9855 6.43141C33.2555 6.7566 33.3627 8.23279 33.4759 10.0418L33.6515 12.5995"
                stroke="#EF4444"
                stroke-width="2.91667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M39.3333 21.3139L36.1379 40.6733C35.623 43.6899 35.2141 46.0332 29.8157 45.4963L17.3936 44.261C11.9953 43.7241 12.0559 41.3462 12.1452 38.2873L12.8252 18.6777"
                stroke="#EF4444"
                stroke-width="2.91667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M21.4306 33.9141L27.8738 34.5548"
                stroke="#EF4444"
                stroke-width="2.91667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.5947 26.0137L30.2692 26.9758"
                stroke="#EF4444"
                stroke-width="2.91667"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p className="font-semibold tracking-[-0.02em] text-neutral-900 text-xl max-w-[26.8rem] mx-auto ">
            {title}
          </p>
          <p className="text-base text-neutral-500 flex items-center max-w-[39.6rem] mx-auto ">
            {description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[2rem] w-full">
        <FunctionalButton
          disable={isDeleting}
          click={deleteFunc}
          text={deleteBtnText}
          color="#EF4444"
          className="bg-[#FEF2F2]"
        />
        <FunctionalButton
          text={"Cancel"}
          color="#5B6334"
          className="border-[.1rem] border-[#678346] bg-transparent  hover:bg-transparent "
          click={onClose}
        />
      </div>
    </ModalWhiteBlurBg>
  );
}
