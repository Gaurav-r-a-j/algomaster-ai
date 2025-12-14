import { HugeiconsIcon } from "@hugeicons/react";
import type { SVGProps } from "react";

export type IconLibrary = "hugeicons" | "heroicons";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  library?: IconLibrary;
  size?: number | string;
  className?: string;
}

/**
 * Unified Icon component that supports multiple icon libraries
 * 
 * @example
 * ```tsx
 * <Icon name="Home01" library="hugeicons" size={24} />
 * <Icon name="HomeIcon" library="heroicons" className="text-blue-500" />
 * ```
 */
export function Icon({
  name,
  library = "hugeicons",
  size = 24,
  className = "",
  ...props
}: IconProps) {
  if (library === "hugeicons") {
    return (
      <HugeiconsIcon
        name={name}
        size={size}
        className={className}
        {...props}
      />
    );
  }

  // For Hero Icons, we'll dynamically import (handled differently)
  // This is a placeholder - see icon-registry.ts for full implementation
  return null;
}

