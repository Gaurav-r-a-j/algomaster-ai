"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import {
  generateAVLTreeSteps,
  generateBinaryTreeSteps,
  generateGraphSteps,
  generateHashTableSteps,
  generateLinkedListSteps,
  generateQueueSteps,
  generateStackSteps,
  generateTrieSteps,
  TreeNode as TreeNodeType,
} from "@/utils/algorithm-logic"
import { Squares2X2Icon } from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "motion/react"

import type { Topic, VisualizationStep } from "@/types/curriculum"
import { VisualizerType } from "@/types/curriculum"
import { staggerItem, transitions } from "@/lib/animations"
import { Card, CardContent } from "@/components/ui/card"

import { VisualizerControls } from "./visualizer-controls"
import { VisualizerLayout } from "./visualizer-layout"

const DEFAULT_SPEED_MS = 1000

interface DataStructureVisualizerProps {
  topic: Topic
}

// Tree Rendering Helper
const renderTreeNodes = (
  root: TreeNodeType | null,
  highlightId: string | null
) => {
  if (!root) return { nodes: [], edges: [] }

  const nodes: TreeNodeType[] = []
  const edges: { x1: number; y1: number; x2: number; y2: number; id: string }[] =
    []

  const traverse = (node: TreeNodeType) => {
    nodes.push(node)
    if (node.left) {
      edges.push({
        x1: node.x,
        y1: node.y + 12, // + offset for node center/bottom
        x2: node.left.x,
        y2: node.left.y,
        id: `${node.id}-${node.left.id}`,
      })
      traverse(node.left)
    }
    if (node.right) {
      edges.push({
        x1: node.x,
        y1: node.y + 12,
        x2: node.right.x,
        y2: node.right.y,
        id: `${node.id}-${node.right.id}`,
      })
      traverse(node.right)
    }
  }

  traverse(root)
  return { nodes, edges }
}

