"use client";

import { useEffect, useState, useMemo } from "react";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { QuizSection } from "@/components/features/learning/quiz-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, ChevronRightIcon, ChevronLeftIcon, CheckmarkCircleIcon, BookOpenIcon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import { VisualizerType } from "@/types/curriculum";
import { getTopicContent } from "@/services/content/content-service";
import type { CodeExample } from "@/services/content/content-service";
import { CodePreview } from "@/components/common/code-preview";
import { TOPICS, getTopicsByModule } from "@/data/curriculum";
import { useProgress } from "@/context/progress-context";
import { ROUTES } from "@/constants/routes";
import { generateTopicSlug } from "@/utils/common/slug";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LearnViewProps {
  topic: Topic;
}

// Common/default quiz questions (not AI-generated)
const getDefaultQuiz = (topic: Topic) => [
  {
    id: 1,
    question: `What is the primary characteristic of ${topic.title}?`,
    options: [
      "It runs in O(1) time",
      "It uses fundamental DSA principles",
      "It is only for strings",
      "It requires supercomputers",
    ],
    correctAnswer: 1,
    explanation: "Most algorithms build upon fundamental data structure principles.",
  },
  {
    id: 2,
    question: "Which complexity represents this algorithm in the average case?",
    options: ["O(n!)", "O(2^n)", topic.complexity.time, "O(1)"],
    correctAnswer: 2,
    explanation: `The average time complexity is ${topic.complexity.time}.`,
  },
];

export function LearnView({ topic }: LearnViewProps) {
  const [content, setContent] = useState<string>(topic.content);
  const [codeExamples, setCodeExamples] = useState<CodeExample[]>([]);
  const [loading, setLoading] = useState(true);
  const [useAIQuestions, setUseAIQuestions] = useState(false);
  const { completedTopics, isCompleted } = useProgress();

  useEffect(() => {
    async function loadContent() {
      try {
        const topicContent = await getTopicContent(topic);
        setContent(topicContent.markdown);
        setCodeExamples(topicContent.codeExamples);
      } catch {
        // Fallback to topic.content
        setContent(topic.content);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [topic]);

  // Get related topics and navigation
  const { prevTopic, nextTopic, moduleTopics, moduleProgress } = useMemo(() => {
    const topicIndex = TOPICS.findIndex((t) => t.id === topic.id);
    const prevTopic = topicIndex > 0 ? TOPICS[topicIndex - 1] : null;
    const nextTopic = topicIndex < TOPICS.length - 1 ? TOPICS[topicIndex + 1] : null;
    
    const moduleTopics = getTopicsByModule(topic.module).sort((a, b) => a.order - b.order);
    const completedInModule = moduleTopics.filter((t) => isCompleted(t.id)).length;
    const moduleProgress = moduleTopics.length > 0 
      ? Math.round((completedInModule / moduleTopics.length) * 100)
      : 0;

    return { prevTopic, nextTopic, moduleTopics, moduleProgress };
  }, [topic, isCompleted]);

  // Default to common questions, AI questions are optional (if available in future)
  const commonQuestions = topic.quiz || getDefaultQuiz(topic);
  const quizQuestions = commonQuestions; // AI questions can be added later via topic.aiQuiz

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading content...</p>
      </div>
    );
  }

  // Ensure we have content - use topic.content as fallback
  const displayContent = content && content.trim() && !content.toLowerCase().includes("coming soon") 
    ? content 
    : topic.content;

  const isTopicCompleted = isCompleted(topic.id);

  return (
    <div className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 animate-in fade-in duration-500">
      {/* Main Content - Full Width */}
      <div className="space-y-6 min-w-0">
        {/* Markdown Content */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-8">
            {displayContent && displayContent.trim() ? (
              <MarkdownRenderer content={displayContent} className="prose prose-slate dark:prose-invert max-w-none" />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Content is being prepared. Please check back soon.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-bold">Code Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {codeExamples.map((example) => (
                <div key={example.id} className="space-y-3">
                  <h4 className="font-semibold text-base text-foreground">
                    {example.title}
                  </h4>
                  <CodePreview
                    code={example.code}
                    language={example.language}
                    preview={null}
                  />
                  {example.explanation && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Quiz Section */}
        <QuizSection 
          topicId={topic.id} 
          questions={quizQuestions}
          useAIQuestions={useAIQuestions}
          onToggleAIQuestions={setUseAIQuestions}
          hasAIQuestions={false}
        />
      </div>

      {/* Right Sidebar - Enhanced with More Content */}
      <div className="lg:sticky lg:top-[76px] lg:self-start space-y-4 z-10">
        {/* Quick Navigation */}
        {(prevTopic || nextTopic) && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {prevTopic && (
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                    <IconWrapper icon={ChevronLeftIcon} size={14} className="mr-2" />
                    <span className="truncate text-xs">{prevTopic.title}</span>
                  </Link>
                </Button>
              )}
              {nextTopic && (
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                    <span className="truncate text-xs">{nextTopic.title}</span>
                    <IconWrapper icon={ChevronRightIcon} size={14} className="ml-2" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>
        )}

        {/* Module Progress */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <IconWrapper icon={BookOpenIcon} size={12} />
              Module Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="text-muted-foreground font-medium">
                  {moduleTopics.filter((t) => isCompleted(t.id)).length} / {moduleTopics.length} completed
                </span>
                <span className="font-semibold text-foreground">{moduleProgress}%</span>
              </div>
              <Progress value={moduleProgress} className="h-2" />
            </div>
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Topics in this module:</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {moduleTopics.map((t) => {
                  const isCompletedTopic = isCompleted(t.id);
                  const isCurrent = t.id === topic.id;
                  return (
                    <Link
                      key={t.id}
                      href={ROUTES.TOPIC(generateTopicSlug(t.title))}
                      className={cn(
                        "flex items-center gap-2 p-1.5 rounded text-xs transition-colors",
                        isCurrent
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {isCompletedTopic && (
                        <IconWrapper icon={CheckmarkCircleIcon} size={12} className="text-emerald-500 shrink-0" />
                      )}
                      <span className={cn("truncate", !isCompletedTopic && !isCurrent && "opacity-70")}>
                        {t.title}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Complexity Analysis - Compact */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Complexity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-muted-foreground">Time</span>
                <Badge variant="secondary" className="font-mono font-bold text-[10px] px-1.5 py-0 h-5">
                  {topic.complexity.time}
                </Badge>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-xs mb-1.5">
                <span className="text-muted-foreground">Space</span>
                <Badge variant="secondary" className="font-mono font-bold text-[10px] px-1.5 py-0 h-5">
                  {topic.complexity.space}
                </Badge>
              </div>
            </div>
            <div className="pt-3 border-t border-border">
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 h-5">
                  {topic.category.replace(/_/g, " ")}
                </Badge>
                {topic.visualizerType !== VisualizerType.NONE && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] flex items-center gap-1 font-medium px-2 py-0.5 h-5"
                  >
                    <IconWrapper icon={PlayIcon} size={10} />
                    Interactive
                  </Badge>
                )}
                {isTopicCompleted && (
                  <Badge
                    variant="default"
                    className="text-[10px] flex items-center gap-1 font-medium px-2 py-0.5 h-5 bg-emerald-500"
                  >
                    <IconWrapper icon={CheckmarkCircleIcon} size={10} />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
