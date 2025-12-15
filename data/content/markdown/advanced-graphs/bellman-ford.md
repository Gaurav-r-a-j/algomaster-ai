# Bellman-Ford Algorithm

Bellman-Ford finds shortest paths from a source vertex to all other vertices, even with **negative edge weights**. It can also detect negative cycles.

## How It Works

1. Initialize distances: source = 0, others = infinity
2. Relax all edges V-1 times
3. Check for negative cycles with one more iteration

## Implementation

```python
def bellman_ford(edges, n, source):
    # edges: list of (u, v, weight)
    dist = [float('inf')] * n
    dist[source] = 0

    # Relax all edges V-1 times
    for _ in range(n - 1):
        for u, v, weight in edges:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight

    # Check for negative cycles
    for u, v, weight in edges:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            return None  # Negative cycle detected

    return dist
```

## With Path Reconstruction

```python
def bellman_ford_path(edges, n, source, target):
    dist = [float('inf')] * n
    dist[source] = 0
    parent = [-1] * n

    for _ in range(n - 1):
        for u, v, weight in edges:
            if dist[u] != float('inf') and dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                parent[v] = u

    # Check for negative cycle
    for u, v, weight in edges:
        if dist[u] != float('inf') and dist[u] + weight < dist[v]:
            return None, None

    # Reconstruct path
    path = []
    current = target
    while current != -1:
        path.append(current)
        current = parent[current]

    return dist[target], path[::-1]
```

## Time Complexity

- **Time:** O(V × E)
- **Space:** O(V)

## Comparison with Dijkstra

| Feature          | Dijkstra       | Bellman-Ford |
| ---------------- | -------------- | ------------ |
| Negative weights | No             | Yes          |
| Negative cycles  | Cannot detect  | Detects      |
| Time complexity  | O((V+E) log V) | O(V × E)     |

## Applications

- Currency arbitrage detection
- Network routing with possible losses
- Graphs with negative weights
