/**
 * Logger utility for conditional logging based on environment
 * Only logs in development, can be extended for production monitoring
 */

const isDevelopment = process.env.NODE_ENV === "development"

export const logger = {
  error: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.error(`[Error] ${message}`, ...args)
    }
    // In production, you could send to error tracking service
    // e.g., Sentry.captureException(new Error(message))
  },
  warn: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.warn(`[Warn] ${message}`, ...args)
    }
  },
  info: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.info(`[Info] ${message}`, ...args)
    }
  },
  log: (message: string, ...args: unknown[]) => {
    if (isDevelopment) {
      console.log(`[Log] ${message}`, ...args)
    }
  },
}

