"use client"

import { forwardRef } from "react"
import { cn } from "@/utils/common/class-names"
import { Controller, useFormContext } from "react-hook-form"

import { Label } from "@/components/ui/label"
import { ErrorMessage } from "@/components/common/error-message"

export interface FormFieldProps {
  name: string
  label?: string
  required?: boolean
  description?: string
  className?: string
  children: (field: {
    value: unknown
    onChange: (value: unknown) => void
    onBlur: () => void
    name: string
    error?: string
  }) => React.ReactElement
}

// FormField - Base form field component with label and error handling
// Integrates with react-hook-form
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ name, label, required, description, className, children }, ref) => {
    const {
      control,
      formState: { errors },
    } = useFormContext()

    const error = errors[name]?.message as string | undefined

    return (
      <div ref={ref} className={cn("space-y-2", className)}>
        {label && (
          <Label htmlFor={name}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
        )}
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        <Controller
          name={name}
          control={control}
          render={({ field }) =>
            children({
              ...field,
              value: field.value ?? "",
              error,
            })
          }
        />
        {error && <ErrorMessage message={error} />}
      </div>
    )
  }
)

FormField.displayName = "FormField"
