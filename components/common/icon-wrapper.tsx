"use client";

import { getIconSize, getIconClassName } from "@/lib/icons/icon-utils";
import { cn } from "@/utils/common/class-names";
import type { ComponentType, SVGProps } from "react";

export interface IconWrapperProps extends Omit<SVGProps<SVGSVGElement>, "size"> {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number | string;
  className?: string;
}

/**
 * Icon wrapper component that provides consistent sizing and styling
 * Works with any icon component (Huge Icons, Hero Icons, etc.)
 * 
 * @example
 * ```tsx
 * import { Home01Icon } from "@/lib/icons/icon-registry";
 * 
 * <IconWrapper icon={Home01Icon} size="lg" className="text-blue-500" />
 * ```
 */
export function IconWrapper({
  icon: IconComponent,
  size = "md",
  className,
  ...props
}: IconWrapperProps) {
  const iconSize = typeof size === "string" && ["xs", "sm", "md", "lg", "xl"].includes(size)
    ? getIconSize(size as "xs" | "sm" | "md" | "lg" | "xl")
    : size;

  const iconClassName = typeof size === "string" && ["xs", "sm", "md", "lg", "xl"].includes(size)
    ? getIconClassName(size as "xs" | "sm" | "md" | "lg" | "xl", className)
    : cn(className);

  return (
    <IconComponent
      size={iconSize}
      className={iconClassName}
      {...props}
    />
  );
}

