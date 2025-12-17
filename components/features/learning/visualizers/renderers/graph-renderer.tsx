import { motion } from "motion/react"

import type { GraphAuxiliary, VisualizationStep } from "@/types/curriculum"
import { transitions } from "@/lib/animations"

interface GraphRendererProps {
  currentData: VisualizationStep
}

interface GraphNode {
  id: string | number
  x: number
  y: number
}

interface GraphEdge {
  from: string | number
  to: string | number
}

export function GraphRenderer({ currentData }: GraphRendererProps) {
  if (!currentData || !currentData.auxiliary) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground text-center text-sm">
          No data to visualize. Click Reset to generate visualization.
        </p>
      </div>
    )
  }

  const auxiliary = (currentData.auxiliary || {}) as GraphAuxiliary
  const graphNodes: GraphNode[] = auxiliary.nodes || []
  const graphEdges: GraphEdge[] = auxiliary.edges || []
  const activeNodeId = auxiliary.activeNode

  if (graphNodes.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground text-center text-sm">
          No graph data available. Click Reset to generate visualization.
        </p>
      </div>
    )
  }

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 sm:h-[550px]">
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="22"
            refY="3.5"
            orient="auto"
          >
            <polygon
              points="0 0, 10 3.5, 0 7"
              className="text-muted-foreground"
              fill="currentColor"
            />
          </marker>
        </defs>
        {graphEdges.map((edge, i) => {
          const n1 = graphNodes.find((n) => n.id === edge.from)
          const n2 = graphNodes.find((n) => n.id === edge.to)
          if (!n1 || !n2) return null
          return (
            <motion.line
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.4 }}
              transition={transitions.spring}
              x1={`${n1.x}%`}
              y1={`${n1.y}%`}
              x2={`${n2.x}%`}
              y2={`${n2.y}%`}
              className="text-muted-foreground"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              markerEnd="url(#arrowhead)"
            />
          )
        })}
      </svg>
      {graphNodes.map((node) => {
        const isActive = activeNodeId === node.id
        return (
          <motion.div
            key={node.id}
            layoutId={`node-${node.id}`}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              backgroundColor: isActive
                ? "hsl(var(--primary))"
                : "hsl(var(--background))",
              borderColor: isActive
                ? "hsl(var(--primary))"
                : "hsl(var(--border))",
              color: isActive
                ? "hsl(var(--primary-foreground))"
                : "hsl(var(--foreground))",
              scale: isActive ? 1.3 : 1,
              opacity: 1,
              boxShadow: isActive
                ? "0 10px 25px -5px hsl(var(--primary) / 0.5)"
                : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
            }}
            transition={transitions.spring}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-2 text-lg font-bold backdrop-blur-sm shadow-lg sm:h-18 sm:w-18 sm:text-xl md:h-20 md:w-20 md:text-2xl"
          >
            {node.id}
          </motion.div>
        )
      })}
    </div>
  )
}
