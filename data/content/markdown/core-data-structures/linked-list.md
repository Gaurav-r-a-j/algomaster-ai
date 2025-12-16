# Linked List

A **Linked List** is a linear data structure where elements are stored in nodes, and each node points to the next node in the sequence. Unlike arrays, elements are not stored in contiguous memory.

## Visual Representation

### Singly Linked List

```
HEAD → [1|→] → [2|→] → [3|→] → [4|→] → NULL
        ↑        ↑        ↑        ↑
      data    data     data     data
       +       +        +        +
      next    next     next     next
```

### Doubly Linked List

```
NULL ← [←|1|→] ⟺ [←|2|→] ⟺ [←|3|→] → NULL
          ↑          ↑          ↑
        prev       prev       prev
        data       data       data
        next       next       next
```

---

## Time Complexity

| Operation | Array | Linked List |
|-----------|-------|-------------|
| Access by index | O(1) | O(n) |
| Insert at beginning | O(n) | **O(1)** |
| Insert at end | O(1)* | O(n) or O(1)** |
| Insert at middle | O(n) | **O(1)*** |
| Delete at beginning | O(n) | **O(1)** |
| Search | O(n) | O(n) |

*Amortized, **With tail pointer, ***If you have reference to previous node

---

## Implementation

### Python - Singly Linked List

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0
    
    def insert_at_head(self, val):
        """Insert at beginning - O(1)"""
        new_node = ListNode(val)
        new_node.next = self.head
        self.head = new_node
        self.size += 1
    
    def insert_at_tail(self, val):
        """Insert at end - O(n)"""
        new_node = ListNode(val)
        if not self.head:
            self.head = new_node
        else:
            current = self.head
            while current.next:
                current = current.next
            current.next = new_node
        self.size += 1
    
    def insert_at_index(self, index, val):
        """Insert at specific index - O(n)"""
        if index < 0 or index > self.size:
            raise IndexError("Index out of bounds")
        
        if index == 0:
            self.insert_at_head(val)
            return
        
        new_node = ListNode(val)
        current = self.head
        for _ in range(index - 1):
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1
    
    def delete_at_head(self):
        """Delete first element - O(1)"""
        if not self.head:
            raise IndexError("List is empty")
        
        val = self.head.val
        self.head = self.head.next
        self.size -= 1
        return val
    
    def delete_at_index(self, index):
        """Delete at specific index - O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        
        if index == 0:
            return self.delete_at_head()
        
        current = self.head
        for _ in range(index - 1):
            current = current.next
        
        val = current.next.val
        current.next = current.next.next
        self.size -= 1
        return val
    
    def search(self, val):
        """Find index of value - O(n)"""
        current = self.head
        index = 0
        while current:
            if current.val == val:
                return index
            current = current.next
            index += 1
        return -1
    
    def get(self, index):
        """Get value at index - O(n)"""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        
        current = self.head
        for _ in range(index):
            current = current.next
        return current.val
    
    def to_list(self):
        """Convert to Python list - O(n)"""
        result = []
        current = self.head
        while current:
            result.append(current.val)
            current = current.next
        return result
    
    def __str__(self):
        return " -> ".join(map(str, self.to_list())) + " -> None"

# Usage
ll = LinkedList()
ll.insert_at_tail(1)
ll.insert_at_tail(2)
ll.insert_at_tail(3)
ll.insert_at_head(0)
print(ll)  # 0 -> 1 -> 2 -> 3 -> None
print(ll.search(2))  # 2
```

### JavaScript

```javascript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    insertAtHead(val) {
        const newNode = new ListNode(val, this.head);
        this.head = newNode;
        this.size++;
    }
    
    insertAtTail(val) {
        const newNode = new ListNode(val);
        if (!this.head) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }
    
    deleteAtHead() {
        if (!this.head) return null;
        const val = this.head.val;
        this.head = this.head.next;
        this.size--;
        return val;
    }
    
    search(val) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.val === val) return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }
    
    toString() {
        return this.toArray().join(' -> ') + ' -> null';
    }
}

// Usage
const ll = new LinkedList();
ll.insertAtTail(1);
ll.insertAtTail(2);
ll.insertAtHead(0);
console.log(ll.toString()); // 0 -> 1 -> 2 -> null
```

### Java

```java
public class LinkedList<T> {
    private class Node {
        T data;
        Node next;
        
        Node(T data) {
            this.data = data;
            this.next = null;
        }
    }
    
    private Node head;
    private int size;
    
    public LinkedList() {
        head = null;
        size = 0;
    }
    
    public void insertAtHead(T data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        size++;
    }
    
    public void insertAtTail(T data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
        } else {
            Node current = head;
            while (current.next != null) {
                current = current.next;
            }
            current.next = newNode;
        }
        size++;
    }
    
    public T deleteAtHead() {
        if (head == null) {
            throw new RuntimeException("List is empty");
        }
        T data = head.data;
        head = head.next;
        size--;
        return data;
    }
    
    public int search(T data) {
        Node current = head;
        int index = 0;
        while (current != null) {
            if (current.data.equals(data)) return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    
    public int size() { return size; }
    public boolean isEmpty() { return size == 0; }
}
```

### C++

```cpp
template <typename T>
class LinkedList {
private:
    struct Node {
        T data;
        Node* next;
        Node(T val) : data(val), next(nullptr) {}
    };
    
    Node* head;
    int size;
    
public:
    LinkedList() : head(nullptr), size(0) {}
    
    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
    
    void insertAtHead(T data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
        size++;
    }
    
    void insertAtTail(T data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = newNode;
        } else {
            Node* current = head;
            while (current->next) {
                current = current->next;
            }
            current->next = newNode;
        }
        size++;
    }
    
    T deleteAtHead() {
        if (!head) throw std::runtime_error("List is empty");
        T data = head->data;
        Node* temp = head;
        head = head->next;
        delete temp;
        size--;
        return data;
    }
    
    int search(T data) {
        Node* current = head;
        int index = 0;
        while (current) {
            if (current->data == data) return index;
            current = current->next;
            index++;
        }
        return -1;
    }
    
    int getSize() { return size; }
    bool isEmpty() { return size == 0; }
};
```

---

## Common Problems & Solutions

### 1. Reverse a Linked List

```python
def reverse_list(head):
    """
    Reverse a singly linked list.
    1 -> 2 -> 3 -> None  becomes  3 -> 2 -> 1 -> None
    Time: O(n), Space: O(1)
    """
    prev = None
    current = head
    
    while current:
        next_node = current.next  # Save next
        current.next = prev       # Reverse link
        prev = current            # Move prev forward
        current = next_node       # Move current forward
    
    return prev  # New head

# Recursive version
def reverse_list_recursive(head):
    if not head or not head.next:
    return head

    new_head = reverse_list_recursive(head.next)
    head.next.next = head
    head.next = None
    
    return new_head
```

### 2. Detect Cycle (Floyd's Algorithm)

```python
def has_cycle(head):
    """
    Detect if linked list has a cycle.
    Time: O(n), Space: O(1)
    """
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        
        if slow == fast:
            return True
    
    return False

def find_cycle_start(head):
    """Find the node where cycle begins."""
    slow = fast = head
    
    # Detect cycle
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            break
    else:
        return None  # No cycle
    
    # Find cycle start
    slow = head
    while slow != fast:
        slow = slow.next
        fast = fast.next
    
    return slow
```

### 3. Find Middle Node

```python
def find_middle(head):
    """
    Find middle node using slow/fast pointers.
    Time: O(n), Space: O(1)
    """
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow  # Middle node

# For [1, 2, 3, 4, 5] returns node with value 3
# For [1, 2, 3, 4] returns node with value 3 (second middle)
```

### 4. Merge Two Sorted Lists

```python
def merge_two_lists(l1, l2):
    """
    Merge two sorted linked lists.
    Time: O(n + m), Space: O(1)
    """
    dummy = ListNode(0)
    current = dummy
    
    while l1 and l2:
        if l1.val <= l2.val:
            current.next = l1
            l1 = l1.next
        else:
            current.next = l2
            l2 = l2.next
        current = current.next
    
    current.next = l1 or l2
    return dummy.next
```

### 5. Remove Nth Node from End

```python
def remove_nth_from_end(head, n):
    """
    Remove nth node from end in one pass.
    Time: O(n), Space: O(1)
    """
    dummy = ListNode(0, head)
    slow = fast = dummy
    
    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next
    
    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next
    
    # Remove the nth node
    slow.next = slow.next.next
    
    return dummy.next
```

### 6. Palindrome Linked List

```python
def is_palindrome(head):
    """
    Check if linked list is palindrome.
    Time: O(n), Space: O(1)
    """
    # Find middle
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    # Reverse second half
    prev = None
    while slow:
        next_node = slow.next
        slow.next = prev
        prev = slow
        slow = next_node
    
    # Compare halves
    left, right = head, prev
    while right:
        if left.val != right.val:
            return False
        left = left.next
        right = right.next
    
    return True
```

---

## Linked List vs Array

| Feature | Linked List | Array |
|---------|-------------|-------|
| Memory | Non-contiguous | Contiguous |
| Size | Dynamic | Fixed (or resize) |
| Access | O(n) | O(1) |
| Insert/Delete at start | O(1) | O(n) |
| Cache performance | Poor | Excellent |
| Extra memory | Pointers overhead | None |

---

## When to Use Linked List

| Use Linked List | Use Array |
|-----------------|-----------|
| Frequent insertions/deletions at beginning | Random access needed |
| Unknown size, frequently changing | Fixed or rarely changing size |
| Implementing stacks/queues | Memory efficiency important |
| Don't need random access | Need cache performance |

---

## Key Takeaways

1. **Nodes + Pointers** - Elements stored separately, connected by references
2. **O(1) insert/delete at head** - Major advantage over arrays
3. **O(n) access** - Must traverse from head
4. **Two-pointer technique** - Powerful for many problems (slow/fast)
5. **Dummy node trick** - Simplifies edge cases
