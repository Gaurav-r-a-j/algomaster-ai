/**
 * Security Validation Utilities
 * 
 * Provides input validation, sanitization, and security helpers
 */

import { z } from "zod"

/**
 * Sanitize string input - remove potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove < and > to prevent XSS
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
}

/**
 * Validate and sanitize email
 */
export const emailSchema = z
  .string()
  .email("Invalid email address")
  .max(255, "Email too long")
  .transform((val) => sanitizeInput(val))

/**
 * Validate and sanitize URL
 */
export const urlSchema = z
  .string()
  .url("Invalid URL")
  .max(2048, "URL too long")
  .refine(
    (url) => {
      try {
        const parsed = new URL(url)
        // Only allow http and https protocols
        return parsed.protocol === "http:" || parsed.protocol === "https:"
      } catch {
        return false
      }
    },
    { message: "Invalid URL protocol" }
  )

/**
 * Validate and sanitize slug
 */
export const slugSchema = z
  .string()
  .min(1, "Slug cannot be empty")
  .max(100, "Slug too long")
  .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens")
  .transform((val) => sanitizeInput(val))

/**
 * Validate and sanitize topic ID
 */
export const topicIdSchema = z
  .string()
  .min(1, "Topic ID cannot be empty")
  .max(100, "Topic ID too long")
  .regex(/^[a-z0-9-]+$/, "Invalid topic ID format")
  .transform((val) => sanitizeInput(val))

/**
 * Validate UUID
 */
export const uuidSchema = z.string().uuid("Invalid UUID format")

/**
 * Validate pagination parameters
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
})

/**
 * Validate search query
 */
export const searchQuerySchema = z
  .string()
  .min(1, "Search query cannot be empty")
  .max(200, "Search query too long")
  .transform((val) => sanitizeInput(val))

/**
 * Validate file upload (if needed in future)
 */
export const fileUploadSchema = z.object({
  name: z.string().max(255),
  type: z.string().max(100),
  size: z.number().int().max(10 * 1024 * 1024), // 10MB max
})

/**
 * Rate limit validation
 */
export function validateRateLimit(
  identifier: string,
  maxRequests: number,
  windowMs: number
): boolean {
  // This is a simple validation - actual rate limiting is in middleware
  return identifier.length > 0 && maxRequests > 0 && windowMs > 0
}

