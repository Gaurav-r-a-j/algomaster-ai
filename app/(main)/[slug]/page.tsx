"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import {
  TOPICS,
  getModuleBySlug,
  getModules,
  getTopicBySlug,
  getTopicsByModule,
  isModuleSlug,
} from "@/data/curriculum"
import { removeModulePrefix } from "@/utils/common/path-utils"
import { generateModuleSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideDown, transitions } from "@/lib/animations"
import { BookOpenIcon, CodeIcon, PlayIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Container } from "@/components/common/container"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { PageHeader } from "@/components/common/page-header"
import { Section } from "@/components/common/section"
import { LearnView } from "@/components/features/learning/learn-view"
import { PracticeView } from "@/components/features/learning/practice-view"
import { TopicCard } from "@/components/features/learning/topic-card"
import { VisualizeView } from "@/components/features/learning/visualize-view"

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

export default function SlugPage({ params }: SlugPageProps) {
  const { slug } = use(params)
  const { completedTopics } = useProgress()

  // Check if it's a module or topic
  if (isModuleSlug(slug)) {
    // Render module page
    const moduleName = getModuleBySlug(slug)
    if (!moduleName) {
      notFound()
    }

    const moduleTopics = getTopicsByModule(moduleName).sort(
      (a, b) => a.order - b.order
    )
    const completedCount = moduleTopics.filter((t) =>
      completedTopics.includes(t.id)
    ).length
    const totalInModule = moduleTopics.length
    const progressPercentage = Math.round(
      (completedCount / totalInModule) * 100
    )
    const modules = getModules()
    const moduleIndex = modules.indexOf(moduleName)

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
                {moduleIndex + 1}
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {moduleTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  // Render topic page
  const topic = getTopicBySlug(slug)
  const topicIndex = topic ? TOPICS.findIndex((t) => t.id === topic.id) : -1

  if (!topic) {
    notFound()
  }

  const _prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null
  const _nextTopic =
    topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null

  // Generate slugs
  const _topicSlug = slug || "arrays"
  const moduleSlug = generateModuleSlug(topic.module)

  return (
    <div className="bg-background flex h-screen flex-col overflow-hidden">
      <Tabs
        defaultValue="learn"
        className="flex flex-1 flex-col overflow-hidden"
      >
        <motion.header
          initial="initial"
          animate="animate"
          variants={slideDown}
          transition={transitions.smooth}
          className="bg-background/95 supports-backdrop-filter:bg-background/80 border-border fixed top-0 right-0 left-0 z-50 shrink-0 border-b shadow-sm backdrop-blur-md md:left-[16rem]"
        >
          <div className="mx-auto max-w-[1920px] px-4 sm:px-6 lg:px-8">
            {/* SEO Breadcrumbs - Hidden visually but present for SEO */}
            <Breadcrumb className="sr-only">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={ROUTES.HOME}>Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={ROUTES.MODULE(moduleSlug)}>
                      {removeModulePrefix(topic.module)}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{topic.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Compact Header */}
            <div className="flex min-h-[60px] items-center justify-between gap-4 py-3">
              {/* Left: Title */}
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                    <span className="text-primary font-mono text-sm font-bold">
                      #{topic.order + 1}
                    </span>
                  </div>
                  <h1 className="text-foreground truncate text-lg font-bold tracking-tight md:text-xl">
                    {topic.title}
                  </h1>
                  <div className="ml-2 hidden items-center gap-1.5 sm:flex">
                    <Badge
                      variant={
                        topic.difficulty === "Easy"
                          ? "default"
                          : topic.difficulty === "Hard"
                            ? "destructive"
                            : "secondary"
                      }
                      className="h-5 px-1.5 py-0 text-[10px] font-semibold uppercase"
                    >
                      {topic.difficulty}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="h-5 px-1.5 py-0 font-mono text-[10px]"
                    >
                      {topic.complexity.time}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right: Tabs */}
              <TabsList className="grid h-9 shrink-0 grid-cols-3">
                <TabsTrigger
                  value="learn"
                  className="flex items-center gap-1.5 px-3 text-xs"
                >
                  <IconWrapper icon={BookOpenIcon} size={14} />
                  <span className="hidden sm:inline">Learn</span>
                </TabsTrigger>
                <TabsTrigger
                  value="visualize"
                  disabled={topic.visualizerType === VisualizerType.NONE}
                  className="flex items-center gap-1.5 px-3 text-xs"
                  title={
                    topic.visualizerType === VisualizerType.NONE
                      ? "No visualizer available"
                      : "Interactive Mode"
                  }
                >
                  <IconWrapper icon={PlayIcon} size={14} />
                  <span className="hidden sm:inline">Visualize</span>
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="flex items-center gap-1.5 px-3 text-xs"
                >
                  <IconWrapper icon={CodeIcon} size={14} />
                  <span className="hidden sm:inline">Practice</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
        </motion.header>

        {/* Spacer for fixed header - matches header height, only on mobile since desktop header starts after sidebar */}
        <div className="h-[60px] shrink-0 md:hidden" />

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transitions.smooth}
          className="relative flex-1 overflow-y-auto md:pt-[60px]"
        >
          <div className="h-full w-full">
            <TabsContent value="learn" className="mt-0">
              <motion.div
                key="learn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.smooth}
                className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 md:py-8 lg:px-8"
              >
                <LearnView topic={topic} />
              </motion.div>
            </TabsContent>

            <TabsContent value="visualize" className="mt-0">
              <motion.div
                key="visualize"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.smooth}
                className="mx-auto max-w-7xl px-4 py-6 pb-24 sm:px-6 md:py-8 lg:px-8"
              >
                <VisualizeView topic={topic} />
              </motion.div>
            </TabsContent>

            <TabsContent value="code" className="mt-0">
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.smooth}
                className="mx-auto h-full w-full max-w-7xl p-4 pb-24 sm:p-6 lg:p-8 xl:p-10"
              >
                <PracticeView topic={topic} />
              </motion.div>
            </TabsContent>
          </div>
        </motion.div>
      </Tabs>
    </div>
  )
}
