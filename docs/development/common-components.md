# Common Components Guide

This document describes the reusable common components available throughout the application.

## Overview

Common components are located in `components/common/` and provide consistent, reusable UI patterns.

## Available Components

### Container

Responsive container component with preset sizes.

**Props:**
- `size` - Container size: "sm" | "md" | "lg" | "xl" | "full" (default: "xl")
- `className` - Additional CSS classes

**Usage:**
```tsx
import { Container } from "@/components/common";

<Container size="lg">
  <YourContent />
</Container>
```

**Sizes:**
- `sm`: max-w-2xl
- `md`: max-w-4xl
- `lg`: max-w-6xl
- `xl`: max-w-7xl (default)
- `full`: max-w-full

### Section

Page section with consistent spacing and container.

**Props:**
- `spacing` - Vertical spacing: "none" | "sm" | "md" | "lg" | "xl" (default: "md")
- `containerSize` - Container size (default: "xl")
- `className` - Additional CSS classes

**Usage:**
```tsx
import { Section } from "@/components/common";

<Section spacing="lg" containerSize="lg">
  <h2>Section Title</h2>
  <p>Section content</p>
</Section>
```

### AdaptiveWrapper

Component that renders different content based on screen size.

**Props:**
- `mobile` - Content for mobile screens
- `tablet` - Content for tablet screens
- `desktop` - Content for desktop screens
- `children` - Default content if no breakpoint-specific content
- `breakpoints` - Custom breakpoint queries

**Usage:**
```tsx
import { AdaptiveWrapper } from "@/components/common";

<AdaptiveWrapper
  mobile={<MobileView />}
  tablet={<TabletView />}
  desktop={<DesktopView />}
/>
```

### PageHeader

Consistent page header with title, description, and actions.

**Props:**
- `title` - Page title (required)
- `description` - Optional description text
- `actions` - Optional action buttons/elements
- `className` - Additional CSS classes

**Usage:**
```tsx
import { PageHeader } from "@/components/common";
import { Button } from "@/components/ui/button";

<PageHeader
  title="Dashboard"
  description="Welcome back!"
  actions={<Button>New Item</Button>}
/>
```

### CardWrapper

Wrapper for Card component with consistent structure.

**Props:**
- `title` - Card title
- `description` - Card description
- `children` - Card content
- `footer` - Optional footer content
- `className` - Additional CSS classes

**Usage:**
```tsx
import { CardWrapper } from "@/components/common";

<CardWrapper
  title="Card Title"
  description="Card description"
  footer={<Button>Action</Button>}
>
  <p>Card content</p>
</CardWrapper>
```

### EmptyState

Component for displaying empty states.

**Props:**
- `title` - Empty state title (required)
- `description` - Optional description
- `icon` - Optional icon element
- `action` - Optional action button
- `className` - Additional CSS classes

**Usage:**
```tsx
import { EmptyState } from "@/components/common";

<EmptyState
  title="No items found"
  description="Get started by creating your first item"
  icon={<EmptyIcon />}
  action={{
    label: "Create Item",
    onClick: handleCreate,
  }}
/>
```

### LoadingSpinner

Loading spinner component.

**Props:**
- `size` - Spinner size: "sm" | "md" | "lg" (default: "md")

**Usage:**
```tsx
import { LoadingSpinner } from "@/components/common";

<LoadingSpinner size="lg" />
```

### ErrorMessage

Error message component.

**Props:**
- `message` - Error message text (required)
- `className` - Additional CSS classes

**Usage:**
```tsx
import { ErrorMessage } from "@/components/common";

<ErrorMessage message="Something went wrong" />
```

### SuccessMessage

Success message component.

**Props:**
- `message` - Success message text (required)
- `className` - Additional CSS classes

**Usage:**
```tsx
import { SuccessMessage } from "@/components/common";

<SuccessMessage message="Operation successful" />
```

## Component Combinations

### Common Patterns

**Page Layout:**
```tsx
import { Container, Section, PageHeader } from "@/components/common";

<Container size="lg">
  <PageHeader
    title="Page Title"
    description="Page description"
    actions={<Button>Action</Button>}
  />
  
  <Section spacing="md">
    <YourContent />
  </Section>
</Container>
```

**Card Grid:**
```tsx
import { CardWrapper, Container } from "@/components/common";

<Container>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    <CardWrapper title="Card 1">
      Content 1
    </CardWrapper>
    <CardWrapper title="Card 2">
      Content 2
    </CardWrapper>
  </div>
</Container>
```

**Empty State:**
```tsx
import { EmptyState, Container } from "@/components/common";

<Container>
  {items.length === 0 ? (
    <EmptyState
      title="No items"
      description="Create your first item"
      action={{
        label: "Create",
        onClick: handleCreate,
      }}
    />
  ) : (
    <ItemList items={items} />
  )}
</Container>
```

## Best Practices

1. **Use Container for page layouts** - Ensures consistent max-width and padding
2. **Use Section for content sections** - Provides consistent spacing
3. **Use PageHeader consistently** - Maintains uniform page headers
4. **Use CardWrapper for card content** - Provides consistent card structure
5. **Use EmptyState for empty lists** - Provides good user experience
6. **Combine components** - Use components together for complex layouts

## Import All Common Components

```tsx
import {
  Container,
  Section,
  AdaptiveWrapper,
  PageHeader,
  CardWrapper,
  EmptyState,
  LoadingSpinner,
  ErrorMessage,
  SuccessMessage,
} from "@/components/common";
```

---

**Last Updated**: Common components setup
**Maintained By**: Development Team

