# Heaps

A **Heap** is a specialized tree-based data structure that satisfies the heap property. It's commonly used to implement priority queues and is the backbone of heap sort.

## Key Concepts

### What is a Heap?

A heap is a **complete binary tree** where:
- All levels are completely filled except possibly the last level
- The last level has nodes as far left as possible
- Each node satisfies the **heap property**

### Types of Heaps

| Type | Property | Root Contains |
|------|----------|---------------|
| **Max Heap** | Parent ≥ Children | Maximum element |
| **Min Heap** | Parent ≤ Children | Minimum element |

## Array Representation

Heaps are typically stored as arrays for efficiency (no pointers needed):

```
For a node at index i:
├── Parent:      (i - 1) / 2
├── Left Child:  2 * i + 1
└── Right Child: 2 * i + 2
```

**Visual Example:**
```
        50          Index: 0
       /  \
      30   40       Index: 1, 2
     /  \
    10  20          Index: 3, 4

Array: [50, 30, 40, 10, 20]
```

---

## Implementation

### Python

```python
class MaxHeap:
    def __init__(self):
        self.heap = []
    
    def parent(self, i):
        return (i - 1) // 2
    
    def left_child(self, i):
        return 2 * i + 1
    
    def right_child(self, i):
        return 2 * i + 2
    
    def swap(self, i, j):
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]
    
    def insert(self, val):
        """Insert a new value - O(log n)"""
        self.heap.append(val)
        self._bubble_up(len(self.heap) - 1)
    
    def _bubble_up(self, i):
        """Move element up to maintain heap property"""
        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:
            self.swap(i, self.parent(i))
            i = self.parent(i)
    
    def extract_max(self):
        """Remove and return the maximum element - O(log n)"""
        if not self.heap:
            return None
        
        max_val = self.heap[0]
        self.heap[0] = self.heap[-1]
        self.heap.pop()
        
        if self.heap:
            self._bubble_down(0)
        
        return max_val
    
    def _bubble_down(self, i):
        """Move element down to maintain heap property"""
        n = len(self.heap)
        largest = i
        left = self.left_child(i)
        right = self.right_child(i)
        
        if left < n and self.heap[left] > self.heap[largest]:
            largest = left
        if right < n and self.heap[right] > self.heap[largest]:
            largest = right
        
        if largest != i:
            self.swap(i, largest)
            self._bubble_down(largest)
    
    def peek(self):
        """Return max without removing - O(1)"""
        return self.heap[0] if self.heap else None
    
    def size(self):
        return len(self.heap)

# Usage
heap = MaxHeap()
for val in [10, 30, 20, 15, 40]:
    heap.insert(val)

print(heap.extract_max())  # 40
print(heap.extract_max())  # 30
```

### JavaScript

```javascript
class MaxHeap {
    constructor() {
        this.heap = [];
    }
    
    parent(i) { return Math.floor((i - 1) / 2); }
    leftChild(i) { return 2 * i + 1; }
    rightChild(i) { return 2 * i + 2; }
    
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }
    
    insert(val) {
        this.heap.push(val);
        this.bubbleUp(this.heap.length - 1);
    }
    
    bubbleUp(i) {
        while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {
            this.swap(i, this.parent(i));
            i = this.parent(i);
        }
    }
    
    extractMax() {
        if (this.heap.length === 0) return null;
        
        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        
        if (this.heap.length > 0) {
            this.bubbleDown(0);
        }
        
        return max;
    }
    
    bubbleDown(i) {
        const n = this.heap.length;
        let largest = i;
        const left = this.leftChild(i);
        const right = this.rightChild(i);
        
        if (left < n && this.heap[left] > this.heap[largest]) {
            largest = left;
        }
        if (right < n && this.heap[right] > this.heap[largest]) {
            largest = right;
        }
        
        if (largest !== i) {
            this.swap(i, largest);
            this.bubbleDown(largest);
        }
    }
    
    peek() { return this.heap[0]; }
    size() { return this.heap.length; }
}

// Usage
const heap = new MaxHeap();
[10, 30, 20, 15, 40].forEach(v => heap.insert(v));
console.log(heap.extractMax()); // 40
```

