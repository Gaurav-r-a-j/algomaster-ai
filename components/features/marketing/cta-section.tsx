"use client"

import Link from "next/link"
import { getFirstModuleUrl, getFirstTopicUrl } from "@/utils/curriculum"

import { HeroArrowRightIcon } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/common/container"
import { Section } from "@/components/common/section"

export function CTASection() {
  return (
    <Section className="border-t border-border py-32">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-4xl font-black tracking-tighter md:text-5xl">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground mb-12 text-lg font-medium">
            Start your DSA learning journey today. Master algorithms and data
            structures with interactive visualizations and practice problems.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full rounded-full sm:w-auto font-bold px-10 h-14">
              <Link href={getFirstTopicUrl()}>
                Start Learning Now
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="w-full rounded-full sm:w-auto font-bold px-10 h-14"
            >
              <Link href={getFirstModuleUrl()}>Browse All Topics</Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
