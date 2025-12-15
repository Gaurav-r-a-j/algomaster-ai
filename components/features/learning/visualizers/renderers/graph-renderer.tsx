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
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 shadow-inner">
            <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}></div>

            <svg className="absolute inset-0 h-full w-full pointer-events-none">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" className="text-muted-foreground" fill="currentColor" />
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
                            strokeOpacity="0.4"
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
                            backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--card))",
                            borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                            color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                            scale: isActive ? 1.25 : 1,
                            boxShadow: isActive ? "0 0 20px hsl(var(--primary)/0.3)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        style={{ left: `${node.x}%`, top: `${node.y}%` }}
                        className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-2 text-lg font-bold"
                    >
                        {node.id}
                    </motion.div>
                )
            })}
        </div>
    )
}
