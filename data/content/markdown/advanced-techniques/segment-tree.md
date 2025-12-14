# Segment Tree

A Segment Tree is a binary tree used for storing intervals or segments. It allows efficient range queries and point updates in O(log n).

## When to Use

- Range sum queries
- Range minimum/maximum queries
- Range updates
- Need both queries and updates to be fast

## Implementation

### Build Tree - O(n)

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)  # 4n is safe upper bound
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2*node + 1, start, mid)
            self.build(arr, 2*node + 2, mid + 1, end)
            self.tree[node] = self.tree[2*node + 1] + self.tree[2*node + 2]
```

### Point Update - O(log n)

```python
def update(self, node, start, end, idx, val):
    if start == end:
        self.tree[node] = val
    else:
        mid = (start + end) // 2
        if idx <= mid:
            self.update(2*node + 1, start, mid, idx, val)
        else:
            self.update(2*node + 2, mid + 1, end, idx, val)
        self.tree[node] = self.tree[2*node + 1] + self.tree[2*node + 2]
```

### Range Query - O(log n)

```python
def query(self, node, start, end, l, r):
    if r < start or end < l:
        return 0  # Out of range
    if l <= start and end <= r:
        return self.tree[node]  # Completely inside
    
    mid = (start + end) // 2
    left_sum = self.query(2*node + 1, start, mid, l, r)
    right_sum = self.query(2*node + 2, mid + 1, end, l, r)
    return left_sum + right_sum
```

## Complete Implementation

```python
class SegmentTree:
    def __init__(self, arr):
        self.n = len(arr)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        if start == end:
            self.tree[node] = arr[start]
        else:
            mid = (start + end) // 2
            self.build(arr, 2*node + 1, start, mid)
            self.build(arr, 2*node + 2, mid + 1, end)
            self.tree[node] = self.tree[2*node + 1] + self.tree[2*node + 2]
    
    def update(self, idx, val):
        self._update(0, 0, self.n - 1, idx, val)
    
    def _update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self._update(2*node + 1, start, mid, idx, val)
            else:
                self._update(2*node + 2, mid + 1, end, idx, val)
            self.tree[node] = self.tree[2*node + 1] + self.tree[2*node + 2]
    
    def range_sum(self, l, r):
        return self._query(0, 0, self.n - 1, l, r)
    
    def _query(self, node, start, end, l, r):
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return self._query(2*node + 1, start, mid, l, r) + \
               self._query(2*node + 2, mid + 1, end, l, r)
```

## Time Complexity

| Operation | Time |
|-----------|------|
| Build     | O(n) |
| Update    | O(log n) |
| Query     | O(log n) |
