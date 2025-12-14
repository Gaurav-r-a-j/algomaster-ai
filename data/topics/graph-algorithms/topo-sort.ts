import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const topoSort: Topic = {
  id: "topo-sort",
  title: "Topological Sort",
  description:
    "Linear ordering of vertices in a DAG such that for every edge (u, v), u comes before v.",
  category: AlgorithmType.GRAPH,
  complexity: { time: "O(V + E)", space: "O(V)" },
  visualizerType: VisualizerType.NONE,
  module: "5. Graph Algorithms",
  order: 23,
  difficulty: "Medium",
  content: `# Topological Sort

Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge (u, v), vertex u comes before v in the ordering.

## Requirements

- **DAG only:** Graph must be acyclic (no cycles)
- **Directed:** Only works on directed graphs
- **Ordering:** Respects all edge directions

## Algorithm 1: DFS-based

\`\`\`python
def topological_sort_dfs(graph):
    visited = set()
    stack = []
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
        stack.append(node)  # Add to stack after processing all neighbors
    
    for node in graph:
        if node not in visited:
            dfs(node)
    
    return stack[::-1]  # Reverse to get topological order

# Example
graph = {
    0: [1, 2],
    1: [3],
    2: [3],
    3: []
}
result = topological_sort_dfs(graph)
print(result)  # [0, 2, 1, 3] or [0, 1, 2, 3]
\`\`\`

## Algorithm 2: Kahn's Algorithm (BFS-based)

\`\`\`python
from collections import deque

def topological_sort_kahn(graph):
    # Calculate in-degrees
    in_degree = {node: 0 for node in graph}
    for node in graph:
        for neighbor in graph[node]:
            in_degree[neighbor] += 1
    
    # Queue for nodes with no incoming edges
    queue = deque([node for node in in_degree if in_degree[node] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        # Reduce in-degree of neighbors
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check for cycle
    if len(result) != len(graph):
        return None  # Cycle exists
    
    return result
\`\`\`

## Time Complexity

- **DFS approach:** O(V + E)
- **Kahn's algorithm:** O(V + E)

## Space Complexity

O(V) - For visited set, stack, or queue.

## Applications

1. **Course Scheduling:** Prerequisites must be taken first
2. **Build Systems:** Dependencies must be built first
3. **Event Ordering:** Events with dependencies
4. **Task Scheduling:** Tasks with prerequisites
5. **Package Management:** Install dependencies first

## Example: Course Schedule

\`\`\`python
# LeetCode: Course Schedule
def can_finish(num_courses, prerequisites):
    graph = [[] for _ in range(num_courses)]
    in_degree = [0] * num_courses
    
    # Build graph
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        in_degree[course] += 1
    
    # Kahn's algorithm
    queue = deque([i for i in range(num_courses) if in_degree[i] == 0])
    count = 0
    
    while queue:
        course = queue.popleft()
        count += 1
        for next_course in graph[course]:
            in_degree[next_course] -= 1
            if in_degree[next_course] == 0:
                queue.append(next_course)
    
    return count == num_courses
\`\`\`

## Cycle Detection

If topological sort is not possible, the graph contains a cycle.

\`\`\`python
def has_cycle(graph):
    visited = set()
    rec_stack = set()
    
    def dfs(node):
        visited.add(node)
        rec_stack.add(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                if dfs(neighbor):
                    return True
            elif neighbor in rec_stack:
                return True  # Back edge found
        
        rec_stack.remove(node)
        return False
    
    for node in graph:
        if node not in visited:
            if dfs(node):
                return True
    return False
\`\`\`

## When to Use

- **DFS approach:** Simpler, good for single ordering
- **Kahn's algorithm:** Better for finding all possible orderings, cycle detection

## Advantages

- Linear time: O(V + E)
- Useful for dependency resolution
- Can detect cycles
- Multiple valid orderings possible

## Disadvantages

- Only works on DAGs
- Not unique (multiple valid orderings)
`,
  quiz: [
    {
      id: 1,
      question: "What type of graph does topological sort work on?",
      options: [
        "Any graph",
        "Undirected graph",
        "DAG (Directed Acyclic Graph)",
        "Complete graph",
      ],
      correctAnswer: 2,
      explanation:
        "Topological sort only works on Directed Acyclic Graphs (DAGs) - graphs with no cycles.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Course Schedule",
      url: "https://leetcode.com/problems/course-schedule/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Course Schedule II",
      url: "https://leetcode.com/problems/course-schedule-ii/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Topological Sort",
      url: "https://www.geeksforgeeks.org/topological-sorting/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Alien Dictionary",
      url: "https://leetcode.com/problems/alien-dictionary/",
      difficulty: "Hard",
    },
  ],
}
