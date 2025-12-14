# LoadingSpinner

Loading spinner component with different sizes for various use cases.

## Usage

```tsx
import { LoadingSpinner } from "@/components/common/loading-spinner"

;<LoadingSpinner size="lg" />
```

## Props

| Prop        | Type                   | Default | Description            |
| ----------- | ---------------------- | ------- | ---------------------- |
| `size`      | `"sm" \| "md" \| "lg"` | `"md"`  | Spinner size           |
| `className` | `string`               | -       | Additional CSS classes |

## Sizes

- `sm`: 16px
- `md`: 24px (default)
- `lg`: 32px

## Example

```tsx
{
  isLoading ? <LoadingSpinner size="lg" /> : <DataDisplay />
}
```

## Full Page Loading

```tsx
<div className="flex min-h-screen items-center justify-center">
  <LoadingSpinner size="lg" />
</div>
```
