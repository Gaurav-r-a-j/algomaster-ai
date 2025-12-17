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

    // Create SVG group
    const g = d3
      .select(svg)
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)

    // Color function
    const getColor = (index: number) => {
      if (activeIndices.includes(index)) return "#f59e0b" // amber-500
      if (sortedIndices.includes(index)) return "#10b981" // emerald-500
      return "#6b7280" // gray-500
    }

    // Create bars
    const bars = g
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (_, i) => xScale(i.toString()) || 0)
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - yScale(d))
      .attr("fill", (_, i) => getColor(i))
      .attr("rx", 4)
      .attr("stroke", "#fff")
      .attr("stroke-width", 1)
      .attr("opacity", (_, i) => (activeIndices.includes(i) ? 1 : 0.8))

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

    // Animate bars
    bars
      .transition()
      .duration(300)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => yScale(d))
      .attr("height", (d) => height - yScale(d))
      .attr("fill", (_, i) => getColor(i))
      .attr("opacity", (_, i) => (activeIndices.includes(i) ? 1 : 0.8))

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
      className="w-full min-h-[400px] rounded-lg border border-border/50 bg-background p-4"
    >
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  )
}

