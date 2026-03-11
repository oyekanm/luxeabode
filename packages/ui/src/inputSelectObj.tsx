/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./componentsui/select";
import InputText from "./inputText";
import { cn } from "./cn";

interface SelectProp {
    field: any;
    text: string;
    options?: { value: string; label: string }[];
    disabled?: boolean;
    className?: string;
}

export default function InputSelectObj({
    field,
    text,
    options = [],
    disabled = false,
    className,
}: SelectProp) {
    const [searchValue, setSearchValue] = useState("");
    const filteredOption = useRef(options);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, e.target);
        filteredOption.current = filteredOption.current.filter((opt) =>
            opt.label.includes(e.target.value),
        );
        setSearchValue(e.target.value);
    };
    return (
        <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
        >
            <SelectTrigger
                className={cn("h-20!", disabled ? "bg-gray-100 cursor-not-allowed" : "", className)}
            >
                <SelectValue placeholder={text} />
            </SelectTrigger>
            <SelectContent className="p-[.6rem] 2xl:p-[1.6rem] pt-[1rem] rounded-[1.6rem] ">
                {/* <div className="fixed top-2 left-4 right-4 ">
          <InputText
            placeholder="search"
            className="h-[3.5rem]"
            field={{ value: searchValue, onChange: onChange }}
          />
        </div> */}
                <div>
                    {options?.map((data) => (
                        <SelectItem
                            className="capitalize cursor-pointer py-[1.6rem] border-b border-[#F5F5F5] text-[1.6rem] font-medium leading-[2.4rem] "
                            key={data.value}
                            value={data.value}
                        >
                            {data.label}
                        </SelectItem>
                    ))}
                </div>
            </SelectContent>
        </Select>
    );
}