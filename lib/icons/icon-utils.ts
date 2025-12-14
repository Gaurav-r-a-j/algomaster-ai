import { cn } from "@/utils/common/class-names";

/**
 * Icon utility functions
 */

export interface IconSize {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}

export const ICON_SIZES: IconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
} as const;

/**
 * Get icon size by preset name
 */
export function getIconSize(size: keyof IconSize = "md"): string | number {
  return ICON_SIZES[size];
}

/**
 * Get icon class names with proper sizing
 */
export function getIconClassName(
  size?: keyof IconSize | string | number,
  className?: string
): string {
  const sizeClasses = {
    xs: "w-4 h-4",
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-10 h-10",
  };

  if (typeof size === "string" && size in sizeClasses) {
    return cn(sizeClasses[size as keyof typeof sizeClasses], className);
  }

  return cn(className);
}

