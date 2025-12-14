# PageHeader

Consistent page header component with title, description, and optional actions.

## Usage

```tsx
import { PageHeader } from "@/components/common/page-header"

;<PageHeader
  title="Page Title"
  description="Page description"
  actions={<Button>Action</Button>}
/>
```

## Props

| Prop          | Type        | Default | Description             |
| ------------- | ----------- | ------- | ----------------------- |
| `title`       | `string`    | -       | Page title (required)   |
| `description` | `string`    | -       | Page description        |
| `actions`     | `ReactNode` | -       | Action buttons/elements |
| `className`   | `string`    | -       | Additional CSS classes  |

## Example

```tsx
<PageHeader
  title="Dashboard"
  description="View your account overview and statistics"
  actions={
    <>
      <Button variant="outline">Export</Button>
      <Button>Create New</Button>
    </>
  }
/>
```
