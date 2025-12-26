"use client"

import { VisualizerType } from "@/types/curriculum"
import { File01Icon, CheckmarkCircleIcon, CodeIcon, PlayIcon } from "@/lib/icons"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IconWrapper } from "@/components/common/icon-wrapper"
import type { Topic } from "@/types/curriculum"

interface TopicPageTabsProps {
  topic: Topic
}

export function TopicPageTabs({ topic }: TopicPageTabsProps) {
  return (
    <TabsList className="grid h-9 shrink-0 grid-cols-4">
      <TabsTrigger
        value="learn"
        className="flex items-center gap-1.5 px-3 text-xs"
      >
        <IconWrapper icon={File01Icon} size={14} />
        <span className="hidden sm:inline">Learn</span>
      </TabsTrigger>
      <TabsTrigger
        value="visualize"
        disabled={topic.visualizerType === VisualizerType.NONE}
        className="flex items-center gap-1.5 px-3 text-xs"
        title={
          topic.visualizerType === VisualizerType.NONE
            ? "No visualizer available"
            : "Interactive Mode"
        }
      >
        <IconWrapper icon={PlayIcon} size={14} />
        <span className="hidden sm:inline">Visualize</span>
      </TabsTrigger>
      <TabsTrigger
        value="code"
        className="flex items-center gap-1.5 px-3 text-xs"
      >
        <IconWrapper icon={CodeIcon} size={14} />
        <span className="hidden sm:inline">Practice</span>
      </TabsTrigger>
      <TabsTrigger
        value="quiz"
        className="flex items-center gap-1.5 px-3 text-xs"
      >
        <IconWrapper icon={CheckmarkCircleIcon} size={14} />
        <span className="hidden sm:inline">Test</span>
      </TabsTrigger>
    </TabsList>
  )
}

