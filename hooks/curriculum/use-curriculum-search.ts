import { useMemo, useState, useCallback } from "react"
import type { FuseResult } from "fuse.js"

import type { Topic } from "@/types/curriculum"
import {
  searchTopics,
  searchModules,
  highlightMatches,
} from "@/lib/fuse-search"
import { useModules, useTopics } from "./use-curriculum"

export interface SearchResult<T> {
  item: T
  score?: number
  matches?: Array<{ text: string; isMatch: boolean }>
}

export function useCurriculumSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: modules = [], isLoading: isLoadingModules } = useModules()
  const { data: topics = [], isLoading: isLoadingTopics } = useTopics()

  // Fuzzy search for modules using Fuse.js
  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) {
      return modules
    }
    
    const results = searchModules(modules, searchQuery)
    return results.map((result) => result.item)
  }, [modules, searchQuery])

  // Fuzzy search for topics using Fuse.js
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return topics
    }
    
    const results = searchTopics(topics, searchQuery)
    return results.map((result) => result.item)
  }, [searchQuery, topics])

  // Get search results with match highlighting
  const searchResults = useMemo((): SearchResult<Topic>[] => {
    if (!searchQuery.trim()) {
      return topics.map((topic) => ({ item: topic }))
    }

    const results = searchTopics(topics, searchQuery)
    
    return results.map((result: FuseResult<Topic>) => ({
      item: result.item,
      score: result.score,
      matches: result.matches
        ? highlightMatches(result.item.title, result.matches)
        : undefined,
    }))
  }, [searchQuery, topics])

  // Debounced search update
  const updateSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchQuery("")
  }, [])

  return {
    searchQuery,
    setSearchQuery: updateSearch,
    clearSearch,
    filteredModules,
    filteredTopics,
    searchResults,
    modules,
    topics,
    isLoading: isLoadingModules || isLoadingTopics,
    hasResults: filteredTopics.length > 0 || filteredModules.length > 0,
    isEmpty: searchQuery.trim() !== "" && filteredTopics.length === 0 && filteredModules.length === 0,
  }
}

/**
 * Hook for searching within a specific module's topics
 */
export function useModuleSearch(moduleName: string) {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: allTopics = [], isLoading } = useTopics()

  // Filter topics by module first
  const moduleTopics = useMemo(() => {
    return allTopics.filter((topic) => topic.module === moduleName)
  }, [allTopics, moduleName])

  // Then apply fuzzy search
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return moduleTopics
    }
    
    const results = searchTopics(moduleTopics, searchQuery)
    return results.map((result) => result.item)
  }, [moduleTopics, searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredTopics,
    moduleTopics,
    isLoading,
    hasResults: filteredTopics.length > 0,
  }
}

/**
 * Hook for global search across the entire curriculum
 */
export function useGlobalSearch(options?: { limit?: number }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const { data: topics = [], isLoading: isLoadingTopics } = useTopics()
  const { data: modules = [], isLoading: isLoadingModules } = useModules()

  const results = useMemo(() => {
    if (!searchQuery.trim()) {
      return { topics: [], modules: [] }
    }

    setIsSearching(true)
    
    const topicResults = searchTopics(topics, searchQuery, options?.limit)
    const moduleResults = searchModules(modules, searchQuery, options?.limit)
    
    setIsSearching(false)
    
    return {
      topics: topicResults,
      modules: moduleResults,
    }
  }, [searchQuery, topics, modules, options?.limit])

  return {
    searchQuery,
    setSearchQuery,
    results,
    isLoading: isLoadingTopics || isLoadingModules,
    isSearching,
    hasQuery: searchQuery.trim() !== "",
    hasResults: results.topics.length > 0 || results.modules.length > 0,
  }
}
