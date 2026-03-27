/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import InputText from "./inputText";
import { Eye, EyeOff } from "lucide-react";

type Props = {
  field: any;
  placeholder?: string;
};

export default function PasswordInput({ field, placeholder }: Props) {
  const [lockPassword, setLockPassword] = useState(true);

  return (
    <div className="relative">
      <span
        onClick={() => setLockPassword(!lockPassword)}
        className="absolute cursor-pointer right-[1.8rem] top-[1.8rem] h-4 w-4 text-muted-foreground"
      >
        {lockPassword ? (
          <Eye className="!size-8" />
        ) : (
          <EyeOff className="!size-8" />
        )}
      </span>
      <InputText
        placeholder={placeholder || "Enter your password"}
        field={field}
        type={lockPassword ? "password" : "text"}
      />
    </div>
  );
}