import { cn } from "./class-names"

// Common class variants for repeated patterns
export const classVariants = {
  card: {
    base: "rounded-xl border bg-card text-card-foreground shadow",
    bordered: "rounded-lg border border-border",
    muted: "rounded-lg border border-border bg-muted/50",
  },
  container: {
    base: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8",
    sm: "mx-auto max-w-2xl px-4 sm:px-6",
    md: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8",
    lg: "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8",
  },
  button: {
    icon: "h-7 w-7 transition-all duration-200",
    iconSmall: "h-6 w-6 transition-all duration-200",
  },
  code: {
    block: "bg-muted m-0 overflow-x-auto p-4 font-mono text-sm",
    container: "border-border my-4 overflow-hidden rounded-lg border",
  },
}

// Helper to combine class variants
export function variant(...classes: (string | undefined)[]): string {
  return cn(...classes)
}

