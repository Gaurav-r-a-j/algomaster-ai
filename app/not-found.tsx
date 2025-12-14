"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { HeroHomeIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

export default function NotFound() {
  return (
    <Container className="min-h-screen flex items-center justify-center py-12">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 SVG Character */}
        <div className="mb-8 flex justify-center">
          <svg
            viewBox="0 0 400 300"
            className="w-full max-w-md h-auto"
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

        <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have
          been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href={ROUTES.HOME}>
              <HeroHomeIcon className="h-5 w-5 mr-2" />
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
  );
}
