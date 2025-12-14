"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "motion/react";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { QuizSection } from "@/components/features/learning/quiz-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon, ChevronRightIcon, ChevronLeftIcon, CheckmarkCircleIcon, BookOpenIcon } from "@/lib/icons";
import { Separator } from "@/components/ui/separator";
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
import { fadeIn, fadeInWithDelay, slideUp, slideUpWithDelay, transitions } from "@/lib/animations";

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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center py-12"
      >
        <div className="flex flex-col items-center gap-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent"
          />
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground"
          >
            Loading content...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  // Ensure we have content - use topic.content as fallback
  const displayContent = content && content.trim() && !content.toLowerCase().includes("coming soon") 
    ? content 
    : topic.content;

  const isTopicCompleted = isCompleted(topic.id);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
      className="grid lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-6 lg:gap-8"
    >
      {/* Main Content - Full Width */}
      <div className="space-y-6 lg:space-y-8 min-w-0">
        {/* Markdown Content */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.1)}
        >
          <Card className="overflow-hidden shadow-sm border-border/50 transition-shadow hover:shadow-md">
          <CardContent className="p-6 md:p-8 lg:p-10">
            {displayContent && displayContent.trim() ? (
              <MarkdownRenderer content={displayContent} className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted" />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Content is being prepared. Please check back soon.</p>
              </div>
            )}
          </CardContent>
        </Card>
        </motion.div>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <motion.div
            initial="initial"
            animate="animate"
            variants={slideUpWithDelay(0.2)}
          >
            <Card className="shadow-sm border-border/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-4 border-b border-border/50">
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <div className="p-1.5 rounded-md bg-primary/10">
                  <IconWrapper icon={PlayIcon} size={16} className="text-primary" />
                </div>
                Code Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {codeExamples.map((example, idx) => (
                <motion.div
                  key={example.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  className={cn("space-y-3", idx > 0 && "pt-6 border-t border-border/50")}
                >
                  <h4 className="font-semibold text-base text-foreground flex items-center gap-2">
                    <motion.span
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold"
                    >
                      {idx + 1}
                    </motion.span>
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
                </motion.div>
              ))}
            </CardContent>
          </Card>
          </motion.div>
        )}

        {/* Quiz Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={slideUpWithDelay(0.3)}
        >
          <QuizSection 
          topicId={topic.id} 
          questions={quizQuestions}
          useAIQuestions={useAIQuestions}
          onToggleAIQuestions={setUseAIQuestions}
          hasAIQuestions={false}
        />
        </motion.div>
      </div>

      {/* Right Sidebar - Enhanced with More Content */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ ...transitions.smooth, delay: 0.2 }}
        className="lg:sticky lg:top-[76px] lg:self-start space-y-4 lg:space-y-5 z-10"
      >
        {/* Quick Navigation */}
        {(prevTopic || nextTopic) && (
          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="shadow-sm border-border/50 transition-shadow hover:shadow-md">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                <div className="p-1 rounded bg-muted">
                  <IconWrapper icon={ChevronRightIcon} size={10} />
                </div>
                Quick Navigation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-3">
              {prevTopic && (
                <motion.div whileHover={{ x: -4 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start group hover:bg-primary/5 hover:border-primary/20 transition-all" 
                    asChild
                  >
                    <Link href={ROUTES.TOPIC(generateTopicSlug(prevTopic.title))}>
                      <IconWrapper icon={ChevronLeftIcon} size={14} className="mr-2 group-hover:text-primary transition-colors" />
                      <span className="truncate text-xs group-hover:text-primary transition-colors">{prevTopic.title}</span>
                    </Link>
                  </Button>
                </motion.div>
              )}
              {nextTopic && (
                <motion.div whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start group hover:bg-primary/5 hover:border-primary/20 transition-all" 
                    asChild
                  >
                    <Link href={ROUTES.TOPIC(generateTopicSlug(nextTopic.title))}>
                      <span className="truncate text-xs group-hover:text-primary transition-colors">{nextTopic.title}</span>
                      <IconWrapper icon={ChevronRightIcon} size={14} className="ml-2 group-hover:text-primary transition-colors" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
          </motion.div>
        )}

        {/* Module Progress */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          whileHover={{ y: -2 }}
        >
          <Card className="shadow-sm border-border/50 transition-shadow hover:shadow-md">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
              <div className="p-1 rounded bg-muted">
                <IconWrapper icon={BookOpenIcon} size={10} />
              </div>
              Module Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-3">
            <div>
              <div className="flex justify-between items-center text-xs mb-2.5">
                <span className="text-muted-foreground font-medium">
                  {moduleTopics.filter((t) => isCompleted(t.id)).length} / {moduleTopics.length} completed
                </span>
                <span className="font-bold text-foreground">{moduleProgress}%</span>
              </div>
              <Progress 
                value={moduleProgress} 
                className="h-2.5 bg-muted"
              />
            </div>
            <Separator className="my-3" />
            <div>
              <p className="text-xs text-muted-foreground mb-2">Topics in this module:</p>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                {moduleTopics.map((t, idx) => {
                  const isCompletedTopic = isCompleted(t.id);
                  const isCurrent = t.id === topic.id;
                  return (
                    <motion.div
                      key={t.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        href={ROUTES.TOPIC(generateTopicSlug(t.title))}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md text-xs transition-all group",
                          isCurrent
                            ? "bg-primary/10 text-primary font-medium border border-primary/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted/50 hover:border-border border border-transparent"
                        )}
                      >
                      {isCompletedTopic ? (
                        <IconWrapper icon={CheckmarkCircleIcon} size={14} className="text-emerald-500 shrink-0" />
                      ) : (
                        <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground/30 shrink-0" />
                      )}
                      <span className={cn("truncate flex-1", !isCompletedTopic && !isCurrent && "opacity-70 group-hover:opacity-100")}>
                        {t.title}
                      </span>
                    </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>

        {/* Complexity Analysis - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          whileHover={{ y: -2 }}
        >
          <Card className="shadow-sm border-border/50 transition-shadow hover:shadow-md">
          <CardHeader className="pb-3 border-b border-border/50">
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Complexity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">Time</span>
                <Badge variant="secondary" className="font-mono font-bold text-[10px] px-2 py-0.5 h-5 bg-muted">
                  {topic.complexity.time}
                </Badge>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground font-medium">Space</span>
                <Badge variant="secondary" className="font-mono font-bold text-[10px] px-2 py-0.5 h-5 bg-muted">
                  {topic.complexity.space}
                </Badge>
              </div>
            </div>
            <Separator className="my-3" />
            <div>
              <div className="flex flex-wrap gap-1.5">
                <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5 h-5 border-border/50">
                  {topic.category.replace(/_/g, " ")}
                </Badge>
                {topic.visualizerType !== VisualizerType.NONE && (
                  <Badge
                    variant="secondary"
                    className="text-[10px] flex items-center gap-1 font-medium px-2 py-0.5 h-5 bg-primary/10 text-primary border-primary/20"
                  >
                    <IconWrapper icon={PlayIcon} size={10} />
                    Interactive
                  </Badge>
                )}
                {isTopicCompleted && (
                  <Badge
                    variant="default"
                    className="text-[10px] flex items-center gap-1 font-medium px-2 py-0.5 h-5 bg-emerald-500 hover:bg-emerald-600 text-white border-0"
                  >
                    <IconWrapper icon={CheckmarkCircleIcon} size={10} />
                    Completed
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
