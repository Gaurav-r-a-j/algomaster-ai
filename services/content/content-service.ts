// Advanced Graphs
import bellmanFordContent from "@/topics/advanced-graphs/bellman-ford/content.mdx"
import dijkstraContent from "@/topics/advanced-graphs/dijkstra/content.mdx"
import kruskalContent from "@/topics/advanced-graphs/kruskal/content.mdx"
import unionFindContent from "@/topics/advanced-graphs/union-find/content.mdx"
// Advanced Techniques
import bitManipulationContent from "@/topics/advanced-techniques/bit-manipulation/content.mdx"
import fenwickTreeContent from "@/topics/advanced-techniques/fenwick-tree/content.mdx"
import segmentTreeContent from "@/topics/advanced-techniques/segment-tree/content.mdx"
// Algorithmic Paradigms
import backtrackingIntroContent from "@/topics/algorithmic-paradigms/backtracking-intro/content.mdx"
import dpIntroContent from "@/topics/algorithmic-paradigms/dp-intro/content.mdx"
import greedyIntroContent from "@/topics/algorithmic-paradigms/greedy-intro/content.mdx"
import knapsackContent from "@/topics/algorithmic-paradigms/knapsack/content.mdx"
import lcsContent from "@/topics/algorithmic-paradigms/lcs/content.mdx"
// Core Data Structures
import arraysStringsContent from "@/topics/core-data-structures/arrays-strings/content.mdx"
import hashingContent from "@/topics/core-data-structures/hashing/content.mdx"
import linkedListContent from "@/topics/core-data-structures/linked-list/content.mdx"
import queueContent from "@/topics/core-data-structures/queue/content.mdx"
import stackContent from "@/topics/core-data-structures/stack/content.mdx"
// Import all MDX files - bundled at build time
// Foundations
import algorithmsPseudocodeContent from "@/topics/foundations/algorithms-pseudocode/content.mdx"
import bigOContent from "@/topics/foundations/big-o/content.mdx"
import flowchartsContent from "@/topics/foundations/flowcharts/content.mdx"
import loopsContent from "@/topics/foundations/loops/content.mdx"
import recursionContent from "@/topics/foundations/recursion/content.mdx"
import variablesDatatypesContent from "@/topics/foundations/variables-datatypes/content.mdx"
import whatIsProgrammingContent from "@/topics/foundations/what-is-programming/content.mdx"
// Graph Algorithms
import bfsContent from "@/topics/graph-algorithms/bfs/content.mdx"
import dfsContent from "@/topics/graph-algorithms/dfs/content.mdx"
import graphRepsContent from "@/topics/graph-algorithms/graph-reps/content.mdx"
import topoSortContent from "@/topics/graph-algorithms/topo-sort/content.mdx"
// Searching & Sorting
import binarySearchContent from "@/topics/searching-sorting/binary-search/content.mdx"
import bubbleSortContent from "@/topics/searching-sorting/bubble-sort/content.mdx"
import insertionSortContent from "@/topics/searching-sorting/insertion-sort/content.mdx"
import linearSearchContent from "@/topics/searching-sorting/linear-search/content.mdx"
import mergeSortContent from "@/topics/searching-sorting/merge-sort/content.mdx"
import quickSortContent from "@/topics/searching-sorting/quick-sort/content.mdx"
import selectionSortContent from "@/topics/searching-sorting/selection-sort/content.mdx"
// Trees & Heaps
import avlTreeContent from "@/topics/trees-heaps/avl-tree/content.mdx"
import bstContent from "@/topics/trees-heaps/bst/content.mdx"
import heapsContent from "@/topics/trees-heaps/heaps/content.mdx"
import trieContent from "@/topics/trees-heaps/trie/content.mdx"

import type { Topic } from "@/types/curriculum"

// Content map - topic ID to markdown content
const contentMap: Record<string, string> = {
  // Foundations
  "what-is-programming": whatIsProgrammingContent,
  flowcharts: flowchartsContent,
  "algorithms-pseudocode": algorithmsPseudocodeContent,
  "variables-datatypes": variablesDatatypesContent,
  loops: loopsContent,
  recursion: recursionContent,
  "big-o": bigOContent,

  // Core Data Structures
  "arrays-strings": arraysStringsContent,
  hashing: hashingContent,
  "linked-list": linkedListContent,
  queue: queueContent,
  stack: stackContent,

  // Searching & Sorting
  "binary-search": binarySearchContent,
  "bubble-sort": bubbleSortContent,
  "insertion-sort": insertionSortContent,
  "linear-search": linearSearchContent,
  "merge-sort": mergeSortContent,
  "quick-sort": quickSortContent,
  "selection-sort": selectionSortContent,

  // Trees & Heaps
  "avl-tree": avlTreeContent,
  bst: bstContent,
  heaps: heapsContent,
  trie: trieContent,

  // Graph Algorithms
  bfs: bfsContent,
  dfs: dfsContent,
  "graph-reps": graphRepsContent,
  "topo-sort": topoSortContent,

  // Advanced Graphs
  "bellman-ford": bellmanFordContent,
  dijkstra: dijkstraContent,
  kruskal: kruskalContent,
  "union-find": unionFindContent,

  // Algorithmic Paradigms
  "backtracking-intro": backtrackingIntroContent,
  "dp-intro": dpIntroContent,
  "greedy-intro": greedyIntroContent,
  knapsack: knapsackContent,
  lcs: lcsContent,

  // Advanced Techniques
  "bit-manipulation": bitManipulationContent,
  "fenwick-tree": fenwickTreeContent,
  "segment-tree": segmentTreeContent,
}

export interface TopicContent {
  markdown: string
  codeExamples: CodeExample[]
  practiceProblems: PracticeProblem[]
}

export interface CodeExample {
  id: string
  language: string
  title: string
  code: string
  explanation?: string
}

export interface PracticeProblem {
  id: string
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard"
  starterCode?: Record<string, string>
  testCases?: TestCase[]
  hints?: string[]
  solution?: string
}

export interface TestCase {
  input: unknown
  expectedOutput: unknown
  explanation?: string
}

/**
 * Get markdown content for a topic
 */
export function getTopicMarkdown(topicId: string): string {
  return contentMap[topicId] || ""
}

/**
 * Get all content for a topic
 */
export async function getTopicContent(topic: Topic): Promise<TopicContent> {
  const markdown = getTopicMarkdown(topic.id)

  return {
    markdown: markdown || topic.content,
    codeExamples: [],
    practiceProblems: topic.practiceProblems || [],
  }
}
