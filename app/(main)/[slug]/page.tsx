"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import {
  isModuleSlug,
  TOPICS, // Still needed for some static types/comparisons if not fully replaced, but we aim to replace logic
} from "@/data/curriculum"
import { removeModulePrefix } from "@/utils/common/path-utils"
import { generateModuleSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideDown, transitions } from "@/lib/animations"
import { BookOpenIcon, CodeIcon, PlayIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import {
  useModuleBySlug,
  useModuleTopics,
  useTopicBySlug,
  useTopics,
} from "@/hooks/use-curriculum"
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
import { Skeleton } from "@/components/ui/skeleton"
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
  const isModule = isModuleSlug(slug)

  // -- Query Hooks --
  const { data: moduleName, isLoading: isLoadingModule } = useModuleBySlug(
    slug,
    { enabled: isModule }
  )
  const { data: moduleTopics, isLoading: isLoadingModuleTopics } =
    useModuleTopics(moduleName || "", {
      enabled: !!moduleName && isModule,
    })

  const { data: topic, isLoading: isLoadingTopic } = useTopicBySlug(slug, {
    enabled: !isModule,
  })

  // Fetch all topics for navigation context (Next/Prev)
  const { data: allTopics = [], isLoading: isLoadingAllTopics } = useTopics()

  // -- Loading State --
  if (
    (isModule && (isLoadingModule || isLoadingModuleTopics)) ||
    (!isModule && (isLoadingTopic || isLoadingAllTopics))
  ) {
    return (
      <div className="bg-background min-h-screen py-8">
        <Container>
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-48 rounded-xl" />
              ))}
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // Check if it's a module or topic
  if (isModule) {
    if (!moduleName || !moduleTopics) {
      notFound()
    }

    // Render module page
    const sortedTopics = [...moduleTopics].sort((a, b) => a.order - b.order)

    const completedCount = sortedTopics.filter((t) =>
      completedTopics.includes(t.id)
    ).length
    const totalInModule = sortedTopics.length
    const progressPercentage = Math.round(
      (completedCount / totalInModule) * 100
    )

    // We need 'modules' list to find index.
    // We can derive modules from allTopics or fetch useModules.
    // For simplicity, let's derive unique modules from allTopics if available, or just fetch modules.
    // But wait, we didn't call useModules. Let's assume finding index is optional or use allTopics.
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
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </Container>
        </Section>
      </div>
    )
  }

  // Render topic page

  if (!topic) {
    notFound()
  }

  const topicIndex = allTopics.findIndex((t) => t.id === topic.id)

  const _prevTopic = topicIndex > 0 ? allTopics[topicIndex - 1] : null
  const _nextTopic =
    topicIndex < allTopics.length - 1 ? allTopics[topicIndex + 1] : null

  // Generate slugs
  // const _topicSlug = slug || "arrays" // slug is already defined
  const moduleSlug = generateModuleSlug(topic.module)

  return (
    <div className="bg-background flex h-full flex-col overflow-y-auto">
      <Tabs defaultValue="learn" className="flex flex-1 flex-col">
        <motion.header
          initial="initial"
          animate="animate"
          variants={slideDown}
          transition={transitions.smooth}
          className="bg-background/95 supports-backdrop-filter:bg-background/80 border-border/40 sticky top-0 z-50 shrink-0 border-b backdrop-blur-md"
        >
          <div className="h-full w-full px-4 sm:px-6 lg:px-8">
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

        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={transitions.smooth}
          className="relative h-full flex-1"
        >
          <div className="flex h-full w-full flex-col">
            <TabsContent value="learn" className="mt-0">
              <motion.div
                key="learn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.smooth}
                className="h-full w-full"
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
                className="h-full w-full"
              >
                <VisualizeView topic={topic} />
              </motion.div>
            </TabsContent>

            <TabsContent
              value="code"
              className="mt-0 h-[calc(100vh-120px)] w-full"
            >
              <motion.div
                key="code"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={transitions.smooth}
                className="h-full w-full"
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
