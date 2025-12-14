# TextareaField

Textarea field component with label and error handling. Integrates with react-hook-form.

## Usage

```tsx
import { TextareaField } from "@/components/forms"

;<TextareaField
  name="message"
  label="Message"
  rows={6}
  placeholder="Enter your message"
/>
```

## Props

| Prop          | Type      | Default | Description             |
| ------------- | --------- | ------- | ----------------------- |
| `name`        | `string`  | -       | Field name (required)   |
| `label`       | `string`  | -       | Field label             |
| `required`    | `boolean` | -       | Show required indicator |
| `description` | `string`  | -       | Helper text below label |
| `placeholder` | `string`  | -       | Placeholder text        |
| `rows`        | `number`  | `4`     | Number of rows          |
| `disabled`    | `boolean` | -       | Disable textarea        |
| `className`   | `string`  | -       | Container className     |

## Example

```tsx
<TextareaField
  name="description"
  label="Description"
  rows={6}
  required
  placeholder="Enter a detailed description"
  description="Provide as much detail as possible"
/>
```
