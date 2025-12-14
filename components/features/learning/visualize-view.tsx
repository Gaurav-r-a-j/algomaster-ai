"use client"

import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { HelpCircleIcon } from "@/lib/icons"
import { Card } from "@/components/ui/card"
import { IconWrapper } from "@/components/common/icon-wrapper"

import { DataStructureVisualizer } from "./visualizers/data-structure-visualizer"
import { DPVisualizer } from "./visualizers/dp-visualizer"
import { HeapVisualizer } from "./visualizers/heap-visualizer"
import { PathfindingVisualizer } from "./visualizers/pathfinding-visualizer"
import { SearchVisualizer } from "./visualizers/search-visualizer"
import { SortingVisualizer } from "./visualizers/sorting-visualizer"

interface VisualizeViewProps {
  topic: Topic
}

function renderVisualizer(topic: Topic) {
  switch (topic.visualizerType) {
    case VisualizerType.BAR_CHART:
      return <SortingVisualizer topic={topic} />
    case VisualizerType.GRID:
      return <SearchVisualizer topic={topic} />
    case VisualizerType.STACK:
    case VisualizerType.QUEUE:
    case VisualizerType.LINKED_LIST:
    case VisualizerType.BINARY_TREE:
    case VisualizerType.AVL_TREE:
      return <DataStructureVisualizer topic={topic} />
    case VisualizerType.PATHFINDING:
      return <PathfindingVisualizer topic={topic} />
    case VisualizerType.HEAP:
      return <HeapVisualizer topic={topic} />
    case VisualizerType.DP:
      return <DPVisualizer topic={topic} />
    default:
      return (
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transitions.smooth}
          className="text-muted-foreground flex h-full items-center justify-center p-10 text-center"
        >
          <motion.div
            variants={slideUp}
            className="flex flex-col items-center gap-4"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <IconWrapper
                icon={HelpCircleIcon}
                size={40}
                className="text-muted-foreground"
              />
            </motion.div>
            <span>No interactive visualizer available for this topic.</span>
          </motion.div>
        </motion.div>
      )
  }
}

export function VisualizeView({ topic }: VisualizeViewProps) {
  if (topic.visualizerType === VisualizerType.NONE) {
    return (
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={transitions.smooth}
        className="text-muted-foreground flex h-full items-center justify-center p-10 text-center"
      >
        <motion.div
          variants={slideUp}
          className="flex flex-col items-center gap-4"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <IconWrapper
              icon={HelpCircleIcon}
              size={40}
              className="text-muted-foreground"
            />
          </motion.div>
          <span>No interactive visualizer available for this topic.</span>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="flex h-full flex-col"
    >
      <motion.div
        variants={slideUp}
        transition={{ ...transitions.spring, delay: 0.1 }}
      >
        <Card className="relative min-h-[500px] flex-1 overflow-hidden">
          {renderVisualizer(topic)}
        </Card>
      </motion.div>
    </motion.div>
  )
}
