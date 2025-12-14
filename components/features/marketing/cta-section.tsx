"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { HeroArrowRightIcon } from "@/lib/icons";
import { ROUTES } from "@/constants/routes";

export function CTASection() {
  return (
    <Section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Start your DSA learning journey today. Master algorithms and data structures with interactive visualizations and practice problems.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="w-full sm:w-auto group">
              <Link href={ROUTES.DASHBOARD}>
                Start Learning
                <HeroArrowRightIcon
                  className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="w-full sm:w-auto">
              <Link href={ROUTES.DASHBOARD}>
                Browse All Topics
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

