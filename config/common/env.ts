import { z } from "zod"

/**
 * Environment Variable Schema
 * 
 * Type-safe validation for all environment variables using Zod.
 * 
 * @see .env.example for all available environment variables
 * @see docs/development/configuration.md for configuration documentation
 */
const envSchema = z.object({
  // Database (optional - app works without it)
  DATABASE_URL: z.string().url().optional(),
  
  // Base URL - Used to derive all other URLs
  // Development: http://localhost:3000
  // Production: https://yourdomain.com
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("http://localhost:3000")
    .optional(),
  
  // NextAuth.js (optional - only required if using OAuth)
  // If not set, will use NEXT_PUBLIC_APP_URL
  GITHUB_CLIENT_ID: z.string().min(1).optional(),
  GITHUB_CLIENT_SECRET: z.string().min(1).optional(),
  NEXTAUTH_URL: z.string().url().optional(), // Auto-derived from NEXT_PUBLIC_APP_URL if not set
  // NEXTAUTH_SECRET: Only validate length if provided (for security, should be >=32 chars)
  NEXTAUTH_SECRET: z
    .string()
    .refine(
      (val) => !val || val.length >= 32,
      "NEXTAUTH_SECRET must be at least 32 characters long if provided"
    )
    .optional(),
  
  // API URL (optional - defaults to NEXT_PUBLIC_APP_URL/api)
  NEXT_PUBLIC_API_URL: z.string().url().optional(),
  
  // Environment
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  
  // SEO Verification
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_YANDEX_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_BING_VERIFICATION: z.string().optional(),
  
  // Analytics
  NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
  NEXT_PUBLIC_POSTHOG_HOST: z.string().url().optional(),
  
  // Google Tag Manager (GTM)
  // Get your GTM ID from: https://tagmanager.google.com
  // Format: GTM-XXXXXXX
  NEXT_PUBLIC_GTM_ID: z.string().regex(/^GTM-[A-Z0-9]+$/).optional(),
})

// Parse and validate environment variables
// Only validate NEXTAUTH_SECRET if it's provided and not empty
const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

const envData = {
  DATABASE_URL: process.env.DATABASE_URL,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  // Auto-derive NEXTAUTH_URL from base URL if not explicitly set
  NEXTAUTH_URL: process.env.NEXTAUTH_URL || baseUrl,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || undefined, // Convert empty string to undefined
  // Auto-derive API URL from base URL if not explicitly set
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || `${baseUrl}/api`,
  NEXT_PUBLIC_APP_URL: baseUrl,
  NODE_ENV: process.env.NODE_ENV || "development",
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_YANDEX_VERIFICATION: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  NEXT_PUBLIC_BING_VERIFICATION: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  NEXT_PUBLIC_GTM_ID: process.env.NEXT_PUBLIC_GTM_ID,
}

export const env = envSchema.parse(envData)

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>
