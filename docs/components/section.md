# Section

Page section component with consistent spacing and optional container wrapper.

## Usage

```tsx
import { Section } from "@/components/common/section"

;<Section spacing="lg" containerSize="xl" id="features">
  {/* Section content */}
</Section>
```

## Props

| Prop            | Type                                     | Default     | Description                      |
| --------------- | ---------------------------------------- | ----------- | -------------------------------- |
| `spacing`       | `"sm" \| "md" \| "lg"`                   | `"md"`      | Vertical padding                 |
| `containerSize` | `"sm" \| "md" \| "lg" \| "xl" \| "full"` | `undefined` | Container size (optional)        |
| `className`     | `string`                                 | -           | Additional CSS classes           |
| `id`            | `string`                                 | -           | Section ID for anchor navigation |
| `children`      | `ReactNode`                              | -           | Content                          |

## Spacing Values

- `sm`: padding-y: 2rem (32px)
- `md`: padding-y: 3rem (48px) (default)
- `lg`: padding-y: 4rem (64px)

## Example

```tsx
<Section spacing="lg" containerSize="xl" id="features">
  <h2>Features</h2>
  <p>Feature content here</p>
</Section>
```
