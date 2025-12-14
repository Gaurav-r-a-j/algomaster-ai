"use client"

import { PenIcon, SparklesIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

export function BentoGrid() {
  return (
    <section className="bg-muted/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: The Editor Preview */}
          <div className="bg-primary text-primary-foreground group shadow-primary/20 ring-primary-foreground/10 relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-3xl p-10 shadow-2xl ring-1 md:col-span-2">
            <div className="relative z-10">
              <h3 className="mb-3 text-2xl font-bold">
                Interactive Visualizations
              </h3>
              <p className="text-primary-foreground/80 max-w-sm text-sm leading-relaxed">
                Watch algorithms come to life with step-by-step visualizations.
                See how data structures work in real-time with animated code
                execution and interactive diagrams.
              </p>
            </div>

            {/* Abstract UI representation */}
            <div className="bg-background absolute right-0 bottom-0 h-3/4 w-3/4 translate-x-12 translate-y-12 rounded-tl-2xl p-6 shadow-2xl transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-6">
              <div className="bg-primary/20 absolute -top-8 -left-8 h-16 w-16 rounded-full opacity-50 blur-2xl" />
              <div className="border-border mb-8 flex items-center justify-between border-b pb-4">
                <div className="bg-muted h-4 w-1/3 rounded" />
                <div className="bg-muted h-8 w-8 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="bg-muted h-3 w-full rounded" />
                <div className="bg-muted h-3 w-full rounded" />
                <div className="bg-muted h-3 w-5/6 rounded" />
                <div className="bg-muted h-3 w-4/6 rounded" />

                <div className="bg-primary/10 border-primary/20 mt-6 flex items-start gap-3 rounded-lg border p-4">
                  <div className="bg-primary mt-1 h-4 w-4 shrink-0 rounded-full" />
                  <div className="w-full space-y-2">
                    <div className="bg-primary/30 h-2 w-full rounded" />
                    <div className="bg-primary/30 h-2 w-2/3 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Features Stack */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border-border hover:border-primary group flex-1 rounded-3xl border p-8 shadow-sm transition-colors hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                <IconWrapper icon={SparklesIcon} size={24} />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold">
                AI-Powered Tutor
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Get instant explanations, hints, and step-by-step guidance. Our
                AI tutor adapts to your learning pace and helps you understand
                complex concepts.
              </p>
            </div>

            <div className="bg-card border-border hover:border-primary group flex-1 rounded-3xl border p-8 shadow-sm transition-colors hover:shadow-md">
              <div className="bg-primary/10 text-primary mb-6 flex h-12 w-12 items-center justify-center rounded-2xl transition-transform group-hover:scale-110">
                <IconWrapper icon={PenIcon} size={24} />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-bold">
                Curated Problems
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Solve 500+ problems from easy to hard. Each problem includes
                detailed solutions, time complexity analysis, and multiple
                approaches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
