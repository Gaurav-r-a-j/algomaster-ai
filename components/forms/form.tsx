"use client";

import { FormProvider, UseFormReturn, FieldValues } from "react-hook-form";
import { cn } from "@/utils/common/class-names";

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void | Promise<void>;
  children: React.ReactNode;
  className?: string;
}

// Form - Wrapper component that provides form context
// Example: <Form form={form} onSubmit={handleSubmit}><InputField name="email" /></Form>
export function Form<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormProps<T>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}

