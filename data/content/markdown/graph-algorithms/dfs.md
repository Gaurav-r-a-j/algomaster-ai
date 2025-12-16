# Depth-First Search (DFS)

**DFS** explores as far as possible along each branch before backtracking. It uses a **stack** (LIFO) - either explicitly or via recursion.

## Visual Understanding

```
Graph:          DFS from 0:
    0           Step 1: Visit 0
   /|\          Step 2: Visit 1 (first child)
  1 2 3         Step 3: Visit 4 (child of 1)
 / \            Step 4: Backtrack to 1, then 0
4   5           Step 5: Visit 2
    |           Step 6: Backtrack, Visit 3
    6
                Order: 0 → 1 → 4 → 5 → 6 → 2 → 3
```

---

## Algorithm Steps

1. **Start** at source vertex, mark as visited
2. **Process** current vertex
3. **For each** unvisited neighbor:
   - Recursively visit that neighbor
4. **Backtrack** when no unvisited neighbors remain

---

## Implementation

### Python - Recursive

```python
def dfs(graph, start, visited=None):
    """
    Recursive DFS traversal.
    Time: O(V + E), Space: O(V) for recursion stack
    """
    if visited is None:
        visited = set()
    
    visited.add(start)
    result = [start]
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            result.extend(dfs(graph, neighbor, visited))
    
    return result

# Usage
graph = {
    0: [1, 2, 3],
    1: [4, 5],
    2: [],
    3: [],
    4: [],
    5: [6],
    6: []
}
print(dfs(graph, 0))  # [0, 1, 4, 5, 6, 2, 3]
```

### Python - Iterative (Stack)

```python
def dfs_iterative(graph, start):
    """
    Iterative DFS using explicit stack.
    Avoids recursion limit for deep graphs.
    """
    visited = set()
    stack = [start]
    result = []
    
    while stack:
        vertex = stack.pop()
        
        if vertex not in visited:
            visited.add(vertex)
            result.append(vertex)
            
            # Add neighbors in reverse for same order as recursive
            for neighbor in reversed(graph.get(vertex, [])):
                if neighbor not in visited:
                    stack.append(neighbor)
    
    return result
```

### JavaScript

```javascript
function dfs(graph, start, visited = new Set()) {
    visited.add(start);
    const result = [start];
    
    for (const neighbor of graph[start] || []) {
        if (!visited.has(neighbor)) {
            result.push(...dfs(graph, neighbor, visited));
        }
    }
    
    return result;
}

// Iterative version
function dfsIterative(graph, start) {
    const visited = new Set();
    const stack = [start];
    const result = [];
    
    while (stack.length > 0) {
        const vertex = stack.pop();
        
        if (!visited.has(vertex)) {
            visited.add(vertex);
            result.push(vertex);
            
            for (const neighbor of (graph[vertex] || []).reverse()) {
                if (!visited.has(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
    
    return result;
}
```

### Java

```java
import java.util.*;

public class DFS {
    public List<Integer> dfs(Map<Integer, List<Integer>> graph, int start) {
        Set<Integer> visited = new HashSet<>();
        List<Integer> result = new ArrayList<>();
        dfsHelper(graph, start, visited, result);
        return result;
    }
    
    private void dfsHelper(Map<Integer, List<Integer>> graph, int vertex,
                           Set<Integer> visited, List<Integer> result) {
        visited.add(vertex);
        result.add(vertex);
        
        for (int neighbor : graph.getOrDefault(vertex, List.of())) {
            if (!visited.contains(neighbor)) {
                dfsHelper(graph, neighbor, visited, result);
            }
        }
    }
}
```

### C++

```cpp
#include <unordered_set>
#include <unordered_map>
#include <vector>
#include <stack>

class Solution {
public:
    vector<int> dfs(unordered_map<int, vector<int>>& graph, int start) {
        unordered_set<int> visited;
        vector<int> result;
        dfsHelper(graph, start, visited, result);
        return result;
    }
    
private:
    void dfsHelper(unordered_map<int, vector<int>>& graph, int vertex,
                   unordered_set<int>& visited, vector<int>& result) {
        visited.insert(vertex);
        result.push_back(vertex);
        
        for (int neighbor : graph[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                dfsHelper(graph, neighbor, visited, result);
            }
        }
    }
};
```

---

## Cycle Detection

### In Directed Graph

```python
def has_cycle_directed(graph, n):
    """
    Detect cycle in directed graph using DFS.
    Uses three colors: WHITE (unvisited), GRAY (in progress), BLACK (done)
    """
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * n
    
    def dfs(node):
        color[node] = GRAY
        
        for neighbor in graph.get(node, []):
            if color[neighbor] == GRAY:  # Back edge found
                return True
            if color[neighbor] == WHITE:
                if dfs(neighbor):
                    return True
        
        color[node] = BLACK
        return False
    
    for node in range(n):
        if color[node] == WHITE:
            if dfs(node):
                return True
    
    return False
```

### In Undirected Graph

