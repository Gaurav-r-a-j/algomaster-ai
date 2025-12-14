/**
 * Algorithm logic utilities for generating visualization steps
 * Migrated from algomaster-ai with improvements
 */

import type { VisualizationStep } from "@/types/curriculum"

// --- Sorting Algorithms ---

export function generateBubbleSortSteps(
  initialArray: number[]
): VisualizationStep[] {
  const array = [...initialArray]
  const steps: VisualizationStep[] = []
  const n = array.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        activeIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, idx) => n - 1 - idx),
        description: `Comparing ${array[j]} and ${array[j + 1]}`,
      })

      if (array[j] > array[j + 1]) {
        ;[array[j], array[j + 1]] = [array[j + 1], array[j]]
        steps.push({
          array: [...array],
          activeIndices: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          description: `Swapped ${array[j + 1]} and ${array[j]}`,
        })
      }
    }
  }
  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    description: "Array is sorted!",
  })
  return steps
}

export function generateSelectionSortSteps(
  initialArray: number[]
): VisualizationStep[] {
  const array = [...initialArray]
  const steps: VisualizationStep[] = []
  const n = array.length

  for (let i = 0; i < n; i++) {
    let minIdx = i
    steps.push({
      array: [...array],
      activeIndices: [i],
      sortedIndices: Array.from({ length: i }, (_, idx) => idx),
      description: `Starting selection from index ${i}. Current min: ${array[i]}`,
    })

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...array],
        activeIndices: [i, j, minIdx],
        sortedIndices: Array.from({ length: i }, (_, idx) => idx),
        description: `Comparing min ${array[minIdx]} with ${array[j]}`,
      })
      if (array[j] < array[minIdx]) {
        minIdx = j
        steps.push({
          array: [...array],
          activeIndices: [i, j, minIdx],
          sortedIndices: Array.from({ length: i }, (_, idx) => idx),
          description: `Found new minimum: ${array[minIdx]}`,
        })
      }
    }
    if (minIdx !== i) {
      ;[array[i], array[minIdx]] = [array[minIdx], array[i]]
      steps.push({
        array: [...array],
        activeIndices: [i, minIdx],
        sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
        description: `Swapping ${array[i]} with ${array[minIdx]}`,
      })
    }
  }
  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    description: "Array is sorted!",
  })
  return steps
}

export function generateInsertionSortSteps(
  initialArray: number[]
): VisualizationStep[] {
  const array = [...initialArray]
  const steps: VisualizationStep[] = []
  const n = array.length

  for (let i = 1; i < n; i++) {
    const key = array[i]
    let j = i - 1

    steps.push({
      array: [...array],
      activeIndices: [i],
      sortedIndices: Array.from({ length: i }, (_, idx) => idx),
      description: `Selected key ${key} at index ${i}. Comparing with left side.`,
    })

    while (j >= 0 && array[j] > key) {
      steps.push({
        array: [...array],
        activeIndices: [j, j + 1],
        sortedIndices: [],
        description: `${array[j]} > ${key}. Shifting ${array[j]} to the right.`,
      })
      array[j + 1] = array[j]
      j = j - 1
      steps.push({
        array: [...array],
        activeIndices: [j + 1],
        sortedIndices: [],
        description: `Shift complete.`,
      })
    }
    array[j + 1] = key
    steps.push({
      array: [...array],
      activeIndices: [j + 1],
      sortedIndices: Array.from({ length: i + 1 }, (_, idx) => idx),
      description: `Inserted ${key} at position ${j + 1}.`,
    })
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: Array.from({ length: n }, (_, idx) => idx),
    description: "Array is sorted!",
  })
  return steps
}

