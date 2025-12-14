# SuccessMessage

Component for displaying success messages with consistent styling.

## Usage

```tsx
import { SuccessMessage } from "@/components/common/success-message"

;<SuccessMessage message="Operation completed successfully" />
```

## Props

| Prop        | Type     | Default | Description                |
| ----------- | -------- | ------- | -------------------------- |
| `message`   | `string` | -       | Success message (required) |
| `className` | `string` | -       | Additional CSS classes     |

## Example

```tsx
{
  success && <SuccessMessage message="Changes saved successfully" />
}
```
