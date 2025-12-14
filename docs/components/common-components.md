# Common Components

This document provides comprehensive documentation for all common/reusable components.

## Container

Responsive container component with preset sizes.

**Props:**

- `size`: "sm" | "md" | "lg" | "xl" | "full" (default: "xl")
- `className`: Additional CSS classes

**Usage:**

```tsx
import { Container } from "@/components/common/container"

;<Container size="lg">Content here</Container>
```

## Section

Page section component with consistent spacing.

**Props:**

- `spacing`: "sm" | "md" | "lg" (default: "md")
- `containerSize`: Optional container size
- `id`: Section ID for anchor navigation

**Usage:**

```tsx
import { Section } from "@/components/common/section"

;<Section spacing="lg" id="features">
  Content here
</Section>
```

## PageHeader

Consistent page header with title, description, and actions.

**Props:**

- `title`: string (required)
- `description`: string
- `actions`: ReactNode

**Usage:**

```tsx
import { PageHeader } from "@/components/common/page-header"

;<PageHeader
  title="Dashboard"
  description="View your account"
  actions={<Button>Action</Button>}
/>
```

## EmptyState

Component for displaying empty states.

**Props:**

- `title`: string (required)
- `description`: string
- `action`: { label: string; onClick: () => void }

**Usage:**

```tsx
import { EmptyState } from "@/components/common/empty-state"

;<EmptyState
  title="No items"
  description="Create your first item"
  action={{ label: "Create", onClick: handleCreate }}
/>
```

## IconWrapper

Wrapper for consistent icon sizing. Works with Huge Icons and Hero Icons.

**Props:**

- `icon`: ComponentType | IconSvgObject (required)
- `size`: "xs" | "sm" | "md" | "lg" | "xl" | number (default: "md")
- `className`: Additional CSS classes

**Usage:**

```tsx
import { Home01Icon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

;<IconWrapper icon={Home01Icon} size="lg" className="text-primary" />
```
