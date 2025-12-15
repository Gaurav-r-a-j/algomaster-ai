import { useMemo, useState } from "react"
import { useModules, useTopics } from "@/hooks/use-curriculum"

export function useCurriculumSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: modules = [], isLoading: isLoadingModules } = useModules()
  const { data: topics = [], isLoading: isLoadingTopics } = useTopics()

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) {
      return modules
    }
    const query = searchQuery.toLowerCase()
    return modules.filter((module) => module.toLowerCase().includes(query))
  }, [modules, searchQuery])

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return topics
    }
    const query = searchQuery.toLowerCase()
    return topics.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.module.toLowerCase().includes(query)
    )
  }, [searchQuery, topics])

  return {
    searchQuery,
    setSearchQuery,
    filteredModules,
    filteredTopics,
    modules,
    topics,
    isLoading: isLoadingModules || isLoadingTopics,
  }
}
