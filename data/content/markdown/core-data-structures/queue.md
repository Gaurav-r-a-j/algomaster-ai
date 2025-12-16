# Queue

A **Queue** is a linear data structure that follows the **First-In, First-Out (FIFO)** principle. Think of a line at a coffee shop: first person in line is served first.

## Visual Representation

```
    Enqueue (add)                     Dequeue (remove)
         ↓                                  ↓
┌────┬────┬────┬────┬────┐
│ 50 │ 40 │ 30 │ 20 │ 10 │
└────┴────┴────┴────┴────┘
  ↑                    ↑
 Rear               Front
 (Back)             (Front)

Enqueue(60):                    Dequeue():
┌────┬────┬────┬────┬────┬────┐    ┌────┬────┬────┬────┐
│ 60 │ 50 │ 40 │ 30 │ 20 │ 10 │    │ 50 │ 40 │ 30 │ 20 │
└────┴────┴────┴────┴────┴────┘    └────┴────┴────┴────┘
                                   Returns: 10
```

---

## Core Operations

| Operation | Description | Time |
|-----------|-------------|------|
| `enqueue(x)` | Add element to rear | O(1) |
| `dequeue()` | Remove element from front | O(1) |
| `front()` / `peek()` | View front element | O(1) |
| `isEmpty()` | Check if queue is empty | O(1) |
| `size()` | Get number of elements | O(1) |

---

## Implementation

### Python

```python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        """Add item to rear - O(1)"""
        self.items.append(item)
    
    def dequeue(self):
        """Remove and return front item - O(1)"""
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self.items.popleft()
    
    def front(self):
        """Return front item without removing - O(1)"""
        if self.is_empty():
            raise IndexError("Front from empty queue")
        return self.items[0]
    
    def is_empty(self):
        """Check if queue is empty - O(1)"""
        return len(self.items) == 0
    
    def size(self):
        """Return number of items - O(1)"""
        return len(self.items)
    
    def __str__(self):
        return f"Queue({list(self.items)})"

# Usage
q = Queue()
q.enqueue(1)
q.enqueue(2)
q.enqueue(3)
print(q.front())    # 1
print(q.dequeue())  # 1
print(q.size())     # 2

# Using deque directly (recommended)
from collections import deque
queue = deque()
queue.append(1)     # enqueue
queue.popleft()     # dequeue
```

### JavaScript

```javascript
class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0;
    }
    
    enqueue(item) {
        this.items.push(item);
    }
    
    dequeue() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        const item = this.items[this.frontIndex];
        this.frontIndex++;
        
        // Clean up when half the array is empty
        if (this.frontIndex > this.items.length / 2) {
            this.items = this.items.slice(this.frontIndex);
            this.frontIndex = 0;
        }
        return item;
    }
    
    front() {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[this.frontIndex];
    }
    
    isEmpty() {
        return this.frontIndex >= this.items.length;
    }
    
    size() {
        return this.items.length - this.frontIndex;
    }
}

// Usage
const queue = new Queue();
queue.enqueue(1);
queue.enqueue(2);
console.log(queue.dequeue()); // 1
```

### Java

```java
import java.util.LinkedList;
import java.util.Queue;

// Using built-in Queue interface
Queue<Integer> queue = new LinkedList<>();
queue.offer(1);      // enqueue (returns false if fails)
queue.add(1);        // enqueue (throws exception if fails)
queue.poll();        // dequeue (returns null if empty)
queue.remove();      // dequeue (throws exception if empty)
queue.peek();        // front (returns null if empty)
queue.isEmpty();     // check empty
queue.size();        // get size

// ArrayDeque (faster than LinkedList)
Queue<Integer> queue = new ArrayDeque<>();
queue.offer(1);
queue.poll();
```

### C++

```cpp
#include <queue>

// Using STL queue
std::queue<int> q;
q.push(1);        // enqueue
q.push(2);
q.front();        // peek front (returns 1)
q.back();         // peek back (returns 2)
q.pop();          // dequeue (doesn't return)
q.empty();        // check empty
q.size();         // get size
```

---

## Types of Queues

### 1. Simple Queue (Linear Queue)

Standard FIFO queue as described above.

### 2. Circular Queue

```python
class CircularQueue:
    def __init__(self, capacity):
        self.capacity = capacity
        self.queue = [None] * capacity
        self.front = 0
        self.rear = -1
        self.size = 0
    
    def enqueue(self, item):
        if self.is_full():
            raise IndexError("Queue is full")
        self.rear = (self.rear + 1) % self.capacity
        self.queue[self.rear] = item
        self.size += 1
    
    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        item = self.queue[self.front]
        self.front = (self.front + 1) % self.capacity
        self.size -= 1
        return item
    
    def is_empty(self):
        return self.size == 0
    
    def is_full(self):
        return self.size == self.capacity
```

