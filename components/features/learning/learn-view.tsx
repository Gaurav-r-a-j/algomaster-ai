"use client";

import { useEffect, useState } from "react";
import { MarkdownRenderer } from "@/components/common/markdown-renderer";
import { QuizSection } from "@/components/features/learning/quiz-section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconWrapper } from "@/components/common/icon-wrapper";
import { PlayIcon } from "@/lib/icons";
import type { Topic } from "@/types/curriculum";
import { VisualizerType } from "@/types/curriculum";
import { getTopicContent } from "@/services/content/content-service";
import type { CodeExample } from "@/services/content/content-service";
import { CodePreview } from "@/components/common/code-preview";

interface LearnViewProps {
  topic: Topic;
}

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

  useEffect(() => {
    async function loadContent() {
      try {
        const topicContent = await getTopicContent(topic);
        setContent(topicContent.markdown);
        setCodeExamples(topicContent.codeExamples);
      } catch (error) {
        // Fallback to topic.content
        setContent(topic.content);
      } finally {
        setLoading(false);
      }
    }
    loadContent();
  }, [topic]);

  const quizQuestions = topic.quiz || getDefaultQuiz(topic);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading content...</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-4 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-3 space-y-8">
        <Card>
          <CardContent className="p-8 md:p-12">
            <MarkdownRenderer content={content} />
          </CardContent>
        </Card>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {codeExamples.map((example) => (
                <div key={example.id}>
                  <h4 className="font-semibold text-foreground mb-2">
                    {example.title}
                  </h4>
                  <CodePreview
                    code={example.code}
                    language={example.language}
                    preview={null}
                  />
                  {example.explanation && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {example.explanation}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        <QuizSection topicId={topic.id} questions={quizQuestions} />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <Card className="lg:sticky lg:top-4 z-10">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Complexity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">Time</span>
                <Badge variant="secondary" className="font-mono font-bold">
                  {topic.complexity.time}
                </Badge>
              </div>
              <div className="h-2 w-full bg-muted rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "60%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground font-medium">Space</span>
                <Badge variant="secondary" className="font-mono font-bold">
                  {topic.complexity.space}
                </Badge>
              </div>
              <div className="h-2 w-full bg-muted rounded-full">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: "40%" }}
                />
              </div>
            </div>
            <div className="pt-6 border-t border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Concepts
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs">
                  {topic.category.replace("_", " ")}
                </Badge>
                {topic.visualizerType !== VisualizerType.NONE && (
                  <Badge
                    variant="secondary"
                    className="text-xs flex items-center gap-1"
                  >
                    <IconWrapper icon={PlayIcon} size={10} />
                    Interactive
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
