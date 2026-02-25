import React from "react";
import { FormLabel } from "@/componentsui/form";

export default function InputLabel({ title }: { title: string }) {
  return <FormLabel className="text-sm text-neutral-700">{title}</FormLabel>;
}
