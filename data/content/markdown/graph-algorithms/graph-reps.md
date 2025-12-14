# Graph Representations

Graphs can be represented in different ways. The choice depends on the graph density and operations needed.

## Adjacency Matrix

A 2D array where `matrix[i][j] = 1` if there's an edge from vertex i to j.

```python
# For n vertices
graph = [[0] * n for _ in range(n)]

# Add edge (undirected)
def add_edge(u, v):
    graph[u][v] = 1
    graph[v][u] = 1  # Remove for directed

# Check if edge exists
def has_edge(u, v):
    return graph[u][v] == 1
```

### Pros
- O(1) edge lookup
- Easy to implement
- Good for dense graphs

### Cons
- O(n²) space
- Adding/removing vertex is expensive

## Adjacency List

An array of lists where each index stores neighbors of that vertex.

```python
from collections import defaultdict

graph = defaultdict(list)

# Add edge (undirected)
def add_edge(u, v):
    graph[u].append(v)
    graph[v].append(u)  # Remove for directed

# Get neighbors
def get_neighbors(u):
    return graph[u]
```

### Pros
- O(V + E) space - efficient for sparse graphs
- Adding vertex is easy
- Easy to iterate over neighbors

### Cons
- O(degree) edge lookup
- Not efficient for dense graphs

## Comparison

| Operation       | Adjacency Matrix | Adjacency List |
|-----------------|------------------|----------------|
| Space           | O(V²)           | O(V + E)       |
| Add Edge        | O(1)            | O(1)           |
| Remove Edge     | O(1)            | O(E)           |
| Check Edge      | O(1)            | O(degree)      |
| Get Neighbors   | O(V)            | O(degree)      |

## When to Use

- **Adjacency Matrix:** Dense graphs, frequent edge lookups, weighted graphs
- **Adjacency List:** Sparse graphs, graph traversals, most algorithms

## Weighted Graphs

### Adjacency Matrix
```python
graph[u][v] = weight  # Instead of 1
```

### Adjacency List
```python
graph[u].append((v, weight))  # Store tuple
```
