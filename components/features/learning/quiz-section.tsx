"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { CheckmarkCircleIcon } from "@/lib/icons";
import { useProgress } from "@/context/progress-context";
import type { QuizQuestion } from "@/types/curriculum";
import { cn } from "@/lib/utils";

interface QuizSectionProps {
  topicId: string;
  questions: QuizQuestion[];
}

export function QuizSection({ topicId, questions }: QuizSectionProps) {
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
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <IconWrapper
                icon={CheckmarkCircleIcon}
                size={20}
                className="text-emerald-500"
              />
              Knowledge Check
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Complete this quiz to mark the lesson as done.
            </p>
          </div>
          {isAlreadyCompleted && (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-none"
            >
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {questions.map((q, idx) => {
          const isCorrect = selectedAnswers[q.id] === q.correctAnswer;
          const hasAnswered = selectedAnswers[q.id] !== undefined;

          return (
            <div key={q.id}>
              <p className="text-foreground font-medium mb-4 flex gap-3">
                <span className="text-muted-foreground">{idx + 1}.</span>{" "}
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
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      className={cn(btnClass)}
                      disabled={showResults}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
              {showResults && hasAnswered && (
                <p
                  className={cn(
                    "mt-3 pl-6 text-sm",
                    isCorrect
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {isCorrect ? "✓ Correct! " : "✗ Incorrect. "}
                  {q.explanation}
                </p>
              )}
            </div>
          );
        })}

        {!showResults && (
          <div className="pt-4">
            <Button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="w-full"
            >
              Submit Answers
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

