import { TreeNode as TreeNodeType } from "@/utils/algorithm-logic"
import { Squares2X2Icon } from "@heroicons/react/24/outline"
import { AnimatePresence, motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

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
  const { root, highlightNodeId } = (currentData.auxiliary as {
    root?: TreeNodeType
    highlightNodeId?: string
  }) || { root: null }

  const treeData = renderTreeNodes(root || null, highlightNodeId || null)

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-xl border bg-slate-50/50 shadow-inner dark:bg-slate-900/50">
      {/* Simple Dot Pattern Background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        {treeData.edges.map((edge) => (
          <line
            key={edge.id}
            x1={`${edge.x1}%`}
            y1={`${edge.y1}px`}
            x2={`${edge.x2}%`}
            y2={`${edge.y2}px`}
            stroke="currentColor"
            strokeOpacity="0.4"
            strokeWidth="2.5"
            strokeLinecap="round"
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
                scale: isHighlighed ? 1.2 : 1,
                opacity: 1,
                backgroundColor: isHighlighed
                  ? "hsl(var(--primary))"
                  : "hsl(var(--card))",
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
                  ? "0 0 20px hsl(var(--primary)/0.4)"
                  : "0 2px 4px rgb(0 0 0 / 0.1)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 text-sm font-bold"
            >
              {node.val}
            </motion.div>
          )
        })}
      </AnimatePresence>
      {treeData.nodes.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground/50 flex flex-col items-center gap-2">
            <Squares2X2Icon className="h-10 w-10" />
            <span className="text-sm font-medium">Empty Tree</span>
          </div>
        </div>
      )}
    </div>
  )
}
