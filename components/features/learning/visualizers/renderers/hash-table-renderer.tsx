import { motion, AnimatePresence } from "motion/react"
import type { VisualizationStep } from "@/types/curriculum"

interface HashTableRendererProps {
    currentData: VisualizationStep
}

export function HashTableRenderer({ currentData }: HashTableRendererProps) {
    const buckets = (currentData.auxiliary as any)?.buckets || []
    return (
        <div className="flex w-full flex-col gap-3 p-6 max-w-3xl mx-auto">
            {buckets.map((bucket: number[], idx: number) => {
                const isTargetBucket = (currentData.auxiliary as any)?.currentBucket === idx
                return (
                    <div key={idx} className="flex items-center gap-4">
                        {/* Index Bucket */}
                        <motion.div
                            animate={{
                                backgroundColor: isTargetBucket ? "hsl(var(--primary)/0.1)" : "hsl(var(--muted))",
                                borderColor: isTargetBucket ? "hsl(var(--primary))" : "transparent"
                            }}
                            className="flex h-12 w-16 shrink-0 items-center justify-center rounded-lg border bg-muted text-sm font-mono font-bold text-muted-foreground shadow-sm"
                        >
                            {idx}
                        </motion.div>

                        {/* Connector */}
                        <div className="h-0.5 w-6 bg-border relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-border"></div>
                        </div>

                        {/* Chain */}
                        <div className="flex flex-1 flex-wrap gap-2">
                            <AnimatePresence mode="popLayout">
                                {bucket.map((val, bIdx) => (
                                    <motion.div
                                        key={`${idx}-${bIdx}-${val}`}
                                        initial={{ opacity: 0, scale: 0.5, x: -20 }}
                                        animate={{ opacity: 1, scale: 1, x: 0 }}
                                        transition={{ type: "spring" }}
                                        className="flex h-12 w-12 items-center justify-center rounded-lg border bg-card font-bold shadow-sm"
                                    >
                                        {val}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {bucket.length === 0 && (
                                <span className="text-xs italic text-muted-foreground self-center px-2">Null</span>
                            )}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
