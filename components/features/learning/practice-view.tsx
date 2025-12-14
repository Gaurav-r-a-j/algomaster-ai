"use client"

import { useEffect, useState } from "react"
import { getTopicContent } from "@/services/content/content-service"
import type { PracticeProblem } from "@/services/content/content-service"

import type { Topic } from "@/types/curriculum"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { cn } from "@/lib/utils"
import { CodePlayground } from "@/components/features/learning/code-editor/code-playground"
import { InstructionsPanel } from "@/components/features/learning/instructions-panel"

interface PracticeViewProps {
  topic: Topic
}

export function PracticeView({ topic }: PracticeViewProps) {
  const [practiceProblems, setPracticeProblems] = useState<PracticeProblem[]>([])
  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem | null>(null)
  const [loading, setLoading] = useState(true)

  // Load initial problems
  useEffect(() => {
    async function loadPracticeProblems() {
      try {
        const topicContent = await getTopicContent(topic)
        const problems = topicContent.practiceProblems || []
        setPracticeProblems(problems)
        
        // Always set a selected problem - either the first one or a default
        if (problems.length > 0) {
          setSelectedProblem(problems[0])
        } else {
          setSelectedProblem({
            id: "default",
            title: topic.title,
            description: topic.description,
            difficulty: topic.difficulty || "Medium",
            starterCode: topic.starterCode,
          })
        }
      } catch {
        // Fallback
        setSelectedProblem({
          id: "default",
          title: topic.title,
          description: topic.description,
          difficulty: topic.difficulty || "Medium",
          starterCode: topic.starterCode,
        })
      } finally {
        setLoading(false)
      }
    }
    loadPracticeProblems()
  }, [topic])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading workspace...</p>
      </div>
    )
  }

  // Ensure we have a valid problem object to render
  const currentProblem = selectedProblem || {
      id: "default",
      title: topic.title,
      description: topic.description,
      difficulty: topic.difficulty || "Medium",
      starterCode: topic.starterCode,
  }

  return (
    <div className="h-[calc(100vh-140px)] w-full overflow-hidden rounded-lg border bg-background shadow-sm">
      <ResizablePanelGroup direction="horizontal">
        {/* LEFT PANE: Problem Description & List */}
        <ResizablePanel defaultSize={40} minSize={25}>
          <ResizablePanelGroup direction="vertical">
             {/* Top: Description */}
            <ResizablePanel defaultSize={70} minSize={30}>
               <div className="h-full overflow-y-auto">
                 <InstructionsPanel topic={topic} practiceProblem={currentProblem} />
               </div>
            </ResizablePanel>
            
            <ResizableHandle />

            {/* Bottom: Problem List */}
            <ResizablePanel defaultSize={30} minSize={15}>
              <div className="flex h-full flex-col bg-muted/30">
                <div className="flex items-center border-b px-4 py-2 bg-muted/50">
                  <span className="text-xs font-semibold uppercase text-muted-foreground">
                    Problems
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto p-2">
                   {practiceProblems.length > 0 ? (
                      <div className="space-y-1">
                        {practiceProblems.map((problem) => (
                          <button
                            key={problem.id}
                            onClick={() => setSelectedProblem(problem)}
                            className={cn(
                              "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                              selectedProblem?.id === problem.id
                                ? "bg-primary/10 text-primary font-medium"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            )}
                          >
                           <div className="flex items-center justify-between">
                             <span>{problem.title}</span>
                             <span className={cn(
                               "text-[10px] px-1.5 py-0.5 rounded capitalize",
                               problem.difficulty === "Easy" ? "bg-emerald-500/10 text-emerald-600" :
                               problem.difficulty === "Medium" ? "bg-amber-500/10 text-amber-600" :
                               "bg-red-500/10 text-red-600"
                             )}>
                               {problem.difficulty}
                             </span>
                           </div>
                          </button>
                        ))}
                      </div>
                   ) : (
                     <div className="p-4 text-center text-xs text-muted-foreground">
                       No additional practice problems.
                     </div>
                   )}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT PANE: Code Editor */}
        <ResizablePanel defaultSize={60} minSize={30}>
           <div className="h-full flex flex-col">
              <CodePlayground 
                initialCode={currentProblem.starterCode || topic.starterCode} 
              />
           </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

