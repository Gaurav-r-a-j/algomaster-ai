"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{problem.title}</CardTitle>
          <Badge
            variant={
              problem.difficulty === "Easy"
                ? "default"
                : problem.difficulty === "Hard"
                  ? "destructive"
                  : "secondary"
            }
          >
            {problem.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              Problem Description
            </h4>
            <p className="text-muted-foreground text-sm whitespace-pre-wrap">
              {problem.description}
            </p>
          </div>

          {problem.testCases && problem.testCases.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Test Cases
              </h4>
              <div className="space-y-2">
                {problem.testCases.map((testCase, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-muted text-sm font-mono"
                  >
                    <div className="mb-1">
                      <span className="text-muted-foreground">Input: </span>
                      <span className="text-foreground">
                        {JSON.stringify(testCase.input)}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expected: </span>
                      <span className="text-foreground">
                        {JSON.stringify(testCase.expectedOutput)}
                      </span>
                    </div>
                    {testCase.explanation && (
                      <div className="mt-2 text-xs text-muted-foreground">
                        {testCase.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {problem.hints && problem.hints.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">Hints</h4>
              <ul className="space-y-1 list-disc list-inside text-sm text-muted-foreground">
                {problem.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            </div>
          )}

          {topic.practiceLinks && topic.practiceLinks.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                Practice Links
              </h4>
              <ul className="space-y-1">
                {topic.practiceLinks.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline text-sm"
                    >
                      {link.title} ({link.difficulty})
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

