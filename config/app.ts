import { env } from "./common/env";

// Application configuration - centralized app settings
export const APP_CONFIG = {
  name: "DSA Learning Platform",
  shortName: "DSA Platform",
  description:
    "An interactive Data Structures and Algorithms learning platform with visualizations, AI-powered tutoring, and comprehensive curriculum.",
  url: env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  author: "DSA Platform Team",
  keywords: [
    "data structures",
    "algorithms",
    "DSA",
    "programming",
    "learning",
    "education",
    "coding",
    "computer science",
  ],
  twitter: "@dsaplatform",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
} as const;