export function generateMergeSortSteps(
  initialArray: number[]
): VisualizationStep[] {
  const array = [...initialArray]
  const steps: VisualizationStep[] = []

  const merge = (arr: number[], l: number, m: number, r: number) => {
    const n1 = m - l + 1
    const n2 = r - m
    const L = new Array(n1)
    const R = new Array(n2)

    for (let i = 0; i < n1; i++) {
      L[i] = arr[l + i]
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[m + 1 + j]
    }

    let i = 0,
      j = 0,
      k = l

    while (i < n1 && j < n2) {
      steps.push({
        array: [...arr],
        activeIndices: [l + i, m + 1 + j],
        sortedIndices: [],
        description: `Comparing sub-arrays. Left: ${L[i]}, Right: ${R[j]}`,
      })
      if (L[i] <= R[j]) {
        arr[k] = L[i]
        i++
      } else {
        arr[k] = R[j]
        j++
      }
      steps.push({
        array: [...arr],
        activeIndices: [k],
        sortedIndices: [],
        description: `Merging: Placed value at index ${k}`,
      })
      k++
    }

    while (i < n1) {
      arr[k] = L[i]
      steps.push({
        array: [...arr],
        activeIndices: [k],
        sortedIndices: [],
        description: `Merging remaining Left elements: Placed at ${k}`,
      })
      i++
      k++
    }

    while (j < n2) {
      arr[k] = R[j]
      steps.push({
        array: [...arr],
        activeIndices: [k],
        sortedIndices: [],
        description: `Merging remaining Right elements: Placed at ${k}`,
      })
      j++
      k++
    }
  }

  const mergeSort = (arr: number[], l: number, r: number) => {
    if (l >= r) {
      return
    }
    const m = l + Math.floor((r - l) / 2)

    steps.push({
      array: [...arr],
      activeIndices: [l, r],
      sortedIndices: [],
      description: `Dividing: range [${l}, ${r}] into [${l}, ${m}] and [${m + 1}, ${r}]`,
    })

    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)
  }

  mergeSort(array, 0, array.length - 1)

  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Merge Sort Complete!",
  })

  return steps
}

export function generateQuickSortSteps(
  initialArray: number[]
): VisualizationStep[] {
  const array = [...initialArray]
  const steps: VisualizationStep[] = []

  const partition = (arr: number[], low: number, high: number) => {
    const pivot = arr[high]
    let i = low - 1

    steps.push({
      array: [...arr],
      activeIndices: [high],
      sortedIndices: [],
      description: `Pivot selected: ${pivot} at index ${high}`,
    })

    for (let j = low; j < high; j++) {
      steps.push({
        array: [...arr],
        activeIndices: [j, high],
        sortedIndices: [],
        description: `Comparing ${arr[j]} with Pivot ${pivot}`,
      })

      if (arr[j] < pivot) {
        i++
        ;[arr[i], arr[j]] = [arr[j], arr[i]]
        steps.push({
          array: [...arr],
          activeIndices: [i, j],
          sortedIndices: [],
          description: `Swapped ${arr[i]} and ${arr[j]} (smaller than pivot)`,
        })
      }
    }
    ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
    steps.push({
      array: [...arr],
      activeIndices: [i + 1, high],
      sortedIndices: [],
      description: `Placed Pivot ${pivot} at correct position ${i + 1}`,
    })
    return i + 1
  }

  const quickSort = (arr: number[], low: number, high: number) => {
    if (low < high) {
      const pi = partition(arr, low, high)
      quickSort(arr, low, pi - 1)
      quickSort(arr, pi + 1, high)
    }
  }

  quickSort(array, 0, array.length - 1)

  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: Array.from({ length: array.length }, (_, idx) => idx),
    description: "Quick Sort Complete!",
  })

  return steps
}

// --- Searching Algorithms ---

