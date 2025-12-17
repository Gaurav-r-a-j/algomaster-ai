# Form Components Guide

This document explains how to use the reusable form components that integrate with `react-hook-form`.

## Overview

All form components are built on top of `react-hook-form` and `shadcn/ui` components, providing:

- Automatic label and error handling
- Consistent styling
- Type-safe form handling
- Built-in validation display

## Installation

Form components require:

- `react-hook-form`
- `@hookform/resolvers` (for Zod validation)
- `zod` (for schema validation)

## Basic Usage

### 1. Setup Form with Schema

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  InputField,
  SelectField,
  TextareaField,
} from "@/components/forms"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  country: z.string().min(1, "Please select a country"),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

function MyForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      name: "",
      country: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
    // Handle form submission
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <InputField
        name="email"
        label="Email"
        type="email"
        required
        placeholder="Enter your email"
      />

      <InputField
        name="name"
        label="Name"
        required
        placeholder="Enter your name"
      />

      <SelectField
        name="country"
        label="Country"
        required
        placeholder="Select a country"
        options={[
          { value: "us", label: "United States" },
          { value: "uk", label: "United Kingdom" },
        ]}
      />

      <TextareaField
        name="message"
        label="Message"
        placeholder="Enter your message"
        rows={4}
      />

      <Button type="submit">Submit</Button>
    </Form>
  )
}
```

## Available Components

### Form

Wrapper component that provides form context.

```tsx
<Form form={form} onSubmit={handleSubmit}>
  {/* Form fields */}
</Form>
```

### InputField

Text input field with label and error handling.

**Props:**

- `name` (required) - Field name
- `label` - Label text
- `type` - Input type (text, email, password, number, tel, url)
- `required` - Show required indicator
- `description` - Helper text below label
- `placeholder` - Placeholder text
- `disabled` - Disable input
- `className` - Container className
- `inputClassName` - Input className

```tsx
<InputField
  name="email"
  label="Email"
  type="email"
  required
  placeholder="Enter your email"
/>
```

### TextareaField

Textarea field with label and error handling.

**Props:**

- `name` (required) - Field name
- `label` - Label text
- `required` - Show required indicator
- `description` - Helper text
- `placeholder` - Placeholder text
- `rows` - Number of rows (default: 4)
- `disabled` - Disable textarea

```tsx
<TextareaField
  name="description"
  label="Description"
  placeholder="Enter description"
  rows={6}
/>
```

### SelectField

Select dropdown with label and error handling.

**Props:**

- `name` (required) - Field name
- `label` - Label text
- `options` (required) - Array of `{ value: string, label: string }`
- `required` - Show required indicator
- `placeholder` - Placeholder text
- `disabled` - Disable select

```tsx
<SelectField
  name="role"
  label="Role"
  required
  placeholder="Select a role"
  options={[
    { value: "admin", label: "Administrator" },
    { value: "user", label: "User" },
  ]}
/>
```

### FormField

Base form field component for custom implementations.

```tsx
<FormField name="custom" label="Custom Field">
  {({ value, onChange, onBlur, error }) => (
    <YourCustomInput value={value} onChange={onChange} onBlur={onBlur} />
  )}
</FormField>
```

## Validation

Use Zod schemas with `zodResolver`:

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  age: z.number().min(18, "Must be 18 or older"),
})

const form = useForm({
  resolver: zodResolver(schema),
})
```

## Advanced Usage

### Custom Validation Messages

```tsx
const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
})
```

### Conditional Fields

```tsx
const watchType = form.watch("type")

{
  watchType === "custom" && (
    <InputField name="customValue" label="Custom Value" required />
  )
}
```

### Async Validation

```tsx
const form = useForm({
  resolver: zodResolver(schema),
  mode: "onBlur", // Validate on blur
})
```

## Best Practices

1. **Always use Form wrapper** - Provides form context
2. **Use Zod schemas** - Type-safe validation
3. **Provide helpful error messages** - Clear validation feedback
4. **Use required prop** - Shows required indicator
5. **Add descriptions** - Help users understand fields
6. **Handle loading states** - Disable form during submission

---

**Last Updated**: Form components setup
**Maintained By**: Development Team