```python
def has_cycle_undirected(graph, n):
    """
    Detect cycle in undirected graph.
    Track parent to avoid false positives from back-traversal.
    """
    visited = set()
    
    def dfs(node, parent):
        visited.add(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                if dfs(neighbor, node):
                    return True
            elif neighbor != parent:  # Back edge (not parent)
                return True
        
        return False
    
    for node in range(n):
        if node not in visited:
            if dfs(node, -1):
                return True
    
    return False
```

---

## Path Finding

### Find Any Path

```python
def find_path(graph, start, end):
    """Find any path from start to end."""
    visited = set()
    
    def dfs(node, path):
        if node == end:
            return path
        
        visited.add(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                result = dfs(neighbor, path + [neighbor])
                if result:
                    return result
        
        return None
    
    return dfs(start, [start])
```

### Find All Paths

```python
def find_all_paths(graph, start, end):
    """Find all paths from start to end (no cycles)."""
    all_paths = []
    
    def dfs(node, path):
        if node == end:
            all_paths.append(path[:])
            return
        
        for neighbor in graph.get(node, []):
            if neighbor not in path:  # Avoid cycles in path
                path.append(neighbor)
                dfs(neighbor, path)
                path.pop()  # Backtrack
    
    dfs(start, [start])
    return all_paths
```

---

## Connected Components

```python
def count_components(n, edges):
    """Count connected components in undirected graph."""
    # Build adjacency list
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = set()
    components = 0
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
    
    for node in range(n):
        if node not in visited:
            dfs(node)
            components += 1
    
    return components

# Get actual components (not just count)
def get_components(n, edges):
    """Return list of connected components."""
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    visited = set()
    components = []
    
    def dfs(node, component):
        visited.add(node)
        component.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor, component)
    
    for node in range(n):
        if node not in visited:
            component = []
            dfs(node, component)
            components.append(component)
    
    return components
```

---

## DFS on Matrix

```python
def dfs_matrix(grid, start):
    """
    DFS on 2D grid.
    Count reachable cells or find path.
    """
    rows, cols = len(grid), len(grid[0])
    sr, sc = start
    visited = set()
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return 0
        if (r, c) in visited or grid[r][c] == 1:  # 1 = blocked
            return 0
        
        visited.add((r, c))
        count = 1  # Current cell
        
        # Explore 4 directions
        for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
            count += dfs(r + dr, c + dc)
        
        return count
    
    return dfs(sr, sc)

# Number of Islands problem
def num_islands(grid):
    """Count connected components of '1's in grid."""
    if not grid:
        return 0
    
    rows, cols = len(grid), len(grid[0])
    count = 0
    
    def dfs(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return
        if grid[r][c] != '1':
            return
        
        grid[r][c] = '#'  # Mark visited
        
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    
    return count
```

---

## Common DFS Problems

### 1. Clone Graph

```python
def clone_graph(node):
    """Deep clone a graph."""
    if not node:
        return None
    
    visited = {}
    
    def dfs(node):
        if node in visited:
            return visited[node]
        
        clone = Node(node.val)
        visited[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)
```

### 2. Course Schedule (Cycle Detection)

```python
def can_finish(num_courses, prerequisites):
    """Check if all courses can be finished (no cycle)."""
    graph = {i: [] for i in range(num_courses)}
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    WHITE, GRAY, BLACK = 0, 1, 2
    color = [WHITE] * num_courses
    
    def dfs(node):
        color[node] = GRAY
        
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return False  # Cycle detected
            if color[neighbor] == WHITE:
                if not dfs(neighbor):
                    return False
        
        color[node] = BLACK
        return True
    
    for course in range(num_courses):
        if color[course] == WHITE:
            if not dfs(course):
                return False
    
    return True
```

### 3. Word Search in Grid

```python
def exist(board, word):
    """Check if word exists in grid."""
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, idx):
        if idx == len(word):
            return True
        
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        
        if board[r][c] != word[idx]:
            return False
        
        temp = board[r][c]
        board[r][c] = '#'  # Mark visited
        
        found = (dfs(r + 1, c, idx + 1) or
                 dfs(r - 1, c, idx + 1) or
                 dfs(r, c + 1, idx + 1) or
                 dfs(r, c - 1, idx + 1))
        
        board[r][c] = temp  # Restore
        return found
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    
    return False
```

---

## Time & Space Complexity

| Aspect | Complexity | Notes |
|--------|------------|-------|
| Time | **O(V + E)** | Each vertex and edge visited once |
| Space | **O(V)** | Recursion stack + visited set |

For matrix/grid: O(rows × cols)

---

## DFS vs BFS

| Feature | DFS | BFS |
|---------|-----|-----|
| Data Structure | Stack/Recursion | Queue |
| Traversal | Deep first | Level by level |
| Memory | Less (usually) | More for wide graphs |
| Shortest Path | ❌ Not guaranteed | ✅ Unweighted graphs |
| Best for | Cycles, paths, topological | Shortest path, levels |

---

## Key Takeaways

1. **Use recursion or stack** - recursion is cleaner, stack avoids depth limits
2. **Mark visited early** to prevent revisiting
3. **Backtracking** - restore state when returning (for path finding)
4. **Three-color marking** for directed cycle detection
5. **Track parent** for undirected cycle detection
6. **Matrix DFS** - check bounds, mark visited, explore 4/8 directions
