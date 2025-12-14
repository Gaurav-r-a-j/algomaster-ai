# IconWrapper

Wrapper component for consistent icon sizing and styling. Works with both Huge Icons and Hero Icons.

## Usage

```tsx
import { Home01Icon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

;<IconWrapper icon={Home01Icon} size="lg" className="text-primary" />
```

## Props

| Prop        | Type                                             | Default | Description                                   |
| ----------- | ------------------------------------------------ | ------- | --------------------------------------------- |
| `icon`      | `ComponentType \| IconSvgObject`                 | -       | Icon component or Huge Icon object (required) |
| `size`      | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| number` | `"md"`  | Icon size                                     |
| `className` | `string`                                         | -       | Additional CSS classes                        |

## Sizes

- `xs`: 16px
- `sm`: 20px
- `md`: 24px (default)
- `lg`: 32px
- `xl`: 40px

Or use custom number: `size={28}`

## Huge Icons Example

```tsx
import { IconWrapper } from "@/components/common/icon-wrapper";
import { Home01Icon, SearchIcon } from "@/lib/icons";

<IconWrapper icon={Home01Icon} size="lg" className="text-blue-500" />
<IconWrapper icon={SearchIcon} size={24} className="text-green-500" />
```

## Hero Icons Example

```tsx
import { HeroHomeIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

;<IconWrapper icon={HeroHomeIcon} size="lg" className="text-primary" />
```
