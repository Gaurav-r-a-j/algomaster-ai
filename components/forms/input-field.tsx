"use client";

import { forwardRef } from "react";
import { FormField, FormFieldProps } from "./form-field";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/common/class-names";

export interface InputFieldProps extends Omit<FormFieldProps, "children"> {
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

// InputField - Form input field with label and error handling
// Example: <InputField name="email" label="Email" type="email" required />
export const InputField = forwardRef<HTMLDivElement, InputFieldProps>(
  (
    {
      name,
      label,
      type = "text",
      placeholder,
      required,
      description,
      disabled,
      className,
      inputClassName,
    },
    ref
  ) => {
    return (
      <FormField
        ref={ref}
        name={name}
        label={label}
        required={required}
        description={description}
        className={className}
      >
        {({ value, onChange, onBlur, error }) => (
          <Input
            id={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(error && "border-destructive", inputClassName)}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      </FormField>
    );
  }
);

InputField.displayName = "InputField";

