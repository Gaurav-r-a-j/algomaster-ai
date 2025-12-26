"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"

import { Home01Icon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"

export default function NotFound() {
  return (
    <Container className="flex min-h-screen items-center justify-center py-12">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 SVG Character */}
        <div className="mb-8 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            className="h-auto w-full max-w-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Character */}
            <circle
              cx="200"
              cy="120"
              r="60"
              fill="currentColor"
              className="text-primary/20"
            />
            <circle
              cx="180"
              cy="110"
              r="8"
              fill="currentColor"
              className="text-primary"
            />
            <circle
              cx="220"
              cy="110"
              r="8"
              fill="currentColor"
              className="text-primary"
            />
            <path
              d="M 180 130 Q 200 145 220 130"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="text-primary"
              fill="none"
            />

            {/* 404 Text */}
            <text
              x="200"
              y="200"
              fontSize="72"
              fontWeight="bold"
              fill="currentColor"
              className="text-foreground"
              textAnchor="middle"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              404
            </text>

            {/* Decorative elements */}
            <circle
              cx="80"
              cy="80"
              r="4"
              fill="currentColor"
              className="text-primary/30"
            />
            <circle
              cx="320"
              cy="80"
              r="4"
              fill="currentColor"
              className="text-primary/30"
            />
            <circle
              cx="100"
              cy="240"
              r="3"
              fill="currentColor"
              className="text-muted-foreground/40"
            />
            <circle
              cx="300"
              cy="240"
              r="3"
              fill="currentColor"
              className="text-muted-foreground/40"
            />
          </svg>
        </div>

        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Page Not Found</h1>
        <p className="text-muted-foreground mx-auto mb-8 max-w-lg text-xl">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might
          have been moved or deleted.
        </p>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href={ROUTES.HOME}>
              <IconWrapper icon={Home01Icon} size={20} className="mr-2" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            Go Back
          </Button>
        </div>
      </div>
    </Container>
  )
}
