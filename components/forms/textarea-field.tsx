"use client";

import { forwardRef } from "react";
import { FormField, FormFieldProps } from "./form-field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/utils/common/class-names";

export interface TextareaFieldProps extends Omit<FormFieldProps, "children"> {
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
  textareaClassName?: string;
}

// TextareaField - Form textarea field with label and error handling
// Example: <TextareaField name="description" label="Description" rows={4} />
export const TextareaField = forwardRef<HTMLDivElement, TextareaFieldProps>(
  (
    {
      name,
      label,
      placeholder,
      required,
      description,
      disabled,
      rows = 4,
      className,
      textareaClassName,
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
          <Textarea
            id={name}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={cn(error && "border-destructive", textareaClassName)}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
          />
        )}
      </FormField>
    );
  }
);

TextareaField.displayName = "TextareaField";
