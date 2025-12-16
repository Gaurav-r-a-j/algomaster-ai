import { env } from "./common/env"

// Application configuration - centralized app settings
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
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
} as const
