"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import { ArrowRight01Icon, Home01Icon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { extractErrorMessage } from "@/lib/utils/error-handler"

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  // Safely extract error message
  const errorMessage = extractErrorMessage(_error)

  useEffect(() => {
    // Log error to monitoring service
    if (process.env.NODE_ENV === "development") {
      console.error("Error occurred:", _error)
    }
    // In production, send to error tracking service
    // Example: Sentry.captureException(_error)
  }, [_error])

  return (
    <Container className="flex min-h-screen items-center justify-center py-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error SVG Character */}
        <div className="mb-8 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            className="h-auto w-full max-w-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Character with exclamation */}
            <circle
              cx="200"
              cy="120"
              r="60"
              fill="currentColor"
              className="text-destructive/20"
            />
            <circle
              cx="200"
              cy="100"
              r="8"
              fill="currentColor"
              className="text-destructive"
            />
            <rect
              x="196"
              y="115"
              width="8"
              height="20"
              rx="4"
              fill="currentColor"
              className="text-destructive"
            />

            {/* Error Text */}
            <text
              x="200"
              y="200"
              fontSize="48"
              fontWeight="bold"
              fill="currentColor"
              className="text-foreground"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              Oops!
            </text>

            {/* Warning triangles */}
            <path
              d="M 80 60 L 100 100 L 60 100 Z"
              fill="currentColor"
              className="text-destructive/30"
            />
            <path
              d="M 320 60 L 340 100 L 300 100 Z"
              fill="currentColor"
              className="text-destructive/30"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          Something Went Wrong
        </h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-xl">
          We encountered an unexpected error. Don&apos;t worry, our team has
          been notified and is working on it.
        </p>
        {errorMessage && errorMessage !== 'An unexpected error occurred' && (
          <div className="mx-auto mb-6 max-w-lg rounded-lg border border-destructive/20 bg-destructive/10 p-4">
            <p className="text-sm font-mono text-destructive">{errorMessage}</p>
          </div>
        )}

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" onClick={reset} className="w-full sm:w-auto">
            <IconWrapper icon={ArrowRight01Icon} size={20} className="mr-2" />
            Try Again
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href={ROUTES.HOME}>
              <IconWrapper icon={Home01Icon} size={20} className="mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  )
}
