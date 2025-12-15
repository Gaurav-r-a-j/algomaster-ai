export const QUERY_KEYS = {
  curriculum: {
    all: ["curriculum"] as const,
    modules: () => [...QUERY_KEYS.curriculum.all, "modules"] as const,
    topics: () => [...QUERY_KEYS.curriculum.all, "topics"] as const,
    topic: (id: string) => [...QUERY_KEYS.curriculum.topics(), id] as const,
    topicBySlug: (slug: string) =>
      [...QUERY_KEYS.curriculum.topics(), "slug", slug] as const,
    moduleBySlug: (slug: string) =>
      [...QUERY_KEYS.curriculum.modules(), "slug", slug] as const,
    content: (topicId: string) =>
      [...QUERY_KEYS.curriculum.topic(topicId), "content"] as const,
    moduleTopics: (module: string) =>
      [...QUERY_KEYS.curriculum.topics(), "module", module] as const,
  },
}
