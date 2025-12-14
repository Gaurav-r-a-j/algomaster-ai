// Icon component - Use direct icon imports from @/lib/icons instead
// This component is kept for backward compatibility but direct imports are preferred
// Example: import { Home01Icon } from "@/lib/icons" then <Home01Icon size={24} />

import type { SVGProps } from "react";

export type IconLibrary = "hugeicons" | "heroicons";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name?: string;
  library?: IconLibrary;
  size?: number | string;
  className?: string;
}

// Note: Direct icon imports are preferred over this wrapper
// Use: import { Home01Icon } from "@/lib/icons" then <Home01Icon size={24} />
export function Icon(_props: IconProps) {
  // This component is deprecated - use direct icon imports from @/lib/icons
  console.warn("Icon component is deprecated. Use direct icon imports from @/lib/icons instead.");
  return null;
}

