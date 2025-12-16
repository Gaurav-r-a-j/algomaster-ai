# Graph Representations

Graphs can be represented in multiple ways. The choice depends on graph density, operations needed, and memory constraints.

## Visual Comparison

```
Graph:            Adjacency Matrix:    Adjacency List:
  0 ——— 1           0  1  2  3         0: [1, 2]
  |   / |        0 [0, 1, 1, 0]        1: [0, 2, 3]
  |  /  |        1 [1, 0, 1, 1]        2: [0, 1]
  | /   |        2 [1, 1, 0, 0]        3: [1]
  2     3        3 [0, 1, 0, 0]
```

---

## Adjacency Matrix

A 2D array where `matrix[i][j]` represents edge from i to j.

### Implementation

```python
class GraphMatrix:
    def __init__(self, num_vertices):
        self.V = num_vertices
        self.matrix = [[0] * num_vertices for _ in range(num_vertices)]
    
    def add_edge(self, u, v, weight=1, directed=False):
        """Add edge with optional weight."""
        self.matrix[u][v] = weight
        if not directed:
            self.matrix[v][u] = weight
    
    def remove_edge(self, u, v, directed=False):
        """Remove edge."""
        self.matrix[u][v] = 0
        if not directed:
            self.matrix[v][u] = 0
    
    def has_edge(self, u, v):
        """Check if edge exists - O(1)."""
        return self.matrix[u][v] != 0
    
    def get_weight(self, u, v):
        """Get edge weight - O(1)."""
        return self.matrix[u][v]
    
    def get_neighbors(self, u):
        """Get all neighbors - O(V)."""
        return [v for v in range(self.V) if self.matrix[u][v] != 0]
    
    def get_degree(self, u):
        """Count edges from vertex - O(V)."""
        return sum(1 for v in range(self.V) if self.matrix[u][v] != 0)

# Usage
g = GraphMatrix(4)
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
g.add_edge(1, 3)
print(g.has_edge(0, 1))  # True
print(g.get_neighbors(1))  # [0, 2, 3]
```

### JavaScript

```javascript
class GraphMatrix {
    constructor(numVertices) {
        this.V = numVertices;
        this.matrix = Array(numVertices).fill(null)
            .map(() => Array(numVertices).fill(0));
    }
    
    addEdge(u, v, weight = 1, directed = false) {
        this.matrix[u][v] = weight;
        if (!directed) this.matrix[v][u] = weight;
    }
    
    hasEdge(u, v) {
        return this.matrix[u][v] !== 0;
    }
    
    getNeighbors(u) {
        const neighbors = [];
        for (let v = 0; v < this.V; v++) {
            if (this.matrix[u][v] !== 0) {
                neighbors.push(v);
            }
        }
        return neighbors;
    }
}
```

### Pros & Cons

| Pros | Cons |
|------|------|
| O(1) edge lookup | O(V²) space always |
| Easy to implement | Adding vertex is expensive |
| Good for dense graphs | Wastes space for sparse graphs |
| Easy weight storage | Iterating neighbors is O(V) |

---

## Adjacency List

An array/map where each index stores a list of neighbors.

### Implementation

```python
from collections import defaultdict

class GraphList:
    def __init__(self, directed=False):
        self.graph = defaultdict(list)
        self.directed = directed
    
    def add_edge(self, u, v, weight=None):
        """Add edge - O(1)."""
        if weight is not None:
            self.graph[u].append((v, weight))
            if not self.directed:
                self.graph[v].append((u, weight))
        else:
            self.graph[u].append(v)
            if not self.directed:
                self.graph[v].append(u)
    
    def remove_edge(self, u, v):
        """Remove edge - O(degree)."""
        self.graph[u] = [n for n in self.graph[u] 
                         if (n != v and n[0] != v if isinstance(n, tuple) else n != v)]
        if not self.directed:
            self.graph[v] = [n for n in self.graph[v] 
                             if (n != u and n[0] != u if isinstance(n, tuple) else n != u)]
    
    def has_edge(self, u, v):
        """Check edge exists - O(degree)."""
        for neighbor in self.graph[u]:
            target = neighbor[0] if isinstance(neighbor, tuple) else neighbor
            if target == v:
                return True
        return False
    
    def get_neighbors(self, u):
        """Get neighbors - O(1) access."""
        return self.graph[u]
    
    def get_all_vertices(self):
        """Get all vertices."""
        vertices = set()
        for u in self.graph:
            vertices.add(u)
            for n in self.graph[u]:
                v = n[0] if isinstance(n, tuple) else n
                vertices.add(v)
        return vertices

# Usage - Unweighted
g = GraphList()
g.add_edge(0, 1)
g.add_edge(0, 2)
g.add_edge(1, 2)
print(g.get_neighbors(0))  # [1, 2]

# Usage - Weighted
g = GraphList()
g.add_edge(0, 1, weight=5)
g.add_edge(0, 2, weight=3)
print(g.get_neighbors(0))  # [(1, 5), (2, 3)]
```

### JavaScript

```javascript
class GraphList {
    constructor(directed = false) {
        this.graph = new Map();
        this.directed = directed;
    }
    
    addEdge(u, v, weight = null) {
        if (!this.graph.has(u)) this.graph.set(u, []);
        if (!this.graph.has(v)) this.graph.set(v, []);
        
        if (weight !== null) {
            this.graph.get(u).push([v, weight]);
            if (!this.directed) {
                this.graph.get(v).push([u, weight]);
            }
        } else {
            this.graph.get(u).push(v);
            if (!this.directed) {
                this.graph.get(v).push(u);
            }
        }
    }
    
    getNeighbors(u) {
        return this.graph.get(u) || [];
    }
}
```

### Java

