"use client"

import {
  BriefcaseIcon,
  CodeIcon,
  ComputerIcon,
  FileTextIcon,
  Home01Icon,
  SearchIcon,
  SettingsIcon,
  ShieldIcon,
  SparklesIcon,
  UsersIcon,
} from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

const topics = [
  { icon: CodeIcon, label: "Arrays" },
  { icon: ShieldIcon, label: "Linked Lists" },
  { icon: BriefcaseIcon, label: "Stacks & Queues" },
  { icon: Home01Icon, label: "Trees" },
  { icon: UsersIcon, label: "Graphs" },
  { icon: SettingsIcon, label: "Sorting" },
  { icon: SearchIcon, label: "Searching" },
  { icon: FileTextIcon, label: "Dynamic Programming" },
  { icon: SparklesIcon, label: "Greedy Algorithms" },
  { icon: ComputerIcon, label: "Backtracking" },
]

export function TopicsGrid() {
  return (
    <section className="bg-muted/30 border-border border-b py-24">
      <div className="mx-auto mb-12 max-w-7xl px-4 text-center sm:px-6">
        <h2 className="text-foreground mb-4 text-3xl font-bold">
          Comprehensive DSA Topics
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Master all essential data structures and algorithms with interactive
          lessons and practice problems.
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 md:grid-cols-5">
        {topics.map((item, i) => (
          <div
            key={i}
            className="border-border bg-card hover:border-primary group flex cursor-default flex-col items-center gap-3 rounded-xl border p-5 transition-all hover:shadow-lg"
          >
            <div className="text-muted-foreground group-hover:text-primary transition-colors">
              <IconWrapper icon={item.icon} size={24} />
            </div>
            <span className="text-foreground group-hover:text-foreground text-sm font-bold">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
