// features/onboarding/components/NumberInput.tsx
import { useFormContext } from "react-hook-form";
import { cn } from "./cn";
import { Input } from "./componentsui/input";

interface NumberInputProps {
  name: string; // Form field name
  label?: string; // Optional label
  placeholder?: string; // Optional placeholder
  minLength?: number; // Minimum length (e.g., for BVN)
  maxLength?: number; // Maximum length (e.g., for phone)
  required?: boolean; // Whether the field is required
  className?: string; // Custom Tailwind classes
  field: {
    value: number | string,
    onChange: (value: any) => void,
    onBlur: () => void,
    name: string,
    disabled?: boolean,
  }
  isValueNumber?: boolean
}

const NumberInput = ({
  name,
  placeholder,
  maxLength = Infinity,
  className,
  field,
  isValueNumber = true
}: NumberInputProps) => {
  const { setValue } = useFormContext()


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value)
    // Allow only numbers (replace non-digits with empty string)
    //   const numericValue = value.replace(/[^0-9]/g, "");
    const numericValue = value.replace(/[^\d+\s]/g, "");
    const valueToSet = isValueNumber ? Number(numericValue) : numericValue;

    setValue(field.name || name, valueToSet, { shouldValidate: true });
  }

  field.onChange = handleChange

  // Handle input change to enforce numbers only


  return (
    <Input
      maxLength={maxLength}
      {...field}
      type="text" // Use text input for control
      placeholder={placeholder}
      className={cn(
        "block h-[5.6rem] border-[.1rem] border-[#D4D4D4] py-[1.6rem] px-[1.4rem] text-base font-medium placeholder:text-neutral-400  text-neutral-500 ",
        className,
      )}
    />
  );
};

export default NumberInput;
