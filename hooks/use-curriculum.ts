import { useQuery } from "@tanstack/react-query"
import { CurriculumService } from "@/services/curriculum-service"
import { QUERY_KEYS } from "@/lib/query-keys"

export function useModules() {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.modules(),
    queryFn: CurriculumService.getModules,
  })
}

export function useTopics() {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.topics(),
    queryFn: CurriculumService.getAllTopics,
  })
}

export function useTopic(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.topic(id),
    queryFn: () => CurriculumService.getTopicById(id),
    enabled: !!id,
  })
}

export function useModuleTopics(module: string, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.moduleTopics(module),
    queryFn: () => CurriculumService.getTopicsByModule(module),
    enabled: !!module && (options.enabled ?? true),
  })
}

export function useTopicBySlug(slug: string, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.topicBySlug(slug),
    queryFn: () => CurriculumService.getTopicBySlug(slug),
    enabled: !!slug && (options.enabled ?? true),
  })
}

export function useModuleBySlug(slug: string, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.moduleBySlug(slug),
    queryFn: () => CurriculumService.getModuleBySlug(slug),
    enabled: !!slug && (options.enabled ?? true),
  })
}

export function useTopicContent(topic: import("@/types/curriculum").Topic, options: { enabled?: boolean } = {}) {
  return useQuery({
    queryKey: QUERY_KEYS.curriculum.content(topic.id),
    queryFn: () => CurriculumService.getTopicContent(topic),
    enabled: !!topic && (options.enabled ?? true),
    staleTime: 5 * 60 * 1000, 
  })
}