export function DataStructureVisualizer({
  topic,
}: DataStructureVisualizerProps) {
  const [steps, setSteps] = useState<VisualizationStep[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState(DEFAULT_SPEED_MS)
  const timerRef = useRef<number | null>(null)

  const generateData = useCallback(() => {
    let newSteps: VisualizationStep[] = []
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        newSteps = generateStackSteps()
        break
      case VisualizerType.QUEUE:
        newSteps = generateQueueSteps()
        break
      case VisualizerType.LINKED_LIST:
        newSteps = generateLinkedListSteps()
        break
      case VisualizerType.BINARY_TREE:
        newSteps = generateBinaryTreeSteps()
        break
      case VisualizerType.AVL_TREE:
        newSteps = generateAVLTreeSteps()
        break
      case VisualizerType.HASH_TABLE:
        newSteps = generateHashTableSteps()
        break
      case VisualizerType.TRIE:
        newSteps = generateTrieSteps()
        break
      case VisualizerType.GRAPH:
        newSteps = generateGraphSteps(topic.id)
        break
      default:
        newSteps = []
    }
    setSteps(newSteps)
    setCurrentStep(0)
    setIsPlaying(false)
  }, [topic.visualizerType])

  useEffect(() => {
    // eslint-disable-next-line
    generateData()
  }, [generateData, topic.visualizerType])

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      timerRef.current = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, playbackSpeed)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isPlaying, steps.length, playbackSpeed])

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepChange = (step: number) => {
    setIsPlaying(false)
    setCurrentStep(step)
  }

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    generateData()
  }

  const currentData =
    steps[currentStep] ||
    ({
      array: [],
      activeIndices: [],
      sortedIndices: [],
      description: "Ready.",
      auxiliary: {},
    } as VisualizationStep)

  const controls = (
    <VisualizerControls
      isPlaying={isPlaying}
      currentStep={currentStep}
      totalSteps={steps.length}
      playbackSpeed={playbackSpeed}
      onPlay={handlePlay}
      onPause={handlePause}
      onReset={handleReset}
      onPreviousStep={handlePreviousStep}
      onNextStep={handleNextStep}
      onSpeedChange={setPlaybackSpeed}
      onStepChange={handleStepChange}
      disabled={steps.length === 0}
      showSpeedControl={true}
    />
  )

  const description = (
    <p className="text-foreground text-sm font-medium">
      {currentData.description}
    </p>
  )

  const renderVisualization = () => {
    switch (topic.visualizerType) {
      case VisualizerType.STACK:
        return (
          <div className="flex w-full flex-col items-center justify-center p-8">
            <div className="relative flex min-h-[300px] w-40 flex-col justify-end rounded-t-lg border-x-4 border-b-4 border-slate-300 bg-slate-50/50 p-4 shadow-inner dark:border-slate-700 dark:bg-slate-900/50">
              <div className="absolute -left-12 top-1/2 -translate-y-1/2 rotate-180 py-2 text-xs font-bold uppercase tracking-widest text-muted-foreground [writing-mode:vertical-lr]">
                Stack Memory
              </div>
              <AnimatePresence mode="popLayout">
                {currentData.array.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center text-sm italic text-muted-foreground"
                  >
                    Empty
                  </motion.div>
                ) : (
                  currentData.array.map((val, idx) => (
                    <motion.div
                      key={`${idx}-${val}`}
                      layout
                      initial={{ opacity: 0, y: -50, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="mb-2 flex h-12 w-full items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-indigo-600 font-bold text-white shadow-md ring-1 ring-white/20"
                    >
                      {val}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
                LIFO: Last In, First Out
            </div>
          </div>
        )
      case VisualizerType.QUEUE:
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
      case VisualizerType.LINKED_LIST:
        return (
          <div className="w-full overflow-x-auto p-8">
            <motion.div className="flex min-w-fit items-center justify-start gap-1">
              <AnimatePresence>
              {currentData.array.map((val, idx) => {
                const isActive = currentData.activeIndices.includes(idx)
                return (
                  <motion.div
                    key={idx}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center group"
                  >
                    <div className="relative flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.15 : 1,
                          backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--card))",
                          borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                          color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                          boxShadow: isActive ? "0 4px 12px hsl(var(--primary)/0.3)" : "0 1px 2px rgb(0 0 0 / 0.05)"
                        }}
                        transition={transitions.spring}
                        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-xl border-2 text-lg font-bold transition-shadow"
                      >
                        {val}
                        {/* Pointer dot */}
                        <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-inherit border border-inherit"></div>
                      </motion.div>
                      <div className="mt-2 font-mono text-xs font-medium text-muted-foreground">
                        {idx === 0 ? "HEAD" : `#${idx}`}
                      </div>
                    </div>
                    
                    {idx < currentData.array.length - 1 && (
                      <div className="relative mx-1 h-0.5 w-12 bg-border">
                         <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                            <svg width="10" height="10" viewBox="0 0 10 10" className="text-border fill-current rotate-[-90deg]">
                                <path d="M5 10L0 0h10L5 10z" />
                            </svg>
                         </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
              </AnimatePresence>
               <div className="ml-2 flex items-center gap-3 opacity-60">
                    <div className="h-0.5 w-8 bg-border"></div>
                    <div className="flex h-10 w-16 items-center justify-center rounded border border-dashed border-border bg-muted/50 font-mono text-xs text-muted-foreground">
                        NULL
                    </div>
               </div>
            </motion.div>
          </div>
        )
      case VisualizerType.BINARY_TREE:
      case VisualizerType.AVL_TREE:
      case VisualizerType.TRIE:
        const { root, highlightNodeId } = (currentData.auxiliary as {
          root?: TreeNodeType
          highlightNodeId?: string
        }) || { root: null }
        
        const treeData = renderTreeNodes(root || null, highlightNodeId || null)

        return (
          <div className="relative h-[500px] w-full overflow-hidden rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 shadow-inner">
             {/* Simple Dot Pattern Background */}
             <div className="absolute inset-0 opacity-[0.03]" style={{
                 backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                 backgroundSize: '20px 20px'
             }}></div>

             <svg className="absolute inset-0 h-full w-full pointer-events-none">
                {treeData.edges.map((edge) => (
                    <line
                        key={edge.id}
                        x1={`${edge.x1}%`}
                        y1={`${edge.y1}px`}
                        x2={`${edge.x2}%`}
                        y2={`${edge.y2}px`}
                        stroke="currentColor" 
                        strokeOpacity="0.2"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                ))}
             </svg>
             <AnimatePresence>
             {treeData.nodes.map((node) => {
                 const isHighlighed = highlightNodeId === node.id;
                 return (
                 <motion.div
                    key={node.id}
                    layoutId={node.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                        scale: isHighlighed ? 1.2 : 1, 
                        opacity: 1,
                        backgroundColor: isHighlighed ? "hsl(var(--primary))" : "hsl(var(--card))",
                        borderColor: isHighlighed ? "hsl(var(--primary))" : "hsl(var(--border))",
                        color: isHighlighed ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                        left: `${node.x}%`,
                        top: `${node.y}px`,
                        zIndex: isHighlighed ? 20 : 10,
                        boxShadow: isHighlighed ? "0 0 20px hsl(var(--primary)/0.4)" : "0 2px 4px rgb(0 0 0 / 0.1)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="absolute flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 text-sm font-bold"
                 >
                     {node.val}
                 </motion.div>
                 )
             })}
             </AnimatePresence>
             {treeData.nodes.length === 0 && (
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground/50">
                        <Squares2X2Icon className="h-10 w-10" />
                        <span className="text-sm font-medium">Empty Tree</span>
                    </div>
                 </div>
             )}
          </div>
        )
      case VisualizerType.HASH_TABLE:
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
      case VisualizerType.GRAPH:
          const graphNodes = (currentData.auxiliary as any)?.nodes || []
          const graphEdges = (currentData.auxiliary as any)?.edges || []
          const activeNodeId = (currentData.auxiliary as any)?.activeNode
          
          return (
              <div className="relative h-[500px] w-full overflow-hidden rounded-xl border bg-slate-50/50 dark:bg-slate-900/50 shadow-inner">
                   <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                   }}></div>

                   <svg className="absolute inset-0 h-full w-full pointer-events-none">
                      <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="22" refY="3.5" orient="auto">
                          <polygon points="0 0, 10 3.5, 0 7" className="text-muted-foreground" fill="currentColor" />
                        </marker>
                      </defs>
                      {graphEdges.map((edge: any, i: number) => {
                          const n1 = graphNodes.find((n:any) => n.id === edge.from)
                          const n2 = graphNodes.find((n:any) => n.id === edge.to)
                          if(!n1 || !n2) return null
                          return (
                              <motion.line
                                  key={i}
                                  initial={{ pathLength: 0, opacity: 0 }}
                                  animate={{ pathLength: 1, opacity: 1 }}
                                  x1={`${n1.x}%`}
                                  y1={`${n1.y}%`}
                                  x2={`${n2.x}%`}
                                  y2={`${n2.y}%`}
                                  className="text-muted-foreground"
                                  stroke="currentColor"
                                  strokeOpacity="0.4"
                                  strokeWidth="2"
                                  markerEnd="url(#arrowhead)"
                              />
                          )
                      })}
                   </svg>
                   {graphNodes.map((node: any) => {
                       const isActive = activeNodeId === node.id
                       return (
                           <motion.div
                               key={node.id}
                               layoutId={`node-${node.id}`}
                               animate={{
                                   backgroundColor: isActive ? "hsl(var(--primary))" : "hsl(var(--card))",
                                   borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border))",
                                   color: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
                                   scale: isActive ? 1.25 : 1,
                                   boxShadow: isActive ? "0 0 20px hsl(var(--primary)/0.3)" : "0 4px 6px -1px rgb(0 0 0 / 0.1)"
                               }}
                               transition={{ type: "spring", stiffness: 300, damping: 20 }}
                               style={{ left: `${node.x}%`, top: `${node.y}%` }}
                               className="absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 cursor-default items-center justify-center rounded-full border-2 text-lg font-bold"
                           >
                               {node.id}
                           </motion.div>
                       )
                   })}
              </div>
          )
      default:
        return null
    }
  }

  return (
    <VisualizerLayout
      title={`${topic.title} Visualizer`}
      icon={<Squares2X2Icon className="h-5 w-5" />}
      controls={controls}
      description={description}
    >
      <Card className="flex-1 overflow-hidden border-none shadow-none">
        <CardContent className="p-0">
          {renderVisualization()}
        </CardContent>
      </Card>
    </VisualizerLayout>
  )
}
