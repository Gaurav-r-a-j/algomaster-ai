# Icons Guide

This project uses **Huge Icons** (primary) and **Hero Icons** (secondary) for icons.

## Usage

### Method 1: Direct Import (Recommended)

Import icons directly from the icon registry:

```tsx
import { Home01Icon, SearchIcon, UserIcon } from "@/lib/icons"

function MyComponent() {
  return (
    <div>
      <Home01Icon size={24} className="text-blue-500" />
      <SearchIcon size={20} />
      <UserIcon size={32} />
    </div>
  )
}
```

### Method 2: Using IconWrapper (Consistent Sizing)

Use the IconWrapper for consistent sizing with preset sizes:

```tsx
import { IconWrapper } from "@/lib/icons"
import { Home01Icon } from "@/lib/icons/icon-registry"

function MyComponent() {
  return (
    <div>
      <IconWrapper icon={Home01Icon} size="sm" className="text-blue-500" />
      <IconWrapper icon={Home01Icon} size="md" />
      <IconWrapper icon={Home01Icon} size="lg" />
    </div>
  )
}
```

### Method 3: Using Icon Component (Huge Icons only)

```tsx
import { Icon } from "@/lib/icons"

function MyComponent() {
  return (
    <Icon
      name="Home01"
      library="hugeicons"
      size={24}
      className="text-blue-500"
    />
  )
}
```

## Icon Libraries

### Huge Icons (Primary)

Huge Icons is the primary icon library. All common icons are exported from `@/lib/icons/icon-registry`.

**Available icon categories:**

- Navigation (Home, Menu, Arrows, Chevrons)
- User & Account (User, Settings, Login, Logout)
- Actions (Search, Filter, Edit, Delete, Add)
- Communication (Mail, Notification, Message)
- Files & Folders (File, Folder, Download, Upload)
- Media (Image, Video, Play, Pause)
- Status (Eye, Lock, Shield, Warning, Info)
- Payment (Credit Card, Money)
- Theme (Sun, Moon, Computer)
- And more...

**Naming convention:** PascalCase with "Icon" suffix (e.g., `Home01Icon`, `SearchIcon`)

### Hero Icons (Secondary)

Hero Icons are available as an alternative. They use the "Hero" prefix in exports.

**Example:**

```tsx
import { HeroHomeIcon, HeroSearchIcon } from "@/lib/icons"

function MyComponent() {
  return (
    <div>
      <HeroHomeIcon className="h-6 w-6" />
      <HeroSearchIcon className="h-5 w-5 text-gray-500" />
    </div>
  )
}
```

**Naming convention:** "Hero" prefix + PascalCase + "Icon" suffix (e.g., `HeroHomeIcon`)

## Icon Sizes

Use preset sizes with IconWrapper or getIconSize utility:

- `xs`: 16px (w-4 h-4)
- `sm`: 20px (w-5 h-5)
- `md`: 24px (w-6 h-6) - **Default**
- `lg`: 32px (w-8 h-8)
- `xl`: 40px (w-10 h-10)

Or use custom sizes:

```tsx
<Home01Icon size={28} />
<IconWrapper icon={Home01Icon} size={28} />
```

## Styling Icons

Icons accept standard className props:

```tsx
<Home01Icon
  size={24}
  className="text-blue-500 transition-colors hover:text-blue-700"
/>
```

## Finding Icons

### Huge Icons

- Visit: https://hugeicons.com/
- Search for icons and use the icon name with "Icon" suffix
- Example: "Home" → `Home01Icon`

### Hero Icons

- Visit: https://heroicons.com/
- Icons are exported from `@heroicons/react/24/outline` or `@heroicons/react/24/solid`
- Use the "Hero" prefixed exports from our registry

## Adding New Icons

1. **For Huge Icons**: Import from `@hugeicons/core-free-icons` in `lib/icons/icon-registry.ts`
2. **For Hero Icons**: Import from `@heroicons/react` and add to registry with "Hero" prefix

Example:

```ts
import { NewIcon as HeroNewIcon } from "@heroicons/react/24/outline"

// lib/icons/icon-registry.ts
export { NewIcon } from "@hugeicons/core-free-icons"

export { HeroNewIcon }
```

## Best Practices

1. **Prefer Huge Icons** - It's the primary library and already configured
2. **Use IconWrapper** - For consistent sizing across the app
3. **Import from registry** - Use `@/lib/icons` for centralized icon management
4. **Consistent sizing** - Use preset sizes (xs, sm, md, lg, xl) when possible
5. **Type safety** - Icons are typed, use TypeScript for better autocomplete
