"use client"

import * as React from "react"
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Node,
  Edge,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"

// Custom Diamond Node for decisions
const DiamondNode = ({ data }: { data: { label: string } }) => {
  return (
    <div className="flex items-center justify-center">
      <Handle type="target" position={Position.Top} />
      <div 
        className="flex items-center justify-center text-xs font-medium text-center p-2"
        style={{
          width: '120px',
          height: '80px',
          background: '#fff3e0',
          border: '2px solid #ff9800',
          transform: 'rotate(45deg)',
          position: 'relative',
        }}
      >
        <div style={{ transform: 'rotate(-45deg)', position: 'absolute' }}>
          {data.label}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
      <Handle type="source" position={Position.Left} id="left" />
      <Handle type="source" position={Position.Right} id="right" />
    </div>
  )
}

const nodeTypes = {
  diamond: DiamondNode,
}

interface FlowchartRendererProps {
  nodes: Node[]
  edges: Edge[]
  className?: string
}

export function FlowchartRenderer({
  nodes,
  edges,
  className,
}: FlowchartRendererProps) {
  return (
    <div className={`my-6 h-[500px] rounded-lg border-2 border-primary/20 bg-gradient-to-br from-background to-muted/30 shadow-lg ${className || ""}`}>
      <div className="border-b border-primary/20 bg-primary/10 px-4 py-2">
        <span className="text-primary text-xs font-semibold uppercase tracking-wider">Flowchart</span>
      </div>
      <div className="h-[calc(100%-40px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          className="bg-transparent"
          nodeTypes={nodeTypes}
          defaultEdgeOptions={{
            type: "smoothstep",
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
            style: {
              strokeWidth: 2,
              stroke: "hsl(var(--primary))",
            },
          }}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <Controls 
            showInteractive={false}
            className="bg-background/80 border border-border rounded-lg shadow-md"
          />
          <MiniMap 
            className="bg-background/80 border border-border rounded-lg"
            nodeColor={(node) => {
              if (node.type === "diamond") return "hsl(var(--primary))"
              return "hsl(var(--muted-foreground))"
            }}
          />
        </ReactFlow>
      </div>
    </div>
  )
}

// Helper to create flowchart from simple text description
export function createFlowchartFromText(description: string): {
  nodes: Node[]
  edges: Edge[]
} {
  // Simple parser for basic flowcharts
  // Format: START -> PROCESS -> DECISION -> END
  const lines = description.split("\n").filter((l) => l.trim())
  const nodes: Node[] = []
  const edges: Edge[] = []
  let yPos = 50
  let nodeId = 0

  lines.forEach((line) => {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) return

    // Detect node type
    let nodeType = "default"
    let label = trimmed

    if (trimmed.toUpperCase().includes("START") || trimmed.toUpperCase().includes("END")) {
      nodeType = "ellipse"
    } else if (trimmed.includes("?") || trimmed.toUpperCase().includes("IF")) {
      nodeType = "diamond"
    } else if (trimmed.toUpperCase().includes("INPUT") || trimmed.toUpperCase().includes("OUTPUT")) {
      nodeType = "parallelogram"
    }

    nodes.push({
      id: `node-${nodeId}`,
      type: nodeType === "diamond" ? "diamond" : "default",
      position: { x: 200, y: yPos },
      data: { label },
      style: {
        background: nodeType === "ellipse" ? "#e3f2fd" : nodeType === "diamond" ? "#fff3e0" : "#f3e5f5",
        border: "2px solid #1976d2",
        borderRadius: nodeType === "ellipse" ? "50%" : nodeType === "diamond" ? "0" : "8px",
        padding: "10px",
        minWidth: "120px",
      },
    })

    if (nodeId > 0) {
      edges.push({
        id: `edge-${nodeId - 1}`,
        source: `node-${nodeId - 1}`,
        target: `node-${nodeId}`,
        type: "smoothstep",
      })
    }

    nodeId++
    yPos += 100
  })

  return { nodes, edges }
}

