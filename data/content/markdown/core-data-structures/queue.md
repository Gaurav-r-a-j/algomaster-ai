# Queue

A Queue follows the **First-In, First-Out (FIFO)** principle. Think of a checkout line at a grocery store: the first person to get in line is the first person to be served.

## Core Operations (All O(1))

- **Enqueue:** Adds an element to the back (rear) of the queue
- **Dequeue:** Removes and returns the element from the front of the queue
- **Front/Peek:** Looks at the front element without removing it
- **isEmpty:** Checks if the queue is empty
- **Size:** Returns the number of elements

## Implementation

```python
from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()
    
    def enqueue(self, item):
        self.items.append(item)
    
    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue is empty")
        return self.items.popleft()
    
    def front(self):
        if self.is_empty():
            return None
        return self.items[0]
    
    def is_empty(self):
        return len(self.items) == 0
    
    def size(self):
        return len(self.items)
```

## Types of Queues

### 1. Simple Queue
Standard FIFO queue as described above.

### 2. Circular Queue
The last element is connected to the first, making efficient use of space.

### 3. Priority Queue
Elements are dequeued based on priority, not insertion order.

### 4. Double-Ended Queue (Deque)
Allows insertion and deletion from both ends.

## Common Uses

1. **Task Scheduling:** Managing tasks in operating systems
2. **Buffering:** Handling data streams in networking
3. **Graph Traversal:** BFS algorithm uses a queue
4. **Level-Order Traversal:** Processing tree nodes level by level
5. **Request Handling:** Managing requests in web servers

## Example: BFS Traversal

```python
def bfs(graph, start):
    queue = [start]
    visited = {start}
    result = []
    
    while queue:
        node = queue.pop(0)
        result.append(node)
        
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result
```

## Practice Problems

- Level order traversal of binary tree
- Sliding window maximum
- Design circular queue
- First non-repeating character in stream
