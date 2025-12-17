import { TreeNode as TreeNodeType } from "@/utils/algorithms/algorithm-logic"
import { Squares2X2Icon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef } from "react"
import * as d3 from "d3"

import type { VisualizationStep } from "@/types/curriculum"
import { transitions } from "@/lib/animations"

// Tree Rendering Helper
const renderTreeNodes = (
  root: TreeNodeType | null,
  highlightId: string | null
) => {
  if (!root) return { nodes: [], edges: [] }

  const nodes: TreeNodeType[] = []
  const edges: {
    x1: number
    y1: number
    x2: number
    y2: number
    id: string
  }[] = []

  const traverse = (node: TreeNodeType) => {
    nodes.push(node)
    if (node.left) {
      edges.push({
        x1: node.x,
        y1: node.y + 12, // + offset for node center/bottom
        x2: node.left.x,
        y2: node.left.y,
        id: `${node.id}-${node.left.id}`,
      })
      traverse(node.left)
    }
    if (node.right) {
      edges.push({
        x1: node.x,
        y1: node.y + 12,
        x2: node.right.x,
        y2: node.right.y,
        id: `${node.id}-${node.right.id}`,
      })
      traverse(node.right)
    }
  }

  traverse(root)
  return { nodes, edges }
}

interface TreeRendererProps {
  currentData: VisualizationStep
}

export function TreeRenderer({ currentData }: TreeRendererProps) {
  if (!currentData || !currentData.auxiliary) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground text-center text-sm">
          No data to visualize. Click Reset to generate visualization.
        </p>
      </div>
    )
  }

  const { root, highlightNodeId } = (currentData.auxiliary as {
    root?: TreeNodeType
    highlightNodeId?: string
  }) || { root: null }

  if (!root) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground text-center text-sm">
          No tree data available. Click Reset to generate visualization.
        </p>
      </div>
    )
  }

  const treeData = renderTreeNodes(root || null, highlightNodeId || null)

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 sm:h-[550px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {treeData.edges.map((edge) => (
          <motion.line
            key={edge.id}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={transitions.spring}
            x1={`${edge.x1}%`}
            y1={`${edge.y1}px`}
            x2={`${edge.x2}%`}
            y2={`${edge.y2}px`}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-muted-foreground"
          />
        ))}
      </svg>
      <AnimatePresence>
        {treeData.nodes.map((node) => {
          const isHighlighed = highlightNodeId === node.id
          return (
            <motion.div
              key={node.id}
              layoutId={node.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: isHighlighed ? 1.25 : 1,
                opacity: 1,
                backgroundColor: isHighlighed
                  ? "hsl(var(--primary))"
                  : "hsl(var(--background))",
                borderColor: isHighlighed
                  ? "hsl(var(--primary))"
                  : "hsl(var(--border))",
                color: isHighlighed
                  ? "hsl(var(--primary-foreground))"
                  : "hsl(var(--foreground))",
                left: `${node.x}%`,
                top: `${node.y}px`,
                zIndex: isHighlighed ? 20 : 10,
                boxShadow: isHighlighed
                  ? "0 10px 25px -5px hsl(var(--primary) / 0.5)"
                  : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
              }}
              transition={transitions.spring}
              className="absolute flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full border-2 text-lg font-bold backdrop-blur-sm shadow-lg sm:h-18 sm:w-18 sm:text-xl md:h-20 md:w-20 md:text-2xl"
            >
              {node.val}
            </motion.div>
          )
        })}
      </AnimatePresence>
      {treeData.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
            <Squares2X2Icon className="h-10 w-10" />
            <span className="text-sm font-medium">Empty Tree</span>
          </div>
        </div>
      )}
    </div>
  )
}
