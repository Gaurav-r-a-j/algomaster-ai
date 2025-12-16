import { motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"

interface GraphRendererProps {
  currentData: VisualizationStep
}

export function GraphRenderer({ currentData }: GraphRendererProps) {
  const graphNodes = (currentData.auxiliary as any)?.nodes || []
  const graphEdges = (currentData.auxiliary as any)?.edges || []
  const activeNodeId = (currentData.auxiliary as any)?.activeNode

  return (
    <div className="relative h-[400px] w-full overflow-hidden p-6 sm:h-[500px]">
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
        {graphEdges.map((edge: any, i: number) => {
          const n1 = graphNodes.find((n: any) => n.id === edge.from)
          const n2 = graphNodes.find((n: any) => n.id === edge.to)
          if (!n1 || !n2) return null
          return (
            <motion.line
              key={i}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              x1={`${n1.x}%`}
              y1={`${n1.y}%`}
              x2={`${n2.x}%`}
              y2={`${n2.y}%`}
              className="text-muted-foreground"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
            />
          )
        })}
      </svg>
      {graphNodes.map((node: any) => {
        const isActive = activeNodeId === node.id
        return (
          <motion.div
            key={node.id}
            layoutId={`node-${node.id}`}
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
              scale: isActive ? 1.25 : 1,
              boxShadow: isActive
                ? "0 10px 25px -5px hsl(var(--primary) / 0.4)"
                : "0 4px 12px -2px rgb(0 0 0 / 0.1)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-2 text-base font-bold backdrop-blur-sm sm:h-14 sm:w-14 sm:text-lg"
          >
            {node.id}
          </motion.div>
        )
      })}
    </div>
  )
}
