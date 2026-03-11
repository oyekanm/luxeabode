import React from "react";
import { FormLabel } from "./componentsui/form";

export default function InputLabel({ title, required }: { title: string, required?: boolean }) {
  return <FormLabel className="text-base font-medium text-neutral-700">{title} {required && <span className="text-red-500">*</span>}</FormLabel>;
}
