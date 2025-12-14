# AdaptiveWrapper

Component for rendering different content based on screen size.

## Usage

```tsx
import { AdaptiveWrapper } from "@/components/common/adaptive-wrapper"

;<AdaptiveWrapper
  mobile={<MobileView />}
  tablet={<TabletView />}
  desktop={<DesktopView />}
/>
```

## Props

| Prop        | Type        | Default | Description                           |
| ----------- | ----------- | ------- | ------------------------------------- |
| `mobile`    | `ReactNode` | -       | Content for mobile screens (required) |
| `tablet`    | `ReactNode` | -       | Content for tablet screens            |
| `desktop`   | `ReactNode` | -       | Content for desktop screens           |
| `className` | `string`    | -       | Additional CSS classes                |

## Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Example

```tsx
<AdaptiveWrapper
  mobile={<SimpleListView />}
  tablet={<GridView />}
  desktop={<DetailedGridView />}
/>
```
