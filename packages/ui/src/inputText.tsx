import { Input } from "@/componentsui/input";
import { cn } from "@/cn";

type InputTextProps = {
  type?: string;
  field: any;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
};

export default function InputText({
  field,
  type = "text",
  placeholder,
  readOnly = false,
  disabled = false,
  className,
}: InputTextProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      {...field}
      readOnly={readOnly}
      disabled={disabled}
      // name="email"
      className={cn(
        "block h-[5.6rem] border-[.1rem] border-[#D4D4D4] radius-sm py-[1.6rem] px-[1.4rem] !text-[1.6rem] !leading-[2.4rem] placeholder:!text-neutral-400 !text-[#171717",
        className,
      )}
    />
  );
}
