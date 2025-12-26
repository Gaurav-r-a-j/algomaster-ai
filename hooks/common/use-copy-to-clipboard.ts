import { useState } from "react"

// Copy text to clipboard with feedback
export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false)

  const copy = async (text: string, duration: number = 2000) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, duration)
      return true
    } catch (err) {
      console.error("Failed to copy:", err)
      return false
    }
  }

  return { copied, copy }
}

