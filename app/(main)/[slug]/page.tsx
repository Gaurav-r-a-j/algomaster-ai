"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import { TOPICS, getModuleBySlug, getTopicBySlug, getTopicsByModule, isModuleSlug } from "@/data/curriculum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LearnView } from "@/components/features/learning/learn-view";
import { VisualizeView } from "@/components/features/learning/visualize-view";
import { PracticeView } from "@/components/features/learning/practice-view";
import { TopicNavigation } from "@/components/features/learning/topic-navigation";
import { TopicCard } from "@/components/features/learning/topic-card";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { VisualizerType } from "@/types/curriculum";
import { BookOpenIcon, CodeIcon, PlayIcon } from "@/lib/icons";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { useProgress } from "@/context/progress-context";
import { Container } from "@/components/common/container";
import { Section } from "@/components/common/section";
import { PageHeader } from "@/components/common/page-header";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { getModules } from "@/data/curriculum";
import { generateModuleSlug, generateTopicSlug } from "@/utils/common/slug";
import { removeModulePrefix } from "@/utils/common/path-utils";
import { motion } from "motion/react";
import { fadeIn, slideDown, transitions } from "@/lib/animations";

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export default function SlugPage({ params }: SlugPageProps) {
  const { slug } = use(params);
  const { completedTopics } = useProgress();

  // Check if it's a module or topic
  if (isModuleSlug(slug)) {
    // Render module page
    const moduleName = getModuleBySlug(slug);
    if (!moduleName) {
      notFound();
    }

    const moduleTopics = getTopicsByModule(moduleName).sort(
      (a, b) => a.order - b.order
    );
    const completedCount = moduleTopics.filter((t) =>
      completedTopics.includes(t.id)
    ).length;
    const totalInModule = moduleTopics.length;
    const progressPercentage = Math.round(
      (completedCount / totalInModule) * 100
    );
    const modules = getModules();
    const moduleIndex = modules.indexOf(moduleName);

    return (
      <div className="min-h-screen bg-background">
        <Section className="py-8 border-b border-border">
          <Container>
            <div className="flex items-center gap-6 mb-4">
              <div
                className={cn(
                  "w-16 h-16 rounded-full border-4 flex items-center justify-center font-bold text-xl shadow-lg transition-colors bg-background",
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
            <p className="text-sm text-muted-foreground mt-2">
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
    );
  }

  // Render topic page
  const topic = getTopicBySlug(slug);
  const topicIndex = topic ? TOPICS.findIndex((t) => t.id === topic.id) : -1;

  if (!topic) {
    notFound();
  }

  const prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null;
  const nextTopic = topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null;

  // Generate slugs
  const topicSlug = generateTopicSlug(topic.title);
  const moduleSlug = generateModuleSlug(topic.module);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Tabs defaultValue="learn" className="flex-1 flex flex-col overflow-hidden">
        <motion.header
          initial="initial"
          animate="animate"
          variants={slideDown}
          transition={transitions.smooth}
          className="fixed top-0 left-0 md:left-[16rem] right-0 z-50 shrink-0 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 border-b border-border shadow-sm"
        >
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="flex items-center justify-between gap-4 py-3 min-h-[60px]">
              {/* Left: Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-bold text-sm font-mono">
                      #{topic.order + 1}
                    </span>
                  </div>
                  <h1 className="text-lg md:text-xl font-bold text-foreground tracking-tight truncate">
                    {topic.title}
                  </h1>
                  <div className="hidden sm:flex items-center gap-1.5 ml-2">
                    <Badge
                      variant={
                        topic.difficulty === "Easy"
                          ? "default"
                          : topic.difficulty === "Hard"
                            ? "destructive"
                            : "secondary"
                      }
                      className="uppercase text-[10px] font-semibold px-1.5 py-0 h-5"
                    >
                      {topic.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0 h-5">
                      {topic.complexity.time}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right: Tabs */}
              <TabsList className="grid grid-cols-3 shrink-0 h-9">
                <TabsTrigger value="learn" className="flex items-center gap-1.5 text-xs px-3">
                  <IconWrapper icon={BookOpenIcon} size={14} />
                  <span className="hidden sm:inline">Learn</span>
                </TabsTrigger>
                <TabsTrigger
                  value="visualize"
                  disabled={topic.visualizerType === VisualizerType.NONE}
                  className="flex items-center gap-1.5 text-xs px-3"
                  title={
                    topic.visualizerType === VisualizerType.NONE
                      ? "No visualizer available"
                      : "Interactive Mode"
                  }
                >
                  <IconWrapper icon={PlayIcon} size={14} />
                  <span className="hidden sm:inline">Visualize</span>
                </TabsTrigger>
                <TabsTrigger value="code" className="flex items-center gap-1.5 text-xs px-3">
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
            className="flex-1 overflow-y-auto relative md:pt-[60px]"
          >
            <div className="w-full h-full">
              <TabsContent value="learn" className="mt-0">
                <motion.div
                  key="learn"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={transitions.smooth}
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24"
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
                  className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 pb-24"
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
                  className="p-4 sm:p-6 lg:p-8 xl:p-10 pb-24 h-full max-w-7xl mx-auto w-full"
                >
                  <PracticeView topic={topic} />
                </motion.div>
              </TabsContent>
            </div>
          </motion.div>
      </Tabs>
    </div>
  );
}
