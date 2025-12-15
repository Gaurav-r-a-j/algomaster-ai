import { useMemo, useState } from "react"
import { TOPICS, getModules } from "@/data/curriculum"

export function useCurriculumSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const modules = getModules()

  const filteredModules = useMemo(() => {
    if (!searchQuery.trim()) {
      return modules
    }
    const query = searchQuery.toLowerCase()
    return modules.filter((module) => module.toLowerCase().includes(query))
  }, [modules, searchQuery])

  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) {
      return TOPICS
    }
    const query = searchQuery.toLowerCase()
    return TOPICS.filter(
      (topic) =>
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query) ||
        topic.module.toLowerCase().includes(query)
    )
  }, [searchQuery])

  return {
    searchQuery,
    setSearchQuery,
    filteredModules,
    filteredTopics,
    modules, // Return all modules as well for default view
    topics: TOPICS, // Return all topics
  }
}
