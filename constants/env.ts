// Deprecated: Use @/config/common/env instead
// This file is kept for backward compatibility
import { env as configEnv } from "@/config/common/env"

export const ENV = {
  API_URL: configEnv.NEXT_PUBLIC_API_URL || "",
  APP_URL: configEnv.NEXT_PUBLIC_APP_URL || "",
  NODE_ENV: configEnv.NODE_ENV || "development",
} as const
