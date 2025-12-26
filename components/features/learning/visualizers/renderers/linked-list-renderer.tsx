"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"
import { motion } from "motion/react"

import type { VisualizationStep } from "@/types/curriculum"
import { transitions } from "@/lib/animations"

interface LinkedListRendererProps {
  currentData: VisualizationStep
}

export function LinkedListRenderer({ currentData }: LinkedListRendererProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Ensure we have data
  if (!currentData || !currentData.array || currentData.array.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <p className="text-muted-foreground text-center text-sm">
          No data to visualize. Click Reset to generate visualization.
        </p>
      </div>
    )
  }

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return

    const svg = d3.select(svgRef.current)
    svg.selectAll("*").remove() // Clear previous render

    const containerWidth = containerRef.current.clientWidth || 800
    const height = 200
    const nodeRadius = 32
    const nodeSpacing = 140
    const padding = 50
    const startX = padding
    const centerY = height / 2

    // Calculate total width needed
    const totalWidth = Math.max(
      containerWidth,
      startX + currentData.array.length * nodeSpacing + padding + 60
    )

    svg.attr("width", totalWidth).attr("height", height)

    // Create container group
    const container = svg.append("g").attr("transform", `translate(0, ${centerY})`)

    // Add glow filter for active nodes
    const defs = svg.append("defs")
    const glowFilter = defs.append("filter").attr("id", "glow")
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "5").attr("result", "coloredBlur")
    const feMerge = glowFilter.append("feMerge")
    feMerge.append("feMergeNode").attr("in", "coloredBlur")
    feMerge.append("feMergeNode").attr("in", "SourceGraphic")

    // Draw nodes and connections
    currentData.array.forEach((val, idx) => {
      const x = startX + idx * nodeSpacing
      const isActive = currentData.activeIndices.includes(idx)

      // Draw connection line (except for first node)
      if (idx > 0) {
        const prevX = startX + (idx - 1) * nodeSpacing
        const prevIsActive = currentData.activeIndices.includes(idx - 1)
        const lineIsActive = isActive || prevIsActive

        const line = container
          .append("line")
          .attr("x1", prevX + nodeRadius)
          .attr("y1", 0)
          .attr("x2", x - nodeRadius)
          .attr("y2", 0)
          .attr("stroke", lineIsActive ? "hsl(var(--primary))" : "hsl(var(--border))")
          .attr("stroke-width", lineIsActive ? 3 : 2.5)
          .attr("opacity", lineIsActive ? 0.9 : 0.5)

        // Draw arrow
        const arrow = container
          .append("path")
          .attr(
            "d",
            `M ${x - nodeRadius - 8} 0 L ${x - nodeRadius - 20} -6 L ${x - nodeRadius - 20} 6 Z`
          )
          .attr("fill", lineIsActive ? "hsl(var(--primary))" : "hsl(var(--border))")
          .attr("opacity", lineIsActive ? 1 : 0.5)
      }

      // Draw node circle
      const nodeGroup = container.append("g").attr("transform", `translate(${x}, 0)`)

      const circle = nodeGroup
        .append("circle")
        .attr("r", isActive ? nodeRadius * 1.2 : nodeRadius)
        .attr("fill", isActive ? "hsl(var(--primary))" : "hsl(var(--background))")
        .attr("stroke", isActive ? "hsl(var(--primary))" : "hsl(var(--border))")
        .attr("stroke-width", isActive ? 4 : 2)
        .attr("opacity", 1)
        .attr("filter", isActive ? "url(#glow)" : "none")

      // Animate circle on state change
      circle
        .transition()
        .duration(300)
        .ease(d3.easeCubicOut)
        .attr("r", isActive ? nodeRadius * 1.2 : nodeRadius)
        .attr("stroke-width", isActive ? 4 : 2)
        .attr("fill", isActive ? "hsl(var(--primary))" : "hsl(var(--background))")
        .attr("stroke", isActive ? "hsl(var(--primary))" : "hsl(var(--border))")

      // Draw value text
      const text = nodeGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))")
        .attr("font-size", "20")
        .attr("font-weight", "bold")
        .attr("font-family", "system-ui, -apple-system, sans-serif")
        .text(val)

      // Animate text color on state change
      text
        .transition()
        .duration(300)
        .attr("fill", isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))")

      // Draw label (HEAD or index)
      nodeGroup
        .append("text")
        .attr("text-anchor", "middle")
        .attr("y", nodeRadius + 25)
        .attr("fill", "hsl(var(--muted-foreground))")
        .attr("font-size", "11")
        .attr("font-family", "monospace")
        .attr("font-weight", "600")
        .text(idx === 0 ? "HEAD" : `#${idx}`)
    })

    // Draw NULL at the end
    const nullX = startX + currentData.array.length * nodeSpacing
    container
      .append("line")
      .attr("x1", startX + (currentData.array.length - 1) * nodeSpacing + nodeRadius)
      .attr("y1", 0)
      .attr("x2", nullX - 25)
      .attr("y2", 0)
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", "6,6")
      .attr("opacity", 0.4)

    container
      .append("rect")
      .attr("x", nullX - 25)
      .attr("y", -18)
      .attr("width", 50)
      .attr("height", 36)
      .attr("rx", 10)
      .attr("fill", "hsl(var(--muted))")
      .attr("stroke", "hsl(var(--border))")
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", "4,4")
      .attr("opacity", 0.7)

    container
      .append("text")
      .attr("x", nullX)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "hsl(var(--muted-foreground))")
      .attr("font-size", "13")
      .attr("font-family", "monospace")
      .attr("font-weight", "bold")
      .text("NULL")
  }, [currentData])

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full items-center justify-center overflow-x-auto rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg sm:p-8"
    >
      <motion.svg
        ref={svgRef}
        className="w-full"
        style={{ minHeight: "200px", height: "200px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={transitions.smooth}
      />
    </div>
  )
}
