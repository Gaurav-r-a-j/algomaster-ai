import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const bfs: Topic = {
  id: "bfs",
  title: "Breadth-First Search (BFS)",
  description:
    "Graph traversal algorithm that explores nodes level by level using a queue.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V)" },
  visualizerType: VisualizerType.PATHFINDING,
  module: "5. Graph Algorithms",
  order: 21,
  difficulty: "Medium",
  content: `# Breadth-First Search (BFS)

BFS is a graph traversal algorithm that explores all nodes at the present depth level before moving to nodes at the next depth level.

## How It Works

1. Start from a source node
2. Visit all neighbors of the current node
3. Add unvisited neighbors to a queue
4. Process nodes in FIFO order (queue)
5. Mark nodes as visited to avoid cycles

## Implementation

\`\`\`python
from collections import deque

def bfs(graph, start):
    queue = deque([start])
    visited = {start}
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        # Visit all neighbors
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

result = bfs(graph, 'A')
print(result)  # ['A', 'B', 'C', 'D', 'E', 'F']
\`\`\`

## BFS for Shortest Path (Unweighted Graph)

\`\`\`python
def bfs_shortest_path(graph, start, end):
    queue = deque([(start, [start])])
    visited = {start}
    
    while queue:
        node, path = queue.popleft()
        
        if node == end:
            return path
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return None  # No path found
\`\`\`

## Time Complexity

- **Time:** O(V + E) where V = vertices, E = edges
- **Space:** O(V) for queue and visited set

## Characteristics

- **Level-order:** Explores level by level
- **Shortest Path:** Finds shortest path in unweighted graphs
- **Queue-based:** Uses FIFO data structure
- **Complete:** Visits all reachable nodes

## When to Use

- Finding shortest path in unweighted graphs
- Level-order traversal
- Finding all nodes at a specific distance
- Social network analysis (degrees of separation)
- Web crawling

## Applications

1. **Shortest Path:** In unweighted graphs
2. **Level Order Traversal:** Binary trees
3. **Social Networks:** Find connections
4. **GPS Navigation:** Route finding
5. **Puzzle Solving:** Minimum moves to solve

## Comparison with DFS

- **BFS:** Level-by-level, uses queue, finds shortest path
- **DFS:** Depth-first, uses stack, uses less memory

## Advantages

- Finds shortest path in unweighted graphs
- Guaranteed to find solution if it exists
- Explores uniformly in all directions

## Disadvantages

- Requires more memory (stores all nodes at current level)
- May be slower for deep graphs
- Not suitable for very large graphs due to memory
`,
  quiz: [
    {
      id: 1,
      question: "What data structure does BFS use?",
      options: ["Stack", "Queue", "Heap", "Array"],
      correctAnswer: 1,
      explanation: "BFS uses a queue (FIFO) to process nodes level by level.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Binary Tree Level Order Traversal",
      url: "https://leetcode.com/problems/binary-tree-level-order-traversal/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Word Ladder",
      url: "https://leetcode.com/problems/word-ladder/",
      difficulty: "Hard",
    },
    {
      title: "GeeksforGeeks: BFS",
      url: "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Shortest Path in Binary Matrix",
      url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Rotting Oranges",
      url: "https://leetcode.com/problems/rotting-oranges/",
      difficulty: "Medium",
    },
  ],
}
