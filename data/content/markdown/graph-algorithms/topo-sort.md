# Topological Sort

**Topological sorting** orders vertices of a Directed Acyclic Graph (DAG) such that for every directed edge (u → v), vertex u comes before v in the ordering.

## Visual Example

```
Prerequisites:        Topological Order:
  A → B → D           A → B → D
  ↓   ↓               ↓   ↓
  C → E               C → E
  
  A must come before B, C
  B must come before D, E
  C must come before E
  
Valid orderings: [A, B, C, D, E] or [A, C, B, E, D] or [A, B, C, E, D]
```

---

## Applications

| Application | Example |
|-------------|---------|
| Build Systems | Compile source files in dependency order |
| Package Managers | Install dependencies first |
| Course Scheduling | Complete prerequisites first |
| Task Scheduling | Order tasks by dependencies |
| Spreadsheet Cells | Evaluate cells in formula order |

---

## Kahn's Algorithm (BFS-based)

Uses **in-degree** (number of incoming edges) to determine order.

### Algorithm Steps

1. Calculate in-degree for all vertices
2. Add all vertices with in-degree 0 to queue
3. While queue is not empty:
   - Remove vertex, add to result
   - Reduce in-degree of neighbors
   - Add neighbors with in-degree 0 to queue
4. If result has all vertices → valid order, else cycle exists

### Implementation

```python
from collections import deque

def topological_sort_kahn(graph, n):
    """
    Kahn's Algorithm - BFS approach.
    Returns empty list if cycle exists.
    Time: O(V + E), Space: O(V)
    """
    # Calculate in-degrees
    in_degree = [0] * n
    for u in range(n):
        for v in graph.get(u, []):
            in_degree[v] += 1
    
    # Start with vertices having no dependencies
    queue = deque([v for v in range(n) if in_degree[v] == 0])
    result = []
    
    while queue:
        node = queue.popleft()
        result.append(node)
        
        for neighbor in graph.get(node, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    # Check for cycle
    if len(result) != n:
        return []  # Cycle detected
    
    return result

# Usage
graph = {
    0: [1, 2],
    1: [3, 4],
    2: [4],
    3: [],
    4: []
}
print(topological_sort_kahn(graph, 5))  # [0, 1, 2, 3, 4]
```

### JavaScript

```javascript
function topologicalSortKahn(graph, n) {
    const inDegree = new Array(n).fill(0);
    
    for (let u = 0; u < n; u++) {
        for (const v of graph[u] || []) {
            inDegree[v]++;
        }
    }
    
    const queue = [];
    for (let v = 0; v < n; v++) {
        if (inDegree[v] === 0) {
            queue.push(v);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const node = queue.shift();
        result.push(node);
        
        for (const neighbor of graph[node] || []) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    return result.length === n ? result : [];
}
```

---

## DFS-based Approach

Uses **post-order** traversal - nodes that finish first go last in order.

### Algorithm Steps

1. For each unvisited vertex, run DFS
2. After visiting all neighbors, add vertex to stack
3. Reverse the stack for topological order

### Implementation

```python
def topological_sort_dfs(graph, n):
    """
    DFS-based topological sort.
    Time: O(V + E), Space: O(V)
    """
    visited = set()
    stack = []
    
    def dfs(node):
        visited.add(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)
        
        stack.append(node)  # Post-order
    
    for v in range(n):
        if v not in visited:
            dfs(v)
    
    return stack[::-1]  # Reverse for correct order

# With cycle detection
def topological_sort_dfs_safe(graph, n):
    """DFS topological sort with cycle detection."""
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    stack = []
    has_cycle = False
    
    def dfs(node):
        nonlocal has_cycle
        color[node] = GRAY
        
        for neighbor in graph.get(node, []):
            if color[neighbor] == GRAY:  # Back edge = cycle
                has_cycle = True
                return
            if color[neighbor] == WHITE:
                dfs(neighbor)
                if has_cycle:
                    return
        
        color[node] = BLACK
        stack.append(node)
    
    for v in range(n):
        if color[v] == WHITE:
            dfs(v)
            if has_cycle:
                return []
    
    return stack[::-1]
```

### Java

```java
import java.util.*;

public List<Integer> topologicalSortDFS(Map<Integer, List<Integer>> graph, int n) {
    Set<Integer> visited = new HashSet<>();
    Stack<Integer> stack = new Stack<>();
    
    for (int v = 0; v < n; v++) {
        if (!visited.contains(v)) {
            dfs(v, graph, visited, stack);
        }
    }
    
    List<Integer> result = new ArrayList<>();
    while (!stack.isEmpty()) {
        result.add(stack.pop());
    }
    return result;
}

private void dfs(int node, Map<Integer, List<Integer>> graph, 
                 Set<Integer> visited, Stack<Integer> stack) {
    visited.add(node);
    
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(neighbor, graph, visited, stack);
        }
    }
    
    stack.push(node);
}
```

---

## All Topological Orderings

Find all valid topological orderings (useful for understanding flexibility).

