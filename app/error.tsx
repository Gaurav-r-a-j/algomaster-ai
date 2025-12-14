"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { HeroArrowRightIcon, HeroHomeIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

export default function Error({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Error occurred:", _error);
  }, [_error]);

  return (
    <Container className="min-h-screen flex items-center justify-center py-12">
      <div className="text-center max-w-2xl mx-auto">
        {/* Error SVG Character */}
        <div className="mb-8 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-md h-auto"
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

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Something Went Wrong
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          We encountered an unexpected error. Don&apos;t worry, our team has been
          notified and is working on it.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={reset} className="w-full sm:w-auto">
            <HeroArrowRightIcon className="h-5 w-5 mr-2" />
            Try Again
          </Button>
          <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
            <Link href={ROUTES.HOME}>
              <HeroHomeIcon className="h-5 w-5 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}