export function generateBinarySearchSteps(
  array: number[],
  target: number
): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    const mid = Math.floor((left + right) / 2)

    steps.push({
      array: [...array],
      activeIndices: [mid],
      sortedIndices: [],
      description: `Checking middle element at index ${mid} (${array[mid]}). Current Search Range: [${left}, ${right}]`,
    })

    if (array[mid] === target) {
      steps.push({
        array: [...array],
        activeIndices: [mid],
        sortedIndices: [mid],
        description: `Found target ${target} at index ${mid}!`,
      })
      return steps
    } else if (array[mid] < target) {
      steps.push({
        array: [...array],
        activeIndices: [mid],
        sortedIndices: [],
        description: `${array[mid]} < ${target}. The target must be in the right half. Eliminating left side.`,
      })
      left = mid + 1
    } else {
      steps.push({
        array: [...array],
        activeIndices: [mid],
        sortedIndices: [],
        description: `${array[mid]} > ${target}. The target must be in the left half. Eliminating right side.`,
      })
      right = mid - 1
    }
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: [],
    description: `Target ${target} not found in the array.`,
  })

  return steps
}

export function generateLinearSearchSteps(
  array: number[],
  target: number
): VisualizationStep[] {
  const steps: VisualizationStep[] = []

  for (let i = 0; i < array.length; i++) {
    steps.push({
      array: [...array],
      activeIndices: [i],
      sortedIndices: [],
      description: `Checking index ${i}: Is ${array[i]} equal to ${target}?`,
    })

    if (array[i] === target) {
      steps.push({
        array: [...array],
        activeIndices: [i],
        sortedIndices: [i],
        description: `Found target ${target} at index ${i}!`,
      })
      return steps
    }
  }

  steps.push({
    array: [...array],
    activeIndices: [],
    sortedIndices: [],
    description: `Target ${target} not found in the array.`,
  })

  return steps
}

// --- Data Structure Operations ---

export function generateStackSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const stack: number[] = []
  const operations: (number | "POP")[] = [10, 20, 30, "POP", 40, "POP", "POP"]

  steps.push({
    array: [],
    activeIndices: [],
    sortedIndices: [],
    description: "Empty Stack. Ready to push.",
  })

  for (const op of operations) {
    if (op === "POP") {
      if (stack.length > 0) {
        const val = stack[stack.length - 1]
        steps.push({
          array: [...stack],
          activeIndices: [stack.length - 1],
          sortedIndices: [],
          description: `Popping top element: ${val}`,
        })
        stack.pop()
        steps.push({
          array: [...stack],
          activeIndices: [],
          sortedIndices: [],
          description: `Element ${val} removed.`,
        })
      }
    } else {
      stack.push(op)
      steps.push({
        array: [...stack],
        activeIndices: [stack.length - 1],
        sortedIndices: [],
        description: `Pushing ${op} onto the stack.`,
      })
    }
  }
  return steps
}

export function generateQueueSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const queue: number[] = []
  const operations: (number | "DEQUEUE")[] = [
    10,
    20,
    30,
    "DEQUEUE",
    40,
    "DEQUEUE",
  ]

  steps.push({
    array: [],
    activeIndices: [],
    sortedIndices: [],
    description: "Empty Queue. Ready to enqueue.",
  })

  for (const op of operations) {
    if (op === "DEQUEUE") {
      if (queue.length > 0) {
        const val = queue[0]
        steps.push({
          array: [...queue],
          activeIndices: [0],
          sortedIndices: [],
          description: `Dequeuing front element: ${val}`,
        })
        queue.shift()
        steps.push({
          array: [...queue],
          activeIndices: [],
          sortedIndices: [],
          description: `Element ${val} removed from front.`,
        })
      }
    } else {
      queue.push(op)
      steps.push({
        array: [...queue],
        activeIndices: [queue.length - 1],
        sortedIndices: [],
        description: `Enqueueing ${op} to the back.`,
      })
    }
  }
  return steps
}

export function generateLinkedListSteps(): VisualizationStep[] {
  const nodes = [12, 5, 8, 32, 9]
  const steps: VisualizationStep[] = []

  for (let i = 0; i < nodes.length; i++) {
    steps.push({
      array: nodes,
      activeIndices: [i],
      sortedIndices: Array.from({ length: i }, (_, idx) => idx),
      description:
        i === 0
          ? `Head node: ${nodes[i]}. Pointer is here.`
          : `Traversing to next node: ${nodes[i]}`,
    })
  }
  steps.push({
    array: nodes,
    activeIndices: [],
    sortedIndices: [0, 1, 2, 3, 4],
    description: `Reached null (End of list).`,
  })
  return steps
}

