"use client";

import { IconWrapper } from "@/components/common/icon-wrapper";
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
} from "@/lib/icons";

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
];

export function TopicsGrid() {
  return (
    <section className="py-24 bg-muted/30 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Comprehensive DSA Topics
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Master all essential data structures and algorithms with interactive
          lessons and practice problems.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 px-4 sm:px-6">
        {topics.map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-primary hover:shadow-lg transition-all cursor-default group"
          >
            <div className="text-muted-foreground group-hover:text-primary transition-colors">
              <IconWrapper icon={item.icon} size={24} />
            </div>
            <span className="text-sm font-bold text-foreground group-hover:text-foreground">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

