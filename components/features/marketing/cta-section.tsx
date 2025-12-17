"use client"

import Link from "next/link"
import { getFirstModuleUrl, getFirstTopicUrl } from "@/utils/curriculum"

import { HeroArrowRightIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"

export function CTASection() {
  return (
    <Section className="from-muted/50 to-background bg-gradient-to-b py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-10 text-xl">
            Start your DSA learning journey today. Master algorithms and data
            structures with interactive visualizations and practice problems.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="group w-full sm:w-auto">
              <Link href={getFirstTopicUrl()}>
                Start Learning
                <HeroArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full sm:w-auto"
            >
              <Link href={getFirstModuleUrl()}>Browse All Topics</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
