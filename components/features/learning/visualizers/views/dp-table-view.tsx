"use client"

import { DPCell } from "@/components/common/visual/dp-cell"

interface DPTableViewProps {
  dpTable: number[][]
  activeRow: number
  activeCol: number
}

export function DPTableView({
  dpTable,
  activeRow,
  activeCol,
}: DPTableViewProps) {
  return (
    <div className="flex flex-col gap-1.5 sm:gap-2">
      {dpTable.map((rowArr, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5 sm:gap-2">
          {rowArr.map((val, colIndex) => {
            const isActive = rowIndex === activeRow && colIndex === activeCol
            return (
              <DPCell
                key={`${rowIndex}-${colIndex}`}
                value={val}
                isActive={isActive}
                isCalculated={true}
                size="md"
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}

