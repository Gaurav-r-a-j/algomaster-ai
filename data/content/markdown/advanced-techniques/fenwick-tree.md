# Fenwick Tree (Binary Indexed Tree)

A Fenwick Tree is a data structure that efficiently supports prefix sum queries and point updates. It's simpler and more memory-efficient than a Segment Tree.

## When to Use

- Prefix sum queries
- Point updates
- Cumulative frequency tables
- When you need O(log n) for both operations

## Key Insight

Uses binary representation to store partial sums. Each index stores the sum of a range determined by the lowest set bit.

## Implementation

```python
class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)  # 1-indexed
    
    def update(self, i, delta):
        """Add delta to index i (1-indexed)"""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add lowest set bit
    
    def prefix_sum(self, i):
        """Sum from 1 to i (inclusive)"""
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)  # Remove lowest set bit
        return total
    
    def range_sum(self, l, r):
        """Sum from l to r (inclusive, 1-indexed)"""
        return self.prefix_sum(r) - self.prefix_sum(l - 1)
```

## Building from Array

```python
def build_from_array(arr):
    n = len(arr)
    ft = FenwickTree(n)
    for i in range(n):
        ft.update(i + 1, arr[i])
    return ft

# Or more efficiently:
def build_efficient(arr):
    n = len(arr)
    tree = [0] * (n + 1)
    for i in range(1, n + 1):
        tree[i] += arr[i - 1]
        j = i + (i & (-i))
        if j <= n:
            tree[j] += tree[i]
    return tree
```

## Usage Example

```python
# Create tree with 10 elements
ft = FenwickTree(10)

# Update values
ft.update(1, 5)   # Add 5 to index 1
ft.update(3, 3)   # Add 3 to index 3
ft.update(5, 7)   # Add 7 to index 5

# Query prefix sums
print(ft.prefix_sum(3))   # Sum of indices 1-3
print(ft.range_sum(2, 5)) # Sum of indices 2-5
```

## Time & Space Complexity

| Operation | Time |
|-----------|------|
| Build     | O(n) |
| Update    | O(log n) |
| Query     | O(log n) |

**Space:** O(n)

## Fenwick Tree vs Segment Tree

| Feature | Fenwick Tree | Segment Tree |
|---------|--------------|--------------|
| Space | O(n) | O(4n) |
| Code complexity | Simpler | More complex |
| Range updates | Hard | Easy with lazy propagation |
| Flexibility | Limited | More versatile |
