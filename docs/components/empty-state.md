# EmptyState

Component for displaying empty states with optional action button.

## Usage

```tsx
import { EmptyState } from "@/components/common/empty-state"

;<EmptyState
  title="No items found"
  description="Get started by creating your first item"
  action={{
    label: "Create Item",
    onClick: () => handleCreate(),
  }}
/>
```

## Props

| Prop          | Type                                     | Default | Description                  |
| ------------- | ---------------------------------------- | ------- | ---------------------------- |
| `title`       | `string`                                 | -       | Empty state title (required) |
| `description` | `string`                                 | -       | Empty state description      |
| `action`      | `{ label: string; onClick: () => void }` | -       | Optional action button       |
| `className`   | `string`                                 | -       | Additional CSS classes       |

## Example

```tsx
<EmptyState
  title="No projects yet"
  description="Create your first project to get started"
  action={{
    label: "Create Project",
    onClick: () => router.push("/projects/new"),
  }}
/>
```
