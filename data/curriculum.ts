import { Topic } from "@/types/curriculum";

// Module 1: Foundations
import { variablesDatatypes } from "./topics/foundations/variables-datatypes";
import { loops } from "./topics/foundations/loops";
import { recursion } from "./topics/foundations/recursion";
import { bigO } from "./topics/foundations/big-o";

// Module 2: Core Data Structures
import { arraysStrings } from "./topics/core-data-structures/arrays-strings";
import { linkedList } from "./topics/core-data-structures/linked-list";
import { stack } from "./topics/core-data-structures/stack";
import { queue } from "./topics/core-data-structures/queue";
import { hashing } from "./topics/core-data-structures/hashing";

// Module 3: Searching & Sorting
import { linearSearch } from "./topics/searching-sorting/linear-search";
import { binarySearch } from "./topics/searching-sorting/binary-search";
import { bubbleSort } from "./topics/searching-sorting/bubble-sort";
import { selectionSort } from "./topics/searching-sorting/selection-sort";
import { insertionSort } from "./topics/searching-sorting/insertion-sort";
import { mergeSort } from "./topics/searching-sorting/merge-sort";
import { quickSort } from "./topics/searching-sorting/quick-sort";

// Module 4: Trees & Heaps
import { bst } from "./topics/trees-heaps/bst";
import { heaps } from "./topics/trees-heaps/heaps";
import { avlTree } from "./topics/trees-heaps/avl-tree";
import { trie } from "./topics/trees-heaps/trie";

// Module 5: Graph Algorithms
import { graphReps } from "./topics/graph-algorithms/graph-reps";
import { bfs } from "./topics/graph-algorithms/bfs";
import { dfs } from "./topics/graph-algorithms/dfs";
import { topoSort } from "./topics/graph-algorithms/topo-sort";

// Module 6: Advanced Graphs
import { dijkstra } from "./topics/advanced-graphs/dijkstra";
import { bellmanFord } from "./topics/advanced-graphs/bellman-ford";
import { kruskal } from "./topics/advanced-graphs/kruskal";
import { unionFind } from "./topics/advanced-graphs/union-find";

// Module 7: Algorithmic Paradigms
import { greedyIntro } from "./topics/algorithmic-paradigms/greedy-intro";
import { dpIntro } from "./topics/algorithmic-paradigms/dp-intro";
import { knapsack } from "./topics/algorithmic-paradigms/knapsack";
import { lcs } from "./topics/algorithmic-paradigms/lcs";
import { backtrackingIntro } from "./topics/algorithmic-paradigms/backtracking-intro";

// Module 8: Advanced Techniques
import { segmentTree } from "./topics/advanced-techniques/segment-tree";
import { fenwickTree } from "./topics/advanced-techniques/fenwick-tree";
import { bitManipulation } from "./topics/advanced-techniques/bit-manipulation";

export const TOPICS: Topic[] = [
  // Module 1
  variablesDatatypes,
  loops,
  recursion,
  bigO,
  // Module 2
  arraysStrings,
  linkedList,
  stack,
  queue,
  hashing,
  // Module 3
  linearSearch,
  binarySearch,
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  // Module 4
  bst,
  heaps,
  avlTree,
  trie,
  // Module 5
  graphReps,
  bfs,
  dfs,
  topoSort,
  // Module 6
  dijkstra,
  bellmanFord,
  kruskal,
  unionFind,
  // Module 7
  greedyIntro,
  dpIntro,
  knapsack,
  lcs,
  backtrackingIntro,
  // Module 8
  segmentTree,
  fenwickTree,
  bitManipulation,
];

// Helper functions
export function getTopicById(id: string): Topic | undefined {
  return TOPICS.find((topic) => topic.id === id);
}

export function getTopicsByModule(module: string): Topic[] {
  return TOPICS.filter((topic) => topic.module === module);
}

export function getModules(): string[] {
  return Array.from(new Set(TOPICS.map((topic) => topic.module))).sort();
}

/**
 * Get module by slug
 */
export function getModuleBySlug(slug: string): string | undefined {
  const modules = getModules();
  return modules.find(
    (m) =>
      m.toLowerCase().replace(/^\d+\.\s*/, "").replace(/\s+/g, "-") === slug
  );
}

/**
 * Check if a slug is a module or topic
 */
export function isModuleSlug(slug: string): boolean {
  return getModuleBySlug(slug) !== undefined;
}

/**
 * Get a topic by its slug (URL-friendly identifier)
 */
export function getTopicBySlug(slug: string): Topic | undefined {
  return TOPICS.find((topic) => {
    // Generate slug from topic title or use id
    const topicSlug = topic.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    return topicSlug === slug || topic.id === slug;
  });
}

