"use client"

import { motion } from "motion/react"

import type { Topic } from "@/types/curriculum"
import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { HelpCircleIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"

import {
  DPVisualizer,
  DataStructureVisualizer,
  HeapVisualizer,
  PathfindingVisualizer,
  SearchVisualizer,
  SortingVisualizer,
} from "../visualizers"

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
    case VisualizerType.TRIE:
    case VisualizerType.HASH_TABLE:
    case VisualizerType.GRAPH:
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
      className="relative flex h-full w-full flex-col"
    >
      <motion.div
        variants={slideUp}
        transition={{ ...transitions.spring, delay: 0.1 }}
        className="relative flex h-full min-h-0 w-full flex-1 overflow-auto"
      >
        {renderVisualizer(topic)}
      </motion.div>
    </motion.div>
  )
}