// --- Graph / Pathfinding Algorithms ---

export function generateBFSSteps(): VisualizationStep[] {
  // 5x5 Grid. 0 = Empty, 1 = Wall, 2 = Start, 3 = End
  const grid = Array(25).fill(0)
  ;[6, 7, 8, 11, 13, 16, 17].forEach((i) => (grid[i] = 1))
  const start = 0
  const end = 24
  grid[start] = 2
  grid[end] = 3

  const steps: VisualizationStep[] = []
  const queue = [start]
  const visited = new Set([start])
  const parent = new Map<number, number>()

  steps.push({
    array: [...grid],
    activeIndices: [start],
    sortedIndices: [],
    description: "Starting BFS from Top-Left (Green). Queue: FIFO.",
    auxiliary: { visited: Array.from(visited), path: [] },
  })

  let found = false
  while (queue.length > 0 && !found) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const curr = queue.shift()!

    if (curr === end) {
      found = true
      break
    }

    const neighbors: number[] = []
    const row = Math.floor(curr / 5)
    const col = curr % 5

    if (row > 0) {
      neighbors.push(curr - 5)
    }
    if (row < 4) {
      neighbors.push(curr + 5)
    }
    if (col > 0) {
      neighbors.push(curr - 1)
    }
    if (col < 4) {
      neighbors.push(curr + 1)
    }

    for (const next of neighbors) {
      if (!visited.has(next) && grid[next] !== 1) {
        visited.add(next)
        parent.set(next, curr)
        queue.push(next)

        steps.push({
          array: [...grid],
          activeIndices: [curr],
          sortedIndices: [next],
          description: `Visiting neighbor at index ${next}`,
          auxiliary: { visited: Array.from(visited), path: [] },
        })

        if (next === end) {
          found = true
          break
        }
      }
    }
  }

  if (found) {
    let curr: number | undefined = end
    const path: number[] = []
    while (curr !== undefined) {
      path.push(curr)
      curr = parent.get(curr)
    }
    steps.push({
      array: [...grid],
      activeIndices: [],
      sortedIndices: [],
      description: "Path Found!",
      auxiliary: { visited: Array.from(visited), path: path },
    })
  }

  return steps
}

export function generateDFSSteps(): VisualizationStep[] {
  const grid = Array(25).fill(0)
  ;[6, 7, 8, 11, 13, 16, 17].forEach((i) => (grid[i] = 1))
  const start = 0
  const end = 24
  grid[start] = 2
  grid[end] = 3

  const steps: VisualizationStep[] = []
  const stack = [start]
  const visited = new Set<number>()
  const parent = new Map<number, number>()

  steps.push({
    array: [...grid],
    activeIndices: [start],
    sortedIndices: [],
    description: "Starting DFS from Top-Left (Green). Stack: LIFO.",
    auxiliary: { visited: Array.from(visited), path: [] },
  })

  let found = false
  while (stack.length > 0 && !found) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const curr = stack.pop()!

    if (!visited.has(curr)) {
      visited.add(curr)

      steps.push({
        array: [...grid],
        activeIndices: [curr],
        sortedIndices: [],
        description: `Visiting Node ${curr}`,
        auxiliary: { visited: Array.from(visited), path: [] },
      })

      if (curr === end) {
        found = true
        break
      }

      const neighbors: number[] = []
      const row = Math.floor(curr / 5)
      const col = curr % 5
      if (row > 0) {
        neighbors.push(curr - 5)
      }
      if (col < 4) {
        neighbors.push(curr + 1)
      }
      if (row < 4) {
        neighbors.push(curr + 5)
      }
      if (col > 0) {
        neighbors.push(curr - 1)
      }

      for (const next of neighbors) {
        if (!visited.has(next) && grid[next] !== 1) {
          parent.set(next, curr)
          stack.push(next)
        }
      }
    }
  }

  if (found) {
    let curr: number | undefined = end
    const path: number[] = []
    while (curr !== undefined && parent.has(curr)) {
      path.push(curr)
      curr = parent.get(curr)
    }
    path.push(start)
    steps.push({
      array: [...grid],
      activeIndices: [],
      sortedIndices: [],
      description: "Path Found via Depth-First Search!",
      auxiliary: { visited: Array.from(visited), path: path },
    })
  }

  return steps
}

