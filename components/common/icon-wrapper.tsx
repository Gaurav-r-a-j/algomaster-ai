"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { getIconClassName, getIconSize } from "@/lib/icons/icon-utils";
import { cn } from "@/utils/common/class-names";
import type { ComponentType, SVGProps } from "react";

// Type for Huge Icons (IconSvgObject) - matches @hugeicons/core-free-icons
type IconSvgObject = [string, Record<string, string | number>][] | any;

// Union type for both React components and Huge Icons
type IconType =
  | ComponentType<SVGProps<SVGSVGElement>>
  | IconSvgObject;

export interface IconWrapperProps extends Omit<
  SVGProps<SVGSVGElement>,
  "size"
> {
  icon: IconType;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number | string;
  className?: string;
}

// Helper function to check if icon is a Huge Icon (SVG object)
function isHugeIcon(icon: IconType): icon is IconSvgObject {
  return Array.isArray(icon) && icon.length > 0 && Array.isArray(icon[0]);
}

// IconWrapper - Provides consistent sizing and styling for icons
// Works with both Huge Icons (SVG objects) and Hero Icons (React components)
// Example: <IconWrapper icon={Home01Icon} size="lg" className="text-blue-500" />
export function IconWrapper({
  icon,
  size = "md",
  className,
  ...props
}: IconWrapperProps) {
  const iconSize =
    typeof size === "string" && ["xs", "sm", "md", "lg", "xl"].includes(size)
      ? getIconSize(size as "xs" | "sm" | "md" | "lg" | "xl")
      : size;

  const iconClassName =
    typeof size === "string" && ["xs", "sm", "md", "lg", "xl"].includes(size)
      ? getIconClassName(size as "xs" | "sm" | "md" | "lg" | "xl", className)
      : cn(className);

  // Handle Huge Icons (SVG objects)
  if (isHugeIcon(icon)) {
    return (
      <HugeiconsIcon
        icon={icon}
        size={typeof iconSize === "number" ? iconSize : undefined}
        className={iconClassName}
      />
    );
  }

  // Handle React component icons (Hero Icons)
  const IconComponent = icon as ComponentType<SVGProps<SVGSVGElement>>;
  return (
    <IconComponent
      width={typeof iconSize === "number" ? iconSize : undefined}
      height={typeof iconSize === "number" ? iconSize : undefined}
      className={cn(
        typeof iconSize === "string" && !["xs", "sm", "md", "lg", "xl"].includes(iconSize)
          ? `w-${iconSize} h-${iconSize}`
          : undefined,
        iconClassName
      )}
      {...props}
    />
  );
}
