import { AlgorithmType, Topic, VisualizerType } from "@/types/curriculum";

export const avlTree: Topic = {
  id: "avl-tree",
  title: "AVL Tree",
  description: "Self-balancing binary search tree that maintains O(log n) height through rotations.",
  category: AlgorithmType.DATA_STRUCTURE,
  complexity: { time: "O(log n)", space: "O(n)" },
  visualizerType: VisualizerType.AVL_TREE,
  module: "4. Trees & Heaps",
  order: 18,
  difficulty: "Hard",
  content: `# AVL Tree

An AVL Tree is a self-balancing binary search tree where the difference between heights of left and right subtrees cannot be more than one for all nodes.

## Properties

- **Balanced:** Height difference ≤ 1 for all nodes
- **Self-balancing:** Automatically maintains balance
- **Guaranteed O(log n):** All operations are O(log n)
- **Height:** Always O(log n)

## Balance Factor

Balance Factor = Height(Left Subtree) - Height(Right Subtree)

Valid values: -1, 0, or 1

## Rotations

When balance factor becomes ±2, we need rotations:

### Left Rotation
\`\`\`python
def left_rotate(node):
    new_root = node.right
    node.right = new_root.left
    new_root.left = node
    update_height(node)
    update_height(new_root)
    return new_root
\`\`\`

### Right Rotation
\`\`\`python
def right_rotate(node):
    new_root = node.left
    node.left = new_root.right
    new_root.right = node
    update_height(node)
    update_height(new_root)
    return new_root
\`\`\`

### Left-Right Rotation (LR)
1. Left rotate left child
2. Right rotate current node

### Right-Left Rotation (RL)
1. Right rotate right child
2. Left rotate current node

## Insertion

\`\`\`python
def insert(root, key):
    # Standard BST insert
    if not root:
        return Node(key)
    
    if key < root.val:
        root.left = insert(root.left, key)
    else:
        root.right = insert(root.right, key)
    
    # Update height
    root.height = 1 + max(get_height(root.left), get_height(root.right))
    
    # Get balance factor
    balance = get_balance(root)
    
    # Left Left Case
    if balance > 1 and key < root.left.val:
        return right_rotate(root)
    
    # Right Right Case
    if balance < -1 and key > root.right.val:
        return left_rotate(root)
    
    # Left Right Case
    if balance > 1 and key > root.left.val:
        root.left = left_rotate(root.left)
        return right_rotate(root)
    
    # Right Left Case
    if balance < -1 and key < root.right.val:
        root.right = right_rotate(root.right)
        return left_rotate(root)
    
    return root
\`\`\`

## Time Complexity

- **Search:** O(log n) - guaranteed
- **Insert:** O(log n) - with rotations
- **Delete:** O(log n) - with rotations
- **All operations:** O(log n) worst case

## Space Complexity

O(n) - Storage for n nodes.

## Advantages

- Guaranteed O(log n) for all operations
- Better worst-case performance than BST
- Self-balancing
- Predictable performance

## Disadvantages

- More complex than BST
- Overhead of maintaining balance
- More rotations during insert/delete
- Slightly slower than BST in practice

## When to Use

- Need guaranteed O(log n) performance
- Frequent insertions/deletions
- When worst-case matters
- Priority queues with dynamic data

## Comparison with BST

- **BST:** O(log n) average, O(n) worst case
- **AVL:** O(log n) guaranteed worst case
- **AVL:** More complex, always balanced
`,
  quiz: [
    {
      id: 1,
      question: "What is the maximum allowed balance factor in an AVL tree?",
      options: ["0", "1", "2", "3"],
      correctAnswer: 1,
      explanation: "AVL trees allow balance factors of -1, 0, or 1. If it becomes ±2, rotations are needed.",
    },
  ],
  practiceLinks: [
    {
      title: "GeeksforGeeks: AVL Tree",
      url: "https://www.geeksforgeeks.org/avl-tree-set-1-insertion/",
      difficulty: "Hard",
    },
    {
      title: "LeetCode: Balance a Binary Search Tree",
      url: "https://leetcode.com/problems/balance-a-binary-search-tree/",
      difficulty: "Medium",
    },
  ],
};
