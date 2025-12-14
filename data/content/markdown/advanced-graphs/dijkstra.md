# Dijkstra's Algorithm

Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with **non-negative** edge weights.

## How It Works

1. Initialize distances: source = 0, others = infinity
2. Use a priority queue (min-heap)
3. Process vertex with smallest distance
4. Update distances of neighbors if shorter path found
5. Repeat until all vertices processed

## Implementation

```python
import heapq
from collections import defaultdict

def dijkstra(graph, start, n):
    # graph: adjacency list with (neighbor, weight)
    dist = [float('inf')] * n
    dist[start] = 0
    
    # Min heap: (distance, vertex)
    heap = [(0, start)]
    visited = set()
    
    while heap:
        d, u = heapq.heappop(heap)
        
        if u in visited:
            continue
        visited.add(u)
        
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(heap, (dist[v], v))
    
    return dist
```

## With Path Reconstruction

```python
def dijkstra_with_path(graph, start, end, n):
    dist = [float('inf')] * n
    dist[start] = 0
    parent = [-1] * n
    
    heap = [(0, start)]
    visited = set()
    
    while heap:
        d, u = heapq.heappop(heap)
        
        if u == end:
            break
            
        if u in visited:
            continue
        visited.add(u)
        
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                parent[v] = u
                heapq.heappush(heap, (dist[v], v))
    
    # Reconstruct path
    path = []
    current = end
    while current != -1:
        path.append(current)
        current = parent[current]
    
    return dist[end], path[::-1]
```

## Time Complexity

- **With Binary Heap:** O((V + E) log V)
- **With Fibonacci Heap:** O(E + V log V)

## Limitations

- Does NOT work with **negative edge weights**
- For negative weights, use Bellman-Ford

## Applications

- GPS navigation
- Network routing protocols
- Finding shortest paths in maps
