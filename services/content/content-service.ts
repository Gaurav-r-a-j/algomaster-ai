// Advanced Graphs
import bellmanFordContent from "@/data/content/markdown/advanced-graphs/bellman-ford.md"
import dijkstraContent from "@/data/content/markdown/advanced-graphs/dijkstra.md"
import kruskalContent from "@/data/content/markdown/advanced-graphs/kruskal.md"
import unionFindContent from "@/data/content/markdown/advanced-graphs/union-find.md"
// Advanced Techniques
import bitManipulationContent from "@/data/content/markdown/advanced-techniques/bit-manipulation.md"
import fenwickTreeContent from "@/data/content/markdown/advanced-techniques/fenwick-tree.md"
import segmentTreeContent from "@/data/content/markdown/advanced-techniques/segment-tree.md"
// Algorithmic Paradigms
import backtrackingIntroContent from "@/data/content/markdown/algorithmic-paradigms/backtracking-intro.md"
import dpIntroContent from "@/data/content/markdown/algorithmic-paradigms/dp-intro.md"
import greedyIntroContent from "@/data/content/markdown/algorithmic-paradigms/greedy-intro.md"
import knapsackContent from "@/data/content/markdown/algorithmic-paradigms/knapsack.md"
import lcsContent from "@/data/content/markdown/algorithmic-paradigms/lcs.md"
// Core Data Structures
import arraysStringsContent from "@/data/content/markdown/core-data-structures/arrays-strings.md"
import hashingContent from "@/data/content/markdown/core-data-structures/hashing.md"
import linkedListContent from "@/data/content/markdown/core-data-structures/linked-list.md"
import queueContent from "@/data/content/markdown/core-data-structures/queue.md"
import stackContent from "@/data/content/markdown/core-data-structures/stack.md"
// Import all markdown files - bundled at build time
// Foundations
import bigOContent from "@/data/content/markdown/foundations/big-o.md"
import loopsContent from "@/data/content/markdown/foundations/loops.md"
import recursionContent from "@/data/content/markdown/foundations/recursion.md"
import variablesDatatypesContent from "@/data/content/markdown/foundations/variables-datatypes.md"
// Graph Algorithms
import bfsContent from "@/data/content/markdown/graph-algorithms/bfs.md"
import dfsContent from "@/data/content/markdown/graph-algorithms/dfs.md"
import graphRepsContent from "@/data/content/markdown/graph-algorithms/graph-reps.md"
import topoSortContent from "@/data/content/markdown/graph-algorithms/topo-sort.md"
// Searching & Sorting
import binarySearchContent from "@/data/content/markdown/searching-sorting/binary-search.md"
import bubbleSortContent from "@/data/content/markdown/searching-sorting/bubble-sort.md"
import insertionSortContent from "@/data/content/markdown/searching-sorting/insertion-sort.md"
import linearSearchContent from "@/data/content/markdown/searching-sorting/linear-search.md"
import mergeSortContent from "@/data/content/markdown/searching-sorting/merge-sort.md"
import quickSortContent from "@/data/content/markdown/searching-sorting/quick-sort.md"
import selectionSortContent from "@/data/content/markdown/searching-sorting/selection-sort.md"
// Trees & Heaps
import avlTreeContent from "@/data/content/markdown/trees-heaps/avl-tree.md"
import bstContent from "@/data/content/markdown/trees-heaps/bst.md"
import heapsContent from "@/data/content/markdown/trees-heaps/heaps.md"
import trieContent from "@/data/content/markdown/trees-heaps/trie.md"

import type { Topic } from "@/types/curriculum"

// Content map - topic ID to markdown content
const contentMap: Record<string, string> = {
  // Foundations
  "big-o": bigOContent,
  loops: loopsContent,
  recursion: recursionContent,
  "variables-datatypes": variablesDatatypesContent,

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
