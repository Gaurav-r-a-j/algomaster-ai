"use client"

import * as React from "react"
import * as d3 from "d3"
import { cn } from "@/lib/utils"

interface VisualDiagramProps {
  type: "array" | "linked-list" | "tree" | "graph" | "queue" | "stack"
  data?: any
  className?: string
}

export function VisualDiagram({
  type,
  data,
  className,
}: VisualDiagramProps) {
  const svgRef = React.useRef<SVGSVGElement>(null)

  React.useEffect(() => {
    if (!svgRef.current) {
      return
    }

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove()

    const container = svgRef.current.parentElement
    const width = container?.clientWidth || 600
    const height = 300
    svg.attr("width", width).attr("height", height)
    
    // Add arrow marker for linked list
    svg.append("defs").append("marker")
      .attr("id", "arrowhead")
      .attr("refX", 10)
      .attr("refY", 0)
      .attr("markerWidth", 10)
      .attr("markerHeight", 10)
      .attr("orient", "auto")
      .append("polygon")
      .attr("points", "0,0 10,5 0,10")
      .attr("fill", "#9c27b0")

    switch (type) {
      case "array":
        renderArray(svg, width, height, data)
        break
      case "queue":
        renderQueue(svg, width, height, data)
        break
      case "stack":
        renderStack(svg, width, height, data)
        break
      case "linked-list":
        renderLinkedList(svg, width, height, data)
        break
      default:
        break
    }
  }, [type, data])

  return (
    <div className={cn("my-6 rounded-lg border border-border bg-background p-4", className)}>
      <svg ref={svgRef} className="w-full" />
    </div>
  )
}

function renderArray(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  data: number[] = [10, 20, 30, 40, 50]
) {
  const cellWidth = 80
  const cellHeight = 60
  const startX = (width - data.length * cellWidth) / 2
  const startY = (height - cellHeight) / 2

  data.forEach((value, i) => {
    const x = startX + i * cellWidth

    // Cell
    svg
      .append("rect")
      .attr("x", x)
      .attr("y", startY)
      .attr("width", cellWidth - 4)
      .attr("height", cellHeight)
      .attr("fill", "#e3f2fd")
      .attr("stroke", "#1976d2")
      .attr("stroke-width", 2)
      .attr("rx", 4)

    // Value
    svg
      .append("text")
      .attr("x", x + cellWidth / 2 - 2)
      .attr("y", startY + cellHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "18")
      .attr("font-weight", "bold")
      .attr("fill", "#1976d2")
      .text(value)

    // Index
    svg
      .append("text")
      .attr("x", x + cellWidth / 2 - 2)
      .attr("y", startY + cellHeight + 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "12")
      .attr("fill", "#666")
      .text(i)
  })
}

function renderQueue(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  data: number[] = [10, 20, 30]
) {
  const cellWidth = 70
  const cellHeight = 50
  const startX = (width - data.length * cellWidth) / 2
  const startY = (height - cellHeight) / 2

  data.forEach((value, i) => {
    const x = startX + i * cellWidth

    svg
      .append("rect")
      .attr("x", x)
      .attr("y", startY)
      .attr("width", cellWidth - 4)
      .attr("height", cellHeight)
      .attr("fill", "#c8e6c9")
      .attr("stroke", "#4caf50")
      .attr("stroke-width", 2)
      .attr("rx", 4)

    svg
      .append("text")
      .attr("x", x + cellWidth / 2 - 2)
      .attr("y", startY + cellHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "16")
      .attr("font-weight", "bold")
      .attr("fill", "#2e7d32")
      .text(value)
  })

  // Front arrow
  svg
    .append("text")
    .attr("x", startX - 20)
    .attr("y", startY + cellHeight / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "12")
    .attr("fill", "#f44336")
    .text("Front")

  // Rear arrow
  svg
    .append("text")
    .attr("x", startX + data.length * cellWidth + 20)
    .attr("y", startY + cellHeight / 2)
    .attr("text-anchor", "middle")
    .attr("font-size", "12")
    .attr("fill", "#f44336")
    .text("Rear")
}

function renderStack(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  data: number[] = [10, 20, 30]
) {
  const cellWidth = 100
  const cellHeight = 40
  const startX = width / 2 - cellWidth / 2
  const startY = height - data.length * cellHeight - 40

  data.forEach((value, i) => {
    const y = startY + i * cellHeight

    svg
      .append("rect")
      .attr("x", startX)
      .attr("y", y)
      .attr("width", cellWidth)
      .attr("height", cellHeight - 2)
      .attr("fill", "#fff3e0")
      .attr("stroke", "#ff9800")
      .attr("stroke-width", 2)
      .attr("rx", 4)

    svg
      .append("text")
      .attr("x", startX + cellWidth / 2)
      .attr("y", y + cellHeight / 2)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "16")
      .attr("font-weight", "bold")
      .attr("fill", "#e65100")
      .text(value)
  })

  // Top label
  svg
    .append("text")
    .attr("x", startX + cellWidth / 2)
    .attr("y", startY - 20)
    .attr("text-anchor", "middle")
    .attr("font-size", "12")
    .attr("fill", "#f44336")
    .text("Top")
}

function renderLinkedList(
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  width: number,
  height: number,
  data: number[] = [10, 20, 30]
) {
  const nodeWidth = 100
  const nodeHeight = 50
  const startX = (width - data.length * (nodeWidth + 40)) / 2
  const startY = height / 2

  data.forEach((value, i) => {
    const x = startX + i * (nodeWidth + 40)

    // Node box
    svg
      .append("rect")
      .attr("x", x)
      .attr("y", startY - nodeHeight / 2)
      .attr("width", nodeWidth)
      .attr("height", nodeHeight)
      .attr("fill", "#e1bee7")
      .attr("stroke", "#9c27b0")
      .attr("stroke-width", 2)
      .attr("rx", 4)

    // Value
    svg
      .append("text")
      .attr("x", x + nodeWidth / 2)
      .attr("y", startY)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "16")
      .attr("font-weight", "bold")
      .attr("fill", "#6a1b9a")
      .text(value)

    // Arrow to next
    if (i < data.length - 1) {
      svg
        .append("line")
        .attr("x1", x + nodeWidth)
        .attr("y1", startY)
        .attr("x2", x + nodeWidth + 40)
        .attr("y2", startY)
        .attr("stroke", "#9c27b0")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#arrowhead)")

      svg
        .append("polygon")
        .attr("points", `${x + nodeWidth + 40},${startY} ${x + nodeWidth + 30},${startY - 5} ${x + nodeWidth + 30},${startY + 5}`)
        .attr("fill", "#9c27b0")
    }
  })
}

