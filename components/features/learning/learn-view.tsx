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
      } catch {
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
    <div className="grid lg:grid-cols-[1fr_320px] gap-8 animate-in fade-in duration-500">
      {/* Main Content */}
      <div className="space-y-8 min-w-0">
        {/* Markdown Content */}
        <Card className="overflow-hidden">
          <CardContent className="p-6 md:p-8 lg:p-10">
            <MarkdownRenderer content={content} className="prose-lg" />
          </CardContent>
        </Card>

        {/* Code Examples Section */}
        {codeExamples.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Code Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {codeExamples.map((example) => (
                <div key={example.id} className="space-y-3">
                  <h4 className="font-semibold text-lg text-foreground">
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
        <QuizSection topicId={topic.id} questions={quizQuestions} />
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card className="lg:sticky lg:top-24 z-10">
          <CardHeader>
            <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Complexity Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-muted-foreground font-medium">Time Complexity</span>
                <Badge variant="secondary" className="font-mono font-bold text-xs">
                  {topic.complexity.time}
                </Badge>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: "75%" }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-muted-foreground font-medium">Space Complexity</span>
                <Badge variant="secondary" className="font-mono font-bold text-xs">
                  {topic.complexity.space}
                </Badge>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: "50%" }}
                />
              </div>
            </div>
            <div className="pt-6 border-t border-border">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">
                Concepts
              </h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="text-xs font-medium">
                  {topic.category.replace(/_/g, " ")}
                </Badge>
                {topic.visualizerType !== VisualizerType.NONE && (
                  <Badge
                    variant="secondary"
                    className="text-xs flex items-center gap-1.5 font-medium"
                  >
                    <IconWrapper icon={PlayIcon} size={12} />
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
