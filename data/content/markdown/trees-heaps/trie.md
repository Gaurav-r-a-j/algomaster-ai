# Trie (Prefix Tree)

A Trie is a tree-like data structure used to store strings, particularly useful for efficient prefix-based searches.

## Structure

```python
class TrieNode:
    def __init__(self):
        self.children = {}  # char -> TrieNode
        self.is_end = False  # marks end of word
```

## Operations

### Insert - O(m) where m is word length

```python
class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
```

### Search - O(m)

```python
def search(self, word):
    node = self.root
    for char in word:
        if char not in node.children:
            return False
        node = node.children[char]
    return node.is_end
```

### Starts With (Prefix Search) - O(m)

```python
def starts_with(self, prefix):
    node = self.root
    for char in prefix:
        if char not in node.children:
            return False
        node = node.children[char]
    return True
```

## Complete Implementation

```python
class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True
    
    def search(self, word):
        node = self._find_node(word)
        return node is not None and node.is_end
    
    def starts_with(self, prefix):
        return self._find_node(prefix) is not None
    
    def _find_node(self, prefix):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
```

## Time Complexity

| Operation    | Time |
|-------------|------|
| Insert      | O(m) |
| Search      | O(m) |
| Prefix      | O(m) |

Where m is the length of the word/prefix.

## Applications

- Autocomplete systems
- Spell checkers
- IP routing tables
- Word games (Boggle, Scrabble)
- Dictionary implementations
