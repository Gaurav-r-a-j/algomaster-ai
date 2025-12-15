"use client"

import { useEffect, useState } from "react"
import { useTopicContent } from "@/hooks/use-curriculum"
import type { PracticeProblem } from "@/services/content/content-service"
import type { Topic } from "@/types/curriculum"
import type { ImperativePanelHandle } from "react-resizable-panels"

// ... imports

export function PracticeView({ topic }: PracticeViewProps) {
  const { data: topicContent, isLoading: loadingResult } = useTopicContent(topic)
  const practiceProblems = topicContent?.practiceProblems || []
  const loading = loadingResult // Alias to match existing usage or just use loadingResult

  const [selectedProblem, setSelectedProblem] = useState<PracticeProblem | null>(null)
  const [isProblemListOpen, setIsProblemListOpen] = useState(true)

  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const leftPanelRef = useRef<ImperativePanelHandle>(null)

  const toggleSidebar = () => {
    const panel = leftPanelRef.current
    if (panel) {
      if (isSidebarOpen) {
        panel.collapse()
      } else {
        panel.expand()
      }
      setIsSidebarOpen(!isSidebarOpen)
    }
  }

  // Set initial selected problem when data loads
  useEffect(() => {
    if (loading) return

    // Only set if not already set (or if topic changed which resets this component instance normally, 
    // but React Query might keep data fresh. Actually if topic changes, this component rerenders. 
    // We should probably reset selectedProblem if topic.id changes, but the component key usually handles that in parent tabs?
    // Let's just set it if it's null or if we want to sync with current topic.)

    if (practiceProblems.length > 0) {
      if (!selectedProblem || !practiceProblems.find(p => p.id === selectedProblem.id)) {
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
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground animate-pulse">Loading workspace...</p>
      </div>
    )
  }

  const currentProblem = selectedProblem || {
    id: "default",
    title: topic.title,
    description: topic.description,
    difficulty: topic.difficulty || "Medium",
    starterCode: topic.starterCode,
  }

  return (
    <div className="h-full w-full overflow-hidden bg-background">
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
          className="flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto min-h-0">
            <InstructionsPanel topic={topic} practiceProblem={currentProblem} />
          </div>

          {/* Collapsible Problem List */}
          <div className="border-t bg-muted/10">
            <Collapsible
              open={isProblemListOpen}
              onOpenChange={setIsProblemListOpen}
              className="w-full"
            >
              <div className="flex items-center justify-between px-4 py-2 border-b bg-muted/20">
                <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Practice Problems
                </span>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-muted/50">
                    {isProblemListOpen ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronUpIcon className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>

              <CollapsibleContent>
                <div className="max-h-[200px] overflow-y-auto p-2">
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
                            <span className="truncate mr-2">{problem.title}</span>
                            <span className={cn(
                              "text-[10px] px-1.5 py-0.5 rounded capitalize shrink-0",
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
              </CollapsibleContent>
            </Collapsible>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* RIGHT PANE: Code Editor */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <div className="h-full flex flex-col">
            <CodePlayground
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
