"use client"

import Link from "next/link"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { removeModulePrefix } from "@/utils/common/path-utils"
import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug"
import { calculatePercentage } from "@/utils/common/math"
import { motion } from "motion/react"
import { fadeIn, transitions } from "@/lib/animations"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Container } from "@/components/common/container"
import { PageHeader } from "@/components/common/page-header"
import { Section } from "@/components/common/section"
import { TopicCard } from "@/components/features/learning/components/topic-card"
import type { Topic } from "@/types/curriculum"

interface ModulePageContentProps {
  moduleName: string
  moduleTopics: Topic[]
  allTopics: Topic[]
}

export function ModulePageContent({ 
  moduleName, 
  moduleTopics, 
  allTopics 
}: ModulePageContentProps) {
  const { completedTopics } = useProgress()
  const sortedTopics = [...moduleTopics].sort((a, b) => a.order - b.order)

  const completedCount = sortedTopics.filter((t) =>
    completedTopics.includes(t.id)
  ).length
  const totalInModule = sortedTopics.length
  const progressPercentage = calculatePercentage(completedCount, totalInModule)

  const uniqueModules = Array.from(
    new Set(allTopics.map((t) => t.module))
  ).sort()
  const moduleIndex = uniqueModules.indexOf(moduleName)

  return (
    <div className="bg-background min-h-screen">
      <Section className="border-border border-b py-8">
        <Container>
          <div className="mb-4 flex items-center gap-6">
            <div
              className={cn(
                "bg-background flex h-16 w-16 items-center justify-center rounded-full border-4 text-xl font-bold shadow-lg transition-colors",
                completedCount === totalInModule && totalInModule > 0
                  ? "border-emerald-500 text-emerald-600 dark:border-emerald-500 dark:text-emerald-400"
                  : "border-primary text-primary"
              )}
            >
              {moduleIndex >= 0 ? moduleIndex + 1 : "?"}
            </div>
            <div>
              <PageHeader
                title={removeModulePrefix(moduleName)}
                description={`${totalInModule} lessons in this module`}
              />
            </div>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-muted-foreground mt-2 text-sm">
            {completedCount} of {totalInModule} topics completed
          </p>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={transitions.smooth}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {sortedTopics.map((topic) => {
              const topicSlug = generateTopicSlug(topic.title)
              const isCompleted = completedTopics.includes(topic.id)
              return (
                <Link
                  key={topic.id}
                  href={ROUTES.TOPIC(topicSlug)}
                  className="block"
                >
                  <TopicCard topic={topic} />
                </Link>
              )
            })}
          </motion.div>
        </Container>
      </Section>
    </div>
  )
}

