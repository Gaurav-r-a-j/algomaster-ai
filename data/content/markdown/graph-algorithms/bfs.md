# Breadth-First Search (BFS)

**BFS** explores a graph level by level, visiting all neighbors at the current depth before moving deeper. It uses a **queue** (FIFO) data structure.

## Visual Understanding

```
Graph:          BFS from 0:
    0           Level 0: [0]
   /|\          Level 1: [1, 2, 3]
  1 2 3         Level 2: [4, 5]
   \|/          
    4           Order: 0 → 1 → 2 → 3 → 4 → 5
    |
    5
```

---

## Algorithm Steps

1. **Start** at source vertex, mark as visited
2. **Add** source to queue
3. **While** queue is not empty:
   - Dequeue front vertex
   - Process it (add to result)
   - Enqueue all unvisited neighbors
   - Mark neighbors as visited

> 💡 **Key insight**: Mark as visited BEFORE adding to queue (not after dequeueing) to avoid duplicates.

---

## Implementation

### Python

```python
from collections import deque

def bfs(graph, start):
    """
    Basic BFS traversal
    Time: O(V + E), Space: O(V)
    """
    visited = {start}
    queue = deque([start])
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# Usage
graph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 5, 6],
    3: [1],
    4: [1],
    5: [2],
    6: [2]
}
print(bfs(graph, 0))  # [0, 1, 2, 3, 4, 5, 6]
```

### JavaScript

```javascript
function bfs(graph, start) {
    const visited = new Set([start]);
    const queue = [start];
    const result = [];
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (const neighbor of graph[vertex] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    
    return result;
}
```

### Java

```java
import java.util.*;

public List<Integer> bfs(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();
    List<Integer> result = new ArrayList<>();
    
    visited.add(start);
    queue.offer(start);
    
    while (!queue.isEmpty()) {
        int vertex = queue.poll();
        result.add(vertex);
        
        for (int neighbor : graph.getOrDefault(vertex, List.of())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }
    
    return result;
}
```

### C++

```cpp
#include <queue>
#include <unordered_set>
#include <unordered_map>
#include <vector>

vector<int> bfs(unordered_map<int, vector<int>>& graph, int start) {
    unordered_set<int> visited;
    queue<int> q;
    vector<int> result;
    
    visited.insert(start);
    q.push(start);
    
    while (!q.empty()) {
        int vertex = q.front();
        q.pop();
        result.push_back(vertex);
        
        for (int neighbor : graph[vertex]) {
            if (visited.find(neighbor) == visited.end()) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }
    
    return result;
}
```

---

## Shortest Path (Unweighted Graph)

BFS naturally finds the shortest path in unweighted graphs.

```python
def shortest_path(graph, start, end):
    """
    Find shortest path from start to end.
    Returns path as list of vertices, or empty list if no path.
    """
    if start == end:
        return [start]
    
    visited = {start}
    queue = deque([(start, [start])])  # (vertex, path)
    
    while queue:
        vertex, path = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor == end:
                return path + [neighbor]
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return []  # No path found

# Optimized version using parent pointers
def shortest_path_optimized(graph, start, end):
    """Memory-efficient version using parent tracking."""
    if start == end:
        return [start]
    
    visited = {start}
    queue = deque([start])
    parent = {start: None}
    
    while queue:
        vertex = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                parent[neighbor] = vertex
                queue.append(neighbor)
                
                if neighbor == end:
                    # Reconstruct path
                    path = []
                    current = end
                    while current is not None:
                        path.append(current)
                        current = parent[current]
                    return path[::-1]
    
    return []
```

---

## Level Order Traversal

Process nodes level by level - useful for trees and when you need level information.

```python
def bfs_with_levels(graph, start):
    """
    BFS that tracks levels/distance from start.
    Returns: (order, level_map)
    """
    visited = {start}
    queue = deque([(start, 0)])  # (vertex, level)
    levels = {start: 0}
    order = []
    
    while queue:
        vertex, level = queue.popleft()
        order.append(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                levels[neighbor] = level + 1
                queue.append((neighbor, level + 1))
    
    return order, levels

# For trees: Level Order Traversal
def level_order_tree(root):
    """Level order traversal for binary tree."""
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        current_level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            current_level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(current_level)
    
    return result
```

