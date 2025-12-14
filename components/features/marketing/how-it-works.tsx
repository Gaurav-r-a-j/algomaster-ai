"use client"

import { BriefcaseIcon, PenIcon, SparklesIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

const steps = [
  {
    icon: BriefcaseIcon,
    step: "01",
    title: "Choose Topic",
    desc: "Select from our comprehensive library of DSA topics and concepts.",
  },
  {
    icon: SparklesIcon,
    step: "02",
    title: "Learn & Visualize",
    desc: "Watch interactive visualizations and understand how algorithms work step-by-step.",
  },
  {
    icon: PenIcon,
    step: "03",
    title: "Practice & Master",
    desc: "Solve problems with AI guidance and track your progress as you improve.",
  },
]

export function HowItWorks() {
  return (
    <section className="bg-background border-border border-b py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-16 text-center">
          <div className="bg-muted text-muted-foreground mb-4 inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
            The Process
          </div>
          <h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">
            Learn DSA in Three Simple Steps
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            From beginner to interview-ready. Master data structures and
            algorithms at your own pace with our structured learning path.
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Connector Line (Desktop) */}
          <div className="from-border via-primary/50 to-border absolute top-12 right-[16%] left-[16%] z-0 hidden h-0.5 bg-gradient-to-r md:block" />

          {steps.map((item, i) => (
            <div
              key={i}
              className="group relative z-10 flex flex-col items-center text-center"
            >
              <div className="bg-card border-border group-hover:border-primary mb-6 flex h-24 w-24 items-center justify-center rounded-full border shadow-sm transition-all group-hover:shadow-md">
                <div className="bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full transition-colors">
                  <IconWrapper icon={item.icon} size={24} />
                </div>
              </div>
              <div className="text-primary mb-2 text-xs font-bold">
                STEP {item.step}
              </div>
              <h3 className="text-foreground mb-3 text-xl font-bold">
                {item.title}
              </h3>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
