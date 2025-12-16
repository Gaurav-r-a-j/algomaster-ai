import Fuse, { type IFuseOptions, type FuseResult, type FuseResultMatch } from "fuse.js"

import type { Topic } from "@/types/curriculum"

/**
 * Fuse.js configuration for topic search
 * Optimized for DSA learning platform content
 */
const TOPIC_SEARCH_OPTIONS: IFuseOptions<Topic> = {
  // Keys to search with weighted importance
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.25 },
    { name: "module", weight: 0.15 },
    { name: "tags", weight: 0.15 },
    { name: "id", weight: 0.05 },
  ],
  // Fuzzy matching settings
  threshold: 0.3, // Lower = stricter matching
  distance: 100, // How far to search from expected position
  minMatchCharLength: 2,
  // Include matches for highlighting
  includeMatches: true,
  includeScore: true,
  // Sort by score (lower is better)
  shouldSort: true,
  // Ignore location for better matches
  ignoreLocation: true,
  // Use extended search
  useExtendedSearch: true,
}

/**
 * Simple string search options (for modules, etc.)
 */
const STRING_SEARCH_OPTIONS: IFuseOptions<string> = {
  threshold: 0.3,
  distance: 100,
  minMatchCharLength: 2,
  includeScore: true,
  shouldSort: true,
}

// Cached Fuse instances with their source data length
let topicFuse: { instance: Fuse<Topic>; length: number } | null = null
let moduleFuse: { instance: Fuse<string>; length: number } | null = null

/**
 * Create or get cached Topic search index
 */
export function getTopicSearchIndex(topics: Topic[]): Fuse<Topic> {
  // Only recreate if topics changed (simple length check)
  if (!topicFuse || topicFuse.length !== topics.length) {
    topicFuse = {
      instance: new Fuse(topics, TOPIC_SEARCH_OPTIONS),
      length: topics.length,
    }
  }
  return topicFuse.instance
}

/**
 * Create or get cached Module search index
 */
export function getModuleSearchIndex(modules: string[]): Fuse<string> {
  if (!moduleFuse || moduleFuse.length !== modules.length) {
    moduleFuse = {
      instance: new Fuse(modules, STRING_SEARCH_OPTIONS),
      length: modules.length,
    }
  }
  return moduleFuse.instance
}

/**
 * Search topics with fuzzy matching
 */
export function searchTopics(
  topics: Topic[],
  query: string,
  limit?: number
): FuseResult<Topic>[] {
  if (!query.trim()) {
    return topics.map((item, index) => ({
      item,
      refIndex: index,
    }))
  }

  const fuse = getTopicSearchIndex(topics)
  const results = fuse.search(query, limit ? { limit } : undefined)
  
  return results
}

/**
 * Search modules with fuzzy matching
 */
export function searchModules(
  modules: string[],
  query: string,
  limit?: number
): FuseResult<string>[] {
  if (!query.trim()) {
    return modules.map((item, index) => ({
      item,
      refIndex: index,
    }))
  }

  const fuse = getModuleSearchIndex(modules)
  return fuse.search(query, limit ? { limit } : undefined)
}

/**
 * Highlight matched text in search results
 * Returns an array of { text, isMatch } segments
 */
export function highlightMatches(
  text: string,
  matches?: readonly FuseResultMatch[]
): Array<{ text: string; isMatch: boolean }> {
  if (!matches || matches.length === 0) {
    return [{ text, isMatch: false }]
  }

  // Find matches for this specific text
  const relevantMatches = matches.filter(
    (match) => match.value === text
  )

  if (relevantMatches.length === 0) {
    return [{ text, isMatch: false }]
  }

  // Get all indices and sort them
  const indices: [number, number][] = []
  relevantMatches.forEach((match) => {
    match.indices?.forEach((index: readonly [number, number]) => {
      indices.push([index[0], index[1]])
    })
  })

  // Sort and merge overlapping indices
  indices.sort((a, b) => a[0] - b[0])
  const mergedIndices: [number, number][] = []
  
  for (const [start, end] of indices) {
    const last = mergedIndices[mergedIndices.length - 1]
    if (last && start <= last[1] + 1) {
      last[1] = Math.max(last[1], end)
    } else {
      mergedIndices.push([start, end])
    }
  }

  // Build highlighted segments
  const segments: Array<{ text: string; isMatch: boolean }> = []
  let lastEnd = 0

  for (const [start, end] of mergedIndices) {
    // Non-matching segment before this match
    if (start > lastEnd) {
      segments.push({
        text: text.slice(lastEnd, start),
        isMatch: false,
      })
    }
    // Matching segment
    segments.push({
      text: text.slice(start, end + 1),
      isMatch: true,
    })
    lastEnd = end + 1
  }

  // Remaining text after last match
  if (lastEnd < text.length) {
    segments.push({
      text: text.slice(lastEnd),
      isMatch: false,
    })
  }

  return segments
}

/**
 * Extended search syntax helper
 * Fuse.js supports special operators:
 * - 'exact match
 * - ^prefix
 * - suffix$
 * - !negation
 * - =exact-match
 * - ^!prefix-negation
 */
export function buildSearchQuery(
  query: string,
  options?: {
    exactMatch?: boolean
    prefixMatch?: boolean
    suffixMatch?: boolean
  }
): string {
  let processedQuery = query.trim()
  
  if (options?.exactMatch) {
    processedQuery = `="${processedQuery}"`
  } else if (options?.prefixMatch) {
    processedQuery = `^${processedQuery}`
  } else if (options?.suffixMatch) {
    processedQuery = `${processedQuery}$`
  }
  
  return processedQuery
}

// Re-export Fuse types for convenience
export type { FuseResult }

