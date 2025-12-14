"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function LandingNav() {
  return (
    <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href={ROUTES.HOME}
            className="font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors"
          >
            DSA Platform
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={ROUTES.LOGIN}
            className={cn(
              "text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors hidden md:block"
            )}
          >
            Login
          </Link>
          <Button asChild size="sm" className="rounded-full">
            <Link href={ROUTES.DASHBOARD}>Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