```java
import java.util.*;

class GraphList {
    private Map<Integer, List<int[]>> graph;
    private boolean directed;
    
    public GraphList(boolean directed) {
        this.graph = new HashMap<>();
        this.directed = directed;
    }
    
    public void addEdge(int u, int v, int weight) {
        graph.computeIfAbsent(u, k -> new ArrayList<>()).add(new int[]{v, weight});
        if (!directed) {
            graph.computeIfAbsent(v, k -> new ArrayList<>()).add(new int[]{u, weight});
        }
    }
    
    public List<int[]> getNeighbors(int u) {
        return graph.getOrDefault(u, new ArrayList<>());
    }
}
```

### Pros & Cons

| Pros | Cons |
|------|------|
| O(V + E) space | O(degree) edge lookup |
| Easy to add vertices | Edge removal is O(E) |
| Fast neighbor iteration | Not ideal for dense graphs |
| Perfect for sparse graphs | Need extra storage for weights |

---

## Edge List

Simply a list of all edges - great for algorithms like Kruskal's.

```python
class GraphEdgeList:
    def __init__(self, directed=False):
        self.edges = []  # [(u, v, weight), ...]
        self.directed = directed
    
    def add_edge(self, u, v, weight=1):
        self.edges.append((u, v, weight))
    
    def get_all_edges(self):
        return self.edges
    
    def sort_by_weight(self):
        """For Kruskal's algorithm."""
        self.edges.sort(key=lambda x: x[2])

# Usage
g = GraphEdgeList()
g.add_edge(0, 1, 4)
g.add_edge(0, 2, 3)
g.add_edge(1, 2, 1)
g.sort_by_weight()
print(g.edges)  # [(1, 2, 1), (0, 2, 3), (0, 1, 4)]
```

---

## Complexity Comparison

| Operation | Matrix | Adjacency List | Edge List |
|-----------|--------|----------------|-----------|
| Space | O(V²) | O(V + E) | O(E) |
| Add Edge | O(1) | O(1) | O(1) |
| Remove Edge | O(1) | O(E) | O(E) |
| Check Edge | **O(1)** | O(degree) | O(E) |
| Get Neighbors | O(V) | **O(1)** | O(E) |
| Get All Edges | O(V²) | O(E) | **O(1)** |

---

## When to Use What?

| Use Case | Best Representation |
|----------|---------------------|
| Dense graphs (E ≈ V²) | Adjacency Matrix |
| Sparse graphs | Adjacency List |
| Frequent edge lookups | Adjacency Matrix |
| Graph traversals | Adjacency List |
| Kruskal's MST | Edge List |
| Weighted graphs | Any (list most flexible) |
| Memory constrained | Edge List or Adjacency List |

---

## Special Representations

### Implicit Graphs (Grid/Matrix)

```python
def get_neighbors_grid(grid, r, c):
    """4-directional neighbors in a grid."""
    rows, cols = len(grid), len(grid[0])
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    
    neighbors = []
    for dr, dc in directions:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            if grid[nr][nc] != '#':  # Not blocked
                neighbors.append((nr, nc))
    
    return neighbors

# 8-directional (including diagonals)
def get_neighbors_8dir(grid, r, c):
    rows, cols = len(grid), len(grid[0])
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0),  (1, 1)
    ]
    
    neighbors = []
    for dr, dc in directions:
        nr, nc = r + dr, c + dc
        if 0 <= nr < rows and 0 <= nc < cols:
            neighbors.append((nr, nc))
    
    return neighbors
```

### Compressed Sparse Row (CSR)

Memory-efficient for very large sparse graphs:

```python
class CSRGraph:
    """Compressed Sparse Row representation."""
    def __init__(self, edges, num_vertices):
        # Sort edges by source vertex
        edges.sort()
        
        self.num_vertices = num_vertices
        self.values = []    # Edge weights
        self.col_idx = []   # Destination vertices
        self.row_ptr = [0]  # Starting index for each row
        
        current_row = 0
        for u, v, w in edges:
            while current_row < u:
                self.row_ptr.append(len(self.col_idx))
                current_row += 1
            self.col_idx.append(v)
            self.values.append(w)
        
        while current_row < num_vertices:
            self.row_ptr.append(len(self.col_idx))
            current_row += 1
    
    def get_neighbors(self, u):
        """Get neighbors with weights."""
        start = self.row_ptr[u]
        end = self.row_ptr[u + 1]
        return list(zip(self.col_idx[start:end], self.values[start:end]))
```

---

## Building Graphs from Input

```python
# From edges list
def build_from_edges(n, edges, directed=False):
    graph = {i: [] for i in range(n)}
    for u, v in edges:
        graph[u].append(v)
        if not directed:
            graph[v].append(u)
    return graph

# From adjacency matrix
def build_from_matrix(matrix):
    n = len(matrix)
    graph = {i: [] for i in range(n)}
    for i in range(n):
        for j in range(n):
            if matrix[i][j]:
                graph[i].append(j)
    return graph

# From grid (implicit graph)
def grid_to_graph(grid):
    """Convert 2D grid to explicit graph."""
    rows, cols = len(grid), len(grid[0])
    graph = {}
    
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != '#':
                graph[(r, c)] = []
                for dr, dc in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < rows and 0 <= nc < cols:
                        if grid[nr][nc] != '#':
                            graph[(r, c)].append((nr, nc))
    
    return graph
```

---

## Key Takeaways

1. **Adjacency List** is the default choice for most algorithms
2. **Adjacency Matrix** for dense graphs or frequent edge lookups
3. **Edge List** for edge-centric algorithms (Kruskal's)
4. **Grid problems** often use implicit representation
5. Consider **memory vs speed** tradeoffs based on graph density