### 3. Priority Queue

Elements are dequeued by priority, not order.

```python
import heapq

# Min-heap (smallest first)
pq = []
heapq.heappush(pq, 3)
heapq.heappush(pq, 1)
heapq.heappush(pq, 2)
print(heapq.heappop(pq))  # 1 (smallest)

# Max-heap (use negative values)
max_pq = []
heapq.heappush(max_pq, -3)
heapq.heappush(max_pq, -1)
print(-heapq.heappop(max_pq))  # 3 (largest)
```

### 4. Double-Ended Queue (Deque)

Add/remove from both ends.

```python
from collections import deque

dq = deque()
dq.append(1)       # Add to right
dq.appendleft(0)   # Add to left
dq.pop()           # Remove from right
dq.popleft()       # Remove from left
```

---

## Common Problems & Solutions

### 1. Implement Queue using Stacks

```python
class MyQueue:
    def __init__(self):
        self.stack_in = []   # For enqueue
        self.stack_out = []  # For dequeue
    
    def push(self, x):
        self.stack_in.append(x)
    
    def pop(self):
        self._transfer()
        return self.stack_out.pop()
    
    def peek(self):
        self._transfer()
        return self.stack_out[-1]
    
    def empty(self):
        return not self.stack_in and not self.stack_out
    
    def _transfer(self):
        if not self.stack_out:
            while self.stack_in:
                self.stack_out.append(self.stack_in.pop())
```

### 2. Sliding Window Maximum

```python
from collections import deque

def max_sliding_window(nums, k):
    """
    Find max in each sliding window of size k.
    Input: [1,3,-1,-3,5,3,6,7], k=3
    Output: [3,3,5,5,6,7]
    """
    result = []
    dq = deque()  # Store indices
    
    for i in range(len(nums)):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements (they'll never be max)
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Add to result once window is full
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result
```

### 3. First Non-Repeating Character in Stream

```python
from collections import deque, Counter

def first_unique(stream):
    """
    Find first non-repeating character as stream flows.
    """
    queue = deque()
    count = Counter()
    result = []
    
    for char in stream:
        count[char] += 1
        queue.append(char)
        
        # Remove repeating chars from front
        while queue and count[queue[0]] > 1:
            queue.popleft()
        
        result.append(queue[0] if queue else '#')
    
    return result

# "aabcbc" → ['a', '#', 'b', 'b', 'c', '#']
```

### 4. Binary Tree Level Order Traversal (BFS)

```python
from collections import deque

def level_order(root):
    """
    Traverse tree level by level.
    """
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level = []
        level_size = len(queue)
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result
```

### 5. Rotten Oranges (Multi-source BFS)

```python
from collections import deque

def oranges_rotting(grid):
    """
    Time for all oranges to rot.
    0 = empty, 1 = fresh, 2 = rotten
    """
    rows, cols = len(grid), len(grid[0])
    queue = deque()
    fresh = 0
    
    # Find all rotten oranges and count fresh
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == 2:
                queue.append((r, c, 0))  # (row, col, time)
            elif grid[r][c] == 1:
                fresh += 1
    
    if fresh == 0:
        return 0
    
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    max_time = 0
    
    while queue:
        r, c, time = queue.popleft()
        max_time = max(max_time, time)
        
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and grid[nr][nc] == 1:
                grid[nr][nc] = 2
                fresh -= 1
                queue.append((nr, nc, time + 1))
    
    return max_time if fresh == 0 else -1
```

---

## Queue vs Stack

| Feature | Queue (FIFO) | Stack (LIFO) |
|---------|--------------|--------------|
| Add | Rear (enqueue) | Top (push) |
| Remove | Front (dequeue) | Top (pop) |
| Order | First in, first out | Last in, first out |
| Use Case | BFS, scheduling | DFS, backtracking |
| Example | Print queue | Undo history |

---

## Real-World Applications

| Application | How Queue is Used |
|-------------|-------------------|
| **Task Scheduling** | CPU process scheduling |
| **BFS Traversal** | Graph/tree level-order |
| **Message Queues** | RabbitMQ, Kafka |
| **Print Queue** | Managing print jobs |
| **Web Servers** | Request handling |
| **Buffering** | Video streaming, I/O |
| **Async Processing** | Background jobs |

---

## Key Takeaways

1. **FIFO** - First In, First Out
2. **All operations O(1)** - enqueue, dequeue, peek
3. **Use `deque`** in Python for O(1) popleft
4. **BFS** uses queue, **DFS** uses stack
5. **Priority Queue** = heap, not standard queue
6. **Circular Queue** = efficient fixed-size queue
