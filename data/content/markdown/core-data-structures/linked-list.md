# Linked Lists

Linked lists are dynamic data structures where elements are stored in nodes connected by pointers. Unlike arrays, nodes can be scattered anywhere in memory.

## How Linked Lists Work

Each node contains:
- **Data:** The actual value stored
- **Pointer/Reference:** A link to the next node (and previous node in doubly linked lists)

### Node Structure

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```

## Advantages

- **Dynamic Size:** Can grow or shrink as needed without pre-allocation
- **Fast Insertion/Deletion:** O(1) if you have a pointer to the location
- **No Memory Waste:** Only allocates memory for elements that exist

## Disadvantages

- **Slow Access:** O(n) to access an element by index - must traverse from head
- **Extra Memory:** Each node requires memory for the pointer
- **No Random Access:** Cannot directly access the nth element

## Types of Linked Lists

### 1. Singly Linked List
Each node points only to the next node. Traversal is one-way.

```python
# Structure: Node1 -> Node2 -> Node3 -> None
```

### 2. Doubly Linked List
Each node points to both next and previous nodes. Allows bidirectional traversal.

```python
class DoublyListNode:
    def __init__(self, val=0, next=None, prev=None):
        self.val = val
        self.next = next
        self.prev = prev
```

### 3. Circular Linked List
The last node points back to the head, forming a circle.

## Common Operations

```python
# Insertion at head (O(1))
def insert_at_head(head, val):
    new_node = ListNode(val)
    new_node.next = head
    return new_node

# Insertion at tail (O(n))
def insert_at_tail(head, val):
    if not head:
        return ListNode(val)
    current = head
    while current.next:
        current = current.next
    current.next = ListNode(val)
    return head

# Deletion (O(n) to find, O(1) to delete)
def delete_node(head, val):
    if not head:
        return None
    if head.val == val:
        return head.next
    current = head
    while current.next:
        if current.next.val == val:
            current.next = current.next.next
            break
        current = current.next
    return head
```

## Common Patterns

1. **Two Pointers:** Fast and slow pointers for cycle detection
2. **Dummy Head:** Simplify edge cases
3. **Reverse:** Reverse a linked list in-place

## Practice Problems

- Reverse a linked list
- Detect cycle in linked list
- Merge two sorted linked lists
- Remove nth node from end
