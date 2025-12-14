# ErrorMessage

Component for displaying error messages with consistent styling.

## Usage

```tsx
import { ErrorMessage } from "@/components/common/error-message"

;<ErrorMessage message="Something went wrong" />
```

## Props

| Prop        | Type     | Default | Description              |
| ----------- | -------- | ------- | ------------------------ |
| `message`   | `string` | -       | Error message (required) |
| `className` | `string` | -       | Additional CSS classes   |

## Example

```tsx
{
  error && <ErrorMessage message={error.message} />
}
```

## Usage in Forms

```tsx
{
  formState.errors.email && (
    <ErrorMessage message={formState.errors.email.message} />
  )
}
```