### Java

```java
import java.util.ArrayList;

public class MaxHeap {
    private ArrayList<Integer> heap;
    
    public MaxHeap() {
        heap = new ArrayList<>();
    }
    
    private int parent(int i) { return (i - 1) / 2; }
    private int leftChild(int i) { return 2 * i + 1; }
    private int rightChild(int i) { return 2 * i + 2; }
    
    private void swap(int i, int j) {
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
    
    public void insert(int val) {
        heap.add(val);
        bubbleUp(heap.size() - 1);
    }
    
    private void bubbleUp(int i) {
        while (i > 0 && heap.get(parent(i)) < heap.get(i)) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    public Integer extractMax() {
        if (heap.isEmpty()) return null;
        
        int max = heap.get(0);
        heap.set(0, heap.get(heap.size() - 1));
        heap.remove(heap.size() - 1);
        
        if (!heap.isEmpty()) {
            bubbleDown(0);
        }
        
        return max;
    }
    
    private void bubbleDown(int i) {
        int n = heap.size();
        int largest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < n && heap.get(left) > heap.get(largest)) {
            largest = left;
        }
        if (right < n && heap.get(right) > heap.get(largest)) {
            largest = right;
        }
        
        if (largest != i) {
            swap(i, largest);
            bubbleDown(largest);
        }
    }
    
    public Integer peek() { 
        return heap.isEmpty() ? null : heap.get(0); 
    }
}
```

### C++

```cpp
#include <vector>
#include <stdexcept>

class MaxHeap {
private:
    std::vector<int> heap;
    
    int parent(int i) { return (i - 1) / 2; }
    int leftChild(int i) { return 2 * i + 1; }
    int rightChild(int i) { return 2 * i + 2; }
    
    void swap(int i, int j) {
        std::swap(heap[i], heap[j]);
    }
    
    void bubbleUp(int i) {
        while (i > 0 && heap[parent(i)] < heap[i]) {
            swap(i, parent(i));
            i = parent(i);
        }
    }
    
    void bubbleDown(int i) {
        int n = heap.size();
        int largest = i;
        int left = leftChild(i);
        int right = rightChild(i);
        
        if (left < n && heap[left] > heap[largest]) {
            largest = left;
        }
        if (right < n && heap[right] > heap[largest]) {
            largest = right;
        }
        
        if (largest != i) {
            swap(i, largest);
            bubbleDown(largest);
        }
    }

public:
    void insert(int val) {
        heap.push_back(val);
        bubbleUp(heap.size() - 1);
    }
    
    int extractMax() {
        if (heap.empty()) {
            throw std::runtime_error("Heap is empty");
        }
        
        int max = heap[0];
        heap[0] = heap.back();
        heap.pop_back();
        
        if (!heap.empty()) {
            bubbleDown(0);
        }
        
        return max;
    }
    
    int peek() { return heap[0]; }
    int size() { return heap.size(); }
    bool isEmpty() { return heap.empty(); }
};
```

---

## Using Built-in Libraries

### Python (heapq - Min Heap)

```python
import heapq

# Create a min heap
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 4)

# Pop minimum
min_val = heapq.heappop(heap)  # 1

# Heapify an existing list
arr = [3, 1, 4, 1, 5, 9]
heapq.heapify(arr)  # O(n)

# Get k smallest elements
k_smallest = heapq.nsmallest(3, arr)

# Get k largest elements
k_largest = heapq.nlargest(3, arr)

# For Max Heap, negate values
max_heap = []
heapq.heappush(max_heap, -5)  # Push -5
max_val = -heapq.heappop(max_heap)  # Pop and negate: 5
```

### JavaScript (Custom or use libraries like `heap-js`)

