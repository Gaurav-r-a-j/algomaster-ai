"use client"

import type { ReactNode } from "react"
import { useRef, useState } from "react"
import type { ImperativePanelHandle } from "react-resizable-panels"
import { motion } from "motion/react"

import { fadeIn, slideUp, transitions } from "@/lib/animations"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon } from "@/lib/icons"
import { IconWrapper } from "@/components/common/icon-wrapper"
import { cn } from "@/lib/utils"

interface VisualizerLayoutProps {
  title: ReactNode
  icon?: ReactNode
  controls: ReactNode
  description?: ReactNode
  children: ReactNode
  infoPanel?: ReactNode
  headerBadges?: ReactNode
  headerDescription?: ReactNode
  hideTitle?: boolean
  hideDescription?: boolean
  showInfoPanel?: boolean
  renderControls?: (isPanelOpen: boolean, togglePanel: () => void) => ReactNode
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
    <div className="h-full w-full overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal">
        {/* LEFT PANEL: Information (Collapsible) */}
        {showInfoPanel && infoPanel && (
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
              className="flex flex-col min-h-0 border-r border-border/50 bg-muted/20"
            >
              <div className="flex-1 overflow-y-auto min-h-0">{infoPanel}</div>
            </ResizablePanel>

            <ResizableHandle withHandle />
          </>
        )}

        {/* RIGHT PANEL: Visualization Area */}
        <ResizablePanel defaultSize={showInfoPanel && infoPanel ? 65 : 100} minSize={50}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            transition={transitions.smooth}
            className="flex h-full flex-col"
          >
            {/* Header Section - Simple Box Layout */}
            <motion.div
              variants={slideUp}
              transition={transitions.spring}
              className="w-full shrink-0 border-b border-border/50 bg-background/95"
            >
              <div className="px-6 py-4">
                {/* Controls Row */}
                <div className="flex items-center gap-4 flex-wrap w-full">
                  {renderControls ? renderControls(isInfoPanelOpen, toggleInfoPanel) : controls}
                </div>

                {/* Step Description Row */}
                {headerDescription && (
                  <div className="mt-3 pt-3 border-t border-border/20 w-full">
                    <p className="text-foreground text-sm font-medium">
                      {headerDescription}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Visualization Area - Takes remaining space */}
            <motion.div
              variants={slideUp}
              transition={{ ...transitions.spring, delay: 0.05 }}
              className="flex-1 min-h-0 overflow-auto"
            >
              <div className="mx-auto w-full max-w-[1920px] h-full flex flex-col">
                {children}
              </div>
            </motion.div>

            {/* Bottom Description Section */}
            {!hideDescription && description && (
              <motion.div
                variants={slideUp}
                transition={{ ...transitions.spring, delay: 0.1 }}
                className="w-full shrink-0 border-t border-border/40 bg-background/95 px-6 py-4"
              >
                <div className="mx-auto w-full max-w-[1920px]">{description}</div>
              </motion.div>
            )}
          </motion.div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
