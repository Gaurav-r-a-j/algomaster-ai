# Union-Find (Disjoint Set Union)

Union-Find is a data structure that tracks elements partitioned into disjoint sets. It supports two operations efficiently: **Find** (which set an element belongs to) and **Union** (merge two sets).

## Basic Implementation

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
    
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py:
            return False  # Already in same set
        
        # Union by rank
        if self.rank[px] < self.rank[py]:
            px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]:
            self.rank[px] += 1
        
        return True
    
    def connected(self, x, y):
        return self.find(x) == self.find(y)
```

## Optimizations

### Path Compression
Makes find() faster by pointing all nodes directly to root.

```python
def find(self, x):
    if self.parent[x] != x:
        self.parent[x] = self.find(self.parent[x])
    return self.parent[x]
```

### Union by Rank/Size
Attaches smaller tree under larger tree to keep tree flat.

## Time Complexity

With both optimizations:
- **Find:** O(α(n)) ≈ O(1) amortized
- **Union:** O(α(n)) ≈ O(1) amortized

Where α is the inverse Ackermann function (practically constant).

## Applications

- Kruskal's MST algorithm
- Detecting cycles in graphs
- Connected components
- Network connectivity
- Image processing (connected regions)

## Example: Connected Components

```python
def count_components(n, edges):
    uf = UnionFind(n)
    for u, v in edges:
        uf.union(u, v)
    
    # Count unique roots
    return len(set(uf.find(i) for i in range(n)))
```
