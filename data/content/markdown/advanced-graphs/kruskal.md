# Kruskal's Algorithm

Kruskal's algorithm finds the Minimum Spanning Tree (MST) of a connected, undirected, weighted graph. It uses a greedy approach.

## What is MST?

A Minimum Spanning Tree connects all vertices with the minimum total edge weight, using exactly V-1 edges.

## How It Works

1. Sort all edges by weight
2. For each edge (in order):
   - If adding it doesn't create a cycle, include it
   - Use Union-Find to detect cycles
3. Stop when we have V-1 edges

## Implementation

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        return True

def kruskal(n, edges):
    # edges: list of (weight, u, v)
    edges.sort()  # Sort by weight
    
    uf = UnionFind(n)
    mst = []
    total_weight = 0
    
    for weight, u, v in edges:
        if uf.union(u, v):
            mst.append((u, v, weight))
            total_weight += weight
            
            if len(mst) == n - 1:
                break
    
    return mst, total_weight
```

## Time Complexity

- **Sorting:** O(E log E)
- **Union-Find:** O(E × α(V)) ≈ O(E)
- **Total:** O(E log E)

## Comparison with Prim's

| Feature      | Kruskal's      | Prim's         |
|--------------|----------------|----------------|
| Approach     | Edge-based     | Vertex-based   |
| Best for     | Sparse graphs  | Dense graphs   |
| Complexity   | O(E log E)     | O(E log V)     |

## Applications

- Network design (minimum cable length)
- Cluster analysis
- Image segmentation
