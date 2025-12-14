/**
 * Utility functions for working with paths and route matching
 */

/**
 * Check if a pathname matches or starts with a given path
 * Useful for determining active navigation items
 */
export function isActivePath(
  pathname: string | null | undefined,
  path: string
): boolean {
  if (!pathname) {
    return false;
  }
  return pathname === path || pathname.startsWith(path + "/");
}

/**
 * Extract the module number from a module name
 * Returns the leading number if present, empty string otherwise
 */
export function extractModuleNumber(moduleName: string): string {
  return moduleName.match(/^\d+/)?.[0] || "";
}

/**
 * Remove module number prefix from module name
 * Example: "1. Foundations" -> "Foundations"
 */
export function removeModulePrefix(moduleName: string): string {
  return moduleName.replace(/^\d+\.\s*/, "");
}

