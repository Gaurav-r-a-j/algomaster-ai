"use client"

import type { ReactNode } from "react"
import { useRef, useState } from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"

import { ChevronRightIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

interface VisualizerLayoutProps {
  title: ReactNode
  icon?: ReactNode
  controls?: ReactNode
  description?: ReactNode
  children: ReactNode
  infoPanel?: ReactNode
  headerBadges?: ReactNode
  headerDescription?: ReactNode
  hideTitle?: boolean
  hideDescription?: boolean
  showInfoPanel?: boolean
  renderControls?: (
    isPanelOpen: boolean,
    togglePanel: () => void,
    headerDescription?: ReactNode
  ) => ReactNode
}

export function VisualizerLayout({
  title,
  icon,
  controls,
  description,
  children,
  infoPanel,
  headerBadges,
  headerDescription,
  hideTitle = false,
  hideDescription = false,
  showInfoPanel = true,
  renderControls,
}: VisualizerLayoutProps) {
  const [isInfoPanelOpen, setIsInfoPanelOpen] = useState(true)
  const leftPanelRef = useRef<ImperativePanelHandle>(null)

  const toggleInfoPanel = () => {
    const panel = leftPanelRef.current
    if (panel) {
      if (isInfoPanelOpen) {
        panel.collapse()
      } else {
        panel.expand()
      }
      setIsInfoPanelOpen(!isInfoPanelOpen)
    }
  }

  return (
    <div className="bg-background h-full w-full overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full w-full">
        {/* LEFT PANEL: Information (Collapsible) */}
        {showInfoPanel && (
          <>
            <ResizablePanel
              ref={leftPanelRef}
              defaultSize={35}
              minSize={20}
              maxSize={50}
              collapsible={true}
              collapsedSize={0}
              onCollapse={() => setIsInfoPanelOpen(false)}
              onExpand={() => setIsInfoPanelOpen(true)}
              className={cn(
                "border-border/50 bg-muted/20 flex min-h-0 flex-col border-r transition-all duration-300 ease-in-out",
                !isInfoPanelOpen && "min-w-0 border-none"
              )}
            >
              <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
                {infoPanel ? (
                  infoPanel
                ) : (
                  <div className="p-6">
                    {!hideTitle && (
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                        {headerBadges && <div className="mt-2 flex gap-2">{headerBadges}</div>}
                      </div>
                    )}
                    {description && (
                      <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                        {description}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-border/50 hover:bg-primary/50 transition-colors" />
          </>
        )}

        {/* RIGHT PANEL: Visualization Area */}
        <ResizablePanel
          defaultSize={showInfoPanel ? 65 : 100}
          minSize={30}
          className="flex h-full flex-col bg-background"
        >
          <div className="flex h-full flex-col">
            {/* Header Section - Consolidated & Premium */}
            <div className="border-border/50 bg-background/95 sticky top-0 z-10 w-full shrink-0 border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="flex flex-col gap-4 p-4">
                {/* Top Bar: Controls & Toggles & Status Mix */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    {/* Generic Toggle (if not using renderControls or complex controls) */}
                    {!renderControls && !isInfoPanelOpen && showInfoPanel && (
                      <Button variant="ghost" size="icon" onClick={toggleInfoPanel} className="shrink-0">
                        <ChevronRightIcon className="h-4 w-4" />
                      </Button>
                    )}

                    {/* The Controls Area & Status Integration */}
                    <div className="flex min-w-0 flex-1 items-center gap-6">
                      {renderControls ? (
                        // Pass headerDescription to renderControls for Custom Layout
                        renderControls(isInfoPanelOpen, toggleInfoPanel, headerDescription)
                      ) : (
                        // Default Layout: Controls Left, Status Right (or Stacked if tight)
                        <>
                          <div className="flex-none">
                            {controls}
                          </div>
                          {headerDescription && (
                            <div className="hidden h-6 w-px bg-border/60 sm:block" />
                          )}
                          {headerDescription && (
                            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary animate-pulse" />
                              <span className="truncate text-sm font-medium text-muted-foreground">
                                {headerDescription}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Visualization Area */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-dot-pattern">
              <div className="absolute inset-0 flex items-center justify-center p-6 overflow-auto">
                <div className="mx-auto flex min-h-min w-full max-w-[1920px] flex-col items-center justify-center">
                  {children}
                </div>
              </div>
            </div>

            {/* Bottom Description (Optional, ONLY if explicit and NOT in header) */}
            {!hideDescription && description && infoPanel && (
              <div className="border-border/40 bg-background/95 w-full shrink-0 border-t px-6 py-4">
                <div className="mx-auto w-full max-w-[1920px] text-sm text-muted-foreground">
                  {description}
                </div>
              </div>
            )}

          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
