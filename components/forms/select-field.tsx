"use client"

import { forwardRef } from "react"
import { cn } from "@/utils/common/class-names"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { FormField, FormFieldProps } from "./form-field"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectFieldProps extends Omit<FormFieldProps, "children"> {
  options: SelectOption[]
  placeholder?: string
  disabled?: boolean
  className?: string
  selectClassName?: string
}

// SelectField - Form select dropdown with label and error handling
// Example: <SelectField name="country" label="Country" options={[...]} />
export const SelectField = forwardRef<HTMLDivElement, SelectFieldProps>(
  (
    {
      name,
      label,
      options,
      placeholder = "Select an option",
      required,
      description,
      disabled,
      className,
      selectClassName,
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
        {({ value, onChange, error }) => (
          <Select
            value={value as string}
            onValueChange={onChange}
            disabled={disabled}
          >
            <SelectTrigger
              id={name}
              className={cn(error && "border-destructive", selectClassName)}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </FormField>
    )
  }
)

SelectField.displayName = "SelectField"
