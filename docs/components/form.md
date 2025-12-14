# Form

Wrapper component that provides form context for react-hook-form.

## Usage

```tsx
import { useForm } from "react-hook-form"

import { Form } from "@/components/forms"

const form = useForm({
  defaultValues: { email: "" },
})

;<Form form={form} onSubmit={handleSubmit}>
  <InputField name="email" label="Email" />
  <Button type="submit">Submit</Button>
</Form>
```

## Props

| Prop        | Type                                 | Default | Description                         |
| ----------- | ------------------------------------ | ------- | ----------------------------------- |
| `form`      | `UseFormReturn<T>`                   | -       | react-hook-form instance (required) |
| `onSubmit`  | `(data: T) => void \| Promise<void>` | -       | Submit handler (required)           |
| `className` | `string`                             | -       | Additional CSS classes              |
| `children`  | `ReactNode`                          | -       | Form fields and submit button       |

## Example

```tsx
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Form, InputField } from "@/components/forms"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

const form = useForm({
  resolver: zodResolver(schema),
  defaultValues: { email: "", password: "" },
})

const handleSubmit = async (data) => {
  console.log(data)
  // Handle form submission
}

;<Form form={form} onSubmit={handleSubmit}>
  <InputField name="email" label="Email" type="email" required />
  <InputField name="password" label="Password" type="password" required />
  <Button type="submit">Submit</Button>
</Form>
```
