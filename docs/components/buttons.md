# Buttons

Button component variants and sizes from shadcn/ui.

## Usage

```tsx:preview
<Button variant="default">Click me</Button>
```

## Variants

### Default

```tsx:preview
<Button variant="default">Default Button</Button>
```

### Secondary

```tsx:preview
<Button variant="secondary">Secondary Button</Button>
```

### Outline

```tsx:preview
<Button variant="outline">Outline Button</Button>
```

### Ghost

```tsx:preview
<Button variant="ghost">Ghost Button</Button>
```

### Link

```tsx:preview
<Button variant="link">Link Button</Button>
```

## Sizes

### Small

```tsx:preview
<Button size="sm">Small Button</Button>
```

### Default

```tsx:preview
<Button size="default">Default Size</Button>
```

### Large

```tsx:preview
<Button size="lg">Large Button</Button>
```

## With Links

Use the `asChild` prop when wrapping with Next.js `Link`:

```tsx
import Link from "next/link"

;<Button variant="outline" asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```
