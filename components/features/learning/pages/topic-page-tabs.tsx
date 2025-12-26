"use client"

import { VisualizerType } from "@/types/curriculum"
import { CheckmarkCircleIcon, CodeIcon, File01Icon, PlayIcon } from "@/lib/icons"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconWrapper } from "@/components/common/icon-wrapper"
import type { Topic } from "@/types/curriculum"

interface TopicPageTabsProps {
  topic: Topic
}

export function TopicPageTabs({ topic }: TopicPageTabsProps) {
  return (
    <TabsList
      variant="line"
      className="w-full h-10 justify-start border-b border-border px-4 sm:px-6 lg:px-8 -mx-4 sm:-mx-6 lg:-mx-8"
    >
      <TabsTrigger
        value="learn"
        className="gap-2 data-[state=active]:shadow-none"
      >
        <IconWrapper icon={File01Icon} size={16} />
        <span className="hidden sm:inline">Learn</span>
      </TabsTrigger>
      <TabsTrigger
        value="visualize"
        disabled={topic.visualizerType === VisualizerType.NONE}
        className="gap-2 data-[state=active]:shadow-none"
        title={
          topic.visualizerType === VisualizerType.NONE
            ? "No visualizer available"
            : "Interactive Mode"
        }
      >
        <IconWrapper icon={PlayIcon} size={16} />
        <span className="hidden sm:inline">Visualize</span>
      </TabsTrigger>
      <TabsTrigger
        value="code"
        className="gap-2 data-[state=active]:shadow-none"
      >
        <IconWrapper icon={CodeIcon} size={16} />
        <span className="hidden sm:inline">Practice</span>
      </TabsTrigger>
      <TabsTrigger
        value="quiz"
        className="gap-2 data-[state=active]:shadow-none"
      >
        <IconWrapper icon={CheckmarkCircleIcon} size={16} />
        <span className="hidden sm:inline">Test</span>
      </TabsTrigger>
    </TabsList>
  )
}

