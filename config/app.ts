import { env } from "./common/env"

/**
 * Application Configuration
 * 
 * Centralized app settings that use environment variables.
 * 
 * @see .env.example for environment variable documentation
 * @see docs/development/configuration.md for complete configuration guide
 */
export const APP_CONFIG = {
  name: "AlgoMaster AI",
  shortName: "AlgoMaster",
  description:
    "Master Data Structures and Algorithms with interactive visualizations, AI-powered tutoring, and a comprehensive learning curriculum.",
  url: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: "AlgoMaster Team",
  keywords: [
    "data structures",
    "algorithms",
    "DSA",
    "programming",
    "learning",
    "education",
    "coding",
    "computer science",
    "AI tutor",
    "visualizations",
  ],
  twitter: "@algomasterai",
  verification: {
    google: env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: env.NEXT_PUBLIC_BING_VERIFICATION,
  },
} as const