---

## Common BFS Problems

### 1. 0-1 BFS (Edges with weight 0 or 1)

```python
from collections import deque

def shortest_path_01(graph, start, end, n):
    """
    BFS for graphs with edge weights 0 or 1.
    Use deque: weight 0 edges go to front, weight 1 edges go to back.
    """
    dist = [float('inf')] * n
    dist[start] = 0
    dq = deque([start])
    
    while dq:
        u = dq.popleft()
        
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                if weight == 0:
                    dq.appendleft(v)  # Front for 0-weight
                else:
                    dq.append(v)      # Back for 1-weight
    
    return dist[end]
```

### 2. Multi-Source BFS

```python
def multi_source_bfs(grid, sources):
    """
    BFS from multiple starting points simultaneously.
    Useful for: Nearest exit, infection spread, etc.
    """
    rows, cols = len(grid), len(grid[0])
    visited = set()
    queue = deque()
    
    # Add all sources with distance 0
    for r, c in sources:
        visited.add((r, c))
        queue.append((r, c, 0))
    
    distances = {}
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    while queue:
        r, c, dist = queue.popleft()
        distances[(r, c)] = dist
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                if (nr, nc) not in visited and grid[nr][nc] != '#':
                    visited.add((nr, nc))
                    queue.append((nr, nc, dist + 1))
    
    return distances
```

### 3. Word Ladder

```python
def ladder_length(begin_word, end_word, word_list):
    """Find shortest transformation sequence."""
    word_set = set(word_list)
    if end_word not in word_set:
        return 0
    
    queue = deque([(begin_word, 1)])
    
    while queue:
        word, length = queue.popleft()
        
        if word == end_word:
            return length
        
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]
                if next_word in word_set:
                    word_set.remove(next_word)
                    queue.append((next_word, length + 1))
    
    return 0
```

### 4. Rotten Oranges

```python
def oranges_rotting(grid):
    """Time for all oranges to rot (multi-source BFS)."""
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))
            elif grid[r][c] == 1:
                fresh += 1
    
    if fresh == 0:
        return 0
    
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    max_time = 0
    
    while queue:
        r, c, time = queue.popleft()
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                max_time = time + 1
                queue.append((nr, nc, time + 1))
    
    return max_time if fresh == 0 else -1
```

---

## BFS on Matrix

```python
def bfs_matrix(grid, start, end):
    """
    BFS on 2D grid.
    grid[r][c] = 0 means passable, 1 means blocked.
    """
    rows, cols = len(grid), len(grid[0])
    sr, sc = start
    er, ec = end
    
    if grid[sr][sc] == 1 or grid[er][ec] == 1:
        return -1
    
    visited = {(sr, sc)}
    queue = deque([(sr, sc, 0)])  # (row, col, distance)
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    while queue:
        r, c, dist = queue.popleft()
        
        if (r, c) == (er, ec):
            return dist
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                if (nr, nc) not in visited and grid[nr][nc] == 0:
                    visited.add((nr, nc))
                    queue.append((nr, nc, dist + 1))
    
    return -1  # No path found
```

---

## Time & Space Complexity

| Aspect | Complexity | Notes |
|--------|------------|-------|
| Time | **O(V + E)** | Each vertex and edge visited once |
| Space | **O(V)** | Queue + visited set |

For matrix/grid: O(rows × cols)

---

## BFS vs DFS

| Feature | BFS | DFS |
|---------|-----|-----|
| Data Structure | Queue | Stack/Recursion |
| Traversal | Level by level | Deep then backtrack |
| Shortest Path | ✅ Unweighted graphs | ❌ Not guaranteed |
| Space | O(width of graph) | O(height of graph) |
| Best for | Shortest path, levels | Cycles, topological sort |

---

## Key Takeaways

1. **Use BFS for shortest path** in unweighted graphs
2. **Mark visited BEFORE enqueueing** to avoid duplicates
3. **Track levels** when distance matters
4. **Multi-source BFS** for problems with multiple starting points
5. **0-1 BFS** with deque for edge weights 0 or 1
