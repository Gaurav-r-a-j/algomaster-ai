import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const dfs: Topic = {
  id: "dfs",
  title: "Depth-First Search (DFS)",
  description: "Graph traversal algorithm that explores as far as possible along each branch before backtracking.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V)" },
  visualizerType: VisualizerType.PATHFINDING,
  module: "5. Graph Algorithms",
  order: 22,
  difficulty: "Medium",
  content: `# Depth-First Search (DFS)

DFS is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It uses a stack (recursion or explicit stack).

## How It Works

1. Start from a source node
2. Mark current node as visited
3. Recursively visit all unvisited neighbors
4. Backtrack when no more unvisited neighbors exist

## Implementation

### Recursive DFS
\`\`\`python
def dfs_recursive(graph, node, visited, result):
    visited.add(node)
    result.append(node)
    
    for neighbor in graph[node]:
        if neighbor not in visited:
            dfs_recursive(graph, neighbor, visited, result)

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

visited = set()
result = []
dfs_recursive(graph, 'A', visited, result)
print(result)  # ['A', 'B', 'D', 'E', 'F', 'C']
\`\`\`

### Iterative DFS
\`\`\`python
def dfs_iterative(graph, start):
    stack = [start]
    visited = {start}
    result = []
    
    while stack:
        node = stack.pop()
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                stack.append(neighbor)
    
    return result
\`\`\`

## Time Complexity

- **Time:** O(V + E) where V = vertices, E = edges
- **Space:** O(V) for recursion stack or explicit stack

## Characteristics

- **Depth-first:** Explores deep before wide
- **Stack-based:** Uses LIFO (Last In First Out)
- **Memory efficient:** O(h) where h is max depth
- **Path finding:** Can find paths (not necessarily shortest)

## When to Use

- Finding connected components
- Topological sorting
- Detecting cycles
- Solving puzzles (maze solving)
- Path finding (not shortest)

## Applications

1. **Connected Components:** Find all nodes reachable from a node
2. **Cycle Detection:** Detect cycles in directed/undirected graphs
3. **Topological Sort:** Order nodes in DAG
4. **Maze Solving:** Find any path from start to end
5. **Tree Traversals:** Preorder, inorder, postorder

## Comparison with BFS

- **DFS:** Depth-first, uses stack, less memory, finds any path
- **BFS:** Level-by-level, uses queue, more memory, finds shortest path

## Advantages

- Memory efficient (O(h) vs O(w) for BFS)
- Simple recursive implementation
- Good for deep graphs
- Can find paths quickly

## Disadvantages

- May not find shortest path
- Can get stuck in deep branches
- Not optimal for finding shortest paths
`,
  quiz: [
    {
      id: 1,
      question: "What data structure does DFS use?",
      options: ["Queue", "Stack", "Heap", "Array"],
      correctAnswer: 1,
      explanation: "DFS uses a stack (either through recursion or an explicit stack) to explore nodes.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Number of Islands",
      url: "https://leetcode.com/problems/number-of-islands/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Clone Graph",
      url: "https://leetcode.com/problems/clone-graph/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: DFS",
      url: "https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Surrounded Regions",
      url: "https://leetcode.com/problems/surrounded-regions/",
      difficulty: "Medium",
    },
  ],
};
