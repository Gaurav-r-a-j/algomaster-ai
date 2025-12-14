import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum"

export const bst: Topic = {
  id: "bst",
  title: "Binary Search Tree",
  description:
    "Tree data structure where each node has at most two children, maintaining sorted order.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.BINARY_TREE,
  module: "4. Trees & Heaps",
  order: 16,
  difficulty: "Medium",
  content: `# Binary Search Tree (BST)

A Binary Search Tree is a binary tree where for each node:
- All values in the **left subtree** are **less than** the node's value
- All values in the **right subtree** are **greater than** the node's value
- Both left and right subtrees are also BSTs

## Properties

- **Ordered Structure:** Maintains sorted order
- **Efficient Search:** O(log n) average case
- **Dynamic:** Easy to insert and delete
- **In-order Traversal:** Gives sorted sequence

## Node Structure

\`\`\`python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
\`\`\`

## Operations

### Search
\`\`\`python
def search(root, target):
    if not root or root.val == target:
        return root
    
    if target < root.val:
        return search(root.left, target)
    else:
        return search(root.right, target)
\`\`\`

### Insert
\`\`\`python
def insert(root, val):
    if not root:
        return TreeNode(val)
    
    if val < root.val:
        root.left = insert(root.left, val)
    elif val > root.val:
        root.right = insert(root.right, val)
    
    return root
\`\`\`

### Delete
\`\`\`python
def delete(root, key):
    if not root:
        return root
    
    if key < root.val:
        root.left = delete(root.left, key)
    elif key > root.val:
        root.right = delete(root.right, key)
    else:
        # Node to delete found
        if not root.left:
            return root.right
        elif not root.right:
            return root.left
        
        # Node with two children: get inorder successor
        root.val = min_value(root.right)
        root.right = delete(root.right, root.val)
    
    return root

def min_value(node):
    while node.left:
        node = node.left
    return node.val
\`\`\`

## Traversals

### In-order (Gives Sorted Order)
\`\`\`python
def inorder(root):
    if root:
        inorder(root.left)
        print(root.val)
        inorder(root.right)
\`\`\`

### Pre-order
\`\`\`python
def preorder(root):
    if root:
        print(root.val)
        preorder(root.left)
        preorder(root.right)
\`\`\`

### Post-order
\`\`\`python
def postorder(root):
    if root:
        postorder(root.left)
        postorder(root.right)
        print(root.val)
\`\`\`

## Time Complexity

- **Search:** O(log n) average, O(n) worst (skewed tree)
- **Insert:** O(log n) average, O(n) worst
- **Delete:** O(log n) average, O(n) worst
- **Traversal:** O(n) - must visit all nodes

## Space Complexity

O(n) - Storage for n nodes.

## Advantages

- Fast search, insert, delete: O(log n) average
- Maintains sorted order
- Dynamic size
- Efficient range queries

## Disadvantages

- Worst case: O(n) if tree becomes skewed
- No guarantee of balance
- More complex than arrays for simple operations

## When to Use

- Need sorted data with fast operations
- Range queries
- Dynamic datasets
- When you need predecessor/successor operations

## Common Problems

- Validate BST
- Find kth smallest element
- Lowest Common Ancestor
- Convert sorted array to BST
`,
  quiz: [
    {
      id: 1,
      question: "What property must a Binary Search Tree maintain?",
      options: [
        "All nodes have exactly two children",
        "Left subtree < node < Right subtree",
        "All leaves are at the same level",
        "Tree is always balanced",
      ],
      correctAnswer: 1,
      explanation:
        "BST maintains the property that left subtree values are less and right subtree values are greater than the node.",
    },
  ],
  practiceLinks: [
    {
      title: "LeetCode: Validate Binary Search Tree",
      url: "https://leetcode.com/problems/validate-binary-search-tree/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Kth Smallest Element in BST",
      url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/",
      difficulty: "Medium",
    },
    {
      title: "GeeksforGeeks: Binary Search Tree",
      url: "https://www.geeksforgeeks.org/binary-search-tree-data-structure/",
      difficulty: "Medium",
    },
    {
      title: "LeetCode: Convert Sorted Array to BST",
      url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/",
      difficulty: "Easy",
    },
    {
      title: "LeetCode: Lowest Common Ancestor of BST",
      url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/",
      difficulty: "Easy",
    },
  ],
}
