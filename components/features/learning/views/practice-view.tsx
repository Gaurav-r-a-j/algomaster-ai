"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { PracticeProblem } from "@/services/content/content-service"
import type { ImperativePanelHandle } from "react-resizable-panels"

import type { Topic } from "@/types/curriculum"
import { useTopicContent } from "@/hooks/curriculum"
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { CodePlayground } from "@/components/features/learning/code-editor/code-playground"
import { InstructionsPanel } from "@/components/features/learning/layout/instructions-panel"
import { PracticeViewSkeleton } from "@/components/features/learning/skeletons/practice-view-skeleton"

interface PracticeViewProps {
  topic: Topic
}

export function PracticeView({ topic }: PracticeViewProps) {
  const { data: topicContent, isLoading: loadingResult } =
    useTopicContent(topic)
  const practiceProblems = topicContent?.practiceProblems || []
  const loading = loadingResult // Alias to match existing usage or just use loadingResult

  const [selectedProblem, setSelectedProblem] =
    useState<PracticeProblem | null>(null)
  const [isProblemListOpen, setIsProblemListOpen] = useState(true)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const leftPanelRef = useRef<ImperativePanelHandle>(null)

  const toggleSidebar = useCallback(() => {
    const panel = leftPanelRef.current
    if (panel) {
      if (isSidebarOpen) {
        panel.collapse()
      } else {
        panel.expand()
      }
      setIsSidebarOpen(!isSidebarOpen)
    }
  }, [isSidebarOpen])

  // Set initial selected problem when data loads
  useEffect(() => {
    if (loading) return

    // Only set if not already set (or if topic changed which resets this component instance normally,
    // but React Query might keep data fresh. Actually if topic changes, this component rerenders.
    // We should probably reset selectedProblem if topic.id changes, but the component key usually handles that in parent tabs?
    // Let's just set it if it's null or if we want to sync with current topic.)

    if (practiceProblems.length > 0) {
      if (
        !selectedProblem ||
        !practiceProblems.find((p) => p.id === selectedProblem.id)
      ) {
        setSelectedProblem(practiceProblems[0])
      }
    } else {
      setSelectedProblem({
        id: "default",
        title: topic.title,
        description: topic.description,
        difficulty: topic.difficulty || "Medium",
        starterCode: topic.starterCode,
      })
    }
  }, [topicContent, loading, topic]) // simplified dependency on data source

  if (loading) {
    return <PracticeViewSkeleton />
  }

  const currentProblem = useMemo(
    () =>
      selectedProblem || {
        id: "default",
        title: topic.title,
        description: topic.description,
        difficulty: topic.difficulty || "Medium",
        starterCode: topic.starterCode,
      },
    [selectedProblem, topic]
  )

  return (
    <div className="bg-background h-full w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal">
        {/* LEFT PANE: Problem Description & Collapsible List */}
        <ResizablePanel
          ref={leftPanelRef}
          defaultSize={40}
          minSize={20}
          maxSize={80}
          collapsible={true}
          collapsedSize={0}
          onCollapse={() => setIsSidebarOpen(false)}
          onExpand={() => setIsSidebarOpen(true)}
          className="flex min-h-0 flex-col"
        >
          <div className="min-h-0 flex-1 overflow-y-auto">
            <InstructionsPanel topic={topic} practiceProblem={currentProblem} />
          </div>

          {/* Collapsible Problem List */}
          <div className="bg-muted/10 border-t">
            <Collapsible
              open={isProblemListOpen}
              onOpenChange={setIsProblemListOpen}
              className="w-full"
            >
              <div className="bg-muted/20 flex items-center justify-between border-b px-4 py-2.5">
                <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  Practice Problems
                </span>
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-muted/50 h-6 w-6 p-0"
                  >
                    {isProblemListOpen ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronUpIcon className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="max-h-[200px] overflow-y-auto p-3">
                  {practiceProblems.length > 0 ? (
                    <div className="space-y-1">
                      {practiceProblems.map((problem) => (
                        <button
                          key={problem.id}
                          onClick={() => setSelectedProblem(problem)}
                          className={cn(
                            "w-full border-b px-3 py-3 text-left text-sm transition-colors first:border-t",
                            selectedProblem?.id === problem.id
                              ? "bg-primary/10 text-primary font-medium"
                              : "hover:bg-muted text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="mr-2 truncate">
                              {problem.title}
                            </span>
                            <span
                              className={cn(
                                "shrink-0 rounded px-1.5 py-0.5 text-[10px] capitalize",
                                problem.difficulty === "Easy"
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : problem.difficulty === "Medium"
                                    ? "bg-amber-500/10 text-amber-600"
                                    : "bg-red-500/10 text-red-600"
                              )}
                            >
                              {problem.difficulty}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground p-4 text-center text-xs">
                      No additional practice problems.
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT PANE: Code Editor */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="flex h-full flex-col">
            <CodePlayground
              topic={topic}
              initialCode={currentProblem.starterCode || topic.starterCode}
              onToggleSidebar={toggleSidebar}
              isSidebarOpen={isSidebarOpen}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
