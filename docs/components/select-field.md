# SelectField

Select dropdown component with label and error handling. Integrates with react-hook-form.

## Usage

```tsx
import { SelectField } from "@/components/forms"

;<SelectField
  name="country"
  label="Country"
  required
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
  ]}
/>
```

## Props

| Prop          | Type                                      | Default | Description               |
| ------------- | ----------------------------------------- | ------- | ------------------------- |
| `name`        | `string`                                  | -       | Field name (required)     |
| `label`       | `string`                                  | -       | Field label               |
| `options`     | `Array<{ value: string; label: string }>` | -       | Select options (required) |
| `required`    | `boolean`                                 | -       | Show required indicator   |
| `placeholder` | `string`                                  | -       | Placeholder text          |
| `disabled`    | `boolean`                                 | -       | Disable select            |
| `className`   | `string`                                  | -       | Container className       |

## Example

```tsx
<SelectField
  name="role"
  label="User Role"
  required
  placeholder="Select a role"
  options={[
    { value: "admin", label: "Administrator" },
    { value: "user", label: "User" },
    { value: "guest", label: "Guest" },
  ]}
/>
```
