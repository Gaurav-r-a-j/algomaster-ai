"use client";

import { IconWrapper } from "@/components/common/icon-wrapper";
import { PenIcon, SparklesIcon } from "@/lib/icons";

export function BentoGrid() {
  return (
    <section className="px-4 sm:px-6 py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: The Editor Preview */}
          <div className="md:col-span-2 bg-primary rounded-3xl p-10 text-primary-foreground relative overflow-hidden group min-h-[440px] flex flex-col justify-between shadow-2xl shadow-primary/20 ring-1 ring-primary-foreground/10">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-3">Interactive Visualizations</h3>
              <p className="text-primary-foreground/80 max-w-sm text-sm leading-relaxed">
                Watch algorithms come to life with step-by-step visualizations. See how data structures work in real-time with animated code execution and interactive diagrams.
              </p>
            </div>

            {/* Abstract UI representation */}
            <div className="absolute right-0 bottom-0 w-3/4 h-3/4 bg-background rounded-tl-2xl p-6 shadow-2xl translate-x-12 translate-y-12 transition-transform duration-700 ease-out group-hover:translate-x-6 group-hover:translate-y-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full absolute -top-8 -left-8 blur-2xl opacity-50" />
              <div className="flex items-center justify-between mb-8 border-b border-border pb-4">
                <div className="w-1/3 h-4 bg-muted rounded" />
                <div className="w-8 h-8 rounded-full bg-muted" />
              </div>
              <div className="space-y-4">
                <div className="w-full h-3 bg-muted rounded" />
                <div className="w-full h-3 bg-muted rounded" />
                <div className="w-5/6 h-3 bg-muted rounded" />
                <div className="w-4/6 h-3 bg-muted rounded" />

                <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mt-6 flex gap-3 items-start">
                  <div className="w-4 h-4 bg-primary rounded-full mt-1 shrink-0" />
                  <div className="space-y-2 w-full">
                    <div className="w-full h-2 bg-primary/30 rounded" />
                    <div className="w-2/3 h-2 bg-primary/30 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Features Stack */}
          <div className="flex flex-col gap-6">
            <div className="flex-1 bg-card border border-border rounded-3xl p-8 hover:border-primary transition-colors shadow-sm hover:shadow-md group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconWrapper icon={SparklesIcon} size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                AI-Powered Tutor
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Get instant explanations, hints, and step-by-step guidance. Our AI tutor adapts to your learning pace and helps you understand complex concepts.
              </p>
            </div>

            <div className="flex-1 bg-card border border-border rounded-3xl p-8 hover:border-primary transition-colors shadow-sm hover:shadow-md group">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconWrapper icon={PenIcon} size={24} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                Curated Problems
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Solve 500+ problems from easy to hard. Each problem includes detailed solutions, time complexity analysis, and multiple approaches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

