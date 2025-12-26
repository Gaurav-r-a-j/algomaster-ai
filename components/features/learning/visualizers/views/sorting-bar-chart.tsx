"use client"

import { useEffect, useRef } from "react"
import * as d3 from "d3"

interface SortingBarChartProps {
  data: number[]
  activeIndices: number[]
  sortedIndices: number[]
}

export function SortingBarChart({
  data,
  activeIndices,
  sortedIndices,
}: SortingBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || data.length === 0) return

    const container = containerRef.current
    const svg = svgRef.current

    // Clear previous content
    d3.select(svg).selectAll("*").remove()

    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 40, left: 40 }
    const width = container.clientWidth - margin.left - margin.right
    const height = Math.max(400, container.clientHeight || 400) - margin.top - margin.bottom

    // Create scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((_, i) => i.toString()))
      .range([0, width])
      .padding(0.1)

    const maxValue = Math.max(...data, 1)
    const yScale = d3
      .scaleLinear()
      .domain([0, maxValue * 1.1])
      .nice()
      .range([height, 0])

    // Set SVG dimensions first
    const svgSelection = d3
      .select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    // Add gradient and filter definitions to SVG (before creating bars)
    const defs = svgSelection.append("defs")
    
    // Add glow filter for active bars
    const glowFilter = defs.append("filter").attr("id", "glow")
    glowFilter.append("feGaussianBlur")
      .attr("stdDeviation", "3")
      .attr("result", "coloredBlur")
    const feMerge = glowFilter.append("feMerge")
    feMerge.append("feMergeNode").attr("in", "coloredBlur")
    feMerge.append("feMergeNode").attr("in", "SourceGraphic")

    // Create SVG group
    const g = svgSelection
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
    
    // Active gradient (amber/orange)
    const activeGradient = defs.append("linearGradient")
      .attr("id", "activeGradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%")
    activeGradient.append("stop").attr("offset", "0%").attr("stop-color", "#f59e0b")
    activeGradient.append("stop").attr("offset", "100%").attr("stop-color", "#d97706")
    
    // Sorted gradient (green)
    const sortedGradient = defs.append("linearGradient")
      .attr("id", "sortedGradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%")
    sortedGradient.append("stop").attr("offset", "0%").attr("stop-color", "#10b981")
    sortedGradient.append("stop").attr("offset", "100%").attr("stop-color", "#059669")
    
    // Default gradient (gray)
    const defaultGradient = defs.append("linearGradient")
      .attr("id", "defaultGradient")
      .attr("x1", "0%").attr("y1", "0%")
      .attr("x2", "0%").attr("y2", "100%")
    defaultGradient.append("stop").attr("offset", "0%").attr("stop-color", "#6b7280")
    defaultGradient.append("stop").attr("offset", "100%").attr("stop-color", "#4b5563")
    
    // Enhanced color function with gradients
    const getColor = (index: number) => {
      if (activeIndices.includes(index)) return "url(#activeGradient)" // Active comparison
      if (sortedIndices.includes(index)) return "url(#sortedGradient)" // Already sorted
      return "url(#defaultGradient)" // Default state
    }

    // Create bars with initial state
    const bars = g
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => xScale(i.toString()) || 0)
      .attr("y", height) // Start from bottom
      .attr("width", xScale.bandwidth())
      .attr("height", 0) // Start with height 0
      .attr("fill", (_, i) => getColor(i))
      .attr("rx", 6)
      .attr("ry", 6)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", (_, i) => (activeIndices.includes(i) ? 1 : 0.85))
      .attr("filter", (_, i) => activeIndices.includes(i) ? "url(#glow)" : "none")
    
    // Animate bars appearing
    bars
      .transition()
      .duration(500)
      .ease(d3.easeElasticOut)
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - yScale(d))

    // Add value labels on bars
    g.selectAll(".value-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "value-label")
      .attr("x", (_, i) => (xScale(i.toString()) || 0) + xScale.bandwidth() / 2)
      .attr("y", (d) => yScale(d) - 5)
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text((d) => d)

    // Add index labels below bars
    g.selectAll(".index-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "index-label")
      .attr("x", (_, i) => (xScale(i.toString()) || 0) + xScale.bandwidth() / 2)
      .attr("y", height + 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#9ca3af")
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .text((_, i) => i)

    // Add X axis
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => ""))
      .attr("opacity", 0)

    // Add Y axis
    g.append("g")
      .call(d3.axisLeft(yScale).ticks(8))
      .attr("color", "#9ca3af")
      .selectAll("text")
      .attr("fill", "#9ca3af")
      .attr("font-size", "11px")

    // Add grid lines
    g.append("g")
      .attr("class", "grid")
      .attr("transform", `translate(0,${height})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(-height)
          .tickFormat(() => "")
      )
      .attr("opacity", 0.1)
      .selectAll("line")
      .attr("stroke", "#9ca3af")
      .attr("stroke-dasharray", "2,2")

    // Enhanced animation with better easing
    bars
      .transition()
      .duration(400)
      .ease(d3.easeCubicInOut)
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - yScale(d))
      .attr("fill", (_, i) => getColor(i))
      .attr("opacity", (_, i) => (activeIndices.includes(i) ? 1 : 0.85))
      .attr("filter", (_, i) => activeIndices.includes(i) ? "url(#glow)" : "none")
      .attr("stroke-width", (_, i) => activeIndices.includes(i) ? 2.5 : 2)

    // Animate labels
    g.selectAll<SVGTextElement, number>(".value-label")
      .data(data)
      .transition()
      .duration(300)
      .attr("y", (d) => yScale(d) - 5)

    // Cleanup
    return () => {
      d3.select(svg).selectAll("*").remove()
    }
  }, [data, activeIndices, sortedIndices])

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[400px] rounded-xl border border-border/50 bg-gradient-to-br from-background to-muted/20 p-6 shadow-lg"
    >
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}

