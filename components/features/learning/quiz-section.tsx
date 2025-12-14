"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { CheckmarkCircleIcon } from "@/lib/icons";
import { useProgress } from "@/context/progress-context";
import type { QuizQuestion } from "@/types/curriculum";
import { cn } from "@/lib/utils";
import { fadeIn, slideUp, staggerContainer, staggerItem, transitions, hoverScaleSmall, tapScale } from "@/lib/animations";

interface QuizSectionProps {
  topicId: string;
  questions: QuizQuestion[];
  useAIQuestions?: boolean;
  onToggleAIQuestions?: (useAI: boolean) => void;
  hasAIQuestions?: boolean;
}

export function QuizSection({ 
  topicId, 
  questions, 
  useAIQuestions = false,
  onToggleAIQuestions,
  hasAIQuestions = false,
}: QuizSectionProps) {
  const { markAsCompleted, isCompleted } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number>
  >({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (qId: number, optionIdx: number) => {
    if (showResults) {return;}
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    setShowResults(true);
    markAsCompleted(topicId);
  };

  const isAlreadyCompleted = isCompleted(topicId);
  const allAnswered = questions.every(
    (q) => selectedAnswers[q.id] !== undefined
  );

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeIn}
      transition={transitions.smooth}
    >
      <Card className="shadow-sm border-border/50">
        <CardHeader className="border-b border-border/50">
          <motion.div
            variants={slideUp}
            className="flex justify-between items-start gap-4"
          >
            <div className="flex-1">
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                >
                  <IconWrapper
                    icon={CheckmarkCircleIcon}
                    size={20}
                    className="text-emerald-500"
                  />
                </motion.div>
                Knowledge Check
              </CardTitle>
              <p className="text-muted-foreground text-sm mt-1">
                Complete this quiz to mark the lesson as done.
              </p>
            {/* AI Questions Toggle */}
            {hasAIQuestions && onToggleAIQuestions && (
              <div className="flex items-center gap-2 mt-3">
                <Switch
                  id="ai-questions"
                  checked={useAIQuestions}
                  onCheckedChange={onToggleAIQuestions}
                />
                <Label htmlFor="ai-questions" className="text-xs text-muted-foreground cursor-pointer">
                  Use AI-generated questions (optional)
                </Label>
              </div>
            )}
          </div>
          {isAlreadyCompleted && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none shrink-0"
            >
              Completed
            </Badge>
          )}
          </motion.div>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {questions.map((q, idx) => {
              const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
              const hasAnswered = selectedAnswers[q.id] !== undefined;

              return (
                <motion.div
                  key={q.id}
                  variants={staggerItem}
                  className={cn(idx > 0 && "pt-8 border-t border-border/50")}
                >
                  <p className="text-foreground font-medium mb-4 flex gap-3">
                    <motion.span
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={transitions.quick}
                      className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold shrink-0"
                    >
                      {idx + 1}
                    </motion.span>
                    {q.question}
                  </p>
                  <div className="space-y-3 pl-6">
                    {q.options.map((opt, optIdx) => {
                  let btnClass =
                    "w-full text-left p-3 rounded-lg border text-sm transition-all ";

                  if (showResults) {
                    if (optIdx === q.correctAnswer) {
                      btnClass +=
                        "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 text-emerald-700 dark:text-emerald-400";
                    } else if (selectedAnswers[q.id] === optIdx) {
                      btnClass +=
                        "bg-red-50 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-400";
                    } else {
                      btnClass +=
                        "bg-background border-border opacity-50";
                    }
                  } else {
                    if (selectedAnswers[q.id] === optIdx) {
                      btnClass +=
                        "bg-primary/10 border-primary text-primary shadow-sm ring-1 ring-primary";
                    } else {
                      btnClass +=
                        "bg-background border-border hover:bg-muted";
                    }
                  }

                      return (
                        <motion.button
                          key={optIdx}
                          whileHover={hoverScaleSmall}
                          whileTap={tapScale}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={cn(btnClass)}
                          disabled={showResults}
                        >
                          {opt}
                        </motion.button>
                      );
                    })}
                  </div>
                  {showResults && hasAnswered && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={transitions.smooth}
                      className={cn(
                        "mt-3 pl-6 text-sm p-3 rounded-lg",
                        isCorrect
                          ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800"
                          : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      )}
                    >
                      <span className="font-semibold">
                        {isCorrect ? "✓ Correct! " : "✗ Incorrect. "}
                      </span>
                      {q.explanation}
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {!showResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitions.smooth, delay: 0.2 }}
              className="pt-4"
            >
              <motion.div whileHover={hoverScaleSmall} whileTap={tapScale}>
                <Button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className="w-full"
                >
                  Submit Answers
                </Button>
              </motion.div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}

