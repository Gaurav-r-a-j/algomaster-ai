# CardWrapper

Wrapper component for Card with consistent structure (header, content, footer).

## Usage

```tsx
import { CardWrapper } from "@/components/common/card-wrapper"

;<CardWrapper
  title="Card Title"
  description="Card description"
  footer={<Button>Action</Button>}
>
  {/* Card content */}
</CardWrapper>
```

## Props

| Prop          | Type        | Default | Description            |
| ------------- | ----------- | ------- | ---------------------- |
| `title`       | `string`    | -       | Card title             |
| `description` | `string`    | -       | Card description       |
| `footer`      | `ReactNode` | -       | Footer content         |
| `className`   | `string`    | -       | Additional CSS classes |
| `children`    | `ReactNode` | -       | Card content           |

## Example

```tsx
<CardWrapper
  title="User Profile"
  description="Manage your profile settings"
  footer={<Button>Save Changes</Button>}
>
  <InputField name="name" label="Name" />
  <InputField name="email" label="Email" />
</CardWrapper>
```