// --- Heap Operations ---

export function generateHeapSteps(): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const heap: number[] = []
  const sequence = [10, 30, 20, 15, 40, 50]

  steps.push({
    array: [],
    activeIndices: [],
    sortedIndices: [],
    description: "Empty Max Heap. Ready to insert elements.",
    auxiliary: { heap: [] },
  })

  for (const num of sequence) {
    heap.push(num)
    let currentIdx = heap.length - 1

    steps.push({
      array: [...heap],
      activeIndices: [currentIdx],
      sortedIndices: [],
      description: `Inserted ${num} at index ${currentIdx} (end of heap).`,
      auxiliary: { heap: [...heap] },
    })

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2)
      steps.push({
        array: [...heap],
        activeIndices: [currentIdx, parentIdx],
        sortedIndices: [],
        description: `Comparing child ${heap[currentIdx]} with parent ${heap[parentIdx]}.`,
        auxiliary: { heap: [...heap] },
      })

      if (heap[currentIdx] > heap[parentIdx]) {
        ;[heap[currentIdx], heap[parentIdx]] = [
          heap[parentIdx],
          heap[currentIdx],
        ]
        steps.push({
          array: [...heap],
          activeIndices: [currentIdx, parentIdx],
          sortedIndices: [],
          description: `Child > Parent. Swap!`,
          auxiliary: { heap: [...heap] },
        })
        currentIdx = parentIdx
      } else {
        steps.push({
          array: [...heap],
          activeIndices: [currentIdx, parentIdx],
          sortedIndices: [],
          description: `Heap property satisfied. Stop bubbling.`,
          auxiliary: { heap: [...heap] },
        })
        break
      }
    }
  }
  steps.push({
    array: [...heap],
    activeIndices: [],
    sortedIndices: Array.from({ length: heap.length }, (_, i) => i),
    description: `Max Heap construction complete.`,
    auxiliary: { heap: [...heap] },
  })
  return steps
}

// --- Dynamic Programming ---

export function generateDPSteps(): VisualizationStep[] {
  const n = 6
  const dp = Array(n + 1).fill(null)
  const steps: VisualizationStep[] = []

  steps.push({
    array: Array(n + 1).fill(0),
    activeIndices: [],
    sortedIndices: [],
    description: `Calculating Fibonacci(${n}) using Dynamic Programming (Tabulation).`,
    auxiliary: { dp: [...dp] },
  })

  dp[0] = 0
  steps.push({
    array: Array(n + 1).fill(0),
    activeIndices: [0],
    sortedIndices: [0],
    description: `Base Case: Fib(0) = 0`,
    auxiliary: { dp: [...dp] },
  })

  dp[1] = 1
  steps.push({
    array: Array(n + 1).fill(0),
    activeIndices: [1],
    sortedIndices: [0, 1],
    description: `Base Case: Fib(1) = 1`,
    auxiliary: { dp: [...dp] },
  })

  for (let i = 2; i <= n; i++) {
    steps.push({
      array: Array(n + 1).fill(0),
      activeIndices: [i, i - 1, i - 2],
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      description: `Calculating Fib(${i}) = Fib(${i - 1}) + Fib(${i - 2}).`,
      auxiliary: { dp: [...dp] },
    })

    dp[i] = dp[i - 1] + dp[i - 2]

    steps.push({
      array: Array(n + 1).fill(0),
      activeIndices: [i],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Fib(${i}) = ${dp[i - 1]} + ${dp[i - 2]} = ${dp[i]}`,
      auxiliary: { dp: [...dp] },
    })
  }

  return steps
}
