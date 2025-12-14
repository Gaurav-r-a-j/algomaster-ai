"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { HeroArrowRightIcon, SparklesIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

export function LandingHero() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 relative overflow-hidden bg-background border-b border-border">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <Badge
          variant="secondary"
          className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700"
        >
          <IconWrapper icon={SparklesIcon} size={14} className="mr-1.5" />
          AI-Powered Learning Platform
        </Badge>

        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
          Master Data Structures <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-foreground">
            & Algorithms
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 font-light">
          Learn DSA with interactive visualizations, solve practice problems, and get
          AI-powered explanations. From beginner to interview-ready in weeks, not months.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
          <Button asChild size="lg" className="h-14 px-10 rounded-full text-lg w-full sm:w-auto shadow-xl shadow-primary/10">
            <Link href={ROUTES.DASHBOARD}>
              Start Learning Now
              <HeroArrowRightIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="h-14 px-10 rounded-full text-lg w-full sm:w-auto bg-background hover:bg-muted"
          >
            <Link href={ROUTES.DASHBOARD}>Browse Topics</Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8 text-muted-foreground grayscale opacity-70 animate-in fade-in duration-1000 delay-500">
          <span className="text-xs font-semibold uppercase tracking-widest">
            Trusted by Students
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest">
            Developers
          </span>
          <span className="text-xs font-semibold uppercase tracking-widest">
            Interview Prep
          </span>
        </div>
      </div>
    </section>
  );
}

