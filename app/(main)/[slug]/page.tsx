"use client"

import { use } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ROUTES } from "@/constants/routes"
import { useProgress } from "@/context/progress-context"
import { isModuleSlug } from "@/data/curriculum"
import { removeModulePrefix } from "@/utils/common/path-utils"
import { generateModuleSlug } from "@/utils/common/slug"
import { motion } from "motion/react"

import { VisualizerType } from "@/types/curriculum"
import { fadeIn, slideDown, transitions } from "@/lib/animations"
import { CheckmarkCircleIcon, CodeIcon, File01Icon, PlayIcon, ShareIcon, UserIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import {
  useModuleBySlug,
  useModuleTopics,
  useTopicBySlug,
  useTopics,
} from "@/hooks/curriculum"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { LearnView, PracticeView, TestView, VisualizeView } from "@/components/features/learning/views"
import { TopicCard } from "@/components/features/learning/components/topic-card"
import { TopicSidebar } from "@/components/features/docs/topic-sidebar"

interface SlugPageProps {
  params: Promise<{ slug: string }>
}

// Generate static params for build-time generation (SSG)
export async function generateStaticParams() {
  const { TOPICS } = await import("@/data/curriculum")
  const { generateTopicSlug, generateModuleSlug } = await import("@/utils/common/slug")
  
  const params: { slug: string }[] = []
  
  // Add all topic slugs for static generation
  TOPICS.forEach((topic) => {
    params.push({ slug: generateTopicSlug(topic.title) })
  })
  
  // Add all module slugs for static generation
  const uniqueModules = Array.from(new Set(TOPICS.map((t) => t.module)))
  uniqueModules.forEach((module) => {
    params.push({ slug: generateModuleSlug(module) })
  })
  
  return params
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
          <div className="space-y-6">
            {/* Breadcrumb skeleton */}
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </div>
            
            {/* Header skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            </div>

            {/* Tabs skeleton */}
            <div className="flex gap-4 border-b pb-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>

            {/* Content skeleton */}
            <div className="grid gap-6 md:grid-cols-[1fr_280px]">
              <div className="space-y-6">
                <Skeleton className="h-64 w-full rounded-lg" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
              <div className="space-y-6">
                <Skeleton className="h-48 w-full rounded-lg" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
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

              {/* Right: Actions & Tabs */}
              <div className="flex items-center gap-2">
                {/* Share & Profile Icons - Tab Style */}
                <div className="hidden items-center gap-1.5 sm:flex">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-border/60 hover:bg-muted/50 hover:border-primary/50 transition-all"
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: topic.title,
                          text: `Learn ${topic.title} on AlgoMaster AI`,
                          url: window.location.href,
                        }).catch(() => {})
                      } else {
                        navigator.clipboard.writeText(window.location.href)
                      }
                    }}
                    title="Share this topic"
                  >
                    <IconWrapper icon={ShareIcon} size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 border-border/60 hover:bg-muted/50 hover:border-primary/50 transition-all"
                    asChild
                    title="Dashboard"
                  >
                    <Link href={ROUTES.DASHBOARD}>
                      <IconWrapper icon={UserIcon} size={16} />
                    </Link>
                  </Button>
                </div>

                {/* Tabs */}
                <TabsList className="grid h-9 shrink-0 grid-cols-4">
                  <TabsTrigger
                    value="learn"
                    className="flex items-center gap-1.5 px-3 text-xs"
                  >
                    <IconWrapper icon={File01Icon} size={14} />
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
                  <TabsTrigger
                    value="quiz"
                    className="flex items-center gap-1.5 px-3 text-xs"
                  >
                    <IconWrapper icon={CheckmarkCircleIcon} size={14} />
                    <span className="hidden sm:inline">Quiz</span>
                  </TabsTrigger>
                </TabsList>
              </div>
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
          {/* Learn Tab - With Sidebar */}
          <TabsContent value="learn" className="mt-0">
            <motion.div
              key="learn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.smooth}
              className="flex h-full w-full"
            >
              {/* Main Content */}
              <div className="flex-1 min-w-0 overflow-y-auto">
                <LearnView topic={topic} />
              </div>

              {/* Right Sidebar - Topic Details & Navigation (Only in Learn Tab) */}
              <TopicSidebar
                topic={topic}
                prevTopic={_prevTopic}
                nextTopic={_nextTopic}
              />
            </motion.div>
          </TabsContent>

          {/* Visualize Tab - Full Width */}
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

          {/* Practice Tab - Full Width */}
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

          {/* Quiz Tab - Knowledge Check */}
          <TabsContent value="quiz" className="mt-0">
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transitions.smooth}
              className="h-full w-full"
            >
              <TestView topic={topic} />
            </motion.div>
          </TabsContent>

        </motion.div>
      </Tabs>
    </div>
  )
}
