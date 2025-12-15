import { motion, AnimatePresence } from "motion/react"
import type { VisualizationStep } from "@/types/curriculum"

interface QueueRendererProps {
    currentData: VisualizationStep
}

export function QueueRenderer({ currentData }: QueueRendererProps) {
    return (
        <div className="flex w-full flex-col items-center justify-center p-8">
            <div className="relative flex min-h-[120px] w-full max-w-2xl items-center gap-4 overflow-hidden rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/50 px-12 py-6 dark:border-slate-700 dark:bg-slate-900/50">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-muted-foreground">
                    Front
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold uppercase text-muted-foreground">
                    Back
                </div>

                <div className="flex flex-1 items-center justify-start gap-3 overflow-x-auto p-2 no-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {currentData.array.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="w-full text-center text-sm italic text-muted-foreground"
                            >
                                Queue is empty
                            </motion.div>
                        ) : (
                            currentData.array.map((val, idx) => (
                                <motion.div
                                    key={`${idx}-${val}`}
                                    layout
                                    initial={{ opacity: 0, x: 50, scale: 0.8 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -50, scale: 0.8, transition: { duration: 0.2 } }}
                                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 font-bold text-white shadow-md ring-1 ring-white/20"
                                >
                                    {val}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
                FIFO: First In, First Out
            </div>
        </div>
    )
}
