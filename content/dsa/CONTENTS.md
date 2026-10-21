# Data Structures & Algorithms — Table of Contents & Notes

> **Purpose:** Theoretical foundations, algorithm design, complexity analysis, and pattern mastery for technical deep dives and review.
> **Scope:** Independent conceptual curriculum covering data structures and algorithms from the ground up.

---

## Phase 1 — Algorithmic Foundations & Analysis

> *"Understanding how algorithms scale before analyzing individual structures."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 01 | Asymptotic Analysis & Big-O Notation | High | Time vs Space complexity, Best/Worst/Amortized, Master Theorem |
| 02 | Memory Layout of Data Structures | Medium | Contiguous vs Linked allocations, cache locality, memory overhead |

---

## Phase 2 — Linear Data Structures

> *"Sequential storage models, trade-offs, and pointer manipulation."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 03 | Arrays & Dynamic Arrays | High | Static vs dynamic array doubling, capacity vs size, amortized O(1) insertion |
| 04 | Singly & Doubly Linked Lists | High | Pointer manipulation, sentinel dummy nodes, fast & slow pointers |
| 05 | Stacks & Monotonic Stacks | Very High | LIFO semantics, call stack simulation, monotonic stack for next greater element |
| 06 | Queues, Deques & Circular Buffers | High | FIFO semantics, double-ended queues, ring buffers, lockless ring buffer basics |

---

## Phase 3 — Trees & Hierarchical Structures

> *"Non-linear hierarchies, recursive properties, and balanced trees."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 07 | Binary Trees & Traversal Techniques | High | Preorder, Inorder, Postorder, Level-order, recursive vs iterative stack traversal |
| 08 | Binary Search Trees (BST) | High | BST invariants, predecessor/successor, search/insert/delete complexity |
| 09 | Self-Balancing Trees (AVL & Red-Black) | High | Rotations, height balancing, 2-3-4 tree isomorphism, Red-Black invariants |
| 10 | Heaps & Priority Queues | Very High | Binary min/max heap, array representation, heapify up/down, O(N) buildHeap |
| 11 | Tries (Prefix Trees) | High | Retrieval tree, prefix matching, word search, memory-efficient Radix trees |

---

## Phase 4 — Hash-Based Structures

> *"Constant-time amortized lookups, collision resolution, and hash distribution."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 12 | Hash Tables & Hash Functions | Very High | Direct addressing, hash functions (djb2, Murmur), distribution properties |
| 13 | Collision Resolution Techniques | High | Chaining with linked lists/BSTs, open addressing (linear, quadratic, double hashing) |
| 14 | Load Factor & Dynamic Rehashing | Medium | Rehash threshold, performance degradation, amortized O(1) resizing |

---

## Phase 5 — Graphs & Network Algorithms

> *"Representing relationships, traversal paradigms, and shortest paths."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 15 | Graph Representations | Medium | Adjacency matrix vs adjacency list, sparse vs dense graphs |
| 16 | Graph Traversals (BFS & DFS) | Very High | Queue vs recursion, cycle detection in directed/undirected graphs, connected components |
| 17 | Topological Sort & DAGs | High | Kahn's algorithm (in-degree queue), DFS postorder, dependency resolution |
| 18 | Shortest Path Algorithms | Very High | Dijkstra's algorithm (min-heap), Bellman-Ford (negative cycles), Floyd-Warshall |
| 19 | Minimum Spanning Trees (MST) | Medium | Cut property, Kruskal's algorithm (Union-Find), Prim's algorithm |
| 20 | Disjoint Set Union (Union-Find) | High | Path compression, union by rank/size, near O(1) inverse Ackermann |

---

## Phase 6 — Core Algorithmic Paradigms & Patterns

> *"Standard problem-solving patterns applied across technical problem domains."*

| NN | Topic | Interview Heat | Key Concepts |
|----|-------|----------------|--------------|
| 21 | Two Pointers & Sliding Window | Very High | Opposite ends, fast & slow pointers, fixed vs variable window sizing |
| 22 | Binary Search Patterns | Very High | Monotonic search space, finding inflection points, lower/upper bound |
| 23 | Divide and Conquer & Sorting | High | MergeSort, QuickSort, QuickSelect, non-comparison counting/radix sort |
| 24 | Dynamic Programming: Memoization & Tabulation | Very High | Optimal substructure, overlapping subproblems, 1D/2D state transitions, Knapsack |
| 25 | Greedy Algorithms | Medium | Greedy choice property, interval scheduling, Huffman coding |
| 26 | Backtracking & State Space Search | High | Pruning, N-Queens, subset generation, permutation trees |
| 27 | Bit Manipulation Techniques | High | Bitmasks, bitwise arithmetic, XOR properties, Brian Kernighan's algorithm |

---
*Last updated: 2026-10-21*
