# Heaps

A Heap is a complete binary tree that satisfies the heap property. It's commonly used to implement priority queues.

## Types of Heaps

### Max Heap
Parent is **greater than or equal to** its children. Root is the maximum element.

### Min Heap
Parent is **less than or equal to** its children. Root is the minimum element.

## Representation

Heaps are typically stored as arrays for efficiency:
- **Parent:** `(i - 1) // 2`
- **Left Child:** `2 * i + 1`
- **Right Child:** `2 * i + 2`

## Operations

### Heapify (Maintain Heap Property) - O(log n)

```python
def heapify(arr, n, i):
    largest = i
    left = 2 * i + 1
    right = 2 * i + 2
    
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)
```

### Insert - O(log n)

```python
def insert(heap, val):
    heap.append(val)
    i = len(heap) - 1
    
    # Bubble up
    while i > 0 and heap[(i-1)//2] < heap[i]:
        heap[(i-1)//2], heap[i] = heap[i], heap[(i-1)//2]
        i = (i - 1) // 2
```

### Extract Max/Min - O(log n)

```python
def extract_max(heap):
    if not heap:
        return None
    
    max_val = heap[0]
    heap[0] = heap[-1]
    heap.pop()
    heapify(heap, len(heap), 0)
    
    return max_val
```

### Build Heap - O(n)

```python
def build_heap(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
```

## Python's heapq (Min Heap)

```python
import heapq

# Create min heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)

# Pop minimum
min_val = heapq.heappop(heap)  # 1

# Heapify a list
arr = [3, 1, 4, 1, 5]
heapq.heapify(arr)
```

## Time Complexity

| Operation    | Time     |
|-------------|----------|
| Insert      | O(log n) |
| Extract     | O(log n) |
| Get Min/Max | O(1)     |
| Build Heap  | O(n)     |

## Applications

- Priority queues
- Heap sort
- Finding kth largest/smallest
- Dijkstra's algorithm
- Huffman coding
