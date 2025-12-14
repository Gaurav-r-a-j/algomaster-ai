# Breadth-First Search (BFS)

BFS explores a graph level by level, visiting all neighbors before moving to the next level. It uses a **queue** data structure.

## How It Works

1. Start from source vertex, mark as visited
2. Add to queue
3. While queue is not empty:
   - Dequeue a vertex
   - Visit all unvisited neighbors
   - Mark as visited and enqueue

## Implementation

```python
from collections import deque

def bfs(graph, start):
    visited = set([start])
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
```

## Shortest Path (Unweighted)

```python
def shortest_path(graph, start, end):
    if start == end:
        return [start]
    
    visited = set([start])
    queue = deque([(start, [start])])
    
    while queue:
        vertex, path = queue.popleft()
        
        for neighbor in graph[vertex]:
            if neighbor == end:
                return path + [neighbor]
            
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, path + [neighbor]))
    
    return []  # No path found
```

## Level Order Traversal (Trees)

```python
def level_order(root):
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

## Time & Space Complexity

- **Time:** O(V + E) - visits each vertex and edge once
- **Space:** O(V) - for queue and visited set

## Applications

- Shortest path in unweighted graphs
- Level order traversal
- Finding connected components
- Web crawlers
- Social network friend suggestions
