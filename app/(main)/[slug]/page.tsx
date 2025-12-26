import { notFound } from "next/navigation"
import { TOPICS, getTopicBySlug, isModuleSlug } from "@/data/curriculum"
import { generateModuleSlug } from "@/utils/common/slug"
import { ModulePageContent } from "@/components/features/learning/pages/module-page-content"
import { TopicPageClient } from "./page-client"

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const { generateTopicSlug, generateModuleSlug } = await import("@/utils/common/slug")
  
  const params: { slug: string }[] = []
  
  TOPICS.forEach((topic) => {
    params.push({ slug: generateTopicSlug(topic.title) })
  })
  
  const uniqueModules = Array.from(new Set(TOPICS.map((t) => t.module)))
  uniqueModules.forEach((module) => {
    params.push({ slug: generateModuleSlug(module) })
  })
  
  return params
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params
  
  const isModule = isModuleSlug(slug)
  
  if (isModule) {
    const moduleTopics = TOPICS.filter((t) => {
      const moduleSlug = generateModuleSlug(t.module)
      return moduleSlug === slug
    })
    
    if (moduleTopics.length === 0) {
      notFound()
    }

    return <ModulePageContent 
      moduleName={moduleTopics[0].module} 
      moduleTopics={moduleTopics}
      allTopics={TOPICS}
    />
  }
  
  const topic = getTopicBySlug(slug)

  if (!topic) {
    notFound()
  }

  return <TopicPageClient topic={topic} allTopics={TOPICS} />
}
