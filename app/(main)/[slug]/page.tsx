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
    <div className="flex flex-col h-full overflow-hidden bg-background">
      <Tabs defaultValue="learn" className="flex-1 flex flex-col overflow-hidden">
        <header className="sticky top-0 z-50 shrink-0 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-4">
              {/* Breadcrumb */}
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={ROUTES.HOME}
                        className="flex items-center gap-1 hover:text-primary transition-colors text-sm"
                      >
                        Home
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        href={ROUTES.MODULE(moduleSlug)}
                        className="hover:text-primary transition-colors text-sm"
                      >
                        {removeModulePrefix(topic.module)}
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-sm">{topic.title}</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>

              {/* Title and Badges */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-bold text-lg font-mono">
                      #{topic.order + 1}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight mb-2">
                      {topic.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant={
                          topic.difficulty === "Easy"
                            ? "default"
                            : topic.difficulty === "Hard"
                              ? "destructive"
                              : "secondary"
                        }
                        className="uppercase text-xs font-semibold"
                      >
                        {topic.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        {topic.complexity.time}
                      </Badge>
                      <Badge variant="outline" className="text-xs font-mono">
                        {topic.complexity.space}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <TabsList className="grid w-full sm:w-auto grid-cols-3 shrink-0">
                  <TabsTrigger value="learn" className="flex items-center gap-2">
                    <IconWrapper icon={BookOpenIcon} size={16} />
                    <span className="hidden sm:inline">Learn</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="visualize"
                    disabled={topic.visualizerType === VisualizerType.NONE}
                    className="flex items-center gap-2"
                    title={
                      topic.visualizerType === VisualizerType.NONE
                        ? "No visualizer available"
                        : "Interactive Mode"
                    }
                  >
                    <IconWrapper icon={PlayIcon} size={16} />
                    <span className="hidden sm:inline">Visualize</span>
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2">
                    <IconWrapper icon={CodeIcon} size={16} />
                    <span className="hidden sm:inline">Practice</span>
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-hidden relative">
          <ScrollArea className="h-full">
            <div className="w-full h-full">
              <TabsContent value="learn" className="mt-0 h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-32">
                  <LearnView topic={topic} />
                </div>
              </TabsContent>

              <TabsContent value="visualize" className="mt-0 h-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-32">
                  <VisualizeView topic={topic} />
                </div>
              </TabsContent>

              <TabsContent value="code" className="mt-0 h-full">
                <div className="p-4 sm:p-6 lg:p-8 pb-32 h-full">
                  <div className="animate-in fade-in duration-300 h-full">
                    <PracticeView topic={topic} />
                  </div>
                </div>
              </TabsContent>
            </div>
          </ScrollArea>
        </div>
        <TopicNavigation prevTopic={prevTopic} nextTopic={nextTopic} />
      </Tabs>
    </div>
  );
}
