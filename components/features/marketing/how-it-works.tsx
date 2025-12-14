"use client";

import { IconWrapper } from "@/components/common/icon-wrapper";
import { BriefcaseIcon, PenIcon, SparklesIcon } from "@/lib/icons";

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
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-muted text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-4">
            The Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Learn DSA in Three Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From beginner to interview-ready. Master data structures and algorithms at your own pace with our structured learning path.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-border via-primary/50 to-border z-0" />

          {steps.map((item, i) => (
            <div
              key={i}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 bg-card rounded-full border border-border flex items-center justify-center mb-6 shadow-sm group-hover:border-primary group-hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-muted text-foreground rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <IconWrapper icon={item.icon} size={24} />
                </div>
              </div>
              <div className="text-xs font-bold text-primary mb-2">
                STEP {item.step}
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

