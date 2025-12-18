export const ROUTES = {
  // Public routes
  HOME: "/",

  // Main Learning Platform routes (primary interface) - all dynamic at root
  TOPIC: (slug: string) => `/${slug}`,
  MODULE: (slug: string) => `/${slug}`,

  // Dashboard routes (separate for stats/progress)
  DASHBOARD: "/dashboard",
  PROFILE: "/profile",
  SETTINGS: "/settings",

  // Account routes
  ACCOUNT: "/account",
  BILLING: "/billing",
  SUBSCRIPTION: "/subscription",
  NOTIFICATIONS: "/notifications",

  // Marketing routes
  ABOUT: "/about",
  CONTACT: "/contact",
  PRICING: "/pricing",
  FEATURES: "/features",
  BLOG: "/blog",

  // Admin routes
  ADMIN: "/admin",
  ADMIN_USERS: "/admin/users",
  ADMIN_ANALYTICS: "/admin/analytics",
  ADMIN_SETTINGS: "/admin/settings",

  // Docs routes
  DOCS: "/docs",

  // Design System
  DESIGN_SYSTEM: "/design-system",
} as const
