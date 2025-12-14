# Form Components

Reusable form components with react-hook-form integration.

## InputField

Text input field with label and error handling.

**Props:**

- `name`: string (required)
- `label`: string
- `type`: "text" | "email" | "password" | "number" | "tel" | "url"
- `required`: boolean
- `placeholder`: string
- `disabled`: boolean

**Usage:**

```tsx
import { InputField } from "@/components/forms"

;<InputField
  name="email"
  label="Email"
  type="email"
  required
  placeholder="Enter your email"
/>
```

## TextareaField

Textarea field with label and error handling.

**Props:**

- `name`: string (required)
- `label`: string
- `rows`: number (default: 4)
- `required`: boolean
- `placeholder`: string

**Usage:**

```tsx
import { TextareaField } from "@/components/forms"

;<TextareaField
  name="message"
  label="Message"
  rows={6}
  placeholder="Enter your message"
/>
```

## SelectField

Select dropdown with label and error handling.

**Props:**

- `name`: string (required)
- `label`: string
- `options`: Array<{ value: string; label: string }> (required)
- `required`: boolean
- `placeholder`: string

**Usage:**

```tsx
import { SelectField } from "@/components/forms"

;<SelectField
  name="country"
  label="Country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
  required
/>
```

## Form

Wrapper component that provides form context.

**Usage:**

```tsx
import { useForm } from "react-hook-form"

import { Form, InputField } from "@/components/forms"

const form = useForm({
  defaultValues: { email: "" },
})

;<Form form={form} onSubmit={handleSubmit}>
  <InputField name="email" label="Email" />
  <Button type="submit">Submit</Button>
</Form>
```