```python
def all_topological_sorts(graph, n):
    """
    Generate all valid topological orderings.
    Uses backtracking with in-degree tracking.
    """
    in_degree = [0] * n
    for u in range(n):
        for v in graph.get(u, []):
            in_degree[v] += 1
    
    result = []
    current = []
    visited = [False] * n
    
    def backtrack():
        if len(current) == n:
            result.append(current[:])
            return
        
        for v in range(n):
            if not visited[v] and in_degree[v] == 0:
                # Choose
                visited[v] = True
                current.append(v)
                for neighbor in graph.get(v, []):
                    in_degree[neighbor] -= 1
                
                # Explore
                backtrack()
                
                # Unchoose
                visited[v] = False
                current.pop()
                for neighbor in graph.get(v, []):
                    in_degree[neighbor] += 1
    
    backtrack()
    return result
```

---

## Common Problems

### 1. Course Schedule (Cycle Detection)

```python
def can_finish(num_courses, prerequisites):
    """
    Determine if all courses can be finished.
    Returns False if there's a cycle.
    """
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    result = topological_sort_kahn(graph, num_courses)
    return len(result) == num_courses
```

### 2. Course Schedule II (Get Order)

```python
def find_order(num_courses, prerequisites):
    """
    Return valid course ordering.
    Returns empty list if impossible.
    """
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    return topological_sort_kahn(graph, num_courses)
```

### 3. Alien Dictionary

```python
def alien_order(words):
    """
    Derive letter order from sorted alien words.
    """
    from collections import defaultdict
    
    # Build graph
    graph = defaultdict(set)
    in_degree = {c: 0 for word in words for c in word}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))
        
        # Check for invalid case
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""
        
        for j in range(min_len):
            if w1[j] != w2[j]:
                if w2[j] not in graph[w1[j]]:
                    graph[w1[j]].add(w2[j])
                    in_degree[w2[j]] += 1
                break
    
    # Kahn's algorithm
    queue = deque([c for c in in_degree if in_degree[c] == 0])
    result = []
    
    while queue:
        c = queue.popleft()
        result.append(c)
        
        for neighbor in graph[c]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
    
    if len(result) != len(in_degree):
        return ""  # Cycle
    
    return "".join(result)
```

### 4. Longest Path in DAG

```python
def longest_path_dag(graph, n):
    """
    Find longest path in a DAG.
    Uses topological sort + DP.
    """
    topo_order = topological_sort_kahn(graph, n)
    if not topo_order:
        return -1  # Cycle exists
    
    dist = [0] * n
    
    for u in topo_order:
        for v in graph.get(u, []):
            dist[v] = max(dist[v], dist[u] + 1)
    
    return max(dist)
```

### 5. Minimum Height Trees

```python
def find_min_height_trees(n, edges):
    """
    Find roots that give minimum height tree.
    Uses "peeling" approach similar to Kahn's.
    """
    if n == 1:
        return [0]
    
    # Build adjacency list
    graph = {i: set() for i in range(n)}
    for u, v in edges:
        graph[u].add(v)
        graph[v].add(u)
    
    # Start with leaves
    leaves = [v for v in range(n) if len(graph[v]) == 1]
    remaining = n
    
    while remaining > 2:
        remaining -= len(leaves)
        new_leaves = []
        
        for leaf in leaves:
            neighbor = graph[leaf].pop()
            graph[neighbor].remove(leaf)
            
            if len(graph[neighbor]) == 1:
                new_leaves.append(neighbor)
        
        leaves = new_leaves
    
    return leaves
```

---

## Kahn's vs DFS

| Aspect | Kahn's (BFS) | DFS |
|--------|--------------|-----|
| Approach | In-degree tracking | Post-order |
| Cycle Detection | Built-in (count check) | Needs color tracking |
| Lexicographic Order | Easy (use min-heap) | Harder |
| Space | O(V) for in-degree array | O(V) for recursion stack |
| Implementation | Iterative | Usually recursive |

---

## Lexicographically Smallest Order

Use min-heap instead of queue in Kahn's:

```python
import heapq

def topo_sort_lex_smallest(graph, n):
    """Get lexicographically smallest topological order."""
    in_degree = [0] * n
    for u in range(n):
        for v in graph.get(u, []):
            in_degree[v] += 1
    
    min_heap = [v for v in range(n) if in_degree[v] == 0]
    heapq.heapify(min_heap)
    
    result = []
    
    while min_heap:
        node = heapq.heappop(min_heap)
        result.append(node)
        
        for neighbor in graph.get(node, []):
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                heapq.heappush(min_heap, neighbor)
    
    return result if len(result) == n else []
```

---

## Time & Space Complexity

| Algorithm | Time | Space |
|-----------|------|-------|
| Kahn's | O(V + E) | O(V) |
| DFS-based | O(V + E) | O(V) |
| All orderings | O(V! × V) | O(V!) |

---

## Key Takeaways

1. **DAG required** - topological sort only works on acyclic directed graphs
2. **Cycle detection** - if you can't order all vertices, there's a cycle
3. **Multiple valid orderings** - unless strict constraints exist
4. **Kahn's for iterative**, DFS for recursive implementation
5. **Longest path in DAG** - use topo sort + DP
6. **Lexicographic order** - use min-heap in Kahn's algorithm
