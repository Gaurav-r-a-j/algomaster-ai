"use client";

import { useEffect, useState } from "react";
import { ResizablePanels } from "@/components/common/resizable-panels";
import { InstructionsPanel } from "@/components/features/learning/instructions-panel";
import { CodePlayground } from "@/components/common/code-playground";
import { getTopicContent } from "@/services/content/content-service";
import type { PracticeProblem } from "@/services/content/content-service";
import type { Topic } from "@/types/curriculum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PracticeViewProps {
  topic: Topic;
}

export function PracticeView({ topic }: PracticeViewProps) {
  const [practiceProblems, setPracticeProblems] = useState<PracticeProblem[]>(
    []
  );
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPracticeProblems() {
      try {
        const topicContent = await getTopicContent(topic);
        const problems = topicContent.practiceProblems;
        setPracticeProblems(problems);
        if (problems.length > 0) {
          setSelectedProblem(problems[0]);
        } else {
          // Fallback to topic starter code
          setSelectedProblem({
            id: "default",
            title: topic.title,
            description: topic.description,
            difficulty: topic.difficulty || "Medium",
            starterCode: topic.starterCode,
          });
        }
      } catch (error) {
        // Fallback to topic starter code
        setSelectedProblem({
          id: "default",
          title: topic.title,
          description: topic.description,
          difficulty: topic.difficulty || "Medium",
          starterCode: topic.starterCode,
        });
      } finally {
        setLoading(false);
      }
    }
    loadPracticeProblems();
  }, [topic]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading practice problems...</p>
      </div>
    );
  }

  if (practiceProblems.length === 0 && !selectedProblem) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          No practice problems available for this topic yet.
        </p>
      </div>
    );
  }

  return (
    <div className="h-[85vh] w-full">
      {practiceProblems.length > 1 ? (
        <Tabs
          defaultValue={practiceProblems[0]?.id}
          className="h-full flex flex-col"
        >
          <TabsList className="mb-4">
            {practiceProblems.map((problem) => (
              <TabsTrigger
                key={problem.id}
                value={problem.id}
                onClick={() => setSelectedProblem(problem)}
              >
                {problem.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {practiceProblems.map((problem) => (
            <TabsContent
              key={problem.id}
              value={problem.id}
              className="flex-1 mt-0"
            >
              <ResizablePanels>
                <InstructionsPanel
                  topic={topic}
                  practiceProblem={problem}
                />
                <CodePlayground
                  initialCode={problem.starterCode || topic.starterCode}
                />
              </ResizablePanels>
            </TabsContent>
          ))}
        </Tabs>
      ) : (
        <ResizablePanels>
          <InstructionsPanel
            topic={topic}
            practiceProblem={selectedProblem || undefined}
          />
          <CodePlayground
            initialCode={
              selectedProblem?.starterCode || topic.starterCode
            }
          />
        </ResizablePanels>
      )}
    </div>
  );
}
