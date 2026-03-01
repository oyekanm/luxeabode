import React from "react";
import { Textarea } from "./componentsui/textarea";

type InputTextProps = {
  type?: string;
  field: any;
  placeholder?: string;
  readOnly?: boolean;
};

export default function InputTextArea({
  field,
  type = "text",
  placeholder,
  readOnly = false,
}: InputTextProps) {
  return (
    <Textarea
      type={type}
      placeholder={placeholder}
      {...field}
      readOnly={readOnly}
      // name="email"
      className="block h-40 resize-none border-[.1rem] border-[#D4D4D4] radius-sm py-[1.6rem] px-[1.4rem] text-base font-medium placeholder:text-neutral-400  text-neutral-500 "
    />
  );
}
