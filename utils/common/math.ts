// Calculate percentage
export function calculatePercentage(part: number, total: number): number {
  if (total === 0) {
    return 0
  }
  return Math.round((part / total) * 100)
}

// Clamp value between min and max
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

// Format number with commas
export function formatNumber(num: number): string {
  return num.toLocaleString()
}