```javascript
// Using a simple priority queue pattern
class PriorityQueue {
    constructor(compareFn = (a, b) => a - b) {
        this.heap = [];
        this.compare = compareFn;
    }
    
    enqueue(val) {
        this.heap.push(val);
        this.heap.sort(this.compare);
    }
    
    dequeue() {
        return this.heap.shift();
    }
    
    peek() { return this.heap[0]; }
    isEmpty() { return this.heap.length === 0; }
}

// Usage (min heap behavior)
const pq = new PriorityQueue();
pq.enqueue(5);
pq.enqueue(2);
pq.enqueue(8);
console.log(pq.dequeue()); // 2
```

### Java (PriorityQueue)

```java
import java.util.PriorityQueue;
import java.util.Collections;

// Min Heap (default)
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.offer(5);
minHeap.offer(2);
minHeap.offer(8);
System.out.println(minHeap.poll()); // 2

// Max Heap
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
maxHeap.offer(5);
maxHeap.offer(2);
maxHeap.offer(8);
System.out.println(maxHeap.poll()); // 8
```

### C++ (priority_queue)

```cpp
#include <queue>
#include <vector>

// Max Heap (default)
std::priority_queue<int> maxHeap;
maxHeap.push(5);
maxHeap.push(2);
maxHeap.push(8);
std::cout << maxHeap.top() << std::endl; // 8
maxHeap.pop();

// Min Heap
std::priority_queue<int, std::vector<int>, std::greater<int>> minHeap;
minHeap.push(5);
minHeap.push(2);
minHeap.push(8);
std::cout << minHeap.top() << std::endl; // 2
```

---

## Time & Space Complexity

| Operation | Time Complexity | Description |
|-----------|-----------------|-------------|
| Insert | O(log n) | Bubble up at most log n levels |
| Extract Max/Min | O(log n) | Bubble down at most log n levels |
| Peek (Get Max/Min) | O(1) | Direct access to root |
| Build Heap | O(n) | More efficient than n insertions |
| Heapify | O(log n) | Restore heap property |

**Space Complexity:** O(n) for storing n elements

---

## Common Interview Problems

### 1. Kth Largest Element

```python
import heapq

def findKthLargest(nums, k):
    # Use min heap of size k
    heap = nums[:k]
    heapq.heapify(heap)
    
    for num in nums[k:]:
        if num > heap[0]:
            heapq.heapreplace(heap, num)
    
    return heap[0]

# Time: O(n log k), Space: O(k)
```

### 2. Merge K Sorted Lists

```python
import heapq

def mergeKLists(lists):
    heap = []
    
    # Add first element from each list
    for i, lst in enumerate(lists):
        if lst:
            heapq.heappush(heap, (lst[0], i, 0))
    
    result = []
    while heap:
        val, list_idx, elem_idx = heapq.heappop(heap)
        result.append(val)
        
        if elem_idx + 1 < len(lists[list_idx]):
            next_val = lists[list_idx][elem_idx + 1]
            heapq.heappush(heap, (next_val, list_idx, elem_idx + 1))
    
    return result
```

### 3. Top K Frequent Elements

```python
import heapq
from collections import Counter

def topKFrequent(nums, k):
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)
```

---

## Applications

| Application | Why Heap? |
|-------------|-----------|
| **Priority Queues** | Efficient max/min extraction |
| **Heap Sort** | O(n log n) in-place sorting |
| **Dijkstra's Algorithm** | Extract minimum distance vertex |
| **Huffman Coding** | Build optimal prefix codes |
| **Median Finding** | Two heaps approach |
| **Task Scheduling** | Priority-based execution |

---

## Key Takeaways

1. **Heap = Complete Binary Tree + Heap Property**
2. **Array representation** is efficient (no pointers)
3. **Build heap is O(n)**, not O(n log n)
4. **Use built-in libraries** in production code
5. For **max heap in Python**, negate values when using `heapq`
