// Advanced Graphs
import bellmanFordContent from "@/data/content/markdown/advanced-graphs/bellman-ford.mdx"
import dijkstraContent from "@/data/content/markdown/advanced-graphs/dijkstra.mdx"
import kruskalContent from "@/data/content/markdown/advanced-graphs/kruskal.mdx"
import unionFindContent from "@/data/content/markdown/advanced-graphs/union-find.mdx"
// Advanced Techniques
import bitManipulationContent from "@/data/content/markdown/advanced-techniques/bit-manipulation.mdx"
import fenwickTreeContent from "@/data/content/markdown/advanced-techniques/fenwick-tree.mdx"
import segmentTreeContent from "@/data/content/markdown/advanced-techniques/segment-tree.mdx"
// Algorithmic Paradigms
import backtrackingIntroContent from "@/data/content/markdown/algorithmic-paradigms/backtracking-intro.mdx"
import dpIntroContent from "@/data/content/markdown/algorithmic-paradigms/dp-intro.mdx"
import greedyIntroContent from "@/data/content/markdown/algorithmic-paradigms/greedy-intro.mdx"
import knapsackContent from "@/data/content/markdown/algorithmic-paradigms/knapsack.mdx"
import lcsContent from "@/data/content/markdown/algorithmic-paradigms/lcs.mdx"
// Core Data Structures
import arraysStringsContent from "@/data/content/markdown/core-data-structures/arrays-strings.mdx"
import hashingContent from "@/data/content/markdown/core-data-structures/hashing.mdx"
import linkedListContent from "@/data/content/markdown/core-data-structures/linked-list.mdx"
import queueContent from "@/data/content/markdown/core-data-structures/queue.mdx"
import stackContent from "@/data/content/markdown/core-data-structures/stack.mdx"
// Import all MDX files - bundled at build time
// Foundations
import algorithmsPseudocodeContent from "@/data/content/markdown/foundations/algorithms-pseudocode.mdx"
import bigOContent from "@/data/content/markdown/foundations/big-o.mdx"
import flowchartsContent from "@/data/content/markdown/foundations/flowcharts.mdx"
import loopsContent from "@/data/content/markdown/foundations/loops.mdx"
import recursionContent from "@/data/content/markdown/foundations/recursion.mdx"
import variablesDatatypesContent from "@/data/content/markdown/foundations/variables-datatypes.mdx"
import whatIsProgrammingContent from "@/data/content/markdown/foundations/what-is-programming.mdx"
// Graph Algorithms
import bfsContent from "@/data/content/markdown/graph-algorithms/bfs.mdx"
import dfsContent from "@/data/content/markdown/graph-algorithms/dfs.mdx"
import graphRepsContent from "@/data/content/markdown/graph-algorithms/graph-reps.mdx"
import topoSortContent from "@/data/content/markdown/graph-algorithms/topo-sort.mdx"
// Searching & Sorting
import binarySearchContent from "@/data/content/markdown/searching-sorting/binary-search.mdx"
import bubbleSortContent from "@/data/content/markdown/searching-sorting/bubble-sort.mdx"
import insertionSortContent from "@/data/content/markdown/searching-sorting/insertion-sort.mdx"
import linearSearchContent from "@/data/content/markdown/searching-sorting/linear-search.mdx"
import mergeSortContent from "@/data/content/markdown/searching-sorting/merge-sort.mdx"
import quickSortContent from "@/data/content/markdown/searching-sorting/quick-sort.mdx"
import selectionSortContent from "@/data/content/markdown/searching-sorting/selection-sort.mdx"
// Trees & Heaps
import avlTreeContent from "@/data/content/markdown/trees-heaps/avl-tree.mdx"
import bstContent from "@/data/content/markdown/trees-heaps/bst.mdx"
import heapsContent from "@/data/content/markdown/trees-heaps/heaps.mdx"
import trieContent from "@/data/content/markdown/trees-heaps/trie.mdx"

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
