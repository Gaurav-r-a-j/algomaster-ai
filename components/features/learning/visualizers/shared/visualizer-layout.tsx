"use client"

import type { ReactNode } from "react"
import { useRef, useState } from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"

import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { IconWrapper } from "@/components/common/icon-wrapper"

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

  // Generate the toggle button for non-renderControls scenarios
  const ToggleButton = () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleInfoPanel}
          className="h-9 w-9 shrink-0"
          aria-label={isInfoPanelOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <IconWrapper
            icon={isInfoPanelOpen ? ChevronLeftIcon : ChevronRightIcon}
            size={18}
            className="text-muted-foreground"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        {isInfoPanelOpen ? "Hide Info" : "Show Info"}
      </TooltipContent>
    </Tooltip>
  )

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
                "hidden md:flex",
                !isInfoPanelOpen && "min-w-0 border-none"
              )}
            >
              <div className="flex h-full flex-col overflow-hidden">
                {/* Sticky Header in Left Panel */}
                <div className="border-border/50 bg-muted/30 sticky top-0 z-20 w-full shrink-0 border-b backdrop-blur-sm supports-[backdrop-filter]:bg-muted/40">
                  {/* Optional: Can add controls here if needed */}
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto custom-scrollbar">
                {infoPanel ? (
                  infoPanel
                ) : (
                  <div className="p-6">
                    {!hideTitle && (
                      <div className="mb-8">
                        <div className="flex items-center gap-3.5">
                          {icon}
                          <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                            {title}
                          </h2>
                        </div>
                        {headerBadges && (
                          <div className="mt-4 flex flex-wrap gap-2.5">
                            {headerBadges}
                          </div>
                        )}
                      </div>
                    )}
                    {description && (
                      <div className="prose dark:prose-invert max-w-none text-sm text-muted-foreground leading-relaxed">
                        {description}
                      </div>
                    )}
                  </div>
                )}
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="bg-border/50 hover:bg-primary/50 hidden h-full w-1.5 transition-colors md:block"
            />
          </>
        )}

        {/* RIGHT PANEL: Visualization Area */}
        <ResizablePanel
          defaultSize={showInfoPanel ? 65 : 100}
          minSize={30}
          className="flex h-full flex-col bg-background"
        >
          <div className="flex h-full flex-col overflow-hidden">
            {/* Header Section - Sticky Controls */}
            <div className="border-border/50 bg-background/95 sticky top-0 z-30 w-full shrink-0 border-b backdrop-blur-sm supports-[backdrop-filter]:bg-background/80 shadow-sm">
              <div className="flex flex-col gap-3 p-3 sm:gap-4 sm:p-4">
                {/* Controls Row - Always Visible */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {renderControls ? (
                    renderControls(
                      isInfoPanelOpen,
                      toggleInfoPanel,
                      headerDescription
                    )
                  ) : (
                    <>
                      {/* Toggle Button + Controls */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        {showInfoPanel && <ToggleButton />}

                        {showInfoPanel && controls && (
                          <Separator
                            orientation="vertical"
                            className="hidden h-6 sm:block"
                          />
                        )}

                        {controls && (
                          <div className="flex-1 min-w-0">{controls}</div>
                        )}
                      </div>

                      {/* Header Description */}
                      {headerDescription && (
                        <>
                          <Separator
                            orientation="vertical"
                            className="hidden h-6 sm:block"
                          />
                          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden">
                            <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                            <span className="truncate text-sm font-medium text-primary">
                              {headerDescription}
                            </span>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Mobile Header Description (if hidden above) */}
                {!renderControls && headerDescription && (
                  <div className="flex w-full items-center gap-2 rounded-md border border-primary/10 bg-primary/5 px-3 py-2 sm:hidden mx-3 mb-3 sm:mx-4 sm:mb-4">
                    <div className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-primary" />
                    <span className="text-sm font-medium text-primary">
                      {headerDescription}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Visualization Area - Scrollable */}
            <div className="relative min-h-0 flex-1 overflow-y-auto overflow-x-hidden bg-dot-pattern">
              <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
                <div className="mx-auto flex h-full w-full max-w-[1920px] flex-col items-center justify-center">
                  {children}
                </div>
              </div>
            </div>

            {/* Bottom Description (Optional) */}
            {!hideDescription && description && (
              <div className="border-border/40 bg-background/95 w-full shrink-0 border-t px-6 py-4 sm:px-8 sm:py-5">
                <div className="mx-auto w-full max-w-[1920px] text-sm text-muted-foreground leading-relaxed">
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
