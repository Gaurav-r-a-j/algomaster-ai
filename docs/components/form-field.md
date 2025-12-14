# FormField

Base form field component with label and error handling. Integrates with react-hook-form.

## Usage

```tsx
import { FormField } from "@/components/forms"

;<FormField name="custom" label="Custom Field">
  {({ value, onChange, onBlur, error }) => (
    <YourCustomInput value={value} onChange={onChange} onBlur={onBlur} />
  )}
</FormField>
```

## Props

| Prop          | Type       | Default | Description                           |
| ------------- | ---------- | ------- | ------------------------------------- |
| `name`        | `string`   | -       | Field name (required)                 |
| `label`       | `string`   | -       | Field label                           |
| `required`    | `boolean`  | -       | Show required indicator               |
| `description` | `string`   | -       | Helper text below label               |
| `className`   | `string`   | -       | Additional CSS classes                |
| `children`    | `function` | -       | Render function receiving field props |

## Render Function Props

The children function receives:

- `value`: Current field value
- `onChange`: Change handler
- `onBlur`: Blur handler
- `error`: Error message string
- `name`: Field name

## Example

```tsx
<FormField name="phone" label="Phone Number" required>
  {({ value, onChange, onBlur, error }) => (
    <Input
      type="tel"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={error ? "border-destructive" : ""}
    />
  )}
</FormField>
```
