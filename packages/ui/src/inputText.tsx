import { cn } from "./cn";
import { Input } from "./componentsui/input";

type InputTextProps = {
  type?: string;
  field: any;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  className?: string;
  checked?: boolean
};

export default function InputText({
  field,
  type = "text",
  placeholder,
  readOnly = false,
  disabled = false,
  className,
  checked
}: InputTextProps) {
  return (
    <Input
      type={type}
      placeholder={placeholder}
      {...field}
      readOnly={readOnly}
      disabled={disabled}
      checked={checked}
      // name="email"
      className={cn(
        "block h-[5.6rem] border-[.1rem] border-[#D4D4D4] py-[1.6rem] px-[1.4rem] text-base font-medium placeholder:text-neutral-400  text-neutral-500 ",
        className,
      )}
    />
  );
}
