"use client"

import { PenIcon, SparklesIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

export function BentoGrid() {
  return (
    <section className="bg-muted/30 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1: The Editor Preview */}
          <div className="bg-foreground text-background relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-3xl p-10 md:col-span-2">
            <div className="relative z-10">
              <h3 className="mb-3 text-2xl font-black tracking-tighter">
                Interactive Visualizations
              </h3>
              <p className="text-background/80 max-w-sm text-sm font-medium leading-relaxed">
                Watch algorithms come to life with step-by-step visualizations.
                See how data structures work in real-time.
              </p>
            </div>

            {/* Flat UI representation */}
            <div className="bg-background absolute right-0 bottom-0 h-3/4 w-3/4 translate-x-12 translate-y-12 rounded-tl-3xl border-t border-l border-foreground/10 p-8 shadow-none transition-none">
              <div className="border-border mb-8 flex items-center justify-between border-b pb-4">
                <div className="bg-muted h-2 w-1/3 rounded" />
                <div className="bg-muted h-6 w-6 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="bg-muted h-2 w-full rounded" />
                <div className="bg-muted h-2 w-full rounded" />
                <div className="bg-muted h-2 w-5/6 rounded" />
                <div className="bg-muted h-2 w-4/6 rounded" />

                <div className="bg-muted/50 mt-8 rounded-xl p-6">
                  <div className="bg-foreground mb-4 h-3 w-8 rounded-full" />
                  <div className="space-y-2">
                    <div className="bg-foreground/20 h-1.5 w-full rounded" />
                    <div className="bg-foreground/20 h-1.5 w-2/3 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Features Stack */}
          <div className="flex flex-col gap-6">
            <div className="bg-card border-border flex-1 rounded-3xl border p-8 shadow-none transition-none">
              <div className="bg-muted mb-6 flex h-10 w-10 items-center justify-center rounded-xl">
                <IconWrapper icon={SparklesIcon} size={18} className="text-foreground" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-black tracking-tight">
                AI Tutor
              </h3>
              <p className="text-muted-foreground text-xs font-medium leading-relaxed">
                Get instant explanations and hints. Our AI adapts to your learning pace.
              </p>
            </div>

            <div className="bg-card border-border flex-1 rounded-3xl border p-8 shadow-none transition-none">
              <div className="bg-muted mb-6 flex h-10 w-10 items-center justify-center rounded-xl">
                <IconWrapper icon={PenIcon} size={18} className="text-foreground" />
              </div>
              <h3 className="text-foreground mb-2 text-lg font-black tracking-tight">
                500+ Problems
              </h3>
              <p className="text-muted-foreground text-xs font-medium leading-relaxed">
                Curated list of problems from easy to hard with detailed analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
