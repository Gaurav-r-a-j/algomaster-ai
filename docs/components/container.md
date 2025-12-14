# Container

Responsive container component with preset sizes for consistent page layouts.

## Usage

```tsx
import { Container } from "@/components/common/container"

;<Container size="lg">{/* Your content */}</Container>
```

## Props

| Prop        | Type                                     | Default | Description            |
| ----------- | ---------------------------------------- | ------- | ---------------------- |
| `size`      | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `"xl"`  | Container max width    |
| `className` | `string`                                 | -       | Additional CSS classes |
| `children`  | `ReactNode`                              | -       | Content to wrap        |

## Sizes

- `sm`: max-width: 640px
- `md`: max-width: 768px
- `lg`: max-width: 1024px
- `xl`: max-width: 1280px (default)
- `full`: max-width: 100%

## Example

```tsx
import { Container } from "@/components/common/container"

;<Container size="lg" className="py-8">
  <h1>Page Title</h1>
  <p>Content goes here</p>
</Container>
```

## Live Preview

<CodePreview
code={`import { Container } from "@/components/common/container";

<Container size="lg" className="py-8">
  <h1>Page Title</h1>
  <p>Content goes here</p>
</Container>`}
  language="tsx"
  preview={
    <Container size="lg" className="py-8">
      <h1>Page Title</h1>
      <p>Content goes here</p>
    </Container>
  }
/>
