# Binary Search Tree (BST)

A Binary Search Tree is a node-based binary tree data structure where each node has at most two children, and for each node: all values in the left subtree are smaller, and all values in the right subtree are larger.

## Properties

- **Left subtree** of a node contains only nodes with keys lesser than the node's key
- **Right subtree** of a node contains only nodes with keys greater than the node's key
- Both the left and right subtrees must also be binary search trees

## Node Structure

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
```

## Operations

### Search - O(log n) average, O(n) worst

```python
def search(root, val):
    if not root or root.val == val:
        return root
    if val < root.val:
        return search(root.left, val)
    return search(root.right, val)
```

### Insert - O(log n) average, O(n) worst

```python
def insert(root, val):
    if not root:
        return TreeNode(val)
    if val < root.val:
        root.left = insert(root.left, val)
    else:
        root.right = insert(root.right, val)
    return root
```

### Delete - O(log n) average, O(n) worst

```python
def delete(root, val):
    if not root:
        return None

    if val < root.val:
        root.left = delete(root.left, val)
    elif val > root.val:
        root.right = delete(root.right, val)
    else:
        # Node to delete found
        if not root.left:
            return root.right
        if not root.right:
            return root.left

        # Node has two children: find inorder successor
        successor = root.right
        while successor.left:
            successor = successor.left
        root.val = successor.val
        root.right = delete(root.right, successor.val)

    return root
```

## Traversals

### Inorder (Left, Root, Right) - Sorted Order

```python
def inorder(root):
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)
```

### Preorder (Root, Left, Right)

```python
def preorder(root):
    if root:
        print(root.val)
        preorder(root.left)
        preorder(root.right)
```

### Postorder (Left, Right, Root)

```python
def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val)
```

## Time Complexity

| Operation | Average  | Worst Case |
| --------- | -------- | ---------- |
| Search    | O(log n) | O(n)       |
| Insert    | O(log n) | O(n)       |
| Delete    | O(log n) | O(n)       |

**Note:** Worst case occurs with skewed trees (degenerates to linked list).

## Common Problems

- Validate BST
- Find kth smallest element
- Lowest common ancestor
- Convert BST to sorted linked list
