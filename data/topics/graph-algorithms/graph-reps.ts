import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const graphReps: Topic = {
  id: "graph-reps",
  title: "Graph Representations",
  description: "Different ways to represent graphs: adjacency list, adjacency matrix, and edge list.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V + E)" },
  visualizerType: VisualizerType.NONE,
  module: "5. Graph Algorithms",
  order: 20,
  difficulty: "Easy",
  content: `# Graph Representations

There are several ways to represent graphs, each with different trade-offs for space and time complexity.

## 1. Adjacency List

Most common representation. Each vertex stores a list of its neighbors.

\`\`\`python
# Undirected graph
graph = {
    0: [1, 2],
    1: [0, 3],
    2: [0, 3],
    3: [1, 2]
}

# Directed graph
digraph = {
    0: [1, 2],
    1: [3],
    2: [3],
    3: []
}
\`\`\`

**Space:** O(V + E)
**Check edge:** O(degree(v))
**List neighbors:** O(degree(v))

## 2. Adjacency Matrix

2D array where matrix[i][j] = 1 if edge exists, 0 otherwise.

\`\`\`python
# Undirected graph (4 vertices)
matrix = [
    [0, 1, 1, 0],  # Vertex 0 connected to 1, 2
    [1, 0, 0, 1],  # Vertex 1 connected to 0, 3
    [1, 0, 0, 1],  # Vertex 2 connected to 0, 3
    [0, 1, 1, 0]   # Vertex 3 connected to 1, 2
]

# For weighted graphs
weighted_matrix = [
    [0, 5, 3, 0],
    [5, 0, 0, 2],
    [3, 0, 0, 1],
    [0, 2, 1, 0]
]
\`\`\`

**Space:** O(V²)
**Check edge:** O(1)
**List neighbors:** O(V)

## 3. Edge List

Simple list of all edges.

\`\`\`python
# Undirected graph
edges = [
    (0, 1),
    (0, 2),
    (1, 3),
    (2, 3)
]

# Weighted edges
weighted_edges = [
    (0, 1, 5),
    (0, 2, 3),
    (1, 3, 2),
    (2, 3, 1)
]
\`\`\`

**Space:** O(E)
**Check edge:** O(E)
**List neighbors:** O(E)

## Comparison

| Operation | Adjacency List | Adjacency Matrix | Edge List |
|-----------|---------------|------------------|-----------|
| Space | O(V + E) | O(V²) | O(E) |
| Check edge | O(degree) | O(1) | O(E) |
| List neighbors | O(degree) | O(V) | O(E) |
| Add vertex | O(1) | O(V²) | O(1) |
| Add edge | O(1) | O(1) | O(1) |

## When to Use

### Adjacency List
- **Sparse graphs** (few edges)
- Most graph algorithms
- Memory efficient
- Default choice for most cases

### Adjacency Matrix
- **Dense graphs** (many edges)
- Need fast edge lookups
- Small graphs
- Weighted graphs with frequent queries

### Edge List
- **Kruskal's algorithm** (MST)
- Simple representation
- When you need to iterate all edges
- Graph algorithms that process edges

## Implementation Examples

### Adjacency List (Python)
\`\`\`python
from collections import defaultdict

class Graph:
    def __init__(self):
        self.graph = defaultdict(list)
    
    def add_edge(self, u, v):
        self.graph[u].append(v)
        # For undirected: self.graph[v].append(u)
    
    def get_neighbors(self, v):
        return self.graph[v]
\`\`\`

### Adjacency Matrix (Python)
\`\`\`python
class GraphMatrix:
    def __init__(self, num_vertices):
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
    
    def add_edge(self, u, v, weight=1):
        self.matrix[u][v] = weight
        # For undirected: self.matrix[v][u] = weight
    
    def has_edge(self, u, v):
        return self.matrix[u][v] != 0
\`\`\`

## Best Practices

- **Sparse graphs:** Use adjacency list
- **Dense graphs:** Consider adjacency matrix
- **MST algorithms:** Use edge list
- **Most algorithms:** Adjacency list is preferred
`,
  quiz: [
    {
      id: 1,
      question: "Which representation is best for sparse graphs?",
      options: ["Adjacency Matrix", "Adjacency List", "Edge List", "All are equal"],
      correctAnswer: 1,
      explanation: "Adjacency list is most space-efficient for sparse graphs (few edges relative to vertices).",
    },
  ],
  practiceLinks: [
    {
      title: "GeeksforGeeks: Graph Representations",
      url: "https://www.geeksforgeeks.org/graph-and-its-representations/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium",
    },
  ],
};
