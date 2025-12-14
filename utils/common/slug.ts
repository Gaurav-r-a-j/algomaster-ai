/**
 * Utility functions for generating and working with URL slugs
 */

/**
 * Generate a URL-friendly slug from a string
 * Converts to lowercase, replaces non-alphanumeric characters with hyphens,
 * and removes leading/trailing hyphens
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * Generate a module slug from module name
 * Removes leading numbers and dots, then converts to slug format
 */
export function generateModuleSlug(moduleName: string): string {
  return moduleName
    .toLowerCase()
    .replace(/^\d+\.\s*/, "")
    .replace(/\s+/g, "-")
}

/**
 * Generate a topic slug from topic title
 * Uses the standard slug generation
 */
export function generateTopicSlug(topicTitle: string): string {
  return generateSlug(topicTitle)
}
