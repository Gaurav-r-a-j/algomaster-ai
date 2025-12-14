# InputField

Text input field component with label and error handling. Integrates with react-hook-form.

## Usage

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

## Props

| Prop             | Type                                                            | Default  | Description             |
| ---------------- | --------------------------------------------------------------- | -------- | ----------------------- |
| `name`           | `string`                                                        | -        | Field name (required)   |
| `label`          | `string`                                                        | -        | Field label             |
| `type`           | `"text" \| "email" \| "password" \| "number" \| "tel" \| "url"` | `"text"` | Input type              |
| `required`       | `boolean`                                                       | -        | Show required indicator |
| `description`    | `string`                                                        | -        | Helper text below label |
| `placeholder`    | `string`                                                        | -        | Placeholder text        |
| `disabled`       | `boolean`                                                       | -        | Disable input           |
| `className`      | `string`                                                        | -        | Container className     |
| `inputClassName` | `string`                                                        | -        | Input className         |

## Example

```tsx
<InputField
  name="email"
  label="Email Address"
  type="email"
  required
  placeholder="you@example.com"
  description="We'll never share your email"
/>
```
