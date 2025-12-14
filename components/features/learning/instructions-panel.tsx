"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Topic } from "@/types/curriculum";
import type { PracticeProblem } from "@/services/content/content-service";

interface InstructionsPanelProps {
  topic: Topic;
  practiceProblem?: PracticeProblem;
}

export function InstructionsPanel({
  topic,
  practiceProblem,
}: InstructionsPanelProps) {
  const problem = practiceProblem || {
    id: "default",
    title: topic.title,
    description: topic.description,
    difficulty: topic.difficulty || "Medium",
  };

  return (
    <Card className="h-full flex flex-col shadow-sm border-border/50">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-lg font-bold">{problem.title}</CardTitle>
          <Badge
            variant={
              problem.difficulty === "Easy"
                ? "default"
                : problem.difficulty === "Hard"
                  ? "destructive"
                  : "secondary"
            }
            className="shrink-0"
          >
            {problem.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-5">
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
              Problem Description
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap bg-muted/30 p-4 rounded-lg border border-border/50">
              {problem.description}
            </p>
          </div>

          {problem.testCases && problem.testCases.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                Test Cases
              </h4>
              <div className="space-y-3">
                {problem.testCases.map((testCase, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-lg bg-muted/50 border border-border/50 text-sm font-mono space-y-2"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground uppercase">Test Case {idx + 1}</span>
                    </div>
                    <div className="space-y-1.5 pl-7">
                      <div>
                        <span className="text-muted-foreground text-xs font-medium">Input: </span>
                        <span className="text-foreground break-all">
                          {JSON.stringify(testCase.input)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground text-xs font-medium">Expected: </span>
                        <span className="text-foreground break-all">
                          {JSON.stringify(testCase.expectedOutput)}
                        </span>
                      </div>
                      {testCase.explanation && (
                        <div className="mt-2 pt-2 border-t border-border/50 text-xs text-muted-foreground italic">
                          {testCase.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {problem.hints && problem.hints.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">Hints</h4>
              <div className="space-y-2">
                {problem.hints.map((hint, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs font-bold">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-foreground leading-relaxed">{hint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {topic.practiceLinks && topic.practiceLinks.length > 0 && (
            <>
              <Separator className="my-4" />
              <div>
                <h4 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wider">
                  Practice Problems
                </h4>
                <div className="space-y-2">
                  {topic.practiceLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                    >
                      <span className="font-medium text-foreground group-hover:text-primary text-sm transition-colors">
                        {link.title}
                      </span>
                      <Badge
                        variant={
                          link.difficulty === "Easy"
                            ? "default"
                            : link.difficulty === "Hard"
                              ? "destructive"
                              : "secondary"
                        }
                        className="ml-3 shrink-0 text-[10px] font-semibold px-2 py-0.5 h-5"
                      >
                        {link.difficulty}
                      </Badge>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

