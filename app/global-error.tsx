"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { HeroArrowRightIcon, HeroHomeIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

export default function GlobalError({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error("Global error occurred:", _error);
  }, [_error]);

  return (
    <html lang="en">
      <body>
        <Container className="min-h-screen flex items-center justify-center py-12">
          <div className="text-center max-w-2xl mx-auto">
            {/* Critical Error SVG */}
            <div className="mb-8 flex justify-center">
              <svg
                viewBox="0 0 400 300"
                className="w-full max-w-md h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Broken character */}
                <circle
                  cx="200"
                  cy="120"
                  r="60"
                  fill="currentColor"
                  className="text-destructive/20"
                />
                <line
                  x1="160"
                  y1="100"
                  x2="190"
                  y2="130"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-destructive"
                />
                <line
                  x1="210"
                  y1="130"
                  x2="240"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="3"
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
                  Critical Error
                </text>

                {/* Warning symbols */}
                <path
                  d="M 80 60 L 100 100 L 60 100 Z"
                  fill="currentColor"
                  className="text-destructive/40"
                />
                <circle
                  cx="320"
                  cy="80"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-destructive/40"
                  fill="none"
                />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Application Error
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
              A critical error occurred. Please refresh the page or return home.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={reset} className="w-full sm:w-auto">
                <HeroArrowRightIcon className="h-5 w-5 mr-2" />
                Reload Application
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
      </body>
    </html>
  );
}
