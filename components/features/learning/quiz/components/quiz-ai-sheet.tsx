"use client"

import { motion } from "motion/react"
import { SparklesIcon } from "@/lib/icons"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IconWrapper } from "@/components/common/icon-wrapper"

interface QuizAISheetProps {
  topicTitle?: string
  isGenerating: boolean
  onGenerate: () => void
  trigger: React.ReactNode
}

export function QuizAISheet({
  topicTitle,
  isGenerating,
  onGenerate,
  trigger,
}: QuizAISheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <IconWrapper
              icon={SparklesIcon}
              size={20}
              className="text-yellow-500"
            />
            AI Question Generation
          </SheetTitle>
          <SheetDescription>
            Generate custom quiz questions based on {topicTitle} using AI.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          {isGenerating ? (
            <Alert>
              <AlertDescription className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <IconWrapper
                    icon={SparklesIcon}
                    size={16}
                    className="text-yellow-500"
                  />
                </motion.div>
                Generating AI questions...
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                AI will generate personalized questions based on the topic content.
              </p>
              <Button onClick={onGenerate} className="w-full" disabled={isGenerating}>
                <IconWrapper icon={SparklesIcon} size={16} className="mr-2" />
                Generate AI Questions
              </Button>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

