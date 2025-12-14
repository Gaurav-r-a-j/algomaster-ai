# Icons

Icon library using Huge Icons (primary) and Hero Icons (secondary).

## Usage

Icons can be used in two ways:

### Direct Usage with IconWrapper

```tsx
import { Home01Icon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

;<IconWrapper icon={Home01Icon} size="lg" className="text-primary" />
```

### Hero Icons (Direct)

```tsx
import { HeroHomeIcon } from "@/lib/icons"

;<HeroHomeIcon className="h-6 w-6 text-blue-500" />
```

## Available Sizes

- `xs`: 16px
- `sm`: 20px
- `md`: 24px (default)
- `lg`: 32px
- `xl`: 40px

Or use custom number: `size={28}`

## Icon Libraries

### Huge Icons (Primary)

Huge Icons are SVG objects and should be used with `IconWrapper` component.

### Hero Icons (Secondary)

Hero Icons are React components and can be used directly or with `IconWrapper`.

## Examples

See the design system overview page for live examples of all icon usage patterns.
